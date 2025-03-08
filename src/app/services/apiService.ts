import { createClient } from '@supabase/supabase-js';
import { Trainer, Filters, SnsType } from '../types';

// Supabaseから返されるトレーナーデータの型定義
interface TrainerRecord {
  id: number;
  name: string;
  profile_img: string | null;
  profile: string | null;
  followers: number;
  engagement_rate: number;
  area: string | null;
}

// SNSデータの型定義
interface SnsRecord {
  sns_type: string;
}

// 投稿データの型定義
interface PostRecord {
  image_url: string;
}

// Supabaseクライアントの初期化
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// トレーナーデータの形式変換関数
const formatTrainerData = async (trainers: TrainerRecord[]): Promise<Trainer[]> => {
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
 * キーワードでトレーナーを検索
 */
export const searchTrainersByKeyword = async (keyword: string): Promise<Trainer[]> => {
  try {
    if (!keyword.trim()) {
      return getTrainers();
    }
    
    const { data, error } = await supabase
      .from('trainers')
      .select('*')
      .or(`name.ilike.%${keyword}%,profile.ilike.%${keyword}%`);

    if (error) throw error;

    return await formatTrainerData(data as TrainerRecord[] || []);
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

    // トレーナーデータを取得
    const { data: trainersData, error: trainersError } = await supabase
      .from('trainers')
      .select('*')
      .in('id', trainerIds);

    if (trainersError) throw trainersError;

    return await formatTrainerData(trainersData as TrainerRecord[] || []);
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
      let query = supabase.from('trainers').select('*');
      
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
      
      trainers = await formatTrainerData(data as TrainerRecord[] || []);
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
