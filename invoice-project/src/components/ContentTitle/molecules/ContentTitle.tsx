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
  const style = css({
    padding: 0,
    margin: 0,
    fontSize: '15px',
    fontWeight: 500,
    color: colors.BLACK,
  });
  const cssProp = typeof Title === 'function' ? { style } : { css: style };

  return (
    <Title {...cssProp}>
      {value}
      {option ? <ContentTitleOption value={option} /> : null}
    </Title>
  );
}

/**
 * Title을 컴포넌트로 전달할 경우, 컴포넌트 선언부 예시
 * function Label({ children, style }: { children: ReactNode; style: SerializedStyles }) {
  return <label css={css(style)}>{children}</label>;
}
 */