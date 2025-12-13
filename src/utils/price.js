// Parse ETH an toàn
export const parseEthPrice = price => {
  const value = parseFloat(price || 0);
  return isNaN(value) ? 0 : value;
};

// Convert ETH → USD (mặc định 2500$/ETH)
export const ethToUsd = (ethPrice, usdRate = 2500) => {
  const eth = parseEthPrice(ethPrice);
  return (eth * usdRate).toFixed(2);
};

// Format ETH với số chữ số thập phân mong muốn
export const formatEth = price => {
  const eth = parseEthPrice(price);
  return eth;
};

// Format USD đẹp kiểu $1,234.56
export const formatUsd = value => {
  const num = Number(value) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
};
