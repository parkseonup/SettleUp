import { jsx } from '@emotion/react';
import { ReactElement, ReactNode, cloneElement as cloneReactElement } from 'react';

export default function cloneElement(
  element: ReactElement,
  props?: any,
  ...children: ReactNode[]
): ReactElement {
  return element.props.css
    ? cloneReactElement(
        element,
        {
          ...element.props,
          ...props,
        },
        ...children,
      )
    : jsx(
        element.type,
        {
          key: element.key,
          ref: 'ref' in element ? element.ref : null,
          ...element.props,
          ...props,
        },
        ...children,
      );
}
