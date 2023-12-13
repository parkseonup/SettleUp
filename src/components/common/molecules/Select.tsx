import { BiChevronRight } from 'react-icons/bi';
import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import { colors } from '../../../styles/variables/colors';
import InputField from '../../InputField/molecules/InputField';
import Dropdown from '../../Dropdown/molecules/Dropdown';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
  options: string[];
  setValue: (value: Props['value']) => void;
}

export default forwardRef(function Select(
  { label, value, options, setValue }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const handleSelect = (value: Props['value']) => {
    setValue(value);
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>
        {({ isActive, setIsActive }) => {
          return (
            <InputField
              label={label}
              isActive={isActive}
              controlAs={
                <BiChevronRight
                  css={{
                    fontSize: '16px',
                    color: isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY,
                  }}
                />
              }
            >
              <InputField.Input
                ref={ref}
                isActive={isActive}
                onClick={() => setIsActive(!isActive)}
                value={value}
                css={{ textAlign: 'center' }}
                readOnly
              />
            </InputField>
          );
        }}
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
