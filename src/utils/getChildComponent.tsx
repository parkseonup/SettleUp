import { Children, ElementType, ReactElement, ReactNode, isValidElement } from 'react';

interface isTargetChild {
  (children: ReactNode, target: ElementType): boolean;
}

interface getChildComponent {
  (children: ReactNode, target: ElementType): ReactElement | undefined;
}

interface getChildrenComponent {
  (children: ReactNode, target: ElementType): ReactElement[];
}

const isTargetChild: isTargetChild = (child, target) => {
  if (!isValidElement(child)) return false;

  return child.props?.__EMOTION_TYPE_PLEASE_DO_NOT_USE__
    ? child.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__ === target
    : child.type === target;
};

export const getChildComponent: getChildComponent = (children, target) =>
  Children.toArray(children).find((child): child is ReactElement =>
    isTargetChild(child, target),
  );

export const getChildrenComponent: getChildrenComponent = (children, target) =>
  Children.toArray(children).filter((child): child is ReactElement =>
    isTargetChild(child, target),
  );
