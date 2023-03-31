import { useEffect, useState } from 'react';
import Web3 from 'web3';
import erc20ABI from '@/config/abi/erc20';

const useGetBalance = () => {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetBalance = async (tokenAddress: string) => {
    setIsLoading(true);

    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(erc20ABI as any, tokenAddress);
    const balance = await contract.methods
      .balanceOf('0xe3aD2397D73D32724358650115c7a67e85d1c218')
      .call();
    setBalance(balance);
    setIsLoading(false);
  };

  return { isLoading, balance, handleGetBalance };
};

export default useGetBalance;
