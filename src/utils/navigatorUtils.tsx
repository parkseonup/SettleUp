export const share = async (
  data: ShareData,
  options?: {
    onSuccess?: (data: ShareData) => void;
    onError?: ({ data, error }: { data: ShareData; error: unknown }) => void;
  },
) => {
  try {
    await navigator.share(data);
    if (options?.onSuccess) options.onSuccess(data);
  } catch (error) {
    // 사용자가 share 기능을 종료한 경우 === AbortError가 출력된 경우
    if (
      error &&
      typeof error === 'object' &&
      'name' in error &&
      error.name === 'AbortError'
    )
      return;

    // 그 밖의 에러 발생시
    if (options?.onError) {
      options.onError({ data, error });
      return;
    }

    throw error;
  }
};

export const writeClipboardText = async (
  text: string,
  options?: {
    onSuccess?: (data?: typeof text) => void;
    onError?: ({ data, error }: { data?: typeof text; error?: unknown }) => void;
  },
) => {
  try {
    await navigator.clipboard.writeText(text);
    if (options?.onSuccess) options.onSuccess(text);
  } catch (error) {
    if (options?.onError) {
      options.onError({ data: text, error });
      return;
    }

    throw error;
  }
};
