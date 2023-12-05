import { HTMLAttributes } from 'react';
import { colors } from '../../../styles/variables/colors';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function Modal({ children }: Props) {
  return (
    <div
      css={{
        position: 'absolute',
        top: 'calc(100% + 4px)',
        left: 0,
        width: '100%',
        padding: '12px',
        backgroundColor: colors.WHITE,
        border: `1px solid ${colors.LIGHT_GRAY}`,
        borderRadius: '20px',
      }}
    >
      {children}
    </div>
  );
}
