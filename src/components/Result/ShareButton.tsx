import html2canvas from 'html2canvas';
import Button from '../common/Button';
import { convertCanvasToFile } from '../../utils/convertCanvasToFile';
import { colors } from '../../styles/variables/colors';
import { separateComma } from '../../utils/separateComma';
import { useResultContext } from './ResultContext';
import { useState } from 'react';
import Modal from '../common/Modal/Modal';

interface Props {
  captureElement: HTMLElement | null;
}

export default function ShareButton({ captureElement }: Props) {
  const {
    title,
    date,
    payment: { payer, bankTransfer },
    hasAccount,
    etcPaymentMethods,
    personalAmountList,
  } = useResultContext();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const getCaptureFile = async () => {
    if (!captureElement) return;

    const canvas = await html2canvas(captureElement, {
      backgroundColor: colors.POINT,
    });

    return await convertCanvasToFile(canvas, 'settle_up_result.png');
  };

  const onClick = async () => {
    // 공유될 텍스트
    const text =
      `${date} ${title} 모임 정산 내용입니다.\n\n` +
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

    try {
      // TODO: https로 배포하고 공유 API 잘 되는지 확인하기
      await navigator.share(
        imageFile
          ? {
              title,
              text,
              files: [imageFile],
            }
          : { title, text },
      );
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
      try {
        await navigator.clipboard.writeText(text);
        setShowSuccessModal(true);
      } catch (error) {
        // 클립보드 기능도 사용할 수 없을 경우
        console.log(error);
        setShowErrorModal(true);
      }
    }
  };

  return (
    <>
      <Button onClick={onClick}>정산 결과 공유하기</Button>
      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <p>클립보드에 복사되었습니다.</p>
      </Modal>
      <Modal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)}>
        <p>공유 기능을 사용할 수 없는 기기입니다.</p>
      </Modal>
    </>
  );
}
