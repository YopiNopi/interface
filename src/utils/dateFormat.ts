export const formatTimeRemaining = (timestamp: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const diff = timestamp - now;

  if (diff < 0) return 'Ended';

  const days = Math.floor(diff / (24 * 60 * 60));
  const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((diff % (60 * 60)) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
} 