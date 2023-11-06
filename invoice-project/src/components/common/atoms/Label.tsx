import { css } from '@emotion/react';
import { LabelHTMLAttributes, ReactNode } from 'react';
import { colors } from '../../../styles/variables/colors';
import { visibilityHidden } from '../../../styles/common/display/visibilityHidden';
import { Style } from '../../../types/Style';
import getFilteredProps from '../../../utils/getFilteredProps';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode;
  showLabel?: boolean;
  customStyle?: Style;
}

export default function Label(props: Props) {
  const filteredProps = getFilteredProps(props, ['children', 'showLabel', 'customStyle']);
  const showLabel = props.showLabel === undefined || props.showLabel ? null : visibilityHidden;

  return (
    <label
      {...filteredProps}
      css={css(
        {
          position: 'absolute',
          top: '50%',
          left: '16px',
          fontSize: '14px',
          color: colors.LIGHT_GRAY,
          transform: 'translateY(-50%)',
        },
        showLabel,
        props.customStyle,
      )}
    >
      {props.children}
    </label>
  );
}
