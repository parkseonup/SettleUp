import { BiChevronRight } from 'react-icons/bi';
import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import { colors } from '../../../styles/variables/colors';
import InputField from '../../InputField/molecules/InputField';
import Dropdown from '../../Dropdown/molecules/Dropdown';
import { getId } from '../../../utils/getId';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
  options: string[];
  setValue: (value: Props['value']) => void;
}

export default forwardRef(function Select(
  { label, value, options, setValue, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const id = props.id ?? getId('input');
  const handleSelect = (value: Props['value']) => {
    setValue(value);
  };

  return (
    <Dropdown
      css={{
        cursor: 'pointer',
      }}
    >
      <Dropdown.Trigger>
        {({ isActive }) => (
          <InputField isActive={isActive}>
            <InputField.Label htmlFor={id}>{label}</InputField.Label>
            <InputField.Input
              id={id}
              ref={ref}
              value={value}
              css={{
                textAlign: 'center',
                cursor: 'pointer',
              }}
              readOnly
            />
            <InputField.Slot css={{ pointerEvents: 'none' }}>
              <BiChevronRight
                css={{
                  fontSize: '16px',
                  color: colors.LIGHT_GRAY,
                }}
              />
            </InputField.Slot>
          </InputField>
        )}
      </Dropdown.Trigger>

      <Dropdown.Portal>
        {options.map((option) => (
          <Dropdown.Close key={option}>
            <button
              type="button"
              onClick={() => handleSelect(option)}
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '8px',
                fontSize: '14px',
                color: colors.DARK_GRAY,
                backgroundColor: 'transparent',
                borderRadius: '4px',

                '&:hover': {
                  backgroundColor: colors.BG_GRAY,
                },
              }}
            >
              {option}
            </button>
          </Dropdown.Close>
        ))}
      </Dropdown.Portal>
    </Dropdown>
  );
});
