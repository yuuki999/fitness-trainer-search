import { Area, AreaOption } from "@/app/types";
import { supabase } from "../supabase/client";

/**
 * エリア一覧を取得する
 */
export const getAreas = async (): Promise<Area[]> => {
  try {
    const { data, error } = await supabase
      .from('areas')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    
    return data as Area[] || [];
  } catch (error) {
    console.error('Error fetching areas:', error);
    throw error;
  }
};

/**
 * IDでエリアを取得
 */
export const getAreaById = async (id: number): Promise<Area | null> => {
  try {
    const { data, error } = await supabase
      .from('areas')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return data as Area || null;
  } catch (error) {
    console.error(`Error fetching area with id ${id}:`, error);
    return null;
  }
};

/**
 * セレクトボックス用のエリアオプション一覧を取得
 */
export const getAreaOptions = async (): Promise<AreaOption[]> => {
  try {
    const areas = await getAreas();
    
    // 「全てのエリア」オプションを先頭に追加
    const options: AreaOption[] = [
      { value: null, label: '全てのエリア' },
      ...areas.map(area => ({
        value: area.id,
        label: area.name
      }))
    ];
    
    return options;
  } catch (error) {
    console.error('Error creating area options:', error);
    throw error;
  }
};

/**
 * エリアIDからエリア名を取得
 */
export const getAreaNameById = async (areaId: number | null): Promise<string | null> => {
  if (areaId === null) return null;
  
  try {
    const { data, error } = await supabase
      .from('areas')
      .select('name')
      .eq('id', areaId)
      .single();
    
    if (error) throw error;
    
    return data?.name || null;
  } catch (error) {
    console.error(`Error fetching area name for ID ${areaId}:`, error);
    return null;
  }
};

/**
 * 地域でグループ化されたエリアオプションを取得
 * 例: 北海道・東北、関東、中部、近畿、中国、四国、九州・沖縄
 */
export const getAreaOptionsByRegion = async (): Promise<Record<string, AreaOption[]>> => {
  const areas = await getAreas();
  
  // 地域マッピング
  const regionMappings: Record<string, number[]> = {
    '北海道・東北': [1, 2, 3, 4, 5, 6, 7],
    '関東': [8, 9, 10, 11, 12, 13, 14],
    '中部': [15, 16, 17, 18, 19, 20, 21, 22, 23],
    '近畿': [24, 25, 26, 27, 28, 29, 30],
    '中国': [31, 32, 33, 34, 35],
    '四国': [36, 37, 38, 39],
    '九州・沖縄': [40, 41, 42, 43, 44, 45, 46, 47]
  };
  
  const result: Record<string, AreaOption[]> = {};
  
  // 地域ごとにエリアをグループ化
  Object.entries(regionMappings).forEach(([region, ids]) => {
    result[region] = areas
      .filter(area => ids.includes(area.id))
      .map(area => ({
        value: area.id,
        label: area.name
      }));
  });
  
  return result;
};
