import { FormEvent, useEffect, useState } from 'react';
import useCreationReducer from '../components/Create/useCreationReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import Default from '../components/Create/Default';
import Participants from '../components/Create/Participants';
import Payment from '../components/Create/Payment';
import PageLayout from '../components/common/pageLayout/PageLayout';

const steps = ['기본정보', '참가자', '송금정보'] as const;
const stepInfo = {
  기본정보: {
    nextStep: '참가자',
  },
  참가자: {
    nextStep: '송금정보',
  },
  송금정보: {
    nextStep: null,
  },
} as const;

export default function Create() {
  const location = useLocation();
  const stepIndex = +location.pathname.replace('/create/', '');
  const [step, setStep] = useState<(typeof steps)[number]>(steps[stepIndex - 1]);
  const [data, dispatch] = useCreationReducer(location.state);
  const navigate = useNavigate();

  useEffect(() => {
    setStep(steps[stepIndex - 1]);
  }, [location]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 1. 다음 페이지가 있다면
    const { nextStep } = stepInfo[step];

    if (nextStep !== null) {
      // setStep 해서 컴포넌트 체인지. 이때 history 남길것
      setStep(nextStep);
      navigate(`/create/${steps.indexOf(nextStep) + 1}`);
      return;
    }

    // 2. 다음 페이지가 없다면
    navigate('/result', { state: data });
  };

  return (
    <PageLayout title={`정산 만들기 (${stepIndex}/${steps.length})`}>
      <form onSubmit={onSubmit}>
        {step === '기본정보' ? (
          <Default data={data} dispatch={dispatch} />
        ) : step === '참가자' ? (
          <Participants data={data} dispatch={dispatch} />
        ) : step === '송금정보' ? (
          <Payment data={data} dispatch={dispatch} />
        ) : null}
      </form>
    </PageLayout>
  );
}
