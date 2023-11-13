import { css } from '@emotion/react';
import uesCalendar from '../atoms/useCalendar';
import Title from '../../common/atoms/Title';
import { ElementType } from 'react';
import ButtonToMoveMonth from '../atoms/ButtonToMoveMonth';
import { getDate, getDateToString } from '../atoms/date-utils';
import { colors } from '../../../styles/variables/colors';

interface Props {
  onSelect: (date: Date) => any;
  selectedDate: Date | null;
  startDate?: Date;
  endDate?: Date;
  titleAs: ElementType;
}

const days = ['일', '월', '화', '수', '목', '금', '토'];

export default function DatePicker({ onSelect, selectedDate, titleAs }: Props) {
  const {
    headers: {
      current: { year, month },
    },
    body: { value: monthly, today },
    view: { movePrevMonth, moveNextMonth },
  } = uesCalendar({ showFixedNumberOfWeeks: 6, locale: 'ko-KR' });

  return (
    <section
      css={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '16px',
        border: `1px solid ${colors.LIGHT_GRAY}`,
        borderRadius: '20px',
      })}
    >
      <header
        css={css({
          position: 'relative',
          textAlign: 'center',
        })}
      >
        <Title
          as={titleAs}
          customStyle={{
            fontWeight: 600,
          }}
        >
          {year}년 {month + 1}월
        </Title>

        <nav
          css={css({
            position: 'absolute',
            top: '50%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: 'translateY(-50%)',
          })}
        >
          <ButtonToMoveMonth direction="prev" onClick={movePrevMonth} label="이전 달 출력" />
          <ButtonToMoveMonth direction="next" onClick={moveNextMonth} label="다음 달 출력" />
        </nav>
      </header>

      <table
        css={css({
          width: '100%',
          margin: '-8px 0',
          fontSize: '13px',
          textAlign: 'center',
          borderCollapse: 'separate',
          borderSpacing: '0 8px',
        })}
      >
        <thead>
          <tr>
            {days.map((day) => (
              <th
                scope="col"
                key={day}
                css={css({
                  width: '32px',
                  height: '32px',
                  fontWeight: 400,
                  color: colors.DARK_GRAY,
                })}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {monthly.map(({ value: weekly, key }) => (
            <tr key={key} css={css({})}>
              {weekly.map(({ value: date, key, status }) => {
                const fullDateString = getDateToString(date);

                return (
                  <td key={key}>
                    <button
                      onClick={() => {
                        onSelect(date);
                      }}
                    >
                      <time
                        dateTime={fullDateString}
                        css={css({
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '32px',
                          height: '32px',
                          color:
                            date === selectedDate
                              ? colors.WHITE
                              : status === 'thisMonth'
                              ? colors.DARK_GRAY
                              : colors.LIGHT_GRAY,
                          backgroundColor: date === selectedDate ? colors.BLACK : 'transparent',
                          border: `1px solid ${
                            getDateToString(today) === fullDateString ? colors.LIGHT_GRAY : 'transparent'
                          }`,
                          borderRadius: '100px',
                        })}
                      >
                        {getDate(date)}
                      </time>
                    </button>
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
