import { FormEvent, useEffect, useState } from 'react';
import useCreationReducer from '../components/Create/useCreationReducer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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

// TODO: url로 접근할 경우, 첫 페이지로 돌리기
// TODO: /, /create, /create/, /create/1 url 통일하기
export default function Create() {
  const params = useParams();
  const location = useLocation();
  const stepIndex = params.stepIndex ? +params.stepIndex : 1;
  const [step, setStep] = useState<(typeof steps)[number]>(steps[stepIndex - 1]);
  const [data, dispatch] = useCreationReducer(location.state);
  const navigate = useNavigate();

  useEffect(() => {
    // url로 접근했을 때 첫번째 스텝이 아니면 리다이렉트
    if (stepIndex !== 1 && !location.state) {
      navigate('/create');
      return;
    }

    setStep(steps[stepIndex - 1]);
  }, [location]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 1. 다음 페이지가 있다면
    const { nextStep } = stepInfo[step];

    if (nextStep !== null) {
      // setStep 해서 컴포넌트 체인지. 이때 history 남길것
      setStep(nextStep);
      navigate(`/create/${steps.indexOf(nextStep) + 1}`, { state: data });
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
