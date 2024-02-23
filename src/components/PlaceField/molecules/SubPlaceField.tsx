import { Dispatch, SetStateAction } from 'react';
import SublistItem from '../../common/molecules/SublistItem';
import AmountInput from '../atoms/AmountInput';
import TitleInput from '../atoms/TitleInput';
import { PlaceInfo } from '../../../types/Settlement';
import { Action } from '../../Create/useCreationReducer.type';
import DeleteButton from '../atoms/DeleteButton';

interface Props {
  data: PlaceInfo;
  placeId: PlaceInfo['id'];
  disabledDelete?: boolean;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<Props['isActive']>>;
  dispatch: Dispatch<Action>;
}

export default function SubPlaceField({
  data,
  placeId,
  disabledDelete,
  isActive,
  setIsActive,
  dispatch,
}: Props) {
  return (
    <SublistItem
      insideStyle={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 60px',
      }}
      as={
        <TitleInput
          name={`placeSubTitle-${placeId}-${data.id}`}
          value={data.title}
          placeholder="분류명"
          onChange={(e) => {
            dispatch({
              type: 'changeSubPlaceTitle',
              id: placeId,
              subItem: { ...data, title: e.target.value },
            });
          }}
          required={true}
        />
      }
    >
      <AmountInput
        name={`placeSubAmount-${placeId}-${data.id}`}
        amount={data.amount}
        onChange={(e) => {
          dispatch({
            type: 'changeSubPlaceAmount',
            id: placeId,
            subItem: { ...data, amount: +e.target.value },
          });
        }}
        css={{
          fontSize: '12px',
        }}
        required={true}
      />

      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '4px',
        }}
      >
        {disabledDelete ? null : (
          <DeleteButton
            isActive={isActive}
            css={{
              width: '16px',
              height: '16px',
            }}
            onClick={() => {
              dispatch({
                type: 'deleteSubPlace',
                id: placeId,
                subId: data.id,
              });
              setIsActive(false);
            }}
          />
        )}
      </div>
    </SublistItem>
  );
}
