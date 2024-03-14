import { colors } from '../variables/colors';

export const defaultButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '48px',
  fontSize: '14px',
  fontWeight: '400',
  borderRadius: '100px',
};

type ButtonsColors = {
  [key in 'default' | 'point' | 'fill' | 'outline' | 'ghost']: {
    color: string;
    backgroundColor: string;
    borderColor: string;
  };
};

const defaultButtonColor = {
  color: colors.BLACK,
  backgroundColor: 'transparent',
  borderColor: colors.LIGHT_GRAY,
};

export const buttonColors: ButtonsColors = {
  default: defaultButtonColor,
  outline: {
    ...defaultButtonColor,
    borderColor: colors.DARK_GRAY,
  },
  ghost: {
    ...defaultButtonColor,
    borderColor: 'transparent',
  },
  point: {
    color: colors.WHITE,
    backgroundColor: colors.POINT,
    borderColor: colors.POINT,
  },
  fill: {
    color: colors.WHITE,
    backgroundColor: colors.BLACK,
    borderColor: colors.BLACK,
  },
};
