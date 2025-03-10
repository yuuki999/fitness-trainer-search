// エリアマスターの型定義を追加
export interface Area {
  id: number;
  name: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

// エリアサービス関連の型
export interface AreaOption {
  value: number | null;
  label: string;
}
