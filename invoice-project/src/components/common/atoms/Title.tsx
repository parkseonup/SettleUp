import { ElementType, ReactNode } from 'react';
import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
import { Style } from '../../../types/Style';

interface Props {
  as: ElementType;
  children: ReactNode;
  customStyle?: Style;
}

export default function Title({ as: Title, children, customStyle }: Props) {
  const style = css(
    {
      fontWeight: 500,
      color: colors.BLACK,
    },
    customStyle,
  );
  const cssProp = typeof Title === 'function' ? { customStyle: style } : { css: style };

  return <Title {...cssProp}>{children}</Title>;
}
