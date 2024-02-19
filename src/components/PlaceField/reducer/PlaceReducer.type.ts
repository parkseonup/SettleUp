import { PlaceInfo } from '../PlaceFields.type';

export type Action =
  | { type: 'add' }
  | { type: 'change'; data: PlaceInfo }
  | { type: 'delete'; id: PlaceInfo['id'] }
  | { type: 'addSub'; id: PlaceInfo['id']; subTitle?: string; subAmount?: number }
  | { type: 'changeSub'; id: PlaceInfo['id']; subItem: PlaceInfo }
  | { type: 'deleteSub'; id: PlaceInfo['id']; subId: PlaceInfo['id'] };
