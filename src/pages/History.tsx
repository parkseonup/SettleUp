import { useEffect, useState } from 'react';
import PageLayout from '../components/common/pageLayout/PageLayout';
import { Settlement } from '../types/Settlement';
import SublistItem from '../components/common/SublistItem';
import { separateComma } from '../utils/separateComma';
import { colors } from '../styles/variables/colors';
import ButtonWrapper from '../components/common/ButtonWrapper';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';

export default function History() {
  const [list, setList] = useState<Settlement[]>([]);
  const navigate = useNavigate();

  list.sort((a, b) => +new Date(a.date) - +new Date(b.date));

  useEffect(() => {
    const localJSONData = localStorage.getItem('SETTLE_UP');

    if (localJSONData) setList(JSON.parse(localJSONData));
  }, []);

  // TODO: id 만들기
  return (
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
        <Button
          style="point"
          onClick={() => {
            navigate('/create');
          }}
        >
          정산 추가하기
        </Button>
        {list.length > 0 ? (
          <Button
            onClick={() => {
              localStorage.removeItem('SETTLE_UP');
            }}
          >
            목록 초기화
          </Button>
        ) : null}
      </ButtonWrapper>
    </PageLayout>
  );
}
