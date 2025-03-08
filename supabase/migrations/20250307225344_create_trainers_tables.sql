-- Create trainers table
CREATE TABLE trainers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    profile_img TEXT NOT NULL,
    profile TEXT NOT NULL,
    followers INTEGER NOT NULL,
    engagement_rate DECIMAL(5,2) NOT NULL,
    area TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trainer_sns table
CREATE TABLE trainer_sns (
    id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(id) ON DELETE CASCADE,
    sns_type TEXT NOT NULL, -- 'Instagram', 'YouTube', 'TikTok'
    UNIQUE(trainer_id, sns_type)
);

-- Create trainer_posts table
CREATE TABLE trainer_posts (
    id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
