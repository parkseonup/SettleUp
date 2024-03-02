import html2canvas from 'html2canvas';
import Button from '../common/Button';
import { convertCanvasToFile } from '../../utils/convertCanvasToFile';
import { Payment, Settlement } from '../../types/Settlement';
import { colors } from '../../styles/variables/colors';
import { separateComma } from '../../utils/separateComma';
import { PersonalAmountData } from '../../pages/Result';

interface Data extends Omit<Settlement, 'place'> {
  hasAccount: boolean;
  etcPaymentMethods: Payment['selectedPaymentMethods'];
  personalAmountList: PersonalAmountData;
}

interface Props {
  data: Data;
  captureElement: HTMLElement | null;
}

export default function ShareButton({ data, captureElement }: Props) {
  const {
    title,
    date,
    payment: { payer, bankTransfer },
    hasAccount,
    etcPaymentMethods,
    personalAmountList,
  } = data;

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
      // TODO: 복사되었습니다 modal 띄우기
      try {
        await navigator.clipboard.writeText(text);
        console.log('복사 성공');
      } catch (error) {
        console.error(error, '공유하기가 지원되지 않는 환경 입니다.');
      }
    }
  };

  return <Button onClick={onClick}>정산 결과 공유하기</Button>;
}
