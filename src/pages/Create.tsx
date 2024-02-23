import { FormEvent, useEffect, useState } from 'react';
import PageLayout from '../components/pageLayout/organisms/PageLayout';
import useCreationReducer from '../components/Create/useCreationReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import Default from '../components/Create/Default';
import Participants from '../components/Create/Participants';

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
  const [data, dispatch, creationService] = useCreationReducer();
  const navigate = useNavigate();

  console.log('[step]', step);

  useEffect(() => {
    setStep(steps[stepIndex - 1]);
  }, [location]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 다음 페이지가 있다면
    const { nextStep } = stepInfo[step];

    if (nextStep !== null) {
      // 로컬스토리지에 data 저장
      creationService.set(data);

      // setStep 해서 컴포넌트 체인지. 이때 history 남길것
      setStep(nextStep);
      navigate(`/create/${steps.indexOf(nextStep) + 1}`);
      return;
    }
  };

  return (
    <PageLayout title="정산 만들기" description="클라이밍 원정">
      <form onSubmit={onSubmit}>
        {step === '기본정보' ? (
          <Default data={data} dispatch={dispatch} />
        ) : step === '참가자' ? (
          <Participants data={data} dispatch={dispatch} />
        ) : step === '송금정보' ? (
          <p>송금정보</p>
        ) : null}
      </form>
    </PageLayout>
  );
}
