import ConnectWallet from '@/components/ConnectWallet';
import TokenBalance from '@/components/TokenBalance';
import useConnectWallet from '@/hooks/useConnectWallet';

const HomePage = () => {
  const { isWalletConnected, wallet, handleConnectWallet } = useConnectWallet();

  return (
    <>
      <ConnectWallet wallet={wallet} onConnectWallet={handleConnectWallet} />
      {isWalletConnected && <TokenBalance />}
    </>
  );
};

export default HomePage;
