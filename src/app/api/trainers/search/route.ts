import { Trainer } from '@/app/types';
import { NextRequest, NextResponse } from 'next/server';

// サンプルデータを別ファイルからインポート
// 実際のアプリでは下記のパスを調整してください
// import { SAMPLE_TRAINERS } from '@/data/sampleData';

// あるいは直接定義する場合（今回は簡略化のため直接定義）
const SAMPLE_TRAINERS: Trainer[] = [
  {
    id: 1,
    name: "佐藤 美咲",
    profileImg: "https://randomuser.me/api/portraits/women/1.jpg",
    sns: ["Instagram", "TikTok"],
    profile: "ヨガインストラクター / パーソナルトレーナー / 食事管理士",
    followers: 12500,
    engagementRate: 3.2,
    area: "東京",
    recentPosts: [
      "https://randomuser.me/api/portraits/women/10.jpg",
      "https://randomuser.me/api/portraits/women/11.jpg",
      "https://randomuser.me/api/portraits/women/12.jpg",
      "https://randomuser.me/api/portraits/women/13.jpg",
    ]
  },
  // 他のトレーナーデータ省略（実際には上記と同様のデータを配列として記述）
];

export async function GET(request: NextRequest) {
  try {
    // URLからクエリパラメータを取得
    const { searchParams } = new URL(request.url);
    
    // キーワードパラメータを取得
    const keyword = searchParams.get('keyword');
    
    if (!keyword) {
      return NextResponse.json(
        { message: 'Keyword parameter is required' },
        { status: 400 }
      );
    }

    // キーワードが空の場合は全データを返す
    if (keyword.trim() === '') {
      return NextResponse.json(SAMPLE_TRAINERS);
    }
    
    // キーワードでフィルタリング
    const lowerKeyword = keyword.toLowerCase();
    
    const filteredTrainers = SAMPLE_TRAINERS.filter(trainer => {
      return (
        trainer.name.toLowerCase().includes(lowerKeyword) ||
        trainer.profile.toLowerCase().includes(lowerKeyword)
      );
    });

    return NextResponse.json(filteredTrainers);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
