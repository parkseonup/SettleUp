import { css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import { colors } from './variables/colors';

// TODO: fontSize: '14px'로 기본값 지정하고, 따로 지정해둔 곳 제거하기
export const globalStyle = css(emotionNormalize, {
  body: {
    fontFamily:
      '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },

  '*::before, *::after, body *, body *::before, body *::after': {
    boxSizing: 'border-box',
  },

  'h1, h2, h3, h4, h5, h6, p': {
    margin: 0,
    fontSize: 'inherit',
  },

  'ul, ol, dl': {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },

  dd: {
    margin: 0,
  },

  a: {
    color: 'inherit',
    textDecoration: 'none',
  },

  button: {
    padding: 0,
    backgroundColor: 'transparent',
    border: 0,
    cursor: 'pointer',
  },

  'button svg': {
    display: 'flex',
  },

  input: {
    width: '100%',
    height: '100%',
    padding: 0,
    fontSize: '14px',
    backgroundColor: 'transparent',
    outline: 'none',
    appearance: 'none',
    border: 0,
    color: colors.DARK_GRAY,
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    '&::placeholder': {
      color: colors.LIGHT_GRAY,
    },
  },

  'input:not(input[type="checkbox"]), input:not(input[type="radio"])': {},
});
