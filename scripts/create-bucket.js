// Supabaseのストレージバケットを作成するスクリプト
const { createClient } = require('@supabase/supabase-js');

// 環境変数から接続情報を取得
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase環境変数が設定されていません。');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createBucket() {
  try {
    // バケットの存在確認
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      throw listError;
    }
    
    // 既存のバケットをチェック
    const imagesBucket = buckets.find(bucket => bucket.name === 'images');
    
    if (imagesBucket) {
      console.log('「images」バケットは既に存在します。');
    } else {
      // バケットを作成
      const { data, error } = await supabase.storage.createBucket('images', {
        public: true, // パブリックアクセスを許可
      });
      
      if (error) {
        throw error;
      }
      
      console.log('「images」バケットを作成しました:', data);
    }
    
    // バケットポリシーの設定（パブリックアクセスを許可）
    const { error: policyError } = await supabase.storage.from('images').getPublicUrl('');
    
    if (policyError) {
      console.warn('バケットポリシーの確認中にエラーが発生しました:', policyError);
    } else {
      console.log('バケットのパブリックアクセスが設定されています。');
    }
    
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

createBucket();
