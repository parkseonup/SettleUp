import { colors } from './colors';

const titleBasic = {
  fontWeight: 600,
  color: colors.BLACK,
};

export const title = {
  size900: {
    ...titleBasic,
    fontSize: '24px',
  },
  size500: {
    ...titleBasic,
    fontSize: '20px',
  },
  size200: {
    ...titleBasic,
    fontSize: '16px',
  },
  size100: {
    ...titleBasic,
    fontSize: '15px',
  },
  size50: {
    ...titleBasic,
    fontSize: '14px',
  },
};
