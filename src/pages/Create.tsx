import { FormEvent, useEffect } from 'react';
import useCreationReducer from '../components/Create/useCreationReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import Default from '../components/Create/Default';
import Participants from '../components/Create/Participants';
import Payment from '../components/Create/Payment';
import PageLayout from '../components/common/pageLayout/PageLayout';
import useFunnel from '../hooks/useFunnel';

const steps = ['기본정보', '참가자', '송금정보'] as const;

export default function Create() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, dispatch] = useCreationReducer(location.state);
  const { Funnel, step, setStep, hasNextStep } = useFunnel(steps, data);
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

    if (hasNextStep) setStep();
    else navigate('/result', { state: data });
  };

  return (
    <PageLayout title={`정산 만들기 (${stepLevel}/${steps.length})`}>
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
