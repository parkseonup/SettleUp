import { ReactNode, useState } from 'react';
import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';

interface Props {
  children: ReactNode;
}

export default function InputGroup({ children }: Props) {
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
      css={css({
        position: 'relative',
        border: `1px solid ${colors.LIGHT_GRAY}`,
        borderRadius: '100px',

        '&.active': {
          borderColor: colors.DARK_GRAY,
        },
        '&.active label': {
          color: colors.DARK_GRAY,
        },
      })}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </div>
  );
}
