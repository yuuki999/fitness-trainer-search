// components/TrainerTable.tsx
import React from 'react';
import Image from 'next/image';
import { Trainer } from '../types';

// SNSアイコンコンポーネントのプロップスインターフェース
interface SnsIconProps {
  type: string;
}

// SNSアイコンコンポーネント
const SnsIcon: React.FC<SnsIconProps> = ({ type }) => {
  const baseClasses = "text-xs px-1 py-0.5 rounded text-white font-medium";
  
  switch (type) {
    case 'Instagram':
      return <span className={`${baseClasses} bg-gradient-to-r from-purple-500 via-pink-500 to-red-500`}>IG</span>;
    case 'YouTube':
      return <span className={`${baseClasses} bg-red-600`}>YT</span>;
    case 'TikTok':
      return <span className={`${baseClasses} bg-black`}>TT</span>;
    default:
      return null;
  }
};

// トレーナーテーブルのプロップスインターフェース
interface TrainerTableProps {
  trainers?: Trainer[]; // オプショナルに変更
  onSelect?: (trainerId: number, isSelected: boolean) => void;
}

// トレーナーテーブルコンポーネント
const TrainerTable: React.FC<TrainerTableProps> = ({ trainers = [], onSelect }) => { // デフォルト値を空配列に設定
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left">
              <input type="checkbox" className="rounded" />
            </th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              アカウント名
            </th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SNS
            </th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              プロフィール
            </th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              フォロワー数
            </th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              平均ER
            </th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              最近の投稿
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {trainers && trainers.length > 0 ? (
            trainers.map((trainer) => (
              <tr key={trainer.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <input 
                    type="checkbox" 
                    className="rounded" 
                    onChange={(e) => onSelect && onSelect(trainer.id, e.target.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 relative rounded-full overflow-hidden">
                      <Image
                        src={trainer.profileImg}
                        alt={trainer.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{trainer.name}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex space-x-1">
                    {trainer.sns.map((sns, index) => (
                      <SnsIcon key={index} type={sns} />
                    ))}
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-700">
                  {trainer.profile}
                </td>
                <td className="p-4 text-sm text-gray-700">
                  {trainer.followers.toLocaleString()}
                </td>
                <td className="p-4 text-sm text-gray-700">
                  {trainer.engagementRate}%
                </td>
                <td className="p-4">
                  <div className="flex space-x-1">
                    {trainer.recentPosts.map((post, index) => (
                      <div key={index} className="h-10 w-10 relative rounded overflow-hidden">
                        <Image
                          src={post}
                          alt="投稿"
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="p-4 text-center text-gray-500">
                データがありません
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrainerTable;
