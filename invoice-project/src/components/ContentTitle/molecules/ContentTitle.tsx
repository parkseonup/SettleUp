import { ElementType } from 'react';
import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
import ContentTitleOption from '../atoms/ContentTitleOption';

interface Props {
  as: ElementType;
  value: string;
  option?: string;
}

export default function ContentTitle({ as: Title, value, option }: Props) {
  const customStyle = css({
    padding: 0,
    margin: 0,
    fontSize: '15px',
    fontWeight: 500,
    color: colors.BLACK,
  });
  const cssProp = typeof Title === 'function' ? { customStyle } : { css: customStyle };

  return (
    <Title {...cssProp}>
      {value}
      {option ? <ContentTitleOption value={option} /> : null}
    </Title>
  );
}
