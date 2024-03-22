import { InputHTMLAttributes, KeyboardEvent } from 'react';
import { css } from '@emotion/react';
import { Style } from '../../../types/Style';
import { colors } from '../../../styles/variables/colors';
import { separateComma } from '../../../utils/separateComma';
import { visibilityHidden } from '../../../styles/common/displays';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  amount: number;
  insideStyle?: Style;
}

export default function AmountInput({ amount, insideStyle, ...props }: Props) {
  const preventKeydown = (e: KeyboardEvent) => {
    const metaKeys = [
      'Backspace',
      'Control',
      'Meta',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
      'ArrowLeft',
      'Shift',
      'Tab',
    ];
    const availableKeys = [...metaKeys, ...Array.from({ length: 10 }, (_, i) => `${i}`)];

    if (
      !availableKeys.includes(e.key) ||
      ((e.target as HTMLInputElement).value.length > 6 && !metaKeys.includes(e.key))
    ) {
      e.preventDefault();
      return;
    }
  };

  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '4px',
      }}
    >
      <div
        css={{
          position: 'relative',
          flexGrow: 1,
        }}
      >
        <label htmlFor={props.id} css={visibilityHidden}>
          금액
        </label>
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
      </div>

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
