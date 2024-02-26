import { InputHTMLAttributes, KeyboardEvent, useState } from 'react';
import { css } from '@emotion/react';
import { Style } from '../../../types/Style';
import { colors } from '../../../styles/variables/colors';
import { separateComma } from '../../../utils/separateComma';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  amount: number;
  insideStyle?: Style;
}

export default function AmountInput({ amount, insideStyle, ...props }: Props) {
  const [isActive, setIsActive] = useState(false);

  const preventKeydown = (e: KeyboardEvent) => {
    if (
      ['e', 'E', '+', '-'].includes(e.key) ||
      ((e.target as HTMLInputElement).value.length > 6 &&
        Array.from({ length: 10 }, (_, i) => `${i}`).includes(e.key))
    )
      e.preventDefault();
  };

  return (
    <div
      css={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '4px',
        backgroundColor: isActive ? colors.LIGHT_GRAY : 'transparent',
      }}
    >
      <input
        type="number"
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          color: 'transparent',

          '&::selection, &:focus': {
            backgroundColor: 'transparent',
          },
        }}
        value={amount || ''}
        onKeyDown={preventKeydown}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        {...props}
      />
      <p
        css={css(
          {
            width: '100%',
            fontSize: '12px',
            color: amount ? colors.DARK_GRAY : colors.LIGHT_GRAY,
            textAlign: 'right',
            pointerEvents: 'none',
          },
          insideStyle,
        )}
      >
        {separateComma(amount)}
      </p>
      <p
        css={css(
          {
            fontSize: '12px',
            color: amount ? colors.DARK_GRAY : colors.LIGHT_GRAY,
            textAlign: 'right',
            pointerEvents: 'none',
          },
          insideStyle,
        )}
      >
        원
      </p>
    </div>
  );
}
