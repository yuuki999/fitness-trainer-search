/**
 * SNSタイプとユーザー名からSNSのURLを生成する
 * @param type SNSタイプ
 * @param username ユーザー名
 * @returns SNSのURL
 */
export const getSnsUrl = (type: string, username: string): string => {
  switch (type.toLowerCase()) {
    case 'instagram':
      return `https://instagram.com/${username}`;
    case 'youtube':
      return `https://youtube.com/${username}`;
    case 'tiktok':
      return `https://tiktok.com/@${username}`;
    default:
      return '#';
  }
};
