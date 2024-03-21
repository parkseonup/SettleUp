import html2canvas from 'html2canvas';
import Button from '../common/Button/Button';
import { convertCanvasToFile } from '../../utils/convertCanvasToFile';
import { colors } from '../../styles/variables/colors';
import { separateComma } from '../../utils/separateComma';
import { useResultContext } from './ResultContext';
import { getKoreanDate } from '../../utils/getKoreanDate';
import useModal from '../../hooks/useModal';

interface Props {
  captureElement: HTMLElement | null;
}

// NOTE: 공유 버튼 Ui
// NOTE: 정산 내역 이미지 캡쳐 로직
// NOTE: 공유할 텍스트 생성 로직
// NOTE: navigator.share 기능 호출 및 성공 실패 처리 로직
// NOTE: navigator.clipboard 기능 호출 및 성공 실패 처리 로직
// NOTE: 모달창 열고 닫는 상태 관리 (공유 결과에 따른)
// TODO: 캡쳐 로직 분리
// TODO: 공유할 텍스트를 데이터로 볼건지 고민... -> 데이터로 보는거면 데이터 분리가 필요하지 않을까?
// TODO: navigator.share 호출 및 성공/실패 처리 -> 커스텀 훅으로 분리
// TODO: navigator.clipboard 호출 및 성공/실패 처리 -> 커스텀 훅으로 분리
// TODO: 성공, 실패 정보를 하나의 상태로 관리하기 -> 모아서 관리: {share error && clipboard success: '클립보드에 복사되었습니다.', share error && clipboard success : '공유 기능을 사용할 수 없는 기기입니다.'}
export default function ShareButton({ captureElement }: Props) {
  const { Modal, createModal } = useModal();
  const {
    title,
    date,
    payment: { payer, bankTransfer },
    hasAccount,
    etcPaymentMethods,
    personalAmountList,
  } = useResultContext();

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

    try {
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
        createModal(<p>클립보드에 복사되었습니다.</p>);
      } catch (error) {
        // 클립보드 기능도 사용할 수 없을 경우
        createModal(<p>공유 기능을 사용할 수 없는 기기입니다.</p>);
      }
    }
  };

  return (
    <>
      <Button onClick={onClick}>정산 결과 공유하기</Button>
      <Modal />
    </>
  );
}
