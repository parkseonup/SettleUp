import { jsx } from '@emotion/react';
import { ReactElement, cloneElement as cloneReactElement } from 'react';

export default function cloneElement(element: ReactElement, props: any): ReactElement {
  return element.props.css
    ? cloneReactElement(element, {
        ...element.props,
        ...props,
      })
    : jsx(element.type, {
        key: element.key,
        ...element.props,
        ...props,
      });
}
