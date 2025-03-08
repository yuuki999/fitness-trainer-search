// src/app/api/trainers/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabaseクライアントの初期化
const supabaseUrl = process.env.SUPABASE_URL || 'http://localhost:54321';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';
const supabase = createClient(supabaseUrl, supabaseKey);

// トレーナーデータの形式変換関数
const formatTrainerData = async (trainers: any[]) => {
  const formattedTrainers = [];

  for (const trainer of trainers) {
    // SNSタイプを取得
    const { data: snsData } = await supabase
      .from('trainer_sns')
      .select('sns_type')
      .eq('trainer_id', trainer.id);

    const sns = snsData?.map(item => item.sns_type) || [];

    // 最近の投稿を取得
    const { data: postsData } = await supabase
      .from('trainer_posts')
      .select('image_url')
      .eq('trainer_id', trainer.id)
      .order('posted_at', { ascending: false })
      .limit(4);

    const recentPosts = postsData?.map(post => post.image_url) || [];

    formattedTrainers.push({
      id: trainer.id,
      name: trainer.name,
      profileImg: trainer.profile_img,
      sns,
      profile: trainer.profile,
      followers: trainer.followers,
      engagementRate: trainer.engagement_rate,
      area: trainer.area,
      recentPosts
    });
  }

  return formattedTrainers;
};

export async function GET(request: NextRequest) {
  try {
    // URLからクエリパラメータを取得
    const { searchParams } = new URL(request.url);
    
    // パラメータを取得
    const followers = searchParams.get('followers');
    const engagementRate = searchParams.get('engagementRate');
    const area = searchParams.get('area');
    const keyword = searchParams.get('keyword');
    const snsParams = searchParams.getAll('sns');

    // 基本クエリ
    let query = supabase.from('trainers').select('*');

    // フォロワー数でフィルタリング
    if (followers && !isNaN(Number(followers))) {
      query = query.gte('followers', Number(followers));
    }

    // エンゲージメント率でフィルタリング
    if (engagementRate && !isNaN(Number(engagementRate))) {
      query = query.gte('engagement_rate', Number(engagementRate));
    }

    // エリアでフィルタリング
    if (area && area !== '') {
      query = query.eq('area', area);
    }

    // キーワード検索
    if (keyword && keyword !== '') {
      query = query.or(`name.ilike.%${keyword}%,profile.ilike.%${keyword}%`);
    }

    // クエリ実行
    const { data, error } = await query;

    if (error) throw error;

    let trainers = await formatTrainerData(data || []);

    // SNSでフィルタリング（必要な場合のみ）
    if (snsParams && snsParams.length > 0) {
      const { data: snsData } = await supabase
        .from('trainer_sns')
        .select('trainer_id')
        .in('sns_type', snsParams);
      
      if (snsData && snsData.length > 0) {
        const snsTrainerIds = [...new Set(snsData.map(item => item.trainer_id))];
        trainers = trainers.filter(trainer => snsTrainerIds.includes(trainer.id));
      } else {
        trainers = [];
      }
    }

    // 結果を返す
    return NextResponse.json(trainers);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
