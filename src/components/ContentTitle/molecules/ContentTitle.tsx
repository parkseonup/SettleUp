import { ReactNode } from 'react';
import { colors } from '../../../styles/variables/colors';
import ContentTitleOption from '../atoms/ContentTitleOption';

interface Props {
  children: ReactNode;
  option?: string;
}

export default function ContentTitle({ children, option }: Props) {
  return (
    <h3
      css={{
        fontSize: '15px',
        fontWeight: 600,
        color: colors.BLACK,
      }}
    >
      {children}
      {option ? <ContentTitleOption>{option}</ContentTitleOption> : null}
    </h3>
  );
}
