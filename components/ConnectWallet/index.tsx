import { Button } from '@chakra-ui/react';

const ConnectWallet = ({ wallet, onConnectWallet }: any) => {
  return (
    <Button onClick={onConnectWallet}>
      {wallet ? wallet : 'Connect Wallet'}
    </Button>
  );
};

export default ConnectWallet;
