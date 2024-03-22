import PageLayout from '../common/pageLayout/PageLayout';
import { Link } from 'react-router-dom';
import { buttonColors, defaultButtonStyle } from '../../styles/common/buttons';
import { css } from '@emotion/react';

export default function ResultErrorBoundary() {
  return (
    <PageLayout
      title="정산 결과가 없습니다."
      description="정산 만들기를 먼저 진행해주세요."
    >
      <Link css={css(defaultButtonStyle, buttonColors['fill'])} to="/create">
        정산 만들기로 이동
      </Link>
    </PageLayout>
  );
}
