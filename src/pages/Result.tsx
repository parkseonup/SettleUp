import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../components/common/pageLayout/PageLayout';
import ButtonWrapper from '../components/common/Button/ButtonWrapper';
import Button from '../components/common/Button/Button';
import { useRef } from 'react';
import ShareButton from '../components/Result/ShareButton';
import SaveButton from '../components/Result/SaveButton';
import ResultContextProvider from '../components/Result/ResultContext';
import ResultMain from '../components/Result/ResultMain';

// NOTE: result ui
// TODO: ResultMain 컴포넌트에 뭐가 있는지 알아보기가 너무 어려움. 분리해서 잘 사용할 수 있도록 작성.
export default function Result() {
  const captureElementRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

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
