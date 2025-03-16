import { supabase } from '../supabase/client';
import { Trainer, TrainerRecord, SnsRecord, PostRecord } from '../../types';
import { SnsType } from '../../types/sns';
import { getTrainerProfileImageUrl, getTrainerPostImageUrl } from '../supabase/storageService';

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

    const sns = (snsData as SnsRecord[] | null)?.map(item => item.sns_type as SnsType) || [];

    // 最近の投稿を取得
    const { data: postsData } = await supabase
      .from('trainer_posts')
      .select('image_url')
      .eq('trainer_id', trainer.id)
      .order('posted_at', { ascending: false })
      .limit(4);

    // 投稿画像のパスを取得し、改行文字などを削除
    const recentPosts = (postsData as PostRecord[] | null)?.map(post => {
      // 改行文字を削除
      return post.image_url ? post.image_url.replace(/\n|%0A|%0a/g, '') : '';
    }) || [];

    // プロフィール画像のパスから改行文字を削除
    const cleanProfileImg = trainer.profile_img ? trainer.profile_img.replace(/\n|%0A|%0a/g, '') : '';
    
    // プロフィール画像のURLを生成（URLかどうかを判断）
    const profileImgUrl = cleanProfileImg 
      ? (cleanProfileImg.startsWith('http') 
        ? cleanProfileImg 
        : getTrainerProfileImageUrl(cleanProfileImg, trainer.id)) 
      : '';
    
    // 投稿画像のURLを生成（URLかどうかを判断）
    const formattedRecentPosts = recentPosts.map(postImg => {
      if (!postImg) return '';
      return postImg.startsWith('http') ? postImg : getTrainerPostImageUrl(postImg, trainer.id);
    });

    formattedTrainers.push({
      id: trainer.id,
      name: trainer.name,
      profileImg: profileImgUrl,
      sns,
      profile: trainer.profile || '',
      followers: trainer.followers,
      engagementRate: trainer.engagement_rate,
      area: trainer.area || '',
      area_id: trainer.area_id,
      posts: [], // 初期値として空配列を設定
      recentPosts: formattedRecentPosts
    });
  }

  return formattedTrainers;
};
