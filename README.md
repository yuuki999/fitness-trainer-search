## Supabase CLI初期設定
下記を参考にinstall
[pnpm install -g supabase](https://supabase.com/docs/guides/local-development/cli/getting-started#updating-the-supabase-cli)

プロジェクトの初期化
```
supabase init
```
Supabaseにログイン
```
supabase login
```

Supabaseプロジェクトにリンク
```
supabase link --project-ref tiehokjlugmvrleyeifp
```

## マイグレーションのやり方

ローカル開発環境を起動
```
supabase start
```

※エラーになる場合は下記を実行
エラー内容
```
failed to pull docker image: Error response from daemon: pull access denied for public.ecr.aws/supabase/postgres, repository does not exist or may require 'docker login': denied: Your authorization token has expired. Reauthenticate and try again.
```
```
docker logout public.ecr.aws
```

エラー内容
```
failed to start docker container: Error response from daemon: driver failed programming external connectivity on endpoint supabase_db_fitness-trainer-search (0a54b69b2e0c643f3fd4297e5436151a4d83048d5256d42f3802b40bf665dea4): Bind for 0.0.0.0:54322 failed: port is already allocated
```
```
すでに同じポートで起動しているdockerイメージを削除して再度supabase start。
docker ps -a | grep supabase
docker stop bfa7a5673bc0 cea21c98754e
docker rm bfa7a5673bc0 cea21c98754e
```

マイグレーションファイルの作成
```
supabase migration new create_trainers_tables // テーブル定義例
supabase migration new seed_trainers_data // シード例
```

マイグレーションの実行
```
supabase migration up
```

大体Studio URLは下記になるので、ここでデータ状況を確認する。
```
http://127.0.0.1:54323
```
