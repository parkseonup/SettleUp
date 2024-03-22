import AddOptionInput from './AddOptionInput';
import { ReactNode } from 'react';
import Content from './Content';
import { MultiSelectContext } from './MultiSelectContext';
import { colors } from '../../../styles/variables/colors';
import Title from '../Title';

interface Props {
  title: string;
  summary?: string | number | null;
  required?: boolean;
  children?: ReactNode;
}

export default function MultiSelect({
  title,
  summary,
  required = false,
  children,
}: Props) {
  return (
    <MultiSelectContext.Provider value={{ required }}>
      <div
        css={{
          position: 'relative',
          padding: '16px',
          border: `1px solid ${colors.LIGHT_GRAY}`,
          borderRadius: '20px',
        }}
      >
        <Title as="h4" font="size50">
          {title}
        </Title>

        {children}

        <div
          css={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            fontSize: '14px',
            color: colors.DARK_GRAY,
            textAlign: 'right',
          }}
        >
          <p>{summary ?? null}</p>
        </div>
      </div>
    </MultiSelectContext.Provider>
  );
}

MultiSelect.Content = Content;
MultiSelect.AddOptionInput = AddOptionInput;
