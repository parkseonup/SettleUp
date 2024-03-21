import { HTMLAttributes, ReactNode, useMemo } from 'react';
import { UseDropdownContextValue, useDropdownContext } from './Context';
import { zIndexes } from '../../../styles/variables/zIndexes';
import { colors } from '../../../styles/variables/colors';

type ChildFunction = ({ isActive, setIsActive }: UseDropdownContextValue) => ReactNode;

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  as?: ReactNode | (({ isActive, setIsActive }: UseDropdownContextValue) => ReactNode);
  children: ReactNode | ChildFunction;
}

/** Portal UI */
export default function Portal({ as, children, ...props }: Props) {
  const { isActive, setIsActive } = useDropdownContext();

  const element = useMemo(
    () =>
      typeof children === 'function' ? children({ isActive, setIsActive }) : children,
    [children, isActive],
  );

  if (!isActive) return null;

  if (as) return element;

  return (
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
      {element}
    </div>
  );
}
