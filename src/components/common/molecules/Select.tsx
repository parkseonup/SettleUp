import { BiChevronRight } from 'react-icons/bi';
import { InputHTMLAttributes, useState } from 'react';
import { colors } from '../../../styles/variables/colors';
import InputField from '../../InputField/molecules/InputField';
import Dropdown from '../../Dropdown/molecules/Dropdown';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
  options: string[];
  setValue: (value: Props['value']) => void;
}

export default function Select({ label, value, options, setValue }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: Props['value']) => {
    setValue(value);
    setIsOpen(false);
  };

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dropdown.Trigger>
        <InputField
          label={label}
          isActive={isOpen}
          controlAs={
            <BiChevronRight
              css={{
                fontSize: '16px',
                color: isOpen ? colors.DARK_GRAY : colors.LIGHT_GRAY,
              }}
            />
          }
        >
          <InputField.Input
            isActive={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            value={value}
            css={{ textAlign: 'center' }}
            readOnly
          />
        </InputField>
      </Dropdown.Trigger>

      <Dropdown.Modal>
        {options.map((option) => (
          <button
            type="button"
            key={option}
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
        ))}
      </Dropdown.Modal>
    </Dropdown>
  );
}
