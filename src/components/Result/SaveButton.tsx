import lodash from 'lodash';
import { Settlement } from '../../types/Settlement';
import Button from '../common/Button/Button';
import { crackAccountNumber } from '../../utils/crackAccountNumber';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: Settlement;
}

// NOTE: 저장 버튼 ui
// NOTE: localstorage에 저장된 정산 목록 전부 가져오고 -> 이미 저장된게 있는지 체크하고 ? 있으면 새로 생성 : 없으면 추가
// NOTE: 저장시 정산 목록으로 이동
// TODO: 저장 버튼이 꼭 필요한가 고민해보기
// TODO: localstorage api 분리
// TODO: 정산 목록으로 이동하면 불편하지 않을지 고민해보기
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
            ? localDatas.map((localData) =>
                localData.id === copyData.id ? copyData : localData,
              )
            : [...localDatas, copyData];

        localStorage.setItem('SETTLE_UP', JSON.stringify(newDatas));
        navigate('/history');
      }}
    >
      목록에 저장
    </Button>
  );
}
