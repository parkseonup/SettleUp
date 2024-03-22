import { RefObject } from 'react';
import { colors } from '../styles/variables/colors';
import html2canvas from 'html2canvas';

export const getCaptureToFile = async <T extends HTMLElement>(
  captureElementRef: RefObject<T>,
  fileName: string,
) => {
  if (!captureElementRef.current) return;

  const canvas = await html2canvas(captureElementRef.current, {
    backgroundColor: colors.POINT,
  });

  return await convertCanvasToFile(canvas, fileName);
};

const convertCanvasToFile = async (canvas: HTMLCanvasElement, fileName: string) => {
  const dataUrl = canvas.toDataURL();
  const blob = await (await fetch(dataUrl)).blob();

  return new File([blob], fileName, {
    type: blob.type,
    lastModified: new Date().getTime(),
  });
};
