import { NextResponse } from 'next/server';
import { getTrainerPosts } from '../../../../services/trainer/trainerPostService';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: '無効なトレーナーIDです' }, { status: 400 });
    }

    // URLからリミットパラメータを取得（オプション）
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 10;

    // トレーナーの投稿を取得
    const posts = await getTrainerPosts(id, isNaN(limit) ? 10 : limit);
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching trainer posts:', error);
    return NextResponse.json({ error: 'サーバー内部エラー' }, { status: 500 });
  }
}
