import { useEffect, useState } from 'react';
import PageLayout from '../components/common/pageLayout/PageLayout';
import { Settlement } from '../types/Settlement';
import SublistItem from '../components/common/SublistItem';
import { separateComma } from '../utils/separateComma';
import { colors } from '../styles/variables/colors';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import { buttonColors, defaultButtonStyle } from '../styles/common/buttons';
import ButtonWrapper from '../components/common/ButtonWrapper';
import useModal from '../hooks/useModal';

// NOTE: 정산 목록 ui (정산 개별 내역)
// NOTE: localstorage에서 데이터를 가져와서 정렬해서 출력
// NOTE: 초기화 버튼 클릭시 모달창 관리
// TODO: router loader에서 데이터 받아오는걸로 수정
// TODO: 목록 개별 삭제 기능 추가
export default function History() {
  const [list, setList] = useState<Settlement[]>([]);
  const { createModal, Modal } = useModal();

  list.sort((a, b) => +new Date(a.date) - +new Date(b.date));

  useEffect(() => {
    const localJSONData = localStorage.getItem('SETTLE_UP');

    if (localJSONData) setList(JSON.parse(localJSONData));
  }, []);

  const reset = () => {
    localStorage.removeItem('SETTLE_UP');
    setList([]);
  };

  return (
    <>
      <PageLayout
        title="정산 목록"
        description={
          list.length > 0
            ? '기기의 캐시를 삭제하면 저장된 정산 목록이 초기화되니 유의해주세요!'
            : '저장된 정산 목록이 없습니다.'
        }
      >
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
              ...buttonColors['point'],
            }}
            to="/create"
          >
            정산 추가하기
          </Link>
          {list.length > 0 ? (
            <Button
              onClick={() =>
                createModal(<p>목록을 초기화 하시겠습니까?</p>, {
                  buttomButtons: (
                    <Button style="point" onClick={reset}>
                      초기화 하기
                    </Button>
                  ),
                })
              }
            >
              목록 초기화
            </Button>
          ) : null}
        </ButtonWrapper>
      </PageLayout>

      <Modal />
    </>
  );
}
