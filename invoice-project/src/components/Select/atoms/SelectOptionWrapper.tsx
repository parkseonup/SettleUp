import { css } from '@emotion/react';
import { HTMLAttributes, ReactNode } from 'react';
import { colors } from '../../../styles/variables/colors';
import { zIndexes } from '../../../styles/variables/zIndexes';
import getFilteredProps from '../../../utils/getFilteredProps';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function SelectOptionWrapper(props: Props) {
  const filteredProps = getFilteredProps(props, ['children']);

  return (
    <div
      {...filteredProps}
      css={css({
        position: 'absolute',
        top: 'calc(100% + 4px)',
        right: 0,
        left: 0,
        zIndex: zIndexes.SELECT_OPTION_WRAPPER,
        width: '100%',
        padding: '8px',
        backgroundColor: colors.WHITE,
        border: `1px solid ${colors.DARK_GRAY}`,
        borderRadius: '20px',
      })}
    >
      {props.children}
    </div>
  );
}
