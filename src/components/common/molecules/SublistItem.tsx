import { colors } from '../../../styles/variables/colors';
import { ReactElement, ReactNode } from 'react';
import { BiSubdirectoryRight } from 'react-icons/bi';
import Title from '../atoms/Title';
import cloneElement from '../../../utils/cloneElement';
import { Style } from '../../../types/Style';
import { css } from '@emotion/react';

interface TitleProps {
  title: string;
}

interface AsProps {
  as: ReactElement;
}

export type Props = { children: ReactNode; insideStyle?: Style } & (TitleProps | AsProps);

export default function SublistItem({ insideStyle, children, ...props }: Props) {
  return (
    <div
      css={css(
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
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
          gap: '4px',
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

const titleStyle = {
  fontSize: '12px',
  fontWeight: 500,
  color: colors.DARK_GRAY,
};
