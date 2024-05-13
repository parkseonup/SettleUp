import { FormEvent, useEffect } from 'react';
import useCreationReducer from './useCreationReducer';
import { useLocation } from 'react-router-dom';
import Default from './Default';
import Participants from './Participants';
import Payment from './Payment';
import PageLayout from '../common/pageLayout/PageLayout';
import useFunnel from '../../hooks/useFunnel';
import Result from '../../pages/Result';

interface Props {
  isEditMode?: boolean;
}

const steps = ['기본정보', '참가자', '송금정보', '결과'] as const;

/**
 * - 정산 만들기 / 정산 수정 페이지 ui
 * - input Enter키 입력시 submit 방지
 * - submit 발생시 처리 로직
 */
// TODO: 정산 만들기, 정산 수정 분리하기
export default function Write({ isEditMode = false }: Props) {
  const location = useLocation();
  const [data, dispatch] = useCreationReducer(location.state);
  const { Funnel, step, setStep, hasNextStep } = useFunnel(steps);
  const stepLevel = steps.findIndex((_step) => _step === step) + 1;

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
    setStep();
  };

  return (
    <PageLayout
      title={`${
        hasNextStep
          ? isEditMode
            ? `정산 결과 수정 (${stepLevel}/${steps.length - 1})`
            : `정산 만들기 (${stepLevel}/${steps.length - 1})`
          : '정산 결과'
      }`}
      mode={hasNextStep ? 'default' : 'point'}
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
          <Funnel.Step name="결과">
            <Result data={data} />
          </Funnel.Step>
        </Funnel>
      </form>
    </PageLayout>
  );
}
