import useGlobalStore from '@/stores/useGlobalStore';
import { useEffect, useState } from 'react';

const useConnectWallet = () => {
  const {
    activeWallet,
    setActiveWallet,
    isWalletConnected,
    setIsWalletConnected,
  } = useGlobalStore();

  useEffect(() => {
    window.ethereum.on('accountsChanged', (accounts: any[]) => {
      setActiveWallet(accounts[0])
    } )
  }, [])

  const handleConnectWallet = async () => {
    const currentNetwork = await window.ethereum.chainId;
    const isPolygon = currentNetwork === '0x89';

    if (!isPolygon) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x89' }],
      });
    }

    // if (wallet) return;

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const activeWallet = accounts[0];

    if (accounts.length) {
      setActiveWallet(activeWallet);
      setIsWalletConnected(true);
    }
  };

  return { activeWallet, isWalletConnected, handleConnectWallet };
};

export default useConnectWallet;
