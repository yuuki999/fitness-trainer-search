import { Trainer, TrainerRecord, SnsAccount, TrainerPost, PostRecord } from '@/app/types';
import { supabase } from '../supabase/client';
import { formatTrainerData } from './trainerUtils';

/**
 * トレーナー詳細情報を取得する
 */
export const getTrainerDetail = async (id: number): Promise<Trainer | null> => {
  try {
    // トレーナー情報取得（エリア情報も結合して取得）
    const { data, error } = await supabase
      .from('trainers')
      .select(`
        *,
        area:area_id(id, name)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    if (!data) return null;
    
    // エリア情報をフォーマット
    const formattedData = {
      ...data,
      area: data.area ? data.area.name : null,
      area_id: data.area_id
    };
    
    // トレーナー情報をフォーマット
    const trainers = await formatTrainerData([formattedData] as TrainerRecord[]);
    return trainers[0] || null;
    
  } catch (error) {
    console.error(`Error fetching trainer details for ID ${id}:`, error);
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
      .select('*')
      .eq('trainer_id', trainerId);
    
    if (error) throw error;
    
    // SNSアカウント情報をフォーマット
    return (data || []).map(sns => ({
      id: sns.id,
      type: sns.sns_type,
      username: sns.username || '' // usernameカラムが存在する場合
    }));
    
  } catch (error) {
    console.error(`Error fetching SNS accounts for trainer ID ${trainerId}:`, error);
    throw error;
  }
};
