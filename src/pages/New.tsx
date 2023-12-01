import { BiDotsHorizontalRounded, BiX } from 'react-icons/bi';
import { colors } from '../styles/variables/colors';
import { css } from '@emotion/react';
import InputField from '../components/InputField/molecules/InputField';

// 샘플 코드
export default function New() {
  return (
    <form>
      <InputField>
        <InputField.Input placeholder="ex) 클라이밍 회식" />
      </InputField>

      <InputField isActive>
        <InputField.Label isActive>예금주 이름</InputField.Label>
        <InputField.Input isActive />
      </InputField>

      <InputField isActive>
        <InputField.Input placeholder="장소명" isActive />
        <InputField.Input placeholder="0000원" />
        <InputField.Controls>
          <button>
            <BiDotsHorizontalRounded
              css={css({
                fontSize: '16px',
                color: colors.LIGHT_GRAY,
              })}
            />
          </button>
          <button>
            <BiX
              css={css({
                fontSize: '20px',
                color: colors.LIGHT_GRAY,
              })}
            />
          </button>
        </InputField.Controls>
      </InputField>

      <InputField isActive>
        <InputField.Input placeholder="장소명" isActive />
        <InputField.Controls>
          <button>
            <BiDotsHorizontalRounded
              css={css({
                fontSize: '16px',
                color: colors.LIGHT_GRAY,
              })}
            />
          </button>
          <button>
            <BiX
              css={css({
                fontSize: '20px',
                color: colors.LIGHT_GRAY,
              })}
            />
          </button>
        </InputField.Controls>
      </InputField>
    </form>
  );
}
