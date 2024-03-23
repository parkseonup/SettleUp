import { Payment } from '../apis/data';

export const crackAccountNumber = (
  accountNumber: Payment['bankTransfer']['accountNumber'],
) => {
  return (
    accountNumber.slice(0, 3) +
    accountNumber.slice(3, -1).replace(/./g, '*') +
    accountNumber.at(-1)
  );
};
