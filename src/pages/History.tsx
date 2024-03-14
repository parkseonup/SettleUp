import { useEffect, useState } from 'react';
import PageLayout from '../components/common/pageLayout/PageLayout';
import { Settlement } from '../types/Settlement';
import SublistItem from '../components/common/SublistItem';
import { separateComma } from '../utils/separateComma';
import { colors } from '../styles/variables/colors';
import ButtonWrapper from '../components/common/ButtonWrapper';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import Modal from '../components/common/Modal/Modal';
import { buttonColors, defaultButtonStyle } from '../styles/common/buttons';

export default function History() {
  const [list, setList] = useState<Settlement[]>([]);
  const [showResetModal, setShowResetModal] = useState(false);

  list.sort((a, b) => +new Date(a.date) - +new Date(b.date));

  useEffect(() => {
    const localJSONData = localStorage.getItem('SETTLE_UP');

    if (localJSONData) setList(JSON.parse(localJSONData));
  }, []);

  return (
    <>
      <PageLayout title="정산 목록">
        <ul
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {list.map((item) => (
            <li
              key={item.id}
              css={{
                padding: '16px',
                fontSize: '14px',
                border: `1px solid ${colors.LIGHT_GRAY}`,
                borderRadius: '20px',
              }}
            >
              <Link to={`/history/${item.id}`}>
                <div
                  css={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <h3
                    css={{
                      fontWeight: 500,
                      color: colors.BLACK,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    css={{
                      color: colors.DARK_GRAY,
                    }}
                  >
                    {item.date}
                  </p>
                </div>
                <ul
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    marginTop: '12px',
                  }}
                >
                  {item.place.map((placeItem) => (
                    <SublistItem key={placeItem.id} title={placeItem.title}>
                      {separateComma(placeItem.amount)} 원
                    </SublistItem>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>

        <ButtonWrapper>
          <Link
            css={{
              ...defaultButtonStyle,
              ...buttonColors['fill'],
            }}
            to="/create"
          >
            정산 추가하기
          </Link>
          {list.length > 0 ? (
            <Button onClick={() => setShowResetModal(true)}>목록 초기화</Button>
          ) : null}
        </ButtonWrapper>
      </PageLayout>

      <Modal
        isOpen={showResetModal}
        footer={
          <Button
            style="point"
            onClick={() => {
              localStorage.removeItem('SETTLE_UP');
              setList([]);
              setShowResetModal(false);
            }}
          >
            초기화 하기
          </Button>
        }
        onClose={() => setShowResetModal(false)}
      >
        <p>목록을 초기화 하시겠습니까?</p>
      </Modal>
    </>
  );
}
