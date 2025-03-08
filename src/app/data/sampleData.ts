// src/data/sampleData.ts
import { Trainer } from '@/types';

// サンプルデータ（実際の実装ではデータベースから取得）
export const SAMPLE_TRAINERS: Trainer[] = [
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
  {
    id: 2,
    name: "田中 愛子",
    profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
    sns: ["Instagram", "YouTube"],
    profile: "ピラティスインストラクター / ダイエットコーチ / 栄養士",
    followers: 8700,
    engagementRate: 4.5,
    area: "大阪",
    recentPosts: [
      "https://randomuser.me/api/portraits/women/20.jpg",
      "https://randomuser.me/api/portraits/women/21.jpg",
      "https://randomuser.me/api/portraits/women/22.jpg",
      "https://randomuser.me/api/portraits/women/23.jpg",
    ]
  },
  {
    id: 3,
    name: "鈴木 香織",
    profileImg: "https://randomuser.me/api/portraits/women/3.jpg",
    sns: ["Instagram"],
    profile: "筋トレスペシャリスト / ボディメイクトレーナー",
    followers: 15300,
    engagementRate: 2.8,
    area: "福岡",
    recentPosts: [
      "https://randomuser.me/api/portraits/women/30.jpg",
      "https://randomuser.me/api/portraits/women/31.jpg",
      "https://randomuser.me/api/portraits/women/32.jpg",
      "https://randomuser.me/api/portraits/women/33.jpg",
    ]
  },
  {
    id: 4,
    name: "山田 千尋",
    profileImg: "https://randomuser.me/api/portraits/women/4.jpg",
    sns: ["Instagram", "TikTok", "YouTube"],
    profile: "ダンスインストラクター / フィットネスモデル",
    followers: 25800,
    engagementRate: 5.1,
    area: "名古屋",
    recentPosts: [
      "https://randomuser.me/api/portraits/women/40.jpg",
      "https://randomuser.me/api/portraits/women/41.jpg",
      "https://randomuser.me/api/portraits/women/42.jpg",
      "https://randomuser.me/api/portraits/women/43.jpg",
    ]
  },
  {
    id: 5,
    name: "伊藤 理恵",
    profileImg: "https://randomuser.me/api/portraits/women/5.jpg",
    sns: ["Instagram"],
    profile: "パーソナルトレーナー / 食事管理士",
    followers: 7800,
    engagementRate: 3.7,
    area: "札幌",
    recentPosts: [
      "https://randomuser.me/api/portraits/women/50.jpg",
      "https://randomuser.me/api/portraits/women/51.jpg",
      "https://randomuser.me/api/portraits/women/52.jpg",
      "https://randomuser.me/api/portraits/women/53.jpg",
    ]
  },
];
