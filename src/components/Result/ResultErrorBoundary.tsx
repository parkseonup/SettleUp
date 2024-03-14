import PageLayout from '../common/pageLayout/PageLayout';
import { Link } from 'react-router-dom';
import { buttonColors, defaultButtonStyle } from '../../styles/common/buttons';

export default function ResultErrorBoundary() {
  return (
    <PageLayout title="정산 결과가 없습니다." description="생성된 정산 내역이 없습니다.">
      <Link
        css={{
          ...defaultButtonStyle,
          ...buttonColors['fill'],
        }}
        to="/create"
      >
        정산 만들기로 이동
      </Link>
    </PageLayout>
  );
}
