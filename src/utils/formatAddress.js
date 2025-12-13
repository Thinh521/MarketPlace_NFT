export const formatAddress = addr => {
  if (!addr) return '';
  return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
};
