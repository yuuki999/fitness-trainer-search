-- エリアマスターテーブルの作成
CREATE TABLE areas (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- エリアマスターデータの初期登録（全都道府県）
INSERT INTO areas (name, display_order) VALUES
-- 北海道・東北
('北海道', 1),
('青森県', 2),
('岩手県', 3),
('宮城県', 4),
('秋田県', 5),
('山形県', 6),
('福島県', 7),

-- 関東
('茨城県', 8),
('栃木県', 9),
('群馬県', 10),
('埼玉県', 11),
('千葉県', 12),
('東京都', 13),
('神奈川県', 14),

-- 中部
('新潟県', 15),
('富山県', 16),
('石川県', 17),
('福井県', 18),
('山梨県', 19),
('長野県', 20),
('岐阜県', 21),
('静岡県', 22),
('愛知県', 23),

-- 近畿
('三重県', 24),
('滋賀県', 25),
('京都府', 26),
('大阪府', 27),
('兵庫県', 28),
('奈良県', 29),
('和歌山県', 30),

-- 中国
('鳥取県', 31),
('島根県', 32),
('岡山県', 33),
('広島県', 34),
('山口県', 35),

-- 四国
('徳島県', 36),
('香川県', 37),
('愛媛県', 38),
('高知県', 39),

-- 九州・沖縄
('福岡県', 40),
('佐賀県', 41),
('長崎県', 42),
('熊本県', 43),
('大分県', 44),
('宮崎県', 45),
('鹿児島県', 46),
('沖縄県', 47);

-- trainersテーブルの修正（area列をFKに変更）
-- まず既存テーブルのarea列を削除
ALTER TABLE trainers DROP COLUMN area;

-- 新しくarea_idを追加（FKとして）
ALTER TABLE trainers ADD COLUMN area_id INTEGER REFERENCES areas(id);

-- インデックスも追加しておく（検索パフォーマンス向上）
CREATE INDEX idx_trainers_area_id ON trainers(area_id);

-- RLS (Row Level Security) ポリシーの設定
-- 誰でも読み取り可能に設定
ALTER TABLE areas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON areas
    FOR SELECT
    USING (true);

-- 認証ユーザーのみ更新可能に設定（シンプルな権限設定）
CREATE POLICY "Enable insert/update for authenticated users" ON areas
    FOR ALL
    TO authenticated
    USING (true);
