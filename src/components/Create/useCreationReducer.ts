import { Dispatch, useEffect, useReducer } from 'react';
import { Settlement } from '../../types/Settlement';
import { getId } from '../../utils/getId';
import { substract } from '../../utils/substract';
import { Action } from './useCreationReducer.type';
import CreationService, { CreationServiceType } from '../../services/CreationService';

export default function useCreationReducer(): [
  Settlement,
  Dispatch<Action>,
  CreationServiceType<Settlement>,
] {
  const [data, dispatch] = useReducer(CreactionReducer, defaultSettlement);
  const service = new CreationService<Settlement>();

  // 로컬에 저장하고, dispatch 실행
  // 로컬에 늘 저장해야해? ㄴㄴ -> 다음 페이지 넘어갈 때

  useEffect(() => {
    const _data = service.get();
    if (_data) dispatch({ type: 'set', data: _data });
  }, []);

  return [data, dispatch, service];
}

function CreactionReducer(settlement: Settlement, action: Action) {
  switch (action.type) {
    case 'set': {
      return action.data;
    }
    case 'remove': {
      return defaultSettlement;
    }
    // title
    case 'changeTitle': {
      return {
        ...settlement,
        title: action.title,
      };
    }
    // date
    case 'changeDate': {
      return {
        ...settlement,
        date: action.date,
      };
    }
    // transfer
    case 'changeTransfer': {
      return {
        ...settlement,
        transfer: action.transfer,
      };
    }
    // place
    case 'addPlace': {
      return {
        ...settlement,
        place: [
          ...settlement.place,
          {
            id: `place_${getId()}`,
            title: '',
            amount: 0,
            participants: new Set<string>(),
            sub: [],
          },
        ],
      };
    }
    case 'changePlaceTitle': {
      return {
        ...settlement,
        place: settlement.place.map((item) =>
          item.id === action.data.id ? { ...item, ...action.data } : item,
        ),
      };
    }
    case 'changePlaceAmount': {
      return {
        ...settlement,
        place: settlement.place.map((item) =>
          item.id === action.data.id
            ? action.data.amount > 0
              ? { ...item, ...action.data }
              : item
            : item,
        ),
      };
    }
    case 'togglePlaceParticipant': {
      return {
        ...settlement,
        place: settlement.place.map((item) => {
          if (item.id === action.id) {
            if (item.participants.has(action.participant)) {
              item.participants.delete(action.participant);
              return item;
            }

            return { ...item, participants: item.participants.add(action.participant) };
          }

          return item;
        }),
      };
    }
    case 'deletePlace': {
      return {
        ...settlement,
        place: settlement.place.filter((item) => item.id !== action.id),
      };
    }
    case 'addSubPlace': {
      return {
        ...settlement,
        place: settlement.place.map((item) =>
          item.id === action.id
            ? {
                ...item,
                sub: [
                  ...item.sub,
                  {
                    id: `place_${getId()}`,
                    title: action.subTitle ?? '',
                    amount:
                      action.subAmount ??
                      substract(
                        item.amount,
                        item.sub.map(({ amount }) => amount),
                      ),
                    participants: new Set<string>(),
                  },
                ],
              }
            : item,
        ),
      };
    }
    case 'changeSubPlaceTitle': {
      return {
        ...settlement,
        place: settlement.place.map((item) =>
          item.id === action.id
            ? {
                ...item,
                sub: item.sub.map((subItem) =>
                  subItem.id === action.subItem.id ? action.subItem : subItem,
                ),
              }
            : item,
        ),
      };
    }
    case 'changeSubPlaceAmount': {
      return {
        ...settlement,
        place: settlement.place.map((item) => {
          if (item.id === action.id) {
            if (action.subItem.amount <= 0) return item;

            // 변경될 sub의 index를 구하고, 해당 subItem의 값을 변경한다.
            const changedIndex = item.sub.findIndex(
              (sub) => sub.id === action.subItem.id,
            );

            // 2. 변경될 값이 amount인 경우

            // 총 금액에서 sub의 0부터 changedIndex까지의 금액을 뺀다.
            const remainderAmount = substract(item.amount, [
              ...item.sub.slice(0, changedIndex).map(({ amount }) => amount),
              action.subItem.amount,
            ]);

            // 나머지 금액이 0이면, changedIndex 이후의 subItem을 제거한다.
            if (remainderAmount === 0) {
              return {
                ...item,
                sub: [...item.sub.slice(0, changedIndex), action.subItem],
              };
            }
            // 나머지 금액이 0보다 크면, changedIndex 이후의 subItem 금액을 조절한다.
            else if (remainderAmount > 0) {
              return {
                ...item,
                sub: [
                  ...item.sub.slice(0, changedIndex),
                  action.subItem,
                  {
                    id: `place_${getId()}`,
                    title: '',
                    amount: remainderAmount,
                    participants: new Set<string>(),
                  },
                ],
              };
            }

            // 나머지 금액이 0보다 작으면 기존 값으로 돌린다.
            return item;
          }

          return item;
        }),
      };
    }
    case 'toggleSubPlaceParticipant': {
      return {
        ...settlement,
        place: settlement.place.map((item) =>
          item.id === action.id
            ? {
                ...item,
                sub: item.sub.map((subItem) => {
                  if (subItem.id === action.subId) {
                    if (subItem.participants.has(action.participant)) {
                      subItem.participants.delete(action.participant);
                      return subItem;
                    }

                    return {
                      ...subItem,
                      participants: subItem.participants.add(action.participant),
                    };
                  }

                  return subItem;
                }),
              }
            : item,
        ),
      };
    }
    case 'deleteSubPlace': {
      return {
        ...settlement,
        place: settlement.place.map((item) => {
          if (item.id === action.id) {
            let deletedAmount = 0;
            let previousId = '';

            return {
              ...item,
              sub: item.sub
                .filter(({ id, amount }, i) => {
                  if (id === action.subId) {
                    deletedAmount = amount;
                    previousId = item.sub[i - 1]?.id ?? '';
                  }

                  return id !== action.subId;
                })
                .map((subItem) =>
                  previousId === subItem.id
                    ? {
                        ...subItem,
                        amount: subItem.amount + deletedAmount,
                      }
                    : subItem,
                ),
            };
          }

          return item;
        }),
      };
    }
  }
}

const defaultSettlement: Settlement = {
  title: '',
  date: '',
  place: [
    {
      id: '',
      title: '',
      amount: 0,
      participants: new Set<string>(),
      sub: [],
    },
  ],
  transfer: {
    account: {
      bankName: '',
      accountHolderName: '',
      accountNumber: 0,
    },
    kakaoPay: true,
    toss: true,
  },
};
