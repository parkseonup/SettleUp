import { Dispatch, KeyboardEvent, useState } from 'react';
import { Settlement } from '../../types/Settlement';
import Button from '../common/Button/Button';
import ButtonWrapper from '../common/Button/ButtonWrapper';
import Section from '../common/Section';
import Select from '../common/Select';
import SingleInput from '../common/SingleInput';
import { Action } from './useCreationReducer.type';
import MultiSelect from '../common/MultiSelect/MultiSelect';

interface Props {
  data: Settlement;
  dispatch: Dispatch<Action>;
}

export default function Payment({ data, dispatch }: Props) {
  const { payer, paymentMethods, selectedPaymentMethods, bankTransfer } = data.payment;
  const [selfWritingMode, setSelfWritingMode] = useState(false);

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
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <Section title="5. 송금 정보">
          <MultiSelect title="송금처" required={true}>
            <MultiSelect.Content
              options={paymentMethods}
              value={selectedPaymentMethods}
              onChange={(paymentMethod) => {
                dispatch({ type: 'toggleSelectedPaymentMethod', paymentMethod });
              }}
            ></MultiSelect.Content>
          </MultiSelect>

          <Select
            label="결제자 선택"
            options={[...allParticipants, '직접작성']}
            value={selfWritingMode ? '직접작성' : payer}
            setValue={(payer) => {
              if (payer === '직접작성') {
                setSelfWritingMode(true);
                return;
              }

              dispatch({ type: 'changePayer', payer });
              setSelfWritingMode(false);
            }}
            required={true}
          />

          {selfWritingMode ? (
            <SingleInput
              label="결제자 이름"
              value={payer}
              onChange={(e) => {
                dispatch({ type: 'changePayer', payer: e.target.value });
              }}
              required={true}
            />
          ) : null}

          {selectedPaymentMethods.includes('계좌송금') ? (
            <>
              <SingleInput
                label="은행명"
                value={bankTransfer.bankName}
                onChange={(e) => {
                  dispatch({
                    type: 'changeBankTransfer',
                    data: {
                      ...bankTransfer,
                      bankName: e.target.value,
                    },
                  });
                }}
                required={true}
              />
              <SingleInput
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                label="계좌번호"
                value={bankTransfer.accountNumber || ''}
                css={{
                  appearance: 'none',

                  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                    margin: 0,
                    appearance: 'none',
                  },
                }}
                onChange={(e) => {
                  dispatch({
                    type: 'changeBankTransfer',
                    data: {
                      ...bankTransfer,
                      accountNumber: e.target.value,
                    },
                  });
                }}
                onKeyDown={(e: KeyboardEvent) => {
                  ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
                }}
                required={true}
              />
            </>
          ) : null}
        </Section>
      </div>

      <ButtonWrapper>
        <Button type="submit" style="point">
          정산하기
        </Button>
      </ButtonWrapper>
    </>
  );
}
