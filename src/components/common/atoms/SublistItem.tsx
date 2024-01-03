import { colors } from '../../../styles/variables/colors';
import { ReactNode } from 'react';
import { BiSubdirectoryRight } from 'react-icons/bi';
import Title from './Title';

export interface Props {
  title: string;
  titleAs?: 'h3' | 'h4' | 'h5';
  children?: ReactNode;
}

export default function SublistItem({ title, titleAs, children }: Props) {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        fontSize: '12px',
        fontWeight: 400,
        color: colors.DARK_GRAY,
      }}
    >
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
        }}
      >
        <BiSubdirectoryRight
          css={{
            fontSize: '14px',
            color: colors.LIGHT_GRAY,
          }}
        />
        <Title
          as={titleAs || 'h4'}
          css={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.DARK_GRAY,
          }}
        >
          {title}
        </Title>
      </div>

      {children}
    </div>
  );
}
