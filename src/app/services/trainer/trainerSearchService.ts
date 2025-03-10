import { supabase } from '../supabase/client';
import { Trainer, TrainerRecord, Filters, SnsType } from '../../types';
import { formatTrainerData } from './trainerUtils';
import { getTrainers } from './trainerService';

/**
 * キーワードでトレーナーを検索
 */
export const searchTrainersByKeyword = async (keyword: string): Promise<Trainer[]> => {
  try {
    if (!keyword.trim()) {
      return getTrainers();
    }
    
    const { data, error } = await supabase
      .from('trainers')
      .select(`
        *,
        area:area_id(id, name)
      `)
      .or(`name.ilike.%${keyword}%,profile.ilike.%${keyword}%`);

    if (error) throw error;

    // エリア情報をフォーマット
    const formattedData = data?.map(trainer => ({
      ...trainer,
      area: trainer.area ? trainer.area.name : null,
      area_id: trainer.area_id
    }));

    return await formatTrainerData(formattedData as TrainerRecord[] || []);
  } catch (error) {
    console.error('Error searching trainers:', error);
    throw error;
  }
};

/**
 * 指定したSNSを持つトレーナーを取得
 */
export const getTrainersBySns = async (snsTypes: string[]): Promise<Trainer[]> => {
  try {
    if (snsTypes.length === 0) {
      return getTrainers();
    }

    // 指定されたSNSを持つトレーナーのIDを取得
    const { data: snsData, error: snsError } = await supabase
      .from('trainer_sns')
      .select('trainer_id')
      .in('sns_type', snsTypes);

    if (snsError) throw snsError;

    if (!snsData || snsData.length === 0) {
      return [];
    }

    // 重複を排除したトレーナーIDのリスト
    const trainerIds = [...new Set(snsData.map(item => item.trainer_id as number))];

    // トレーナーデータを取得（エリア情報も含める）
    const { data: trainersData, error: trainersError } = await supabase
      .from('trainers')
      .select(`
        *,
        area:area_id(id, name)
      `)
      .in('id', trainerIds);

    if (trainersError) throw trainersError;

    // エリア情報をフォーマット
    const formattedData = trainersData?.map(trainer => ({
      ...trainer,
      area: trainer.area ? trainer.area.name : null,
      area_id: trainer.area_id
    }));

    return await formatTrainerData(formattedData as TrainerRecord[] || []);
  } catch (error) {
    console.error('Error fetching trainers by SNS:', error);
    throw error;
  }
};

/**
 * 複数の条件でトレーナーを検索
 */
export const searchTrainersComplex = async (
  keyword?: string,
  snsTypes?: SnsType[],
  filters?: Partial<Filters>
): Promise<Trainer[]> => {
  try {
    // キーワードがある場合のトレーナー検索
    let trainers: Trainer[] = [];
    
    if (keyword && keyword.trim() !== '') {
      trainers = await searchTrainersByKeyword(keyword);
    } else {
      // フィルターによるトレーナー検索
      let query = supabase
        .from('trainers')
        .select(`
          *,
          area:area_id(id, name)
        `);
      
      if (filters) {
        if (filters.followers !== undefined) {
          query = query.gte('followers', filters.followers);
        }
        
        if (filters.engagementRate !== undefined) {
          query = query.gte('engagement_rate', filters.engagementRate);
        }
        
        if (filters.area_id !== undefined && filters.area_id !== null) {
          query = query.eq('area_id', filters.area_id);
        }
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      // エリア情報をフォーマット
      const formattedData = data?.map(trainer => ({
        ...trainer,
        area: trainer.area ? trainer.area.name : null,
        area_id: trainer.area_id
      }));
      
      trainers = await formatTrainerData(formattedData as TrainerRecord[] || []);
    }
    
    // SNSフィルタリング
    if (snsTypes && snsTypes.length > 0) {
      const snsByTrainers = await getTrainersBySns(snsTypes);
      const snsByTrainerIds = snsByTrainers.map(t => t.id);
      
      // 両方の結果の交差
      trainers = trainers.filter(trainer => snsByTrainerIds.includes(trainer.id));
    }
    
    return trainers;
  } catch (error) {
    console.error('Error in complex search:', error);
    throw error;
  }
};
