import PageContent from '../atoms/PageContent';
import PageTitle from '../atoms/PageTitle';
import PageTitleDescription from '../atoms/PageTitleDescription';
import PageLayoutMain from './PageLayoutMain';

const PageLayout = Object.assign(PageLayoutMain, {
  Title: PageTitle,
  Description: PageTitleDescription,
  Content: PageContent,
});

export default PageLayout;
