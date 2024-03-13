import { Children, ElementType, ReactElement, ReactNode, isValidElement } from 'react';

export default function getChildComponent(children: ReactNode, target: ElementType): ReactElement | null {
  const child = Children.toArray(children).find((child) => {
    if (!isValidElement(child)) return false;

    return child.props?.__EMOTION_TYPE_PLEASE_DO_NOT_USE__
      ? child.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__ === target
      : child.type === target;
  });

  return isValidElement(child) ? child : null;
}
