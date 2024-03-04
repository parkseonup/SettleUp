import lodash from 'lodash';
import { Settlement } from '../../types/Settlement';
import Button from '../common/Button';
import { crackAccountNumber } from '../../utils/crackAccountNumber';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: Settlement;
}

export default function SaveButton({ data }: Props) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        const localJSONData = localStorage.getItem('SETTLE_UP');
        const localDatas: Settlement[] = localJSONData ? JSON.parse(localJSONData) : [];
        const targetLocalDataIndex = localDatas.findIndex(
          (localData) => localData.id === data.id,
        );
        const copyData: Settlement = lodash.cloneDeep(data);

        const { accountNumber } = copyData.payment.bankTransfer;

        copyData.payment.bankTransfer.accountNumber = accountNumber
          ? crackAccountNumber(accountNumber)
          : '';

        const newDatas =
          targetLocalDataIndex > -1
            ? localDatas.map((localData) => (localData.id === data.id ? data : localData))
            : [...localDatas, data];

        localStorage.setItem('SETTLE_UP', JSON.stringify(newDatas));
        navigate('/history');
      }}
    >
      목록에 저장
    </Button>
  );
}
