// トレーナーインターフェース
export interface Trainer {
  id: number;
  name: string;
  profileImg: string;
  sns: string[];
  profile: string;
  followers: number;
  engagementRate: number;
  area: string;
  recentPosts: string[];
}

// フィルターインターフェース
export interface Filters {
  followers: number;
  engagementRate: number;
  area: string;
}

// SNSの種類を定義
export type SnsType = 'Instagram' | 'YouTube' | 'TikTok';

// エリアの種類を定義
export type AreaType = '東京' | '大阪' | '名古屋' | '福岡' | '札幌' | '';
