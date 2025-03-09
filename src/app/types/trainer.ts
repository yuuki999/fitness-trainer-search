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

// トレーナーのレコード型（Supabaseの戻り値用）
export interface TrainerRecord {
  id: number;
  name: string;
  profile_img: string | null;
  profile: string | null;
  followers: number;
  engagement_rate: number;
  area: string | null;
}

// フィルターインターフェース
export interface Filters {
  followers: number;
  engagementRate: number;
  area: string;
}

// エリアの種類を定義
export type AreaType = '東京' | '大阪' | '名古屋' | '福岡' | '札幌' | '';
