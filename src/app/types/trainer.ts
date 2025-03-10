import { TrainerPost } from "./post";
import { SnsType } from "./sns";

// トレーナーインターフェース
export interface Trainer {
  id: number;
  name: string;
  profileImg: string;
  profile: string;
  followers: number;
  engagementRate: number;
  area: string | null; // エリア名（表示用）
  area_id: number | null; // エリアID（検索用）
  sns: SnsType[];
  posts: TrainerPost[];
}


// トレーナーのレコード型（Supabaseの戻り値用）
export interface TrainerRecord {
  id: number;
  name: string;
  profile_img: string;
  profile: string;
  followers: number;
  engagement_rate: number;
  area: string | null; // 表示用のエリア名
  area_id: number | null; // 検索用のエリアID
  created_at: string;
}
// フィルターインターフェース
export interface Filters {
  followers: number;
  engagementRate: number;
  area_id: number | null;
}

