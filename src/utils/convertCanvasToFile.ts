export const convertCanvasToFile = async (
  canvas: HTMLCanvasElement,
  fileName: string,
) => {
  const dataUrl = canvas.toDataURL();
  const blob = await (await fetch(dataUrl)).blob();

  return new File([blob], fileName, {
    type: blob.type,
    lastModified: new Date().getTime(),
  });
};
