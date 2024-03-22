import html2canvas from 'html2canvas';
import Button from '../common/Button/Button';
import { convertCanvasToFile } from '../../utils/convertCanvasToFile';
import { colors } from '../../styles/variables/colors';
import { separateComma } from '../../utils/separateComma';
import { useResultContext } from './ResultContext';
import { getKoreanDate } from '../../utils/getKoreanDate';
import useModal from '../../hooks/useModal';
import { RefObject } from 'react';
import { writeClipboardText, share } from '../../utils/navigatorUtils';

interface Props {
  captureElementRef: RefObject<HTMLElement>;
}

// NOTE: 공유 버튼 Ui
// NOTE: 정산 내역 이미지 캡쳐 로직
// NOTE: 공유할 텍스트 생성 로직
// TODO: 캡쳐 로직 분리
// THINK: 공유할 텍스트를 데이터로 볼건지 고민... -> 데이터로 보는거면 데이터 분리가 필요하지 않을까?
export default function ShareButton({ captureElementRef }: Props) {
  const { Modal, createModal } = useModal();
  const {
    title,
    date,
    payment: { payer, bankTransfer },
    hasAccount,
    etcPaymentMethods,
    personalAmountList,
  } = useResultContext();

  // TODO: 영수증 이미지 캡쳐 공유할 수 있도록 카카오톡 공유하기 구현
  const getCaptureFile = async () => {
    if (!captureElementRef.current) return;

    const canvas = await html2canvas(captureElementRef.current, {
      backgroundColor: colors.POINT,
    });

    return await convertCanvasToFile(canvas, 'settle_up_result.png');
  };

  const onClick = async () => {
    // 공유될 텍스트
    const text =
      `${title} 모임 정산 내용입니다.\n\n` +
      '[모임 정보]\n' +
      `- 일시: ${getKoreanDate(date)}\n\n` +
      '[송금 정보]\n' +
      `- 결제한 사람: ${payer}\n` +
      (hasAccount
        ? `- 계좌번호: ${bankTransfer.bankName} ${bankTransfer.accountNumber}\n`
        : '') +
      `- ${etcPaymentMethods.join(', ')} 가능\n\n` +
      '[정산 결과]\n' +
      Object.entries(personalAmountList)
        .map(([person, amount]) => `- ${person}: ${separateComma(amount)}원\n`)
        .join('') +
      '\n\n' +
      '* 1원 단위는 올림 처리되었습니다.';

    // 공유될 정산 내역 이미지
    const imageFile: File | undefined = await getCaptureFile();

    // 공유 로직 (공유 기능 안될시 클립보드 복사)
    try {
      await share(
        imageFile
          ? {
              title,
              text,
              files: [imageFile],
            }
          : { title, text },
      );
    } catch (error) {
      await writeClipboardText(text, {
        onSuccess: () => createModal(<p>클립보드에 복사되었습니다.</p>),
        onError: () => createModal(<p>공유 기능을 사용할 수 없는 기기입니다.</p>),
      });
    }
  };

  return (
    <>
      <Button onClick={onClick}>정산 결과 공유하기</Button>
      <Modal />
    </>
  );
}
