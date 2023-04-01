import { create } from 'zustand';

interface GlobalState {
  activeWallet: string;
  isWalletConnected: boolean;
  setActiveWallet: (address: string) => void;
  setIsWalletConnected: (status: boolean) => void;
}

const useGlobalStore = create<GlobalState>(set => ({
  // getter
  activeWallet: '',
  isWalletConnected: false,
  // setter
  setActiveWallet: (address) => set(() => ({ activeWallet: address })),
  setIsWalletConnected: (status) => set(() => ({ isWalletConnected: status })),
}));

export default useGlobalStore;
