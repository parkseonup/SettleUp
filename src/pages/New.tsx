import { useState } from 'react';
import InputField from '../components/InputField/molecules/InputField';
import Select from '../components/common/molecules/Select';

// 샘플 코드
export default function New() {
  const [bankList] = useState(defaultBankList);
  const [selectedBank, setSelectedBank] = useState('');

  return (
    <form>
      <InputField label="예금주 이름">
        <InputField.Input />
      </InputField>

      <Select label="은행 선택" options={bankList} value={selectedBank} setValue={setSelectedBank} />
    </form>
  );
}

const defaultBankList = ['카카오페이', '계좌'];
