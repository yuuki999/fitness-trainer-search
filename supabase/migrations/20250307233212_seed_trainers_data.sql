-- Insert trainers data
INSERT INTO trainers (name, profile_img, profile, followers, engagement_rate, area_id) VALUES
('佐藤 美咲', 'https://randomuser.me/api/portraits/women/1.jpg', 'ヨガインストラクター / パーソナルトレーナー / 食事管理士', 12500, 3.2, (SELECT id FROM areas WHERE name = '東京都')),
('田中 愛子', 'https://randomuser.me/api/portraits/women/2.jpg', 'ピラティスインストラクター / ダイエットコーチ / 栄養士', 8700, 4.5, (SELECT id FROM areas WHERE name = '大阪府')),
('鈴木 香織', 'https://randomuser.me/api/portraits/women/3.jpg', '筋トレスペシャリスト / ボディメイクトレーナー', 15300, 2.8, (SELECT id FROM areas WHERE name = '福岡県')),
('山田 千尋', 'https://randomuser.me/api/portraits/women/4.jpg', 'ダンスインストラクター / フィットネスモデル', 25800, 5.1, (SELECT id FROM areas WHERE name = '愛知県')),
('伊藤 理恵', 'https://randomuser.me/api/portraits/women/5.jpg', 'パーソナルトレーナー / 食事管理士', 7800, 3.7, (SELECT id FROM areas WHERE name = '北海道'));


-- Insert SNS data
INSERT INTO trainer_sns (trainer_id, sns_type) VALUES
(1, 'Instagram'),
(1, 'TikTok'),
(2, 'Instagram'),
(2, 'YouTube'),
(3, 'Instagram'),
(4, 'Instagram'),
(4, 'TikTok'),
(4, 'YouTube'),
(5, 'Instagram');

-- Insert posts data for trainer 1
INSERT INTO trainer_posts (trainer_id, image_url) VALUES
(1, 'https://randomuser.me/api/portraits/women/10.jpg'),
(1, 'https://randomuser.me/api/portraits/women/11.jpg'),
(1, 'https://randomuser.me/api/portraits/women/12.jpg'),
(1, 'https://randomuser.me/api/portraits/women/13.jpg');

-- Insert posts data for trainer 2
INSERT INTO trainer_posts (trainer_id, image_url) VALUES
(2, 'https://randomuser.me/api/portraits/women/20.jpg'),
(2, 'https://randomuser.me/api/portraits/women/21.jpg'),
(2, 'https://randomuser.me/api/portraits/women/22.jpg'),
(2, 'https://randomuser.me/api/portraits/women/23.jpg');
