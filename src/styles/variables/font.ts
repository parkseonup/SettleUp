import { colors } from './colors';

const titleBasic = {
  fontWeight: 600,
  color: colors.BLACK,
};

export const title = {
  size90: {
    ...titleBasic,
    fontSize: '24px',
  },
  size50: {
    ...titleBasic,
    fontSize: '20px',
  },
  size10: {
    ...titleBasic,
    fontSize: '15px',
  },
};
