import { useLoaderData, useNavigate } from 'react-router-dom';
import PageLayout from '../components/common/pageLayout/PageLayout';
import { PlaceInfo, Settlement } from '../apis/data';
import ButtonWrapper from '../components/common/Button/ButtonWrapper';
import Button from '../components/common/Button/Button';
import { useRef } from 'react';
import ShareButton from '../components/Result/ShareButton';
import ResultContextProvider from '../components/Result/ResultContext';
import Receipt from '../components/common/Receipt';
import Title from '../components/common/Title';
import { colors } from '../styles/variables/colors';
import { getKoreanDate } from '../utils/getKoreanDate';
import PaymentHistory from '../components/Result/PaymentHistory';
import Section from '../components/common/Section';
import PaymentDetails from '../components/Result/PaymentDefails';
import PersonalAmountList from '../components/Result/PersonalAmountList';
import LocalStorageService from '../apis/LocalStorageService';
import useModal from '../hooks/useModal';

export interface PersonalAmountData {
  [key: PlaceInfo['participants'][number]]: PlaceInfo['amount'];
}

export default function HistoryDetail() {
  const navigate = useNavigate();
  const captureElementRef = useRef<HTMLElement>(null);
  const { data } = useLoaderData() as { data: Settlement };
  const apiService = new LocalStorageService();
  const { Modal, createModal } = useModal();

  const onClickEdit = () => {
    navigate('/create', { state: data });
  };

  const onClickDelete = () => {
    createModal(<p>정말 삭제하시겠습니까?</p>, {
      bottomButtons: (
        <Button
          style="point"
          onClick={() => {
            apiService.removeItem(data.id);
            navigate('/history', { replace: true });
          }}
        >
          예
        </Button>
      ),
    });
  };

  return (
    <>
      <PageLayout title="정산 내역" mode="point">
        <ResultContextProvider value={data}>
          <Receipt ref={captureElementRef}>
            <div>
              <Title as="h3" font={900}>
                {data.title}
              </Title>
              <p
                css={{
                  marginTop: '4px',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: colors.DARK_GRAY,
                }}
              >
                {getKoreanDate(data.date)}
              </p>
            </div>

            <PaymentHistory />

            <Section title="정산 요청" type="underline">
              <div
                css={{
                  padding: '0 8px',
                }}
              >
                <PaymentDetails />
                <PersonalAmountList />

                <small
                  css={{
                    display: 'block',
                    marginTop: '40px',
                  }}
                >
                  * 1원 단위는 올림 처리되었습니다.
                </small>
              </div>
            </Section>
          </Receipt>

          <ButtonWrapper>
            <ShareButton captureElementRef={captureElementRef} />
            <Button onClick={onClickEdit}>정산 수정하기</Button>
            <Button style="outline" onClick={onClickDelete}>
              정산 삭제하기
            </Button>
          </ButtonWrapper>
        </ResultContextProvider>
      </PageLayout>

      <Modal />
    </>
  );
}
