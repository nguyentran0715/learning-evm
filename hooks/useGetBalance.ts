import { useEffect, useState } from 'react';
import Web3 from 'web3';
import erc20ABI from '@/config/abi/erc20';
import useGlobalStore from '@/stores/useGlobalStore';

const useGetBalance = () => {
  const { activeWallet } = useGlobalStore();

  const getBalance = async (tokenAddress: string) => {
    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(erc20ABI as any, tokenAddress);
      const balanceWei = await contract.methods.balanceOf(activeWallet).call();
      const decimals = await contract.methods.decimals().call();
      const balance = balanceWei / 10**decimals;

      return balance;
    } catch (err) {
      return 0;
    }
  };

  return { getBalance };
};

export default useGetBalance;
