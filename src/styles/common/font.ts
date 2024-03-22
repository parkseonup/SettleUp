import { colors } from '../variables/colors';

const titleBasic = {
  fontWeight: 600,
  color: colors.BLACK,
};

export const title = {
  900: {
    ...titleBasic,
    fontSize: '24px',
  },
  500: {
    ...titleBasic,
    fontSize: '20px',
  },
  200: {
    ...titleBasic,
    fontSize: '16px',
  },
  100: {
    ...titleBasic,
    fontSize: '15px',
  },
  50: {
    ...titleBasic,
    fontSize: '14px',
  },
};
