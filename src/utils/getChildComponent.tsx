import { Children, ReactNode, isValidElement } from 'react';
import { jsx } from '@emotion/react';

export default function getChildComponent(children: ReactNode, target: jsx.JSX.ElementType | ReactNode) {
  return Children.toArray(children).find((child) => isValidElement(child) && child.type === target);
}

export function getChildrenComponent(children: ReactNode, target: jsx.JSX.ElementType | ReactNode) {
  return Children.toArray(children).filter((child) => isValidElement(child) && child.type === target);
}
