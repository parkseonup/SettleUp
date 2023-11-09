import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
import { ElementType, ReactNode } from 'react';
import { BiSubdirectoryRight } from 'react-icons/bi';
import { Style } from '../../../types/Style';

interface Props {
  title: string;
  titleAs: ElementType;
  customStyle?: Style;
  children?: ReactNode;
}

export default function SublistItem({ title, titleAs: Title, customStyle, children }: Props) {
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
        customStyle,
      )}
    >
      <div
        css={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
        })}
      >
        <BiSubdirectoryRight
          css={css({
            fontSize: '14px',
            color: colors.LIGHT_GRAY,
          })}
        />
        <Title>{title}</Title>
      </div>

      {children}
    </div>
  );
}
