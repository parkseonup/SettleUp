import { Params } from 'react-router-dom';
import { Settlement } from '../apis/data';

export const historyDetailLoader = ({ params }: { params: Params<string> }) => {
  const localData = localStorage.getItem('SETTLE_UP');

  if (!localData) throw new Error('저장 목록에 저장된 내용이 없습니다.');

  const targetData = (JSON.parse(localData) as Settlement[]).find(
    (item) => item.id === params.id,
  );

  if (!targetData) throw new Error(`${params.id}에 해당하는 결과를 찾을 수 없습니다.`);

  return { data: targetData };
};
