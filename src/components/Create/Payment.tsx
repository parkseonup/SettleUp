import { Dispatch, KeyboardEvent, useState } from 'react';
import { Settlement } from '../../types/Settlement';
import Button from '../common/atoms/Button';
import ButtonWrapper from '../common/atoms/ButtonWrapper';
import Section from '../common/molecules/Section';
import Select from '../common/molecules/Select';
import SingleInput from '../common/molecules/SingleInput';
import MultiSelect from '../MultiSelect/MultiSelect';
import { Action } from './useCreationReducer.type';

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
                label="계좌번호"
                value={bankTransfer.accountNumber || ''}
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
