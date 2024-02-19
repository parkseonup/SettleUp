export const substract = (minuend: number, subtrahends: number[]) => {
  return subtrahends.reduce((remainder, subtrahend) => {
    remainder -= subtrahend;
    return remainder;
  }, minuend);
};
