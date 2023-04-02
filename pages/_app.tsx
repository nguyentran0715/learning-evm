import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// styles
import '@/styles/globals.css';

// toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// components
import MainLayout from '@/layouts/MainLayout';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
      <ToastContainer position='top-center' theme='dark'/>
    </ChakraProvider>
  );
}
