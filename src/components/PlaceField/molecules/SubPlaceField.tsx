import { Dispatch, ReactNode } from 'react';
import SublistItem from '../../common/molecules/SublistItem';
import AmountInput from '../atoms/AmountInput';
import TitleInput from '../atoms/TitleInput';
import { PlaceInfo } from '../PlaceFields.type';
import { Action } from '../reducer/PlaceReducer.type';

interface Props {
  data: PlaceInfo;
  parentId: PlaceInfo['id'];
  buttonAs: ReactNode;
  dispatch: Dispatch<Action>;
}

export default function SubPlaceField({ data, parentId, buttonAs, dispatch }: Props) {
  return (
    <SublistItem
      insideStyle={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 60px',
      }}
      as={
        <TitleInput
          value={data.title}
          placeholder="분류명"
          onChange={(e) => {
            console.log(e.target.value);
            dispatch({
              type: 'changeSub',
              id: parentId,
              subItem: { ...data, title: e.target.value },
            });
          }}
        />
      }
    >
      <AmountInput
        amount={data.amount}
        onChange={(e) =>
          dispatch({
            type: 'changeSub',
            id: parentId,
            subItem: { ...data, amount: +e.target.value },
          })
        }
        css={{
          fontSize: '12px',
        }}
      />

      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '4px',
        }}
      >
        {buttonAs}
      </div>
    </SublistItem>
  );
}
