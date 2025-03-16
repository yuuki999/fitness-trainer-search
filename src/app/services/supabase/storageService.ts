import { supabase } from './client';

// ダミー画像のURL
// ダミー画像はプロフィールと投稿用に分けて用意する
// 例: https://placehold.co/400x400/EAEAEA/AAAAAA?text=No+Image
const DUMMY_PROFILE_IMAGE = 'https://placehold.co/400x400/EAEAEA/AAAAAA?text=No+Profile+Image';
const DUMMY_POST_IMAGE = 'https://placehold.co/600x400/EAEAEA/AAAAAA?text=No+Post+Image';

/**
 * 改行文字や特殊文字を取り除く
 * @param path - パス文字列
 * @returns クリーンアップされたパス
 */
const cleanPath = (path: string): string => {
  if (!path) return '';
  
  // 改行文字を取り除く
  return path.replace(/\n|%0A|%0a/g, '');
};

/**
 * Supabaseのストレージから画像のURLを取得する
 * @param path - ストレージ内の画像パス (例: 'trainer/profile/image.jpg')
 * @param bucket - バケット名 (デフォルト: 'images')
 * @returns 画像の公開URL
 */
export const getImageUrl = (path: string, bucket: string = 'trainer'): string => {
  // パスから改行文字を取り除く
  const cleanedPath = cleanPath(path);
  
  // Supabaseストレージから公開URLを生成
  const { data } = supabase.storage.from(bucket).getPublicUrl(cleanedPath);
  
  return data.publicUrl;
};

/**
 * トレーナーのプロフィール画像URLを取得する
 * @param imageName - 画像ファイル名
 * @param trainerId - トレーナーID
 * @param useDummy - 画像が見つからない場合にダミー画像を使用するかどうか
 * @returns プロフィール画像の公開URL
 */
export const getTrainerProfileImageUrl = (imageName: string, trainerId?: number, useDummy: boolean = true): string => {
  // 画像名が空の場合はダミー画像を返す
  if (!imageName && useDummy) {
    return DUMMY_PROFILE_IMAGE;
  }
  
  // trainerIdが指定されていればパスに含める
  const path = trainerId ? `profile/${trainerId}/${imageName}` : `profile/${imageName}`;
  
  try {
    return getImageUrl(path);
  } catch (error) {
    // エラーが発生した場合、ダミー画像を返す
    console.error('プロフィール画像の取得に失敗しました:', error);
    return useDummy ? DUMMY_PROFILE_IMAGE : '';
  }
};

/**
 * トレーナーの投稿画像URLを取得する
 * @param imageName - 画像ファイル名
 * @param trainerId - トレーナーID
 * @param useDummy - 画像が見つからない場合にダミー画像を使用するかどうか
 * @returns 投稿画像の公開URL
 */
export const getTrainerPostImageUrl = (imageName: string, trainerId?: number, useDummy: boolean = true): string => {
  // 画像名が空の場合はダミー画像を返す
  if (!imageName && useDummy) {
    return DUMMY_POST_IMAGE;
  }
  
  // trainerIdが指定されていればパスに含める
  const path = trainerId ? `post/${trainerId}/${imageName}` : `post/${imageName}`;
  
  try {
    return getImageUrl(path);
  } catch (error) {
    // エラーが発生した場合、ダミー画像を返す
    console.error('投稿画像の取得に失敗しました:', error);
    return useDummy ? DUMMY_POST_IMAGE : '';
  }
};
