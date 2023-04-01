import TokenBalance from '@/components/TokenBalance';
import useGlobalStore from '@/stores/useGlobalStore';

const HomePage = () => {
  const { isWalletConnected } = useGlobalStore();
  return <>{isWalletConnected && <TokenBalance />}</>;
};

export default HomePage;
