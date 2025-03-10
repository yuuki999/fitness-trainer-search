import React from 'react';

// SNSアイコンのプロップスインターフェース
interface SnsIconProps {
  type: string;
  url?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 共通のSNSアイコンコンポーネント
 * @param type SNSタイプ ('Instagram', 'YouTube', 'TikTok', 'X')
 * @param url リンク先URL (指定した場合はaタグで囲む)
 * @param size アイコンサイズ ('sm'|'md'|'lg')
 */
const SnsIcon: React.FC<SnsIconProps> = ({ 
  type, 
  url, 
  size = 'md'
}) => {
  // サイズに応じたクラス
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  // コンテナサイズに応じたクラス
  const containerSizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  // SNSタイプに応じた色クラス
  const getColorClass = (type: string): string => {
    switch(type.toLowerCase()) {
      case 'instagram':
        return 'text-pink-500 hover:text-pink-600';
      case 'youtube':
        return 'text-red-600 hover:text-red-700';
      case 'tiktok':
      case 'x':
        return 'text-gray-800 hover:text-black';
      default:
        return 'text-gray-500 hover:text-gray-700';
    }
  };

  const colorClass = getColorClass(type);

  // アイコン形式を取得
  const getIcon = () => {
    const iconClass = sizeClasses[size];
    
    switch (type.toLowerCase()) {
      case 'instagram':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`${iconClass} fill-current`}>
            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className={`${iconClass} fill-current`}>
            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
          </svg>
        );
      case 'tiktok':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`${iconClass} fill-current`}>
            <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
          </svg>
        );
      case 'x':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`${iconClass} fill-current`}>
            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  // コンテンツを生成
  const content = getIcon();

  // URLが指定されている場合はリンク付きで表示
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center ${containerSizeClasses[size]} bg-gray-100 rounded-full hover:bg-gray-200 transition-colors ${colorClass}`}
      >
        {content}
      </a>
    );
  }

  // URLが指定されていない場合は単純に表示
  return (
    <div className={`flex items-center justify-center ${containerSizeClasses[size]} bg-gray-100 rounded-full ${colorClass}`}>
      {content}
    </div>
  );
};

export default SnsIcon;
