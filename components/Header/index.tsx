import { Box, Button, Container, Flex } from '@chakra-ui/react';
import React from 'react';
import ConnectWallet from '../ConnectWallet';
import Link from 'next/link';

const navList = [
  {
    label: 'Wallet',
    href: '/wallet',
  },
  {
    label: 'Transfer',
    href: '/transfer',
  },
];

const Header = () => {
  return (
    <Box p='4'>
      <Container maxW='container.xl'>
        <Flex justifyContent='space-between' alignItems='center'>
          <Link href='/'>Kakarot</Link>

          <Flex alignItems='center' gap='4'>
            {navList.map(item => (
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </Flex>

          <ConnectWallet />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
