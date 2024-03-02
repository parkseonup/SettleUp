// 뺄셈
export const substractNumbers = (minuend: number, subtrahends: number[]) => {
  return subtrahends.reduce((remainder, subtrahend) => {
    remainder -= subtrahend;
    return remainder;
  }, minuend);
};

// 1의 자리 반올림
export const ceilToTen = (number: number) => Math.ceil(number / 10) * 10;
