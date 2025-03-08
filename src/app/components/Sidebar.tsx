// components/Sidebar.tsx
import React from 'react';
import { Filters, SnsType } from '../types';

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
  // フィルター変更ハンドラー
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, filterType: keyof Filters) => {
    const value = filterType === 'area' ? e.target.value : Number(e.target.value);
    onFilterChange(filterType, value);
  };

  // SNS選択変更ハンドラー
  const handleSnsChange = (e: React.ChangeEvent<HTMLInputElement>, sns: SnsType) => {
    onSnsChange(sns, e.target.checked);
  };

  // キーワード変更ハンドラー
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onKeywordChange(e.target.value);
  };

  return (
    <div className="w-60 bg-gray-900 text-white h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <h1 className="font-bold text-lg">FITNESS DATABASE</h1>
      </div>
      
      <div className="p-2">
        <div className="p-2 rounded hover:bg-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>ダッシュボード</span>
        </div>
        
        <div className="p-2 rounded bg-blue-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>トレーナー検索</span>
        </div>
        
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
            <input 
              type="range" 
              min="0" 
              max="100000" 
              value={filters.followers} 
              onChange={(e) => handleFilterChange(e, 'followers')} 
              className="w-full"
            />
            <span className="text-sm">{parseInt(filters.followers.toString()).toLocaleString()}+</span>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">エンゲージメント率</label>
            <input 
              type="range" 
              min="0" 
              max="10" 
              step="0.1" 
              value={filters.engagementRate} 
              onChange={(e) => handleFilterChange(e, 'engagementRate')} 
              className="w-full"
            />
            <span className="text-sm">{filters.engagementRate}%+</span>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">エリア</label>
            <select 
              value={filters.area} 
              onChange={(e) => handleFilterChange(e, 'area')}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white text-sm"
            >
              <option value="">全てのエリア</option>
              <option value="東京">東京</option>
              <option value="大阪">大阪</option>
              <option value="名古屋">名古屋</option>
              <option value="福岡">福岡</option>
              <option value="札幌">札幌</option>
            </select>
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
