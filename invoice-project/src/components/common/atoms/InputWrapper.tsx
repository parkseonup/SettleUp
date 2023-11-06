import { ReactNode, useState } from 'react';
import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
import { Style } from '../../../types/Style';

interface Props {
  children: ReactNode;
  style?: Style;
}

export default function InputWrapper({ children, style }: Props) {
  const [isActive, setIsActive] = useState(false);

  const onFocus = ({ target }: { target: HTMLElement }) => {
    if (target.tagName === 'INPUT') setIsActive(true);
  };

  const onBlur = ({ target }: { target: HTMLElement }) => {
    if (target.tagName === 'INPUT') setIsActive(false);
  };

  return (
    <div
      className={isActive ? 'active' : ''}
      css={css(
        {
          position: 'relative',
          height: '40px',
          border: `1px solid ${colors.LIGHT_GRAY}`,
          borderRadius: '100px',
          overflow: 'hidden',

          '&.active': {
            borderColor: colors.DARK_GRAY,
          },
          '&.active label': {
            color: colors.DARK_GRAY,
          },
        },
        style,
      )}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </div>
  );
}
