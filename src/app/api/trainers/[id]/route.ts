import { getTrainerDetail, getTrainerSnsAccounts } from '@/app/services';
import { NextResponse } from 'next/server';


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: '無効なトレーナーIDです' }, { status: 400 });
    }

    // トレーナー詳細を取得
    const trainer = await getTrainerDetail(id);
    
    if (!trainer) {
      return NextResponse.json({ error: 'トレーナーが見つかりません' }, { status: 404 });
    }

    // SNSアカウント情報を取得して追加
    const snsAccounts = await getTrainerSnsAccounts(id);

    return NextResponse.json({
      ...trainer,
      snsAccounts
    });
  } catch (error) {
    console.error('Error fetching trainer:', error);
    return NextResponse.json({ error: 'サーバー内部エラー' }, { status: 500 });
  }
}
