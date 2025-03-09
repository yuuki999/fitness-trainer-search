import { supabase } from '../supabase/client';
import { TrainerPost, PostRecord } from '../../types';

/**
 * トレーナーの投稿を取得する
 * @param trainerId トレーナーID
 * @param limit 取得する投稿の最大数
 */
export const getTrainerPosts = async (trainerId: number, limit = 10): Promise<TrainerPost[]> => {
  try {
    const { data, error } = await supabase
      .from('trainer_posts')
      .select('id, trainer_id, image_url, posted_at')
      .eq('trainer_id', trainerId)
      .order('posted_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return (data as PostRecord[]).map(post => ({
      id: post.id,
      trainerId: post.trainer_id,
      imageUrl: post.image_url,
      postedAt: post.posted_at
    }));
  } catch (error) {
    console.error(`Failed to fetch posts for trainer with ID ${trainerId}:`, error);
    throw error;
  }
};

/**
 * トレーナーの最新の投稿を取得する（サムネイル用）
 * @param trainerId トレーナーID
 * @param limit 取得する投稿の最大数
 */
export const getTrainerRecentPostImages = async (trainerId: number, limit = 4): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('trainer_posts')
      .select('image_url')
      .eq('trainer_id', trainerId)
      .order('posted_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return (data as { image_url: string }[]).map(post => post.image_url);
  } catch (error) {
    console.error(`Failed to fetch post images for trainer with ID ${trainerId}:`, error);
    return [];
  }
};
