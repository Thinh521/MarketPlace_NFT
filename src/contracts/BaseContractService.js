import {ethers} from 'ethers';
import {parseBlockchainError} from '~/utils/errors/blockchainErrors';

export class BaseContractService {
  constructor(abi, address) {
    this.abi = abi;
    this.address = address;
  }

  async _getSigner(walletProvider) {
    const provider = new ethers.BrowserProvider(walletProvider);
    return await provider.getSigner();
  }

  _connect(walletProvider, signer) {
    return new ethers.Contract(this.address, this.abi, signer);
  }

  async sendTx(contractMethod, ...args) {
    try {
      const tx = await contractMethod(...args);
      const receipt = await tx.wait();

      if (!receipt?.status) throw new Error('Transaction reverted');
      return {success: true, txHash: tx.hash};
    } catch (err) {
      throw new Error(parseBlockchainError(err));
    }
  }
}
