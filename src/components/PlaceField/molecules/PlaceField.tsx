import { colors } from '../../../styles/variables/colors';
import { Dispatch, FocusEvent, useRef, useState } from 'react';
import AmountInput from '../atoms/AmountInput';
import DeleteButton from '../atoms/DeleteButton';
import TitleInput from '../atoms/TitleInput';
import AddButton from '../atoms/AddButton';
import { PlaceItem } from '../PlaceFields.type';
import { Action } from '../reducer/PlaceReducer.type';
import SubPlaceField from './SubPlaceField';

interface Props {
  data: PlaceItem;
  dispatch: Dispatch<Action>;
}

export default function PlaceField({ data, dispatch }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const toggleFocus = (e: FocusEvent, force?: boolean) => {
    if (!containerRef.current) return;
    if (containerRef.current.contains(e.relatedTarget)) return;

    setIsActive(force ?? !isActive);
  };

  return (
    <div
      ref={containerRef}
      css={{
        padding: '0 16px',
        border: `1px solid ${isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY}`,
        borderRadius: '24px',
      }}
      onFocus={(e) => toggleFocus(e, true)}
      onBlur={(e) => toggleFocus(e, false)}
    >
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr 60px',
          gap: '16px',
          alignItems: 'center',
          height: '48px',
        }}
      >
        <TitleInput
          value={data.title}
          placeholder="장소명"
          onChange={(e) =>
            dispatch({ type: 'change', data: { ...data, title: e.target.value } })
          }
        />
        <AmountInput
          amount={data.amount}
          insideStyle={{
            fontSize: '14px',
          }}
          onChange={(e) => {
            dispatch({
              type: 'change',
              data: { ...data, amount: +e.target.value },
            });
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
          {data.sub.length === 0 ? (
            <AddButton
              isActive={isActive}
              onClick={() => dispatch({ type: 'addSub', id: data.id })}
            />
          ) : null}
          <DeleteButton
            isActive={isActive}
            onClick={() => {
              dispatch({ type: 'delete', id: data.id });
            }}
          />
        </div>
      </div>

      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: Object.keys(data.sub).length > 0 ? '16px' : 0,
        }}
      >
        {data.sub.map((subItem, i) => (
          <SubPlaceField
            key={subItem.id}
            data={subItem}
            parentId={data.id}
            buttonAs={
              i === data.sub.length - 1 ? (
                <DeleteButton
                  isActive={isActive}
                  css={{
                    width: '16px',
                    height: '16px',
                  }}
                  onClick={() =>
                    dispatch({
                      type: 'deleteSub',
                      id: data.id,
                      subId: data.id,
                    })
                  }
                />
              ) : null
            }
            dispatch={dispatch}
          ></SubPlaceField>
        ))}
      </div>
    </div>
  );
}
