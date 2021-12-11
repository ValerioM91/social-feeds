const relativeTimestamps = (date) => {
  const postDateTime = new Date(date).getTime();
  const now = new Date().getTime();

  const relativeTime = (now - postDateTime) / 60000; // minutes

  if (relativeTime < 1) return 'Just Now';

  if (1 <= relativeTime && relativeTime < 60) return Math.floor(relativeTime) + ' minutes ago';

  if (60 <= relativeTime && relativeTime < 120) return '1 hour ago';

  if (120 <= relativeTime && relativeTime < 60 * 24)
    return Math.floor(relativeTime / 60) + ' hours ago';

  if (60 * 24 <= relativeTime && relativeTime < 60 * 24 * 2) return '1 day ago';

  if (60 * 24 * 2 <= relativeTime && relativeTime < 60 * 24 * 7)
    return Math.floor(relativeTime / (60 * 24)) + ' days ago';

  if (60 * 24 * 7 <= relativeTime && relativeTime < 60 * 24 * 7 * 2) return '1 week ago';

  if (60 * 24 * 7 * 2 <= relativeTime && relativeTime < 60 * 24 * 7 * 52)
    return Math.floor(relativeTime / (60 * 24 * 7)) + ' weeks ago';

  if (60 * 24 * 7 * 52 <= relativeTime && relativeTime < 60 * 24 * 7 * 52 * 2) return '1 year ago';

  return Math.floor(relativeTime / (60 * 24 * 7 * 52)) + ' years ago';
};

export default relativeTimestamps;
