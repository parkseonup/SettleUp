import ContentTitle from '../components/ContentTitle/molecules/ContentTitle';
import PageLayout from '../components/PageLayout/moleculess/PageLayout';

export default function New() {
  return (
    <PageLayout>
      <PageLayout.Title value="정산 만들기" />

      <PageLayout.Content>
        <ContentTitle as="h3" option="(선택)">
          1. 모임 이름 입력
        </ContentTitle>
      </PageLayout.Content>
    </PageLayout>
  );
}
