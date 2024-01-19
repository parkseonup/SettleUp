import Title from '../../common/atoms/Title';
import ButtonToMoveMonth from '../atoms/ButtonToMoveMonth';
import { colors } from '../../../styles/variables/colors';
import { useCalendar, getDate, getDateToString } from '@seonup/use-calendar';

interface Props {
  onSelect: (date: Date) => any;
  selectedDate: Date | null;
  startDate?: Date;
  endDate?: Date;
}

const days = ['일', '월', '화', '수', '목', '금', '토'];

export default function DatePicker({ onSelect, selectedDate }: Props) {
  const {
    headers: {
      current: { year, month },
    },
    body: { value: monthly, today },
    view: { movePrevMonth, moveNextMonth },
  } = useCalendar({ showFixedNumberOfWeeks: 6, locale: 'ko-KR' });

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
        <tbody>
          {monthly.map(({ value: weekly, key }) => (
            <tr key={key}>
              {weekly.map(({ value: date, key, status }) => {
                const fullDateString = getDateToString(date);
                const selectedDateString = selectedDate
                  ? getDateToString(selectedDate)
                  : null;

                return (
                  <td key={key}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(date);
                      }}
                    >
                      <time
                        dateTime={fullDateString}
                        css={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '32px',
                          height: '32px',
                          color:
                            fullDateString === selectedDateString
                              ? colors.WHITE
                              : status === 'thisMonth'
                              ? colors.DARK_GRAY
                              : colors.LIGHT_GRAY,
                          backgroundColor:
                            fullDateString === selectedDateString
                              ? colors.BLACK
                              : 'transparent',
                          border: `1px solid ${
                            getDateToString(today) === fullDateString
                              ? colors.LIGHT_GRAY
                              : 'transparent'
                          }`,
                          borderRadius: '100px',
                        }}
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
