import { ADDRESS_ZERO, CHAINS_ID } from '@/common/constants';
import erc20ABI from '@/config/abi/erc20';
import useGlobalStore from '@/stores/useGlobalStore';
import { useState } from 'react';
import Web3 from 'web3';

const useTransfer = () => {
  const { activeWallet } = useGlobalStore();

  const [isLoading, setIsLoading] = useState(false);

  const onTransfer = async ({
    recipient,
    amount,
    tokenAddress,
  }: {
    recipient: string;
    amount: string;
    tokenAddress: string;
  }) => {
    setIsLoading(true);

    try {
      const isNativeToken = tokenAddress === ADDRESS_ZERO;
      console.log('useTransfer ~ isNativeToken:', isNativeToken);

      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(erc20ABI as any, tokenAddress);
      const decimals = isNativeToken
        ? 18
        : await contract.methods.decimals().call();
      const amountWei = parseFloat(amount) * Math.pow(10, decimals);

      const txParams = {
        from: activeWallet,
        to: isNativeToken ? recipient : tokenAddress,
        ...(!isNativeToken && {
          data: await contract.methods
            .transfer(recipient, amountWei)
            .encodeABI(),
        }),
        ...(isNativeToken && { value: amountWei.toString(16) }), // convert value to hex, only for native token
      };
      console.log('useTransfer ~ txParams:', txParams);

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [txParams],
      });
      return { isErr: false, data: txHash };
    } catch (err) {
      return { isErr: true, data: err };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, onTransfer };
};

export default useTransfer;
