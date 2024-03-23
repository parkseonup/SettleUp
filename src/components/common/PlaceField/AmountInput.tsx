import { ChangeEvent, InputHTMLAttributes, KeyboardEvent } from 'react';
import { css } from '@emotion/react';
import { Style } from '../../../types/Style';
import { colors } from '../../../styles/variables/colors';
import { separateComma } from '../../../utils/separateComma';
import { visibilityHidden } from '../../../styles/common/displays';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  amount: number;
  insideStyle?: Style;
  onChange: (value: number) => void;
}

export default function AmountInput({ amount, insideStyle, onChange, ...props }: Props) {
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
      ((e.target as HTMLInputElement).value.length > 7 && !metaKeys.includes(e.key))
    ) {
      e.preventDefault();
      return;
    }
  };

  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(+e.target.value.replace(/,/g, ''));
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
          type="text"
          inputMode="numeric"
          pattern="[0-9,]*"
          value={separateComma(amount) || ''}
          onKeyDown={preventKeydown}
          onChange={_onChange}
          css={{
            width: '100%',
            height: '100%',
            textAlign: 'right',
            caretColor: colors.DARK_GRAY,
            appearance: 'none',

            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
              margin: 0,
              appearance: 'none',
            },
          }}
          {...props}
        />
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
