import { Button } from '@chakra-ui/react';

import { formatAddress } from '@/common/functions';
import useConnectWallet from '@/hooks/useConnectWallet';

const ConnectWallet = () => {
  const { activeWallet, handleConnectWallet } = useConnectWallet();

  return (
    <Button onClick={handleConnectWallet}>
      {activeWallet ? formatAddress(activeWallet) : 'Connect Wallet'}
    </Button>
  );
};

export default ConnectWallet;
