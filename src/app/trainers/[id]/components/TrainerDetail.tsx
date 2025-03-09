"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SnsAccount, Trainer, TrainerPost } from '@/app/types';
import { getTrainerDetail, getTrainerPosts, getTrainerSnsAccounts } from '@/app/services';


// SNSアイコンコンポーネント
const SnsIcon = ({ type, url }: { type: string; url: string }) => {
  const getIcon = () => {
    switch (type.toLowerCase()) {
      case 'instagram':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 fill-current">
            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 h-5 fill-current">
            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
          </svg>
        );
      case 'tiktok':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 fill-current">
            <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
    >
      {getIcon()}
    </a>
  );
};

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
      <SnsIcon key={index} type={sns.type} url={snsUrl} />
    );
  });

  // SNSのURLを取得する関数
  function getSnsUrl(type: string, username: string): string {
    switch (type.toLowerCase()) {
      case 'instagram':
        return `https://instagram.com/${username}`;
      case 'youtube':
        return `https://youtube.com/${username}`;
      case 'tiktok':
        return `https://tiktok.com/@${username}`;
      default:
        return '#';
    }
  }

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
                <div className="flex items-center">
                  <div className="text-sm font-medium text-gray-500">エンゲージメント率:</div>
                  <div className="ml-2 text-sm">{trainer.engagementRate}%</div>
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
