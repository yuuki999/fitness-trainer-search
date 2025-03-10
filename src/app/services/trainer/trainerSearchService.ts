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
      const result = await getTrainers();
      return result.trainers;
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
      const result = await getTrainers();
      return result.trainers;
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
  filters?: Partial<Filters>,
  page: number = 1,
  itemsPerPage: number = 10
): Promise<{ trainers: Trainer[], total: number }> => {
  try {
    // ベースクエリのセットアップ
    let query = supabase
      .from('trainers')
      .select(`
        *,
        area:area_id(id, name)
      `, { count: 'exact' });
    
    // フィルターの追加
    if (keyword && keyword.trim() !== '') {
      query = query.or(`name.ilike.%${keyword}%,profile.ilike.%${keyword}%`);
    }
    
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

    // まず総数を取得
    // const { count: totalCount } = await query;
    
    // ページネーションの計算
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;
    
    // ページ分けされたクエリを実行
    const { data, error, count } = await query.range(from, to);
    
    if (error) throw error;
    
    // トレーナーデータのフォーマット
    const formattedData = data?.map(trainer => ({
      ...trainer,
      area: trainer.area ? trainer.area.name : null,
      area_id: trainer.area_id
    }));
    
    let trainers = await formatTrainerData(formattedData as TrainerRecord[] || []);
    
    // 必要に応じてSNSフィルタリングを適用
    if (snsTypes && snsTypes.length > 0) {
      // 指定されたSNSタイプを持つトレーナーを取得
      const { data: snsData } = await supabase
        .from('trainer_sns')
        .select('trainer_id')
        .in('sns_type', snsTypes);
      
      if (snsData && snsData.length > 0) {
        const trainerIdsWithSns = [...new Set(snsData.map(item => item.trainer_id))];
        trainers = trainers.filter(trainer => trainerIdsWithSns.includes(trainer.id));
      } else {
        trainers = [];
      }
    }
    
    return {
      trainers: trainers,
      total: count || 0
    };
  } catch (error) {
    console.error('複合検索エラー:', error);
    throw error;
  }
};
