import { useReducer } from 'react';
import { PlaceList } from '../PlaceFields.type';
import { Action } from './PlaceReducer.type';
import { getId } from '../../../utils/getId';
import { substract } from '../../../utils/substract';

export default function usePlaceReducer() {
  return useReducer(PlaceReducer, defaultPlaceList);
}

function PlaceReducer(placeList: PlaceList, action: Action) {
  switch (action.type) {
    case 'add': {
      return [...placeList, { id: getId(), title: '', amount: 0, sub: [] }];
    }
    case 'change': {
      return placeList.map((item) =>
        item.id === action.data.id ? { ...item, ...action.data } : item,
      );
    }
    case 'delete': {
      return placeList.filter((item) => item.id !== action.id);
    }
    case 'addSub': {
      return placeList.map((item) =>
        item.id === action.id
          ? {
              ...item,
              sub: [
                ...item.sub,
                {
                  id: getId(),
                  title: action.subTitle ?? '',
                  amount:
                    action.subAmount ??
                    substract(
                      item.amount,
                      item.sub.map(({ amount }) => amount),
                    ),
                },
              ],
            }
          : item,
      );
    }
    case 'changeSub': {
      return placeList.map((item) => {
        if (item.id === action.id) {
          // 변경될 sub의 index를 구하고, 해당 subItem의 값을 변경한다.
          const changedIndex = item.sub.findIndex((sub) => sub.id === action.subItem.id);
          const originAmount = item.sub[changedIndex].amount;
          item.sub[changedIndex] = action.subItem;

          // 1. 변경될 값이 title인 경우
          if (originAmount === action.subItem.amount) {
            return item;
          }

          // 2. 변경될 값이 amount인 경우

          // 총 금액에서 sub의 0부터 changedIndex까지의 금액을 뺀다.
          const remainderAmount = substract(
            item.amount,
            item.sub.slice(0, changedIndex + 1).map(({ amount }) => amount),
          );

          // 나머지 금액이 0이면, changedIndex 이후의 subItem을 제거한다.
          if (remainderAmount === 0) {
            return {
              ...item,
              sub: item.sub.slice(0, changedIndex + 1),
            };
          }
          // 나머지 금액이 0보다 크면, changedIndex 이후의 subItem 금액을 조절한다.
          else if (remainderAmount > 0) {
            return {
              ...item,
              sub: [
                ...item.sub.slice(0, changedIndex + 1),
                {
                  id: getId(),
                  title: '',
                  amount: remainderAmount,
                },
              ],
            };
          }

          // 나머지 금액이 0보다 작으면 기존 값으로 돌린다.
          item.sub[changedIndex].amount = originAmount;
          return item;
        }

        return item;
      });
    }
    case 'deleteSub': {
      return placeList.map((item) => {
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
      });
    }
  }
}

const defaultPlaceList = [
  {
    id: getId(),
    title: '',
    amount: 0,
    sub: [],
  },
];
