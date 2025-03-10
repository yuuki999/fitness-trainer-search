import React, { useState, useEffect } from 'react';
import { Filters, SnsType, Area } from '../types';
import { getAreas } from '../services';

interface SidebarProps {
  filters: Filters;
  onFilterChange: (filterType: keyof Filters, value: any) => void;
  onSearch: () => void;
  onReset: () => void;
  selectedSns: SnsType[];
  onSnsChange: (sns: SnsType, checked: boolean) => void;
  searchKeyword: string;
  onKeywordChange: (keyword: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  filters,
  onFilterChange,
  onSearch,
  onReset,
  selectedSns,
  onSnsChange,
  searchKeyword,
  onKeywordChange
}) => {
  // エリア一覧の状態管理
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // スライダーの表示値を管理するためのステート
  const [sliderValue, setSliderValue] = useState(filters.followers);
  
  // フォロワー数の表示用フォーマット関数
  const formatFollowers = (value: number): string => {
    if (value >= 10000) {
      return `${(value / 10000).toFixed(1)}万+`;
    }
    return `${value.toLocaleString()}+`;
  };
  
  // エリア一覧を取得
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setLoading(true);
        const areaData = await getAreas();
        setAreas(areaData);
      } catch (error) {
        console.error('エリア一覧の取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAreas();
  }, []);
  
  // フィルター変更ハンドラー
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, filterType: keyof Filters) => {
    const value = filterType === 'area_id' 
      ? e.target.value === '' ? null : Number(e.target.value) 
      : Number(e.target.value);
    onFilterChange(filterType, value);
  };

  // フォロワースライダー特有の処理
  const handleFollowerSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 生の値を取得
    const rawValue = Number(e.target.value);
    
    // スライダーの表示を1000単位で丸める（UI表示用）
    const step = 1000;
    const roundedValue = Math.round(rawValue / step) * step;
    
    // ステートを更新
    setSliderValue(roundedValue);
    
    // 実際のフィルター値として送信
    onFilterChange('followers', roundedValue);
  };

  // SNS選択変更ハンドラー
  const handleSnsChange = (e: React.ChangeEvent<HTMLInputElement>, sns: SnsType) => {
    onSnsChange(sns, e.target.checked);
  };

  // キーワード変更ハンドラー
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onKeywordChange(e.target.value);
  };

  // フィルターが外部から変更された場合にスライダー値を同期
  useEffect(() => {
    setSliderValue(filters.followers);
  }, [filters.followers]);

  // フォロワー数表示用のマークを生成
  const followerMarks = [
    { value: 0, label: '0' },
    { value: 30000, label: '3万' },
    { value: 50000, label: '5万' },
    { value: 100000, label: '10万' },
  ];

  return (
    <div className="w-60 bg-gray-900 text-white h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <h1 className="font-bold text-lg">FITNESS DATABASE</h1>
      </div>
      
      <div className="p-2">
        <div className="mt-6 p-2">
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">検索条件</h3>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">アカウント名&キーワード検索</label>
            <input 
              type="text" 
              placeholder="キーワードを入力..." 
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white text-sm"
              value={searchKeyword}
              onChange={handleKeywordChange}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">対応SNS</label>
            <div className="flex flex-col space-y-1">
              <label className="flex items-center text-sm">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  checked={selectedSns.includes('Instagram')}
                  onChange={(e) => handleSnsChange(e, 'Instagram')}
                />
                <span>Instagram</span>
              </label>
              <label className="flex items-center text-sm">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  checked={selectedSns.includes('YouTube')}
                  onChange={(e) => handleSnsChange(e, 'YouTube')}
                />
                <span>YouTube</span>
              </label>
              <label className="flex items-center text-sm">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  checked={selectedSns.includes('TikTok')}
                  onChange={(e) => handleSnsChange(e, 'TikTok')}
                />
                <span>TikTok</span>
              </label>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">フォロワー数</label>
            <div className="mb-1">
              <input 
                type="range" 
                min="0" 
                max="100000" 
                step="1000"
                value={sliderValue} 
                onChange={handleFollowerSliderChange} 
                className="w-full accent-blue-600"
              />
            </div>
            
            {/* スライダーの目盛り表示 */}
            <div className="flex justify-between w-full text-xs text-gray-400">
              {followerMarks.map(mark => (
                <span key={mark.value}>{mark.label}</span>
              ))}
            </div>
            
            {/* 現在選択中のフォロワー数 */}
            <div className="text-center mt-2">
              <span className="text-blue-400 font-medium text-lg">{formatFollowers(sliderValue)}</span>
            </div>
          </div>
                    
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">エリア</label>
            <select 
              value={filters.area_id || ''}
              onChange={(e) => handleFilterChange(e, 'area_id')}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white text-sm"
              disabled={loading}
            >
              <option value="">全てのエリア</option>
              {areas.map(area => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
            {loading && (
              <div className="text-xs text-gray-400 mt-1">エリア情報を読み込み中...</div>
            )}
          </div>
          
          <div className="flex justify-between mt-6">
            <button 
              onClick={onReset} 
              className="px-4 py-2 bg-gray-700 rounded text-sm hover:bg-gray-600 transition"
            >
              リセット
            </button>
            <button 
              onClick={onSearch} 
              className="px-4 py-2 bg-blue-600 rounded text-sm hover:bg-blue-500 transition"
            >
              検索
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
