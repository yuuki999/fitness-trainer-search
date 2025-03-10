-- 100件のトレーナーデータを追加
-- 既存のシーケンスをリセット（必要に応じて実行）
-- ALTER SEQUENCE trainers_id_seq RESTART WITH 6;

-- 100件のトレーナーデータを追加（ID=6から開始）
INSERT INTO trainers (id, name, profile_img, profile, followers, engagement_rate, area_id) VALUES
-- 6-15
(6, '高橋 実花', 'https://randomuser.me/api/portraits/women/6.jpg', 'クロスフィットトレーナー / 食事管理アドバイザー', 14300, 3.5, (SELECT id FROM areas WHERE name = '東京都')),
(7, '渡辺 美優', 'https://randomuser.me/api/portraits/women/7.jpg', 'ボディビルダー / パーソナルトレーナー', 22100, 4.2, (SELECT id FROM areas WHERE name = '神奈川県')),
(8, '小林 さくら', 'https://randomuser.me/api/portraits/women/8.jpg', 'ヨガインストラクター / マインドフルネス指導者', 18700, 5.3, (SELECT id FROM areas WHERE name = '京都府')),
(9, '加藤 あやか', 'https://randomuser.me/api/portraits/women/9.jpg', 'ランニングコーチ / 栄養士', 11200, 3.1, (SELECT id FROM areas WHERE name = '兵庫県')),
(10, '吉田 ひより', 'https://randomuser.me/api/portraits/women/10.jpg', 'ストレッチ専門トレーナー / 姿勢改善指導', 9500, 4.7, (SELECT id FROM areas WHERE name = '大阪府')),
(11, '山本 真央', 'https://randomuser.me/api/portraits/women/11.jpg', 'エアロビクスインストラクター / ダンストレーナー', 13600, 3.9, (SELECT id FROM areas WHERE name = '愛知県')),
(12, '井上 桜子', 'https://randomuser.me/api/portraits/women/12.jpg', '産後ケア専門トレーナー / ピラティスインストラクター', 10800, 4.8, (SELECT id FROM areas WHERE name = '埼玉県')),
(13, '木村 優花', 'https://randomuser.me/api/portraits/women/13.jpg', 'ウェイトトレーニング指導者 / 姿勢改善指導', 16500, 3.4, (SELECT id FROM areas WHERE name = '千葉県')),
(14, '林 莉子', 'https://randomuser.me/api/portraits/women/14.jpg', 'バレエフィットネス講師 / 柔軟性トレーニング指導', 21300, 4.6, (SELECT id FROM areas WHERE name = '東京都')),
(15, '佐々木 結衣', 'https://randomuser.me/api/portraits/women/15.jpg', 'ファンクショナルトレーニング指導者 / 姿勢改善指導', 8900, 3.8, (SELECT id FROM areas WHERE name = '福岡県')),

-- 16-25
(16, '山田 杏奈', 'https://randomuser.me/api/portraits/women/16.jpg', 'マラソンコーチ / ランニングフォーム指導', 17200, 2.9, (SELECT id FROM areas WHERE name = '北海道')),
(17, '岡田 美咲', 'https://randomuser.me/api/portraits/women/17.jpg', 'プロボクサー / ボクササイズトレーナー', 26400, 5.2, (SELECT id FROM areas WHERE name = '大阪府')),
(18, '後藤 あおい', 'https://randomuser.me/api/portraits/women/18.jpg', 'ボディメイクトレーナー / 減量指導スペシャリスト', 19800, 4.1, (SELECT id FROM areas WHERE name = '神奈川県')),
(19, '田村 香織', 'https://randomuser.me/api/portraits/women/19.jpg', 'ピラティスインストラクター / 姿勢改善専門家', 12700, 3.6, (SELECT id FROM areas WHERE name = '東京都')),
(20, '佐野 真由子', 'https://randomuser.me/api/portraits/women/20.jpg', 'キックボクシングトレーナー / 体幹トレーニング指導', 15400, 4.3, (SELECT id FROM areas WHERE name = '愛知県')),
(21, '杉山 はるか', 'https://randomuser.me/api/portraits/women/21.jpg', 'ヨガ講師 / 瞑想指導者', 11900, 5.0, (SELECT id FROM areas WHERE name = '京都府')),
(22, '村上 美優', 'https://randomuser.me/api/portraits/women/22.jpg', 'クロスフィットコーチ / 機能改善トレーナー', 23500, 3.7, (SELECT id FROM areas WHERE name = '埼玉県')),
(23, '中村 愛', 'https://randomuser.me/api/portraits/women/23.jpg', 'ボディメイクスペシャリスト / 減量コーチ', 18200, 4.5, (SELECT id FROM areas WHERE name = '福岡県')),
(24, '小川 さくら', 'https://randomuser.me/api/portraits/women/24.jpg', 'ダンストレーナー / リズミカルエクササイズ講師', 20100, 3.2, (SELECT id FROM areas WHERE name = '広島県')),
(25, '今井 千夏', 'https://randomuser.me/api/portraits/women/25.jpg', 'マタニティフィットネス指導者 / 産後ケアトレーナー', 9800, 4.9, (SELECT id FROM areas WHERE name = '千葉県')),

-- 26-35
(26, '長谷川 麻美', 'https://randomuser.me/api/portraits/women/26.jpg', 'バレエピラティス講師 / 姿勢改善指導', 14700, 3.8, (SELECT id FROM areas WHERE name = '東京都')),
(27, '斎藤 詩織', 'https://randomuser.me/api/portraits/women/27.jpg', 'TRXトレーナー / サーキットトレーニング指導', 16800, 4.2, (SELECT id FROM areas WHERE name = '大阪府')),
(28, '川上 美穂', 'https://randomuser.me/api/portraits/women/28.jpg', 'ウェイトリフティングコーチ / 筋力トレーニング指導', 25700, 3.5, (SELECT id FROM areas WHERE name = '北海道')),
(29, '藤本 亜美', 'https://randomuser.me/api/portraits/women/29.jpg', 'エアロビクスインストラクター / 有酸素運動指導', 13100, 4.6, (SELECT id FROM areas WHERE name = '熊本県')),
(30, '原田 優奈', 'https://randomuser.me/api/portraits/women/30.jpg', 'ストレッチ専門トレーナー / 柔軟性改善指導', 10500, 5.1, (SELECT id FROM areas WHERE name = '愛知県')),
(31, '鈴木 萌', 'https://randomuser.me/api/portraits/women/31.jpg', 'ファンクショナルトレーニング指導 / 体幹強化スペシャリスト', 19200, 3.9, (SELECT id FROM areas WHERE name = '神奈川県')),
(32, '西村 春香', 'https://randomuser.me/api/portraits/women/32.jpg', 'ランニングトレーナー / マラソンコーチ', 12200, 3.3, (SELECT id FROM areas WHERE name = '東京都')),
(33, '清水 真希', 'https://randomuser.me/api/portraits/women/33.jpg', 'ボクササイズインストラクター / 有酸素運動指導', 17500, 4.4, (SELECT id FROM areas WHERE name = '京都府')),
(34, '中島 彩花', 'https://randomuser.me/api/portraits/women/34.jpg', 'HIIT指導者 / インターバルトレーニングコーチ', 21600, 3.6, (SELECT id FROM areas WHERE name = '埼玉県')),
(35, '高木 莉子', 'https://randomuser.me/api/portraits/women/35.jpg', 'ズンバインストラクター / ラテンダンスフィットネス', 16300, 4.7, (SELECT id FROM areas WHERE name = '大阪府')),

-- 36-45
(36, '石田 愛子', 'https://randomuser.me/api/portraits/women/36.jpg', 'シニアフィットネス指導者 / リハビリテーショントレーナー', 8300, 4.0, (SELECT id FROM areas WHERE name = '奈良県')),
(37, '松本 杏奈', 'https://randomuser.me/api/portraits/women/37.jpg', 'トライアスロンコーチ / 持久力向上スペシャリスト', 24800, 3.4, (SELECT id FROM areas WHERE name = '千葉県')),
(38, '井上 麻衣', 'https://randomuser.me/api/portraits/women/38.jpg', 'ポールダンスインストラクター / 上半身強化指導', 22300, 5.3, (SELECT id FROM areas WHERE name = '東京都')),
(39, '佐藤 葵', 'https://randomuser.me/api/portraits/women/39.jpg', 'ビーチボディトレーナー / 減量スペシャリスト', 27100, 4.6, (SELECT id FROM areas WHERE name = '福岡県')),
(40, '三浦 さゆり', 'https://randomuser.me/api/portraits/women/40.jpg', 'ホットヨガインストラクター / 柔軟性向上指導', 18900, 3.8, (SELECT id FROM areas WHERE name = '広島県')),
(41, '中山 裕子', 'https://randomuser.me/api/portraits/women/41.jpg', 'リフォーマーピラティス指導者 / コア強化トレーナー', 16700, 4.5, (SELECT id FROM areas WHERE name = '神奈川県')),
(42, '川村 智美', 'https://randomuser.me/api/portraits/women/42.jpg', 'サーフィンフィットネスコーチ / バランストレーニング指導', 14900, 3.7, (SELECT id FROM areas WHERE name = '千葉県')),
(43, '小島 美咲', 'https://randomuser.me/api/portraits/women/43.jpg', 'ボルダリングトレーナー / 懸垂力向上指導', 21200, 4.2, (SELECT id FROM areas WHERE name = '東京都')),
(44, '池田 遥', 'https://randomuser.me/api/portraits/women/44.jpg', 'バレトンインストラクター / バレエフィットネス指導', 17300, 5.0, (SELECT id FROM areas WHERE name = '京都府')),
(45, '前田 千尋', 'https://randomuser.me/api/portraits/women/45.jpg', 'ケトルベルトレーナー / 筋力向上スペシャリスト', 19600, 3.9, (SELECT id FROM areas WHERE name = '兵庫県')),

-- 46-55
(46, '森 美優', 'https://randomuser.me/api/portraits/women/46.jpg', 'アクアフィットネス指導者 / 水中トレーニングコーチ', 11700, 4.3, (SELECT id FROM areas WHERE name = '大阪府')),
(47, '青木 愛美', 'https://randomuser.me/api/portraits/women/47.jpg', 'スピンバイクインストラクター / 脂肪燃焼指導', 15800, 3.5, (SELECT id FROM areas WHERE name = '福岡県')),
(48, '藤田 奈々', 'https://randomuser.me/api/portraits/women/48.jpg', 'バトルロープトレーナー / HIIT指導者', 23200, 4.1, (SELECT id FROM areas WHERE name = '愛知県')),
(49, '坂本 真由子', 'https://randomuser.me/api/portraits/women/49.jpg', 'ペアストレッチインストラクター / 柔軟性向上指導', 13400, 4.8, (SELECT id FROM areas WHERE name = '北海道')),
(50, '内田 優花', 'https://randomuser.me/api/portraits/women/50.jpg', 'サスペンショントレーニング指導者 / コア強化コーチ', 18300, 3.6, (SELECT id FROM areas WHERE name = '広島県')),
(51, '金子 彩花', 'https://randomuser.me/api/portraits/women/51.jpg', 'タバタトレーニング指導者 / 短時間高強度コーチ', 20900, 4.4, (SELECT id FROM areas WHERE name = '東京都')),
(52, '松田 莉子', 'https://randomuser.me/api/portraits/women/52.jpg', 'アニマルフローインストラクター / 機能改善トレーナー', 16100, 5.2, (SELECT id FROM areas WHERE name = '神奈川県')),
(53, '野口 真希', 'https://randomuser.me/api/portraits/women/53.jpg', 'スラックラインコーチ / バランストレーニング指導', 14600, 3.7, (SELECT id FROM areas WHERE name = '埼玉県')),
(54, '石川 杏子', 'https://randomuser.me/api/portraits/women/54.jpg', 'エスクリマフィットネス指導者 / 格闘技トレーニング', 25400, 4.0, (SELECT id FROM areas WHERE name = '千葉県')),
(55, '市川 優奈', 'https://randomuser.me/api/portraits/women/55.jpg', 'スロートレーニングスペシャリスト / 関節強化コーチ', 12900, 4.5, (SELECT id FROM areas WHERE name = '大阪府')),

-- 56-65
(56, '酒井 美穂', 'https://randomuser.me/api/portraits/women/56.jpg', 'リズムボクシングインストラクター / 有酸素運動指導', 17900, 3.8, (SELECT id FROM areas WHERE name = '京都府')),
(57, '大塚 さくら', 'https://randomuser.me/api/portraits/women/57.jpg', 'ファスティングトレーナー / 健康的減量指導', 22600, 4.9, (SELECT id FROM areas WHERE name = '福岡県')),
(58, '松井 千夏', 'https://randomuser.me/api/portraits/women/58.jpg', 'ミニトランポリンフィットネス指導 / 低衝撃有酸素運動', 13800, 3.3, (SELECT id FROM areas WHERE name = '東京都')),
(59, '小西 麻衣', 'https://randomuser.me/api/portraits/women/59.jpg', 'ジャイロキネシスインストラクター / 関節可動域向上', 19200, 4.7, (SELECT id FROM areas WHERE name = '愛知県')),
(60, '上田 葵', 'https://randomuser.me/api/portraits/women/60.jpg', 'フィギュアロビクス指導者 / 美しい姿勢作り', 15600, 4.2, (SELECT id FROM areas WHERE name = '兵庫県')),
(61, '中野 智子', 'https://randomuser.me/api/portraits/women/61.jpg', 'バランスボールトレーナー / 体幹強化指導', 12500, 3.6, (SELECT id FROM areas WHERE name = '北海道')),
(62, '福田 由美', 'https://randomuser.me/api/portraits/women/62.jpg', 'メディシンボールトレーナー / ファンクショナルトレーニング', 18700, 4.3, (SELECT id FROM areas WHERE name = '神奈川県')),
(63, '橋本 明日香', 'https://randomuser.me/api/portraits/women/63.jpg', 'レジスタンスバンドエクスパート / 自重トレーニング', 15200, 3.8, (SELECT id FROM areas WHERE name = '東京都')),
(64, '安藤 美月', 'https://randomuser.me/api/portraits/women/64.jpg', 'ファンクショナルムーブメント指導者 / 身体機能向上', 21300, 4.1, (SELECT id FROM areas WHERE name = '大阪府')),
(65, '近藤 菜々子', 'https://randomuser.me/api/portraits/women/65.jpg', 'ピラティスリフォーマー講師 / コアトレーニング', 19800, 4.9, (SELECT id FROM areas WHERE name = '埼玉県')),

-- 66-75
(66, '竹内 結衣', 'https://randomuser.me/api/portraits/women/66.jpg', 'フレックスバートレーナー / 多関節運動指導', 14300, 3.5, (SELECT id FROM areas WHERE name = '福岡県')),
(67, '関 友香', 'https://randomuser.me/api/portraits/women/67.jpg', 'ファンクショナルトレーニング指導者 / 姿勢改善', 22900, 4.7, (SELECT id FROM areas WHERE name = '愛知県')),
(68, '藤井 美優', 'https://randomuser.me/api/portraits/women/68.jpg', 'バーオソルピラティス講師 / 身体調整', 16400, 3.9, (SELECT id FROM areas WHERE name = '千葉県')),
(69, '岩崎 桃子', 'https://randomuser.me/api/portraits/women/69.jpg', 'レジスタンストレーニング指導 / 筋力アップ', 20100, 4.2, (SELECT id FROM areas WHERE name = '京都府')),
(70, '服部 莉子', 'https://randomuser.me/api/portraits/women/70.jpg', 'コアコンディショニング講師 / 体幹強化', 11800, 5.0, (SELECT id FROM areas WHERE name = '東京都')),
(71, '岡本 明美', 'https://randomuser.me/api/portraits/women/71.jpg', 'ヒップホップダンストレーナー / リズムトレーニング', 24600, 3.7, (SELECT id FROM areas WHERE name = '広島県')),
(72, '山下 さやか', 'https://randomuser.me/api/portraits/women/72.jpg', 'ビーチフィットネス指導者 / 全身持久力向上', 17300, 4.4, (SELECT id FROM areas WHERE name = '神奈川県')),
(73, '本田 彩夏', 'https://randomuser.me/api/portraits/women/73.jpg', 'スイングヨガ指導者 / 空中ヨガトレーナー', 15800, 4.8, (SELECT id FROM areas WHERE name = '大阪府')),
(74, '前川 由奈', 'https://randomuser.me/api/portraits/women/74.jpg', 'ファンクショナルムーブメント指導 / 日常動作改善', 13400, 3.3, (SELECT id FROM areas WHERE name = '兵庫県')),
(75, '村田 涼子', 'https://randomuser.me/api/portraits/women/75.jpg', 'クライミングフィットネス指導 / 上半身強化', 26100, 4.5, (SELECT id FROM areas WHERE name = '福岡県')),

-- 76-85
(76, '山内 裕美子', 'https://randomuser.me/api/portraits/women/76.jpg', 'リハビリテーションピラティス / 機能回復トレーニング', 9800, 4.1, (SELECT id FROM areas WHERE name = '埼玉県')),
(77, '島田 純子', 'https://randomuser.me/api/portraits/women/77.jpg', 'スプリントトレーナー / 瞬発力向上指導', 21700, 3.6, (SELECT id FROM areas WHERE name = '東京都')),
(78, '広瀬 千尋', 'https://randomuser.me/api/portraits/women/78.jpg', 'コレオグラフィーエクササイズ / ダンスフィットネス', 18200, 4.3, (SELECT id FROM areas WHERE name = '北海道')),
(79, '横山 亜希', 'https://randomuser.me/api/portraits/women/79.jpg', 'バレエコンディショニング / 姿勢改善指導', 14900, 5.2, (SELECT id FROM areas WHERE name = '京都府')),
(80, '荒木 真理', 'https://randomuser.me/api/portraits/women/80.jpg', 'マルチ関節トレーニング講師 / 全身調整', 20500, 3.9, (SELECT id FROM areas WHERE name = '愛知県')),
(81, '谷口 美波', 'https://randomuser.me/api/portraits/women/81.jpg', 'ファンクショナルムーブメント指導 / 効率的な動作', 16300, 4.5, (SELECT id FROM areas WHERE name = '千葉県')),
(82, '内藤 綾香', 'https://randomuser.me/api/portraits/women/82.jpg', 'ボディウェイトマスター / 自重トレーニング指導', 19700, 3.4, (SELECT id FROM areas WHERE name = '大阪府')),
(83, '菅原 はるか', 'https://randomuser.me/api/portraits/women/83.jpg', 'ダンスベースコンディショニング / リズミカル筋トレ', 22300, 4.7, (SELECT id FROM areas WHERE name = '神奈川県')),
(84, '大西 志保', 'https://randomuser.me/api/portraits/women/84.jpg', 'ストレッチポールインストラクター / 筋膜リリース', 13700, 3.8, (SELECT id FROM areas WHERE name = '広島県')),
(85, '西田 夏希', 'https://randomuser.me/api/portraits/women/85.jpg', '陸上競技トレーナー / スプリント指導', 25900, 4.2, (SELECT id FROM areas WHERE name = '東京都')),

-- 86-95
(86, '吉川 優美', 'https://randomuser.me/api/portraits/women/86.jpg', 'アスレチックコンディショニング / アジリティ向上', 16800, 3.7, (SELECT id FROM areas WHERE name = '福岡県')),
(87, '野村 明日香', 'https://randomuser.me/api/portraits/women/87.jpg', 'フォームローラーエキスパート / セルフマッサージ指導', 12400, 4.9, (SELECT id FROM areas WHERE name = '埼玉県')),
(88, '河野 彩香', 'https://randomuser.me/api/portraits/women/88.jpg', 'フットワークトレーナー / リアクションスピード向上', 23100, 3.5, (SELECT id FROM areas WHERE name = '兵庫県')),
(89, '中西 美穂', 'https://randomuser.me/api/portraits/women/89.jpg', 'シェイプボクシング講師 / ボクササイズ指導', 17600, 4.3, (SELECT id FROM areas WHERE name = '北海道')),
(90, '武田 梨花', 'https://randomuser.me/api/portraits/women/90.jpg', 'コーディネーション指導 / 運動神経向上トレーニング', 15200, 3.8, (SELECT id FROM areas WHERE name = '愛知県')),
(91, '上野 美咲', 'https://randomuser.me/api/portraits/women/91.jpg', 'クロストレーニング指導者 / オールラウンド強化', 21800, 4.6, (SELECT id FROM areas WHERE name = '京都府')),
(92, '平野 朋美', 'https://randomuser.me/api/portraits/women/92.jpg', 'ハンマーストレングストレーナー / 機能的筋力向上', 19300, 3.9, (SELECT id FROM areas WHERE name = '東京都')),
(93, '飯田 奈緒', 'https://randomuser.me/api/portraits/women/93.jpg', 'コアアクティベーション指導 / 体幹安定化', 14700, 5.1, (SELECT id FROM areas WHERE name = '大阪府')),
(94, '宮本 香織', 'https://randomuser.me/api/portraits/women/94.jpg', 'スピードアジリティトレーナー / 瞬発力強化', 24500, 3.7, (SELECT id FROM areas WHERE name = '千葉県')),
(95, '原 彩乃', 'https://randomuser.me/api/portraits/women/95.jpg', 'バランストレーニングスペシャリスト / 姿勢制御', 11900, 4.4, (SELECT id FROM areas WHERE name = '神奈川県')),

-- 96-105
(96, '松岡 由紀', 'https://randomuser.me/api/portraits/women/96.jpg', 'ボディコンポジション指導 / 体組成改善', 18500, 3.6, (SELECT id FROM areas WHERE name = '広島県')),
(97, '榎本 麻里', 'https://randomuser.me/api/portraits/women/97.jpg', 'スライドボードトレーナー / ラテラル強化', 16200, 4.8, (SELECT id FROM areas WHERE name = '福岡県')),
(98, '菊池 真帆', 'https://randomuser.me/api/portraits/women/98.jpg', 'ブロックトレーニング指導 / 周期的トレーニング', 22700, 3.9, (SELECT id FROM areas WHERE name = '埼玉県')),
(99, '中谷 愛美', 'https://randomuser.me/api/portraits/women/99.jpg', 'ニュートリションコーチ / 栄養指導スペシャリスト', 15900, 4.5, (SELECT id FROM areas WHERE name = '東京都')),
(100, '小泉 知世', 'https://randomuser.me/api/portraits/women/100.jpg', 'フロートレーニングマスター / 体幹制御トレーニング', 19800, 3.7, (SELECT id FROM areas WHERE name = '大阪府'));

-- 各トレーナーのSNSデータを追加 (Instagram, YouTube, TikTokをランダムに設定)
-- トレーナーID 6-105に対してSNSを設定

-- Instagram (ほぼ全員が持っている想定)
INSERT INTO trainer_sns (trainer_id, sns_type)
SELECT id, 'Instagram' FROM trainers WHERE id BETWEEN 6 AND 100;

-- YouTube (約半数が持っている想定)
INSERT INTO trainer_sns (trainer_id, sns_type)
SELECT id, 'YouTube' FROM trainers WHERE id BETWEEN 6 AND 105 AND id % 2 = 0;

-- TikTok (約3分の1が持っている想定)
INSERT INTO trainer_sns (trainer_id, sns_type)
SELECT id, 'TikTok' FROM trainers WHERE id BETWEEN 6 AND 105 AND id % 3 = 0;
