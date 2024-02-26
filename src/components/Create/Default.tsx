import { Dispatch } from 'react';
import { Settlement } from '../../types/Settlement';
import { Action } from './useCreationReducer.type';
import Section from '../common/Section';
import SingleInput from '../common/SingleInput';
import Button from '../common/Button';
import ButtonWrapper from '../common/ButtonWrapper';
import DatePicker from '../common/DatePicker/DatePicker';
import PlaceField from '../common/PlaceField/PlaceField';

interface Props {
  data: Settlement;
  dispatch: Dispatch<Action>;
}

export default function Default({ data, dispatch }: Props) {
  return (
    <>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <Section title="1. 모임 이름 입력">
          <SingleInput
            placeholder="ex) 클라이밍"
            name="title"
            value={data.title}
            required={true}
            onChange={(e) => dispatch({ type: 'changeTitle', title: e.target.value })}
          />
        </Section>

        <Section title="2. 날짜 선택">
          <DatePicker
            seletedDate={data.date}
            onChange={(e) =>
              dispatch({
                type: 'changeDate',
                date: (e.target as HTMLInputElement).value,
              })
            }
          />
        </Section>

        <Section title="3. 장소별 금액 입력">
          {data.place.map((item, i) => (
            <PlaceField
              key={item.id}
              data={item}
              dispatch={dispatch}
              disabledDelete={data.place.length === 1 && i === 0}
            />
          ))}
          <Button onClick={() => dispatch({ type: 'addPlace' })}>장소 추가</Button>
        </Section>
      </div>

      <ButtonWrapper>
        <Button type="submit" style="point">
          다음
        </Button>
      </ButtonWrapper>
    </>
  );
}
