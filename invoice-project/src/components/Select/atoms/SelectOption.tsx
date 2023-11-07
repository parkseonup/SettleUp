import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Style } from '../../../types/Style';
import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
import getFilteredProps from '../../../utils/getFilteredProps';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  customStyle?: Style;
}

export default function SelectOption(props: Props) {
  const filteredProps = getFilteredProps(props, ['children', 'customStyle']);

  return (
    <button
      {...filteredProps}
      css={css(
        {
          width: '100%',
          minHeight: '32px',
          padding: '8px 4px',
          fontSize: '14px',
          color: colors.DARK_GRAY,

          '&:hover': {
            backgroundColor: colors.BG_GRAY,
          },
        },
        props.customStyle,
      )}
    >
      {props.children}
    </button>
  );
}
