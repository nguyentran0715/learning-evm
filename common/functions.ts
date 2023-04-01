export const formatAddress = (address: string, length = 6) => {
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};
