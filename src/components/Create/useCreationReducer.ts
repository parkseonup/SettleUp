import { Dispatch, useReducer } from 'react';
import { Settlement } from '../../types/Settlement';
import { getId } from '../../utils/getId';
import { substractNumbers } from '../../utils/math';
import { Action } from './useCreationReducer.type';
import { getDateToString } from '@seonup/use-calendar';

export default function useCreationReducer(
  defaultData?: Settlement,
): [Settlement, Dispatch<Action>] {
  return useReducer(CreactionReducer, defaultData || defaultSettlement);
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
    // place
    case 'addPlace': {
      return {
        ...settlement,
        place: [
          ...settlement.place,
          {
            id: `place_${getId()}`,
            name: '',
            amount: 0,
            participants: [],
            sub: [],
          },
        ],
      };
    }
    case 'changePlaceName': {
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
              ? { ...item, ...action.data, sub: [] }
              : {
                  ...item,
                  amount: 0,
                  sub: [],
                }
            : item,
        ),
      };
    }
    case 'toggleSelectedPlaceParticipant': {
      return {
        ...settlement,
        place: settlement.place.map((item) =>
          item.id === action.id
            ? item.participants.includes(action.participant)
              ? {
                  ...item,
                  participants: item.participants.filter(
                    (participant) => participant !== action.participant,
                  ),
                }
              : { ...item, participants: [...item.participants, action.participant] }
            : item,
        ),
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
                    id: `place_sub_${getId()}`,
                    name: action.subName ?? '',
                    amount:
                      action.subAmount ??
                      substractNumbers(
                        item.amount,
                        item.sub.map(({ amount }) => amount),
                      ),
                    participants: [],
                  },
                ],
              }
            : item,
        ),
      };
    }
    case 'changeSubPlaceName': {
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
            // 변경될 sub의 index를 구하고, 해당 subItem의 값을 변경한다.
            const changedIndex = item.sub.findIndex(
              (sub) => sub.id === action.subItem.id,
            );

            // 2. 변경될 값이 amount인 경우

            // 총 금액에서 sub의 0부터 changedIndex까지의 금액을 뺀다.
            const remainderAmount = substractNumbers(item.amount, [
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
                    id: `place_sub_${getId()}`,
                    name: '',
                    amount: remainderAmount,
                    participants: [],
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
    case 'toggleSelectedSubPlaceParticipant': {
      return {
        ...settlement,
        place: settlement.place.map((item) =>
          item.id === action.id
            ? {
                ...item,
                sub: item.sub.map((subItem) =>
                  subItem.id === action.subId
                    ? subItem.participants.includes(action.participant)
                      ? {
                          ...subItem,
                          participants: subItem.participants.filter(
                            (participant) => participant !== action.participant,
                          ),
                        }
                      : {
                          ...subItem,
                          participants: [...subItem.participants, action.participant],
                        }
                    : subItem,
                ),
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
    // payment
    case 'changePayer': {
      return {
        ...settlement,
        payment: {
          ...settlement.payment,
          payer: action.payer,
        },
      };
    }
    case 'toggleSelectedPaymentMethod': {
      const { selectedPaymentMethods } = settlement.payment;
      const willDeletePaymentMethod = selectedPaymentMethods.includes(
        action.paymentMethod,
      );

      return {
        ...settlement,
        payment: {
          ...settlement.payment,
          selectedPaymentMethods: willDeletePaymentMethod
            ? selectedPaymentMethods.filter(
                (paymentMethod) => paymentMethod !== action.paymentMethod,
              )
            : [...selectedPaymentMethods, action.paymentMethod],
          bankTransfer:
            action.paymentMethod === '계좌송금' && willDeletePaymentMethod
              ? {
                  bankName: '',
                  accountNumber: '',
                }
              : settlement.payment.bankTransfer,
        },
      };
    }
    case 'changeBankTransfer': {
      return {
        ...settlement,
        payment: {
          ...settlement.payment,
          bankTransfer: action.data,
        },
      };
    }
  }
}

const defaultSettlement: Settlement = {
  id: `settlement_${+new Date()}_${getId()}`,
  title: '',
  date: getDateToString(new Date()),
  place: [
    {
      id: `place_${getId()}`,
      name: '',
      amount: 0,
      participants: [],
      sub: [],
    },
  ],
  payment: {
    payer: '',
    paymentMethods: ['계좌송금', '카카오페이', '토스'],
    selectedPaymentMethods: ['계좌송금'],
    bankTransfer: {
      bankName: '',
      accountNumber: '',
    },
  },
};
