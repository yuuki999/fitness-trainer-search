import { supabase } from '../supabase/client';
import { Trainer, TrainerRecord, SnsAccount } from '../../types';
import { formatTrainerData } from './trainerUtils';

/**
 * トレーナーの詳細情報とSNSアカウント情報を取得する
 */
export const getTrainerDetail = async (id: number): Promise<Trainer | null> => {
  try {
    const { data, error } = await supabase
      .from('trainers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;

    const formattedTrainer = await formatTrainerData([data as TrainerRecord]);
    return formattedTrainer[0] || null;
  } catch (error) {
    console.error(`Failed to fetch trainer details with ID ${id}:`, error);
    throw error;
  }
};

/**
 * トレーナーのSNSアカウント情報を取得する
 */
export const getTrainerSnsAccounts = async (trainerId: number): Promise<SnsAccount[]> => {
  try {
    const { data, error } = await supabase
      .from('trainer_sns')
      .select('sns_type')
      .eq('trainer_id', trainerId);

    if (error) throw error;

    // SNSデータから実際のアカウント情報を生成
    // 注: ここでは実際のusernameデータがないため、仮のユーザー名を設定
    return (data || []).map(item => ({
      type: item.sns_type as any, // 適切な型変換が必要
      username: `${item.sns_type.toLowerCase()}_user_${trainerId}` // 実際のデータに合わせて変更
    }));
  } catch (error) {
    console.error(`Failed to fetch SNS accounts for trainer with ID ${trainerId}:`, error);
    return [];
  }
};
