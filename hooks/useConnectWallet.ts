import { useEffect, useState } from 'react';

const useConnectWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    window.ethereum.on('accountsChanged', (accounts: any[]) => {
      setWallet(accounts[0])
    } )
  }, [])

  const handleConnectWallet = async () => {
    if (wallet) return;

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const activeWallet = accounts[0];

    if (accounts.length) {
      setWallet(activeWallet);
      setIsWalletConnected(true);
    }
  };

  return { wallet, isWalletConnected, handleConnectWallet };
};

export default useConnectWallet;
