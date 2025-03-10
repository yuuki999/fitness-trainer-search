import { supabase } from '../supabase/client';
import { Trainer, TrainerRecord } from '../../types';
import { formatTrainerData } from './trainerUtils';

/**
 * すべてのトレーナーデータを取得する
 */
export const getTrainers = async (
  page: number = 1,
  itemsPerPage: number = 10
): Promise<{ trainers: Trainer[], total: number }> => {
  try {
    // まず総数を取得
    const { count, error: countError } = await supabase
      .from('trainers')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    // ページネーションの計算
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    // ページ分けされたデータを取得
    const { data, error } = await supabase
      .from('trainers')
      .select(`
        *,
        area:area_id(id, name)
      `)
      .range(from, to);

    if (error) throw error;

    // エリア情報をフォーマット
    const formattedData = data?.map(trainer => ({
      ...trainer,
      area: trainer.area ? trainer.area.name : null,
      area_id: trainer.area_id
    }));

    const formattedTrainers = await formatTrainerData(formattedData as TrainerRecord[] || []);
    
    return {
      trainers: formattedTrainers,
      total: count || 0
    };
  } catch (error) {
    console.error('トレーナーデータの取得エラー:', error);
    throw error;
  }
};

/**
 * 特定のトレーナーを取得する
 */
export const getTrainerById = async (id: number): Promise<Trainer | null> => {
  try {
    const { data, error } = await supabase
      .from('trainers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;

    const formattedTrainers = await formatTrainerData([data as TrainerRecord]);
    return formattedTrainers[0] || null;
  } catch (error) {
    console.error(`Failed to fetch trainer with ID ${id}:`, error);
    throw error;
  }
};
