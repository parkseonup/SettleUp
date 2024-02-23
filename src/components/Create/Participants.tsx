import { Dispatch } from 'react';
import { Settlement } from '../../types/Settlement';
import { Action } from './useCreationReducer.type';
import Section from '../common/molecules/Section';
import MultiSelect from '../MultiSelect/molecules/MultiSelect';
import ButtonWrapper from '../common/atoms/ButtonWrapper';
import Button from '../common/atoms/Button';

interface Props {
  data: Settlement;
  dispatch: Dispatch<Action>;
}

export default function Participants({ data, dispatch }: Props) {
  const allParticipants = [
    ...new Set(
      data.place.flatMap((currentItem) => {
        return [
          ...currentItem.sub.flatMap(({ participants }) => participants),
          ...currentItem.participants,
        ];
      }),
    ),
  ];

  return (
    <>
      <Section title="4. 장소별 인원 선택 (다중 선택 가능)">
        {data.place.map((placeItem) => {
          if (placeItem.sub.length === 0) {
            return (
              <MultiSelect
                key={placeItem.id}
                title={placeItem.title}
                summary={placeItem.participants.length || null}
              >
                <MultiSelect.Content
                  options={allParticipants}
                  value={placeItem.participants}
                  onChange={(participant) =>
                    dispatch({
                      type: 'togglePlaceParticipant',
                      id: placeItem.id,
                      participant,
                    })
                  }
                >
                  <MultiSelect.AddInput
                    label="이름 입력"
                    addOption={(participant) => {
                      dispatch({
                        type: 'togglePlaceParticipant',
                        id: placeItem.id,
                        participant,
                      });
                    }}
                  />
                </MultiSelect.Content>
              </MultiSelect>
            );
          } else {
            return (
              <MultiSelect key={placeItem.id} title={placeItem.title}>
                {placeItem.sub.map((subItem) => (
                  <MultiSelect.Content
                    key={subItem.id}
                    title={subItem.title}
                    summary={subItem.participants.length || null}
                    options={allParticipants}
                    value={subItem.participants}
                    onChange={(participant) =>
                      dispatch({
                        type: 'toggleSubPlaceParticipant',
                        id: placeItem.id,
                        subId: subItem.id,
                        participant,
                      })
                    }
                  >
                    <MultiSelect.AddInput
                      label="이름 입력"
                      addOption={(participant) => {
                        dispatch({
                          type: 'toggleSubPlaceParticipant',
                          id: placeItem.id,
                          subId: subItem.id,
                          participant,
                        });
                      }}
                    />
                  </MultiSelect.Content>
                ))}
              </MultiSelect>
            );
          }
        })}
      </Section>
      <ButtonWrapper>
        <Button type="submit" style="point">
          다음
        </Button>
      </ButtonWrapper>
    </>
  );
}
