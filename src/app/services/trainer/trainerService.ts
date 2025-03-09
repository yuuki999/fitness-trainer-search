import { supabase } from '../supabase/client';
import { Trainer, TrainerRecord, Filters } from '../../types';
import { formatTrainerData } from './trainerUtils';

/**
 * すべてのトレーナーデータを取得する
 */
export const getTrainers = async (filters?: Partial<Filters>): Promise<Trainer[]> => {
  try {
    let query = supabase
      .from('trainers')
      .select('*');

    // フィルター適用
    if (filters) {
      if (filters.followers !== undefined) {
        query = query.gte('followers', filters.followers);
      }
      
      if (filters.engagementRate !== undefined) {
        query = query.gte('engagement_rate', filters.engagementRate);
      }
      
      if (filters.area && filters.area !== '') {
        query = query.eq('area', filters.area);
      }
    }

    const { data, error } = await query;

    if (error) throw error;

    return await formatTrainerData(data as TrainerRecord[] || []);
  } catch (error) {
    console.error('Error fetching trainers:', error);
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
