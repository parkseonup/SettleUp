import { Children, ElementType, ReactNode, isValidElement } from 'react';

export default function getChildComponent(children: ReactNode, target: ElementType | ReactNode): ReactNode {
  const child = Children.toArray(children).find((child) => isValidElement(child) && child.type === target);

  return child;
}
