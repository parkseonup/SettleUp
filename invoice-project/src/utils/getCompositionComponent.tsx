import { Children, ReactNode, isValidElement } from 'react';
import { jsx } from '@emotion/react';

export default function getCompositionComponent(children: ReactNode, target: jsx.JSX.ElementType | ReactNode) {
  return Children.toArray(children).find((child) => isValidElement(child) && child.type === target);
}
