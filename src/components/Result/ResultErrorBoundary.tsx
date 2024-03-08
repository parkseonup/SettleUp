import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import ButtonWrapper from '../common/ButtonWrapper';
import PageLayout from '../common/pageLayout/PageLayout';

// TODO: Link 태그로 바꾸기
export default function ResultErrorBoundary() {
  const navigate = useNavigate();

  return (
    <PageLayout title="정산 결과가 없습니다." description="생성된 정산 내역이 없습니다.">
      <ButtonWrapper>
        <Button style="point" onClick={() => navigate('/create')}>
          정산 만들기로 이동
        </Button>
      </ButtonWrapper>
    </PageLayout>
  );
}
