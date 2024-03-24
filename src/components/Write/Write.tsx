import { FormEvent, useEffect } from 'react';
import useCreationReducer from './useCreationReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import Default from './Default';
import Participants from './Participants';
import Payment from './Payment';
import PageLayout from '../common/pageLayout/PageLayout';
import useFunnel from '../../hooks/useFunnel';
import { Settlement } from '../../apis/data';
import lodash from 'lodash';
import { crackAccountNumber } from '../../utils/crackAccountNumber';
import LocalStorageService from '../../apis/LocalStorageService';

interface Props {
  isEditMode?: boolean;
}

const steps = ['기본정보', '참가자', '송금정보'] as const;

/**
 * - 정산 만들기 / 정산 수정 페이지 ui
 * - input Enter키 입력시 submit 방지
 * - submit 발생시 처리 로직
 */
// TODO: 정산 만들기, 정산 수정 분리하기
export default function Write({ isEditMode = false }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, dispatch] = useCreationReducer(location.state);
  const { Funnel, step, setStep, hasNextStep } = useFunnel(steps, data);
  const stepLevel = steps.findIndex((_step) => _step === step) + 1;
  const apiService = new LocalStorageService();

  /** input에서 Enter키 입력시 발생하는 submit 이벤트 방지 */
  useEffect(() => {
    const preventEnterSubmit = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).matches('input') && e.code === 'Enter')
        e.preventDefault();
    };

    document.addEventListener('keydown', preventEnterSubmit);

    return () => document.removeEventListener('keydown', preventEnterSubmit);
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (hasNextStep) setStep();
    else {
      // 계좌번호 일부만 출력되도록 ** 처리
      const copyData: Settlement = lodash.cloneDeep(data);
      const { accountNumber } = copyData.payment.bankTransfer;
      copyData.payment.bankTransfer.accountNumber = accountNumber
        ? crackAccountNumber(accountNumber)
        : '';

      isEditMode ? apiService.changeItem(copyData) : apiService.addItem(data);
      navigate('/result', { state: data });
    }
  };

  return (
    <PageLayout
      title={`${isEditMode ? '정산 결과 수정' : '정산 만들기'} (${stepLevel}/${
        steps.length
      })`}
    >
      <form onSubmit={onSubmit}>
        <Funnel>
          <Funnel.Step name="기본정보">
            <Default data={data} dispatch={dispatch} />
          </Funnel.Step>
          <Funnel.Step name="참가자">
            <Participants data={data} dispatch={dispatch} />
          </Funnel.Step>
          <Funnel.Step name="송금정보">
            <Payment data={data} dispatch={dispatch} />
          </Funnel.Step>
        </Funnel>
      </form>
    </PageLayout>
  );
}
