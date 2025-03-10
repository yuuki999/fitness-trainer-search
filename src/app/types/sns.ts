// SNSの種類を定義
export type SnsType = 'Instagram' | 'YouTube' | 'TikTok' | 'X';

// SNSアカウントのインターフェース
export interface SnsAccount {
  type: SnsType;
  username: string;
}

// SNSデータの型定義（Supabaseの戻り値用）
export interface SnsRecord {
  trainer_id: number;
  sns_type: string;
}
