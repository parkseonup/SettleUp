import { Dispatch } from 'react';
import { Settlement } from '../../types/Settlement';
import { Action } from './useCreationReducer.type';
import Section from '../common/Section';
import ButtonWrapper from '../common/ButtonWrapper';
import Button from '../common/Button';
import MultiSelect from '../common/MultiSelect/MultiSelect';

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
                title={placeItem.name}
                summary={placeItem.participants.length || null}
                required={true}
              >
                <MultiSelect.Content
                  options={allParticipants}
                  value={placeItem.participants}
                  onChange={(participant) =>
                    dispatch({
                      type: 'toggleSelectedPlaceParticipant',
                      id: placeItem.id,
                      participant,
                    })
                  }
                >
                  <MultiSelect.AddOptionInput
                    label="이름 입력"
                    onSubmit={(participant) => {
                      dispatch({
                        type: 'toggleSelectedPlaceParticipant',
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
              <MultiSelect
                key={placeItem.id}
                title={placeItem.name}
                summary={allParticipants.length}
                required={true}
              >
                {placeItem.sub.map((subItem) => (
                  <MultiSelect.Content
                    key={subItem.id}
                    title={subItem.name}
                    summary={subItem.participants.length || null}
                    options={allParticipants}
                    value={subItem.participants}
                    onChange={(participant) =>
                      dispatch({
                        type: 'toggleSelectedSubPlaceParticipant',
                        id: placeItem.id,
                        subId: subItem.id,
                        participant,
                      })
                    }
                  >
                    <MultiSelect.AddOptionInput
                      label="이름 입력"
                      onSubmit={(participant) => {
                        dispatch({
                          type: 'toggleSelectedSubPlaceParticipant',
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
