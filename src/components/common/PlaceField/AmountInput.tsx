import { InputHTMLAttributes, KeyboardEvent } from 'react';
import { css } from '@emotion/react';
import { Style } from '../../../types/Style';
import { colors } from '../../../styles/variables/colors';
import { separateComma } from '../../../utils/separateComma';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  amount: number;
  insideStyle?: Style;
}

export default function AmountInput({ amount, insideStyle, ...props }: Props) {
  const preventKeydown = (e: KeyboardEvent) => {
    const availableKeys = [
      'Backspace',
      'Control',
      'Meta',
      ...Array.from({ length: 10 }, (_, i) => `${i}`),
    ];

    if (!availableKeys.includes(e.key) || (e.target as HTMLInputElement).value.length > 6)
      e.preventDefault();
  };

  return (
    <div
      css={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '4px',
      }}
    >
      <input
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          paddingRight: '16px',
          color: 'transparent',
          textAlign: 'right',
          caretColor: colors.DARK_GRAY,
          appearance: 'none',

          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            margin: 0,
            appearance: 'none',
          },
        }}
        value={amount || ''}
        onKeyDown={preventKeydown}
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
