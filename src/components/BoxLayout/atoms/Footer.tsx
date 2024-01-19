import { css } from '@emotion/react';
import { visibilityHidden } from '../../../styles/common/display/visibilityHidden';
import { Style } from '../../../types/Style';
import { colors } from '../../../styles/variables/colors';

interface Props {
  label: string;
  value: any;
  customStyle?: Style;
}

export default function Footer({ label, value, customStyle }: Props) {
  return (
    <dl
      css={css(
        {
          position: 'absolute',
          top: '16px',
          right: '16px',
          color: colors.DARK_GRAY,
        },
        customStyle,
      )}
    >
      <dt css={visibilityHidden}>{label}</dt>
      <dd>{value}</dd>
    </dl>
  );
}
