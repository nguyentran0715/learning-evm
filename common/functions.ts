import { BN } from "bn.js";

export const formatAddress = (address: string, length = 6) => {
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export const convertWeiToBalance = (amount: string, decimal: number) => {
  return parseInt(amount) / 10 ** decimal;
};

export const hexToDecimal = (hex: string, toString: boolean) => {
  const decimal = parseInt(hex, 16);

  return toString ? decimal.toString() : decimal;
};


// export const decimalToHex = (decimal: string) => {
//   const parsedValue = new BN(decimal).add(new BN(Math))
// }