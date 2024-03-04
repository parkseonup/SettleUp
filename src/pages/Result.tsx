import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../components/common/pageLayout/PageLayout';
import ButtonWrapper from '../components/common/ButtonWrapper';
import Button from '../components/common/Button';
import { useRef } from 'react';
import ShareButton from '../components/Result/ShareButton';
import SaveButton from '../components/Result/SaveButton';
import ResultContextProvider from '../components/Result/ResultContext';
import ResultMain from '../components/Result/ResultMain';

// TODO: 뒤로 가기 방지 -> 수정하는건지 물어보는 모달 띄우기
export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const captureElementRef = useRef<HTMLElement>(null);

  const onClickEdit = () => {
    navigate('/create', { state: location.state });
  };

  return (
    <PageLayout title="정산 결과" mode="point">
      <ResultContextProvider value={location.state}>
        <ResultMain ref={captureElementRef} />
        <ButtonWrapper>
          <ShareButton captureElement={captureElementRef.current} />
          <Button onClick={onClickEdit}>정산 수정하기</Button>
          <SaveButton data={location.state} />
        </ButtonWrapper>
      </ResultContextProvider>
    </PageLayout>
  );
}
