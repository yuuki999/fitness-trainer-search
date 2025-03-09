import { supabase } from '../supabase/client';
import { Trainer, TrainerRecord, SnsRecord, PostRecord } from '../../types';

/**
 * トレーナーデータの形式変換関数
 */
export const formatTrainerData = async (trainers: TrainerRecord[]): Promise<Trainer[]> => {
  const formattedTrainers: Trainer[] = [];

  for (const trainer of trainers) {
    // SNSタイプを取得
    const { data: snsData } = await supabase
      .from('trainer_sns')
      .select('sns_type')
      .eq('trainer_id', trainer.id);

    const sns = (snsData as SnsRecord[] | null)?.map(item => item.sns_type) || [];

    // 最近の投稿を取得
    const { data: postsData } = await supabase
      .from('trainer_posts')
      .select('image_url')
      .eq('trainer_id', trainer.id)
      .order('posted_at', { ascending: false })
      .limit(4);

    const recentPosts = (postsData as PostRecord[] | null)?.map(post => post.image_url) || [];

    formattedTrainers.push({
      id: trainer.id,
      name: trainer.name,
      profileImg: trainer.profile_img || '',
      sns,
      profile: trainer.profile || '',
      followers: trainer.followers,
      engagementRate: trainer.engagement_rate,
      area: trainer.area || '',
      recentPosts
    });
  }

  return formattedTrainers;
};
