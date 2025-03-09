// トレーナー投稿のインターフェース
export interface TrainerPost {
  id: number;
  trainerId: number;
  imageUrl: string;
  postedAt: string;
}

// 投稿データの型定義（Supabaseの戻り値用）
export interface PostRecord {
  id: number;
  trainer_id: number;
  image_url: string;
  posted_at: string;
}
