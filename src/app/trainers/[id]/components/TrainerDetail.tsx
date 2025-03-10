"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SnsAccount, Trainer, TrainerPost } from '@/app/types';
import { getTrainerDetail, getTrainerPosts, getTrainerSnsAccounts } from '@/app/services';
import SnsIcon from '@/app/components/common/SnsIcon';
import { getSnsUrl } from '@/app/utils/snsUtils';

const TrainerDetail = () => {
  const params = useParams();
  const id = typeof params.id === 'string' ? parseInt(params.id, 10) : -1;
  
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [snsAccounts, setSnsAccounts] = useState<SnsAccount[]>([]);
  const [posts, setPosts] = useState<TrainerPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainerData = async () => {
      if (id < 0) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // トレーナー情報を取得
        const trainerData = await getTrainerDetail(id);
        if (!trainerData) {
          setError('トレーナー情報が見つかりませんでした。');
          setLoading(false);
          return;
        }
        setTrainer(trainerData);
        
        // SNSアカウント情報を取得
        const accountsData = await getTrainerSnsAccounts(id);
        setSnsAccounts(accountsData);
        
        // トレーナーの投稿を取得
        const postsData = await getTrainerPosts(id);
        setPosts(postsData);
      } catch (err) {
        setError('トレーナー情報の取得に失敗しました。');
        console.error('トレーナー情報の取得に失敗しました:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainerData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !trainer) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
          <h1 className="text-2xl font-bold text-red-500 mb-4">エラーが発生しました</h1>
          <p className="text-gray-700 mb-6">{error || 'トレーナー情報が見つかりませんでした。'}</p>
          <Link href="/">
            <div className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
              トップページに戻る
            </div>
          </Link>
        </div>
      </div>
    );
  }

  // SNSリンクの生成
  const snsLinks = snsAccounts.map((sns, index) => {
    const snsUrl = getSnsUrl(sns.type, sns.username);
    return (
      <SnsIcon key={index} type={sns.type} url={snsUrl} size="md" />
    );
  });

  console.log(trainer)

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <main className="container mx-auto py-8 px-4">
        {/* 戻るボタン */}
        <Link href="/">
          <div className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            トレーナー一覧に戻る
          </div>
        </Link>

        {/* トレーナープロフィール */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            {/* プロフィール画像 */}
            <div className="md:w-1/3">
              <div className="relative pt-[100%]">
                <Image 
                  src={trainer.profileImg} 
                  alt={trainer.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* プロフィール情報 */}
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold">{trainer.name}</h1>
                <div className="flex space-x-2">
                  {snsLinks}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="text-sm font-medium text-gray-500">エリア:</div>
                  <div className="ml-2 text-sm">{trainer.area}</div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="text-sm font-medium text-gray-500">フォロワー:</div>
                  <div className="ml-2 text-sm">{trainer.followers.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h2 className="text-lg font-medium mb-2">プロフィール</h2>
                <p className="text-gray-700 whitespace-pre-line">{trainer.profile}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 最新の投稿 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">最新の投稿</h2>
          
          {posts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="relative pt-[100%]">
                    <Image 
                      src={post.imageUrl} 
                      alt="投稿画像"
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-gray-500">
                      {new Date(post.postedAt).toLocaleDateString('ja-JP')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-500">投稿はまだありません。</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TrainerDetail;
