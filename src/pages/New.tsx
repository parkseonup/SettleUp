import { useState } from 'react';
import InputField from '../components/InputField/molecules/InputField';
import PageLayout from '../components/pageLayout/organisms/PageLayout';
import Select from '../components/common/molecules/Select';

// 샘플 코드
export default function New() {
  const [bankList] = useState(defaultBankList);
  const [participants] = useState(defaultParticipants);
  const [selectedBank, setSelectedBank] = useState('');
  const [selectTreasurer, setSelectTreasurer] = useState('');

  return (
    <PageLayout title="정산 만들기" description="클라이밍 원정">
      <form>
        <InputField label="예금주 이름">
          <InputField.Input />
        </InputField>

        <Select label="은행 선택" options={bankList} value={selectedBank} setValue={setSelectedBank} />
        <Select label="총무 선택" options={participants} value={selectTreasurer} setValue={setSelectTreasurer} />
      </form>
    </PageLayout>
  );
}

const defaultBankList = ['카카오페이', '계좌'];
const defaultParticipants = ['홍길동', '김철수', '이영희'];
