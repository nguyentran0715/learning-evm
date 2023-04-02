import { useEffect, useState } from 'react';
import Web3 from 'web3';
import erc20ABI from '@/config/abi/erc20';
import useGlobalStore from '@/stores/useGlobalStore';
import { ADDRESS_ZERO } from '@/common/constants';
import { convertWeiToBalance, hexToDecimal } from '@/common/functions';

const useGetBalance = () => {
  const { activeWallet } = useGlobalStore();

  const getBalance = async (tokenAddress: string) => {
    try {
      let balance = 0;

      if (tokenAddress === ADDRESS_ZERO) {
        const res = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [activeWallet],
        });
        balance = convertWeiToBalance(hexToDecimal(res, true) as string, 18);

      } else {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(erc20ABI as any, tokenAddress);
        const balanceWei = await contract.methods.balanceOf(activeWallet).call();
        const decimals = await contract.methods.decimals().call();
        balance = convertWeiToBalance(balanceWei, decimals);
      }

      return balance;
    } catch (err) {
      return 0;
    }
  };

  return { getBalance };
};

export default useGetBalance;
