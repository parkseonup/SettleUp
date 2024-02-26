import { css } from '@emotion/react';

export const visibilityHidden = css({
  overflow: 'hidden',
  position: 'absolute',
  clip: 'rect(0, 0, 0, 0)',
  clipPath: 'circle(0)',
  width: '1px',
  height: '1px',
  margin: '-1px',
  border: 0,
  padding: 0,
  whiteSpace: 'nowrap',
});
