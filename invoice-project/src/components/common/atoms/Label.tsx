import { css } from '@emotion/react';
import { LabelHTMLAttributes, ReactNode } from 'react';
import { colors } from '../../../styles/variables/colors';
import { visibilityHidden } from '../../../styles/common/display/visibilityHidden';

interface Props {
  htmlFor?: LabelHTMLAttributes<HTMLLabelElement>['htmlFor'];
  attributes?: Omit<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>;
  children?: ReactNode;
  showLabel?: boolean;
}

export default function Label({ htmlFor, attributes, children, showLabel = true }: Props) {
  return (
    <label
      htmlFor={htmlFor}
      {...attributes}
      css={css(
        {
          position: 'absolute',
          top: '50%',
          left: '16px',
          fontSize: '14px',
          color: colors.LIGHT_GRAY,
          transform: 'translateY(-50%)',
        },
        showLabel ? null : visibilityHidden,
      )}
    >
      {children}
    </label>
  );
}
