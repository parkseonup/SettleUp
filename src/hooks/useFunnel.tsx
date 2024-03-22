import { ReactNode, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getChildrenComponent } from '../utils/getChildComponent';

type Steps = readonly string[];

interface FunnelProps {
  children: ReactNode;
}

interface FunnelStepProps {
  name: Steps[number];
  children: ReactNode;
}

type Delta = -1;

/**
 * - 단계별 컴포넌트 출력 기능
 * - 컴포넌트 변경될 때 history도 변경
 * - 컴포넌트들의 상태를 한 곳에 모음 -> loaction.state
 * - 단계 변경 함수 제공 -> setStep
 * - funnel 기능 사용을 위한 합성 컴포넌트 제공 -> Funnel
 */
export default function useFunnel(steps: Steps, locationState?: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentStep = searchParams.get('funnel-step') || steps[0];
  const stepIndex = steps.findIndex((step) => step === currentStep);

  const setStep = (delta?: Delta) => {
    // 이전 step으로 이동
    if (delta && delta === -1) {
      navigate(-1);
      return;
    }

    // 마지막 step일 경우 에러
    if (stepIndex + 1 > steps.length) throw new Error('다음 step이 없습니다.');

    navigate(
      { pathname: location.pathname, search: `funnel-step=${steps[stepIndex + 1]}` },
      { state: locationState },
    );
  };

  const FunnelContainer = useMemo(
    () =>
      Object.assign(
        function Funnel({ children }: FunnelProps) {
          const child = getChildrenComponent(children, Step).find(
            (child) => child.props.name === currentStep,
          );

          return child;
        },
        {
          Step,
        },
      ),
    [location],
  );

  return {
    Funnel: FunnelContainer,
    step: currentStep,
    setStep,
    hasNextStep: stepIndex < steps.length - 1,
  };
}

function Step({ children }: FunnelStepProps) {
  return children;
}
