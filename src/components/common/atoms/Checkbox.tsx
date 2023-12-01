import { Style } from '../../../types/Style';
import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
import { visibilityHidden } from '../../../styles/common/display/visibilityHidden';
import { InputHTMLAttributes } from 'react';

interface Props {
  label: string;
  checked: InputHTMLAttributes<HTMLInputElement>['checked'];
  customStyle?: Style;
}

export default function Checkbox({ label, checked, customStyle }: Props) {
  return (
    <label>
      <input type="checkbox" value={label} checked={checked} css={css(visibilityHidden)} />
      <span
        css={css(
          {
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

            'input:checked + &': {
              color: colors.WHITE,
              backgroundColor: colors.BLACK,
              borderColor: colors.BLACK,
            },
          },
          customStyle,
        )}
      >
        {label}
      </span>
    </label>
  );
}
