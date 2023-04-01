import Header from '@/components/Header';
import { Container } from '@chakra-ui/react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Header />
      <Container maxW='container.xl'>{children}</Container>
    </div>
  );
};

export default MainLayout;
