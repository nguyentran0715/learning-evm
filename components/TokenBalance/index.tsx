import { LIST_TOKENS } from '@/common/constants';
import useGetBalance from '@/hooks/useGetBalance';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const TokenBalance = () => {
  const { balance, isLoading, getBalance } = useGetBalance();
  const [tokenList, setTokenList] = useState<any[]>([]);
  console.log("TokenBalance ~ tokenList:", tokenList);

  useEffect(() => {
    handleGetBalances();
  }, [])

  const handleGetBalances = async () => {
    const newTokenList = await Promise.all(
      LIST_TOKENS.map(async token => ({
        ...token,
        balance: await getBalance(token.address),
      }))
    );
    setTokenList(newTokenList);
  };

  return (
    <Box w='50%'>
      {tokenList.map(token => (
        <div key={token.id}>{token.symbol} {token.balance}</div>
      ))}
      {/* <Flex my={10} gap={4}>
        <Input
          placeholder='Enter token address...'
          onChange={handleChangeAddress}
        />
        <Button isLoading={isLoading} onClick={() => handleGetBalance(address)}>
          Get balance
        </Button>
      </Flex>
      <Text textAlign='center'>{balance > 0 && balance}</Text> */}
    </Box>
  );
};

export default TokenBalance;
