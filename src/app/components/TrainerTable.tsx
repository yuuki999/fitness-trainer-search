import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trainer } from '../types';
import SnsIcon from './common/SnsIcon';

// トレーナーテーブルのプロップスインターフェース
interface TrainerTableProps {
  trainers?: Trainer[];
  onSelect?: (trainerId: number, isSelected: boolean) => void;
}

// トレーナーテーブルコンポーネント
const TrainerTable: React.FC<TrainerTableProps> = ({ trainers = [], onSelect }) => { // デフォルト値を空配列に設定
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {/* <th className="p-4 text-left">
              <input type="checkbox" className="rounded" />
            </th> */}
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
              最近の投稿
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {trainers && trainers.length > 0 ? (
            trainers.map((trainer) => (
              <tr key={trainer.id} className="hover:bg-gray-50 group">
                <td className="p-4">
                  <Link href={`/trainers/${trainer.id}`} className="block">
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
                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">{trainer.name}</p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="p-4">
                  <Link href={`/trainers/${trainer.id}`} className="block">
                    <div className="flex space-x-1">
                      {trainer.sns.map((sns, index) => (
                        <SnsIcon key={index} type={sns} size="sm" />
                      ))}
                    </div>
                  </Link>
                </td>
                <td className="p-4 text-sm text-gray-700">
                  <Link href={`/trainers/${trainer.id}`} className="block truncate max-w-xs">
                    {trainer.profile}
                  </Link>
                </td>
                <td className="p-4 text-sm text-gray-700">
                  <Link href={`/trainers/${trainer.id}`} className="block">
                    {trainer.followers.toLocaleString()}
                  </Link>
                </td>
                <td className="p-4">
                  <Link href={`/trainers/${trainer.id}`} className="block">
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
                  </Link>
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
