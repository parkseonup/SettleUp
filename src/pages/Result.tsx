import { useBlocker, useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../components/common/pageLayout/PageLayout';
import ButtonWrapper from '../components/common/ButtonWrapper';
import Button from '../components/common/Button';
import { useRef } from 'react';
import ShareButton from '../components/Result/ShareButton';
import SaveButton from '../components/Result/SaveButton';
import ResultContextProvider from '../components/Result/ResultContext';
import ResultMain from '../components/Result/ResultMain';
import Modal from '../components/common/Modal/Modal';

export default function Result() {
  const captureElementRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const blocker = useBlocker(
    ({ nextLocation }) => !!location.state && nextLocation.pathname === '/create/3',
  );

  const onClickEdit = () => {
    navigate('/create', { state: location.state });
  };

  return (
    <>
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

      <Modal
        isOpen={blocker.state === 'blocked'}
        onClose={() => {
          if (blocker.reset) blocker.reset();
        }}
        footer={
          <Button
            style="point"
            onClick={() => {
              if (blocker.proceed) blocker.proceed();
              onClickEdit();
            }}
          >
            이동하기
          </Button>
        }
      >
        <p>정산 수정 페이지로 이동하시겠습니까?</p>
      </Modal>
    </>
  );
}
