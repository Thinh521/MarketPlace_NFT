// Constants
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Vui lòng kết nối ví trước khi tạo NFT',
  IMAGE_REQUIRED: 'Vui lòng chọn ảnh cho NFT',
  INVALID_TOKEN_URI: 'Không thể tạo metadata. Vui lòng thử lại',
  MINT_FAILED: 'Không thể mint NFT. Vui lòng thử lại',
  UPDATE_METADATA_FAILED: 'Không thể cập nhật metadata on-chain',
  NETWORK_ERROR: 'Lỗi kết nối mạng. Vui lòng kiểm tra internet',
  USER_REJECTED: 'Bạn đã từ chối giao dịch',
  INSUFFICIENT_FUNDS: 'Không đủ gas fee để thực hiện giao dịch',
  CONTRACT_ERROR: 'Lỗi smart contract. Vui lòng kiểm tra lại',
  METADATA_FROZEN: 'Metadata đã bị khóa, không thể cập nhật',
  NOT_TOKEN_OWNER: 'Bạn không phải chủ sở hữu NFT này',
  UNKNOWN_ERROR: 'Đã xảy ra lỗi không xác định. Vui lòng thử lại',
};

// Helper Parser
export const parseBlockchainError = error => {
  if (!error) return ERROR_MESSAGES.UNKNOWN_ERROR;

  const errorString = error.toString().toLowerCase();
  const errorMessage = error.message?.toLowerCase() || '';
  const errorReason = error.reason?.toLowerCase() || '';

  // User rejected
  if (
    errorString.includes('user rejected') ||
    errorString.includes('user denied') ||
    errorMessage.includes('user rejected') ||
    errorMessage.includes('user denied') ||
    error.code === 'ACTION_REJECTED' ||
    error.code === 4001
  ) {
    return ERROR_MESSAGES.USER_REJECTED;
  }

  // Insufficient funds
  if (
    errorString.includes('insufficient funds') ||
    errorMessage.includes('insufficient funds') ||
    errorReason.includes('insufficient funds') ||
    error.code === 'INSUFFICIENT_FUNDS'
  ) {
    return ERROR_MESSAGES.INSUFFICIENT_FUNDS;
  }

  // Network error
  if (
    errorString.includes('network') ||
    errorMessage.includes('network') ||
    error.code === 'NETWORK_ERROR' ||
    error.code === 'TIMEOUT'
  ) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  // Metadata frozen
  if (
    errorReason.includes('metadata frozen') ||
    errorMessage.includes('metadata frozen')
  ) {
    return ERROR_MESSAGES.METADATA_FROZEN;
  }

  // Not token owner
  if (
    errorReason.includes('not token owner') ||
    errorMessage.includes('not token owner')
  ) {
    return ERROR_MESSAGES.NOT_TOKEN_OWNER;
  }

  // Contract error (generic)
  if (
    errorReason ||
    error.code === 'CALL_EXCEPTION' ||
    error.code === 'UNPREDICTABLE_GAS_LIMIT'
  ) {
    return `Lỗi contract: ${errorReason || error.message}`;
  }

  return error.reason || error.message || ERROR_MESSAGES.UNKNOWN_ERROR;
};
