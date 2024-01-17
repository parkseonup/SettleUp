import { colors } from '../../../styles/variables/colors';
import { visibilityHidden } from '../../../styles/common/display/visibilityHidden';
import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function Option({ children, ...props }: Props) {
  return (
    <label>
      <input type="checkbox" css={visibilityHidden} {...props} />
      <span
        css={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '32px',
          padding: '0 16px',
          fontSize: '14px',
          color: colors.DARK_GRAY,
          textAlign: 'center',
          backgroundColor: colors.WHITE,
          border: `1px solid ${colors.LIGHT_GRAY}`,
          borderRadius: '100px',
          cursor: 'pointer',

          'input:focus  + &, input:active  + &': {
            borderColor: colors.DARK_GRAY,
          },

          'input:checked + &': {
            color: colors.WHITE,
            backgroundColor: colors.BLACK,
            borderColor: colors.BLACK,
          },
        }}
      >
        {children}
      </span>
    </label>
  );
}
