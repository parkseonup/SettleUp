import { css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

export const globalStyle = css`
  ${emotionNormalize}

  body {
    font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
      'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  }

  *::before,
  *::after,
  body *,
  body *::before,
  body *::after {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    padding: 0;
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }

  button svg {
    display: flex;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;
