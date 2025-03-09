"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Sidebar from './components/Sidebar';
import TrainerTable from './components/TrainerTable';
import { Filters, SnsType, Trainer } from './types';
import { getTrainers, searchTrainersComplex } from './services';

const Home: NextPage = () => {
  // トレーナーデータの状態
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // フィルター状態
  const [filters, setFilters] = useState<Filters>({
    followers: 0,
    engagementRate: 0,
    area: '',
  });
  
  // 選択されたSNS
  const [selectedSns, setSelectedSns] = useState<SnsType[]>([]);
  
  // 検索キーワード
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  
  // 選択されたトレーナーID
  const [selectedTrainerIds, setSelectedTrainerIds] = useState<number[]>([]);

  // 初期データ読み込み
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getTrainers();
        setTrainers(data);
      } catch (err) {
        setError('データの取得に失敗しました。後でもう一度お試しください。');
        console.error('データの取得に失敗しました:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

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

  // フィルター適用ハンドラー
  const applyFilters = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // 複合検索を使用
      const filteredTrainers = await searchTrainersComplex(
        searchKeyword,
        selectedSns.length > 0 ? selectedSns : undefined,
        filters
      );
      
      setTrainers(filteredTrainers);
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
      area: '',
    });
    setSelectedSns([]);
    setSearchKeyword('');
    
    // データを再取得
    setLoading(true);
    setError(null);
    
    try {
      const data = await getTrainers();
      setTrainers(data);
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
              <div className="flex items-center">
                {selectedTrainerIds.length > 0 && (
                  <span className="mr-4 text-sm text-gray-600">
                    {selectedTrainerIds.length}件選択中
                  </span>
                )}
                <button className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm flex items-center">
                  表示項目
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                <p>{error}</p>
              </div>
            )}
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : trainers.length > 0 ? (
              <TrainerTable 
                trainers={trainers} 
                onSelect={handleTrainerSelect}
              />
            ) : (
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
