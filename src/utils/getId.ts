let count = 0;

export const getId = (type: keyof JSX.IntrinsicElements) => {
  count += 1;

  return `${type}_${count}`;
};
