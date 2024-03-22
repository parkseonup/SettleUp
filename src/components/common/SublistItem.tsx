import { colors } from '../../styles/variables/colors';
import { ReactElement, ReactNode } from 'react';
import { BiSubdirectoryRight } from 'react-icons/bi';
import Title from './Title';
import cloneElement from '../../utils/cloneElement';
import { Style } from '../../types/Style';
import { css } from '@emotion/react';

interface TitleProps {
  title: string;
}

interface AsProps {
  as: ReactElement;
}

export type Props = { children: ReactNode; insideStyle?: Style } & (TitleProps | AsProps);

const titleStyle = {
  fontSize: 'inherit',
  fontWeight: 500,
  color: colors.DARK_GRAY,
};

// THINK: sublistitem 구조 고민해보기..
export default function SublistItem({ insideStyle, children, ...props }: Props) {
  return (
    <div
      css={css(
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          paddingLeft: '8px',
          fontSize: '12px',
          fontWeight: 400,
          color: colors.DARK_GRAY,
        },
        insideStyle,
      )}
    >
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px',
        }}
      >
        <BiSubdirectoryRight
          css={{
            fontSize: '14px',
            color: colors.LIGHT_GRAY,
          }}
        />
        {'as' in props ? (
          cloneElement(props.as, { css: titleStyle })
        ) : (
          <Title as="h4" css={titleStyle}>
            {props.title}
          </Title>
        )}
      </div>

      {children}
    </div>
  );
}
