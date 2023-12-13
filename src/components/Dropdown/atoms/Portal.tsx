import { HTMLAttributes } from 'react';
import { useDropdownContext } from './Context';
import { colors } from '../../../styles/variables/colors';
import { zIndexes } from '../../../styles/variables/zIndexes';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function Portal({ children, ...props }: Props) {
  const { isActive } = useDropdownContext();

  return isActive ? (
    <div
      css={{
        position: 'absolute',
        top: 'calc(100% + 4px)',
        left: 0,
        zIndex: zIndexes.PORTAL,
        width: '100%',
        padding: '12px',
        backgroundColor: colors.WHITE,
        border: `1px solid ${colors.LIGHT_GRAY}`,
        borderRadius: '20px',
      }}
      {...props}
    >
      {children}
    </div>
  ) : null;
}
