import { FormEvent, useState } from 'react';
import PageLayout from '../components/pageLayout/organisms/PageLayout';
import Select from '../components/common/molecules/Select';
import DatePicker from '../components/DatePicker/molecules/DatePicker';
import InputField from '../components/InputField/molecules/InputField';
import MultiSelect from '../components/MultiSelect/molecules/MultiSelect';

// 샘플 코드
export default function New() {
  const [participants, setParticipants] = useState(defaultParticipants);

  // select
  const [bankList] = useState(defaultBankList);
  const [selectedBank, setSelectedBank] = useState('');
  const [selectTreasurer, setSelectTreasurer] = useState('');

  // 날짜
  const [selectedDate, setSeletedDate] = useState<Date>(new Date());

  // multiSelect
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  const handleSelectParticipants = (participant: string) => {
    const newSelectedParticipants = selectedParticipants.includes(participant)
      ? selectedParticipants.filter(
          (selectedParticipant) => selectedParticipant !== participant,
        )
      : [...selectedParticipants, participant];

    setSelectedParticipants(newSelectedParticipants);
  };

  const handleAddParticipants = (participant: string) => {
    if (!participant) return;

    setParticipants([...participants, participant]);
    handleSelectParticipants(participant);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <PageLayout title="정산 만들기" description="클라이밍 원정">
      <form onSubmit={onSubmit}>
        <InputField label="예금주 이름">
          <InputField.Input />
        </InputField>

        <DatePicker selectedDate={selectedDate} onSelect={setSeletedDate} />

        <Select
          label="은행 선택"
          options={bankList}
          value={selectedBank}
          setValue={setSelectedBank}
        />

        <Select
          label="총무 선택"
          options={participants}
          value={selectTreasurer}
          setValue={setSelectTreasurer}
        />

        <MultiSelect title="포차차" summary={selectedParticipants.length || null}>
          <MultiSelect.Content
            options={participants}
            value={selectedParticipants}
            onChange={handleSelectParticipants}
          >
            <MultiSelect.AddInput label="이름 입력" addOption={handleAddParticipants} />
          </MultiSelect.Content>
        </MultiSelect>

        <MultiSelect title="퍼블릭" summary={selectedParticipants.length || null}>
          <MultiSelect.Content
            title="1팀"
            summary={selectedParticipants.length || null}
            options={participants}
            value={selectedParticipants}
            onChange={handleSelectParticipants}
          >
            <MultiSelect.AddInput label="이름 입력" addOption={handleAddParticipants} />
          </MultiSelect.Content>
        </MultiSelect>
      </form>
    </PageLayout>
  );
}

const defaultBankList = ['카카오페이', '계좌'];
const defaultParticipants = ['홍길동', '김철수', '이영희'];
