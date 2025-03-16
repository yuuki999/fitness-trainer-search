import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trainer } from '../types';
import SnsIcon from './common/SnsIcon';

// ダミー画像にはデータ URL を使用する
const DUMMY_PROFILE_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI0VBRUFFQSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPk5vIFByb2ZpbGUgSW1hZ2U8L3RleHQ+PC9zdmc+';
const DUMMY_POST_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI0VBRUFFQSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPk5vIFBvc3QgSW1hZ2U8L3RleHQ+PC9zdmc+';

// 画像コンポーネントをカスタマイズしてエラーハンドリングを追加
const ProfileImage = ({ src, alt }: { src: string, alt: string }) => {
  const [hasError, setHasError] = useState(false);
  
  return (
    <Image
      src={hasError ? DUMMY_PROFILE_IMAGE : src}
      alt={alt}
      fill
      sizes="40px"
      className="object-cover"
      onError={() => {
        setHasError(true);
      }}
      unoptimized={hasError} // ダミー画像の場合は最適化をスキップ
    />
  );
};

const PostImage = ({ src, alt }: { src: string, alt: string }) => {
  const [hasError, setHasError] = useState(false);
  
  return (
    <Image
      src={hasError ? DUMMY_POST_IMAGE : src}
      alt={alt}
      fill
      sizes="40px"
      className="object-cover"
      onError={() => {
        setHasError(true);
      }}
      unoptimized={hasError} // ダミー画像の場合は最適化をスキップ
    />
  );
};

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
                        <ProfileImage 
                          src={trainer.profileImg} 
                          alt={trainer.name} 
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
                          <PostImage 
                            src={post} 
                            alt="投稿" 
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
