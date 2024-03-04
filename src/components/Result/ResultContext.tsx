import { ReactNode, createContext, useContext, useMemo } from 'react';
import { Payment, PlaceInfo, Settlement } from '../../types/Settlement';
import { ceilToTen } from '../../utils/math';

interface ContextValue extends Settlement {
  hasAccount: boolean;
  etcPaymentMethods: Payment['selectedPaymentMethods'];
  personalAmountList: PersonalAmountData;
}

const ResultContext = createContext<ContextValue | null>(null);

interface ResultContextProviderProps {
  value: Settlement;
  children: ReactNode;
}

export interface PersonalAmountData {
  [key: PlaceInfo['participants'][number]]: PlaceInfo['amount'];
}

export default function ResultContextProvider({
  value,
  children,
}: ResultContextProviderProps) {
  const { place, payment } = value;
  const { selectedPaymentMethods } = payment;
  const hasAccount = selectedPaymentMethods.includes('계좌송금');
  const etcPaymentMethods = selectedPaymentMethods.filter(
    (paymentMethod) => paymentMethod !== '계좌송금',
  );

  const personalAmountList = useMemo(
    () =>
      place.reduce<PersonalAmountData>((list, placeItem) => {
        if (placeItem.sub.length > 0) {
          placeItem.sub.forEach((subItem) => {
            const quotient = subItem.amount / subItem.participants.length;

            subItem.participants.forEach((participant) => {
              list[participant] = (list[participant] || 0) + quotient;
            });
          });

          Object.keys(list).forEach((person) => {
            list[person] = ceilToTen(list[person]);
          });

          return list;
        }

        const quotient = placeItem.amount / placeItem.participants.length;

        placeItem.participants.forEach((participant) => {
          list[participant] = (list[participant] || 0) + quotient;
        });

        Object.keys(list).forEach((person) => {
          list[person] = ceilToTen(list[person]);
        });

        return list;
      }, {}),
    [],
  );

  return (
    <ResultContext.Provider
      value={{
        ...value,
        hasAccount,
        etcPaymentMethods,
        personalAmountList,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
}

export function useResultContext() {
  const contextValue = useContext(ResultContext);

  if (!contextValue) throw new Error('provider에 value 값이 전달되지 않았습니다.');

  return contextValue;
}
