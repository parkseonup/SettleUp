import { useState } from 'react';
import InputField from '../components/InputField/molecules/InputField';
import Select from '../components/common/molecules/Select';
import PageLayout from '../components/pageLayout/organisms/PageLayout';

// 샘플 코드
export default function New() {
  const [bankList] = useState(defaultBankList);
  const [selectedBank, setSelectedBank] = useState('');

  return (
    <PageLayout title="정산 만들기" description="클라이밍 원정">
      <form>
        <InputField label="예금주 이름">
          <InputField.Input />
        </InputField>

        <Select label="은행 선택" options={bankList} value={selectedBank} setValue={setSelectedBank} />
      </form>
    </PageLayout>
  );
}

const defaultBankList = ['카카오페이', '계좌'];
