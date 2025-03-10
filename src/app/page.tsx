"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Sidebar from './components/Sidebar';
import TrainerTable from './components/TrainerTable';

import { Filters, SnsType, Trainer } from './types';
import { getTrainers, searchTrainersComplex } from './services';
import PaginationControls from './components/PaginationControls';

const Home: NextPage = () => {
  // トレーナーデータの状態
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // フィルター状態
  const [filters, setFilters] = useState<Filters>({
    followers: 0,
    engagementRate: 0,
    area_id: null,
  });
  
  // 選択されたSNS
  const [selectedSns, setSelectedSns] = useState<SnsType[]>([]);
  
  // 検索キーワード
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  
  // 選択されたトレーナーID
  const [selectedTrainerIds, setSelectedTrainerIds] = useState<number[]>([]);

  // ページネーション状態
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);

  // 初期データ読み込み
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // ページネーション対応のgetTrainers関数を呼び出し
        const result = await getTrainers(currentPage, itemsPerPage);
        setTrainers(result.trainers);
        setTotalItems(result.total);
        setTotalPages(Math.ceil(result.total / itemsPerPage));
      } catch (err) {
        setError('データの取得に失敗しました。後でもう一度お試しください。');
        console.error('データの取得に失敗しました:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [currentPage, itemsPerPage]); // ページまたは表示件数が変更されたら再取得

  // フィルター変更ハンドラー
  const handleFilterChange = (filterType: keyof Filters, value: any): void => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };

  // SNS選択変更ハンドラー
  const handleSnsChange = (sns: SnsType, checked: boolean): void => {
    if (checked) {
      setSelectedSns([...selectedSns, sns]);
    } else {
      setSelectedSns(selectedSns.filter(item => item !== sns));
    }
  };

  // ページ変更ハンドラー
  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    // useEffectがトリガーされ、新しいページのデータが取得される
  };

  // 表示件数変更ハンドラー
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newItemsPerPage = Number(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // 表示件数変更時は1ページ目に戻す
  };

  // フィルター適用ハンドラー
  const applyFilters = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // ページネーション対応の複合検索を使用
      const result = await searchTrainersComplex(
        searchKeyword,
        selectedSns.length > 0 ? selectedSns : undefined,
        filters,
        1, // フィルター適用時は1ページ目から表示
        itemsPerPage
      );
      
      setTrainers(result.trainers);
      setTotalItems(result.total);
      setTotalPages(Math.ceil(result.total / itemsPerPage));
      setCurrentPage(1); // 1ページ目に戻す
    } catch (err) {
      setError('検索中にエラーが発生しました。もう一度お試しください。');
      console.error('フィルター適用中にエラーが発生しました:', err);
    } finally {
      setLoading(false);
    }
  };

  // フィルターリセットハンドラー
  const resetFilters = async (): Promise<void> => {
    // フィルターをリセット
    setFilters({
      followers: 0,
      engagementRate: 0,
      area_id: null,
    });
    setSelectedSns([]);
    setSearchKeyword('');
    setCurrentPage(1); // 1ページ目に戻す
    
    // データを再取得
    setLoading(true);
    setError(null);
    
    try {
      const result = await getTrainers(1, itemsPerPage);
      setTrainers(result.trainers);
      setTotalItems(result.total);
      setTotalPages(Math.ceil(result.total / itemsPerPage));
    } catch (err) {
      setError('データのリセットに失敗しました。もう一度お試しください。');
      console.error('データのリセットに失敗しました:', err);
    } finally {
      setLoading(false);
    }
  };

  // トレーナー選択ハンドラー
  const handleTrainerSelect = (trainerId: number, isSelected: boolean): void => {
    if (isSelected) {
      setSelectedTrainerIds([...selectedTrainerIds, trainerId]);
    } else {
      setSelectedTrainerIds(selectedTrainerIds.filter(id => id !== trainerId));
    }
  };

  return (
    <div className="min-h-screen w-full font-sans">
      <Head>
        <title>女性フィットネストレーナー検索</title>
        <meta name="description" content="女性フィットネストレーナー検索サービス" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-screen">
        <div className="flex w-full h-full">
          {/* サイドバー */}
          <Sidebar 
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={applyFilters}
            onReset={resetFilters}
            selectedSns={selectedSns}
            onSnsChange={handleSnsChange}
            searchKeyword={searchKeyword}
            onKeywordChange={setSearchKeyword}
          />
          
          {/* メインコンテンツ */}
          <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium text-gray-800">フィットネストレーナー検索</h2>
            </div>
            
            {/* エラーメッセージ表示 */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                <p>{error}</p>
              </div>
            )}
            
            {/* ローディング状態または結果表示 */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : trainers.length > 0 ? (
              <>
                {/* トレーナーテーブル */}
                <TrainerTable 
                  trainers={trainers} 
                  onSelect={handleTrainerSelect}
                />
                
                {/* ページネーション情報と表示件数選択 */}
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">
                    表示: {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} / 全{totalItems}件
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-gray-600">表示件数:</span>
                    <select
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                      className="border border-gray-300 rounded p-1 text-sm"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>
                
                {/* ページネーションコントロール */}
                <PaginationControls 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              // 検索結果が0件の場合
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">該当するトレーナーが見つかりませんでした。</p>
                <button 
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-500 transition"
                >
                  フィルターをリセット
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
