import useGetBalance from '@/hooks/useGetBalance';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';

const TokenBalance = () => {
  const { balance, isLoading, handleGetBalance } = useGetBalance();

  const [address, setAddress] = useState('');

  const handleChangeAddress = (e: any) => setAddress(e.target.value);

  return (
    <Box w='50%'>
      <Flex my={10} gap={4}>
        <Input
          placeholder='Enter token address...'
          onChange={handleChangeAddress}
        />
        <Button isLoading={isLoading} onClick={() => handleGetBalance(address)}>
          Get balance
        </Button>
      </Flex>
      <Text textAlign='center'>{balance > 0 && balance}</Text>
    </Box>
  );
};

export default TokenBalance;
