import ButtonToMoveMonth from './ButtonToMoveMonth';
import { useCalendar, getDate, getDateToString } from '@seonup/use-calendar';
import { SyntheticEvent } from 'react';
import { colors } from '../../../styles/variables/colors';
import Title from '../Title';
import { visibilityHidden } from '../../../styles/common/displays';
import { days } from '../../../variables/days';

interface Props {
  seletedDate: string;
  onChange: (e: SyntheticEvent) => void;
}

// TODO: 오늘 이후로 클릭 안되게 endDate 추가하기
export default function DatePicker({ seletedDate, onChange }: Props) {
  const {
    headers: {
      current: { year, month },
    },
    body: { value: monthly, today },
    view: { movePrevMonth, moveNextMonth },
  } = useCalendar({ showDate: seletedDate, showFixedNumberOfWeeks: 6, locale: 'ko-KR' });

  return (
    <section
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '16px',
        border: `1px solid ${colors.LIGHT_GRAY}`,
        borderRadius: '20px',
      }}
    >
      <header
        css={{
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <Title as="h4" font="size200">
          {year}년 {month + 1}월
        </Title>

        <nav
          css={{
            position: 'absolute',
            top: '50%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: 'translateY(-50%)',
          }}
        >
          <ButtonToMoveMonth
            direction="prev"
            onClick={movePrevMonth}
            label="이전 달 출력"
          />
          <ButtonToMoveMonth
            direction="next"
            onClick={moveNextMonth}
            label="다음 달 출력"
          />
        </nav>
      </header>

      <table
        css={{
          width: '100%',
          margin: '-8px 0',
          fontSize: '13px',
          textAlign: 'center',
          borderCollapse: 'separate',
          borderSpacing: '0 8px',
        }}
      >
        <thead>
          <tr>
            {days.map((day) => (
              <th
                scope="col"
                key={day}
                css={{
                  width: '32px',
                  height: '32px',
                  fontWeight: 400,
                  color: colors.DARK_GRAY,
                }}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody onChange={onChange}>
          {monthly.map(({ value: weekly, key }) => (
            <tr key={key}>
              {weekly.map(({ value: date, key, status }) => {
                const fullDateString = getDateToString(date);
                const _seletedDate = seletedDate || getDateToString(today);

                return (
                  <td key={key}>
                    <input
                      type="radio"
                      id={fullDateString}
                      name="date"
                      css={visibilityHidden}
                      value={fullDateString}
                      defaultChecked={fullDateString === _seletedDate}
                    />
                    <label
                      htmlFor={fullDateString}
                      css={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        margin: '0 auto',
                        color:
                          _seletedDate === fullDateString
                            ? colors.POINT
                            : status === 'thisMonth'
                            ? colors.DARK_GRAY
                            : colors.LIGHT_GRAY,
                        backgroundColor: 'transparent',
                        borderRadius: '100px',
                        cursor: 'pointer',

                        'input:checked + &': {
                          color: colors.WHITE,
                          backgroundColor: colors.BLACK,
                        },
                      }}
                    >
                      {getDate(date)}
                    </label>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
