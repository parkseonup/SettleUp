import { css } from '@emotion/react';
import { LabelHTMLAttributes, ReactNode } from 'react';
import { colors } from '../../../styles/variables/colors';
import { Style } from '../../../types/Style';
import getFilteredProps from '../../../utils/getFilteredProps';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  isActive?: boolean;
  children?: ReactNode;
  customStyle?: Style;
}

export default function Label(props: Props) {
  const filteredProps = getFilteredProps(props, ['isActive', 'children', 'customStyle']);

  return (
    <label
      {...filteredProps}
      css={css(
        {
          position: 'absolute',
          top: '50%',
          left: '16px',
          fontSize: '14px',
          color: props.isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY,
          transform: 'translateY(-50%)',
        },
        props.customStyle,
      )}
    >
      {props.children}
    </label>
  );
}
