import { PlaceInfo, Settlement } from '../../types/Settlement';

type PlaceActions =
  | { type: 'addPlace' }
  | { type: 'changePlaceTitle'; data: PlaceInfo }
  | { type: 'changePlaceAmount'; data: PlaceInfo }
  | { type: 'togglePlaceParticipant'; id: PlaceInfo['id']; participant: string }
  | { type: 'deletePlace'; id: PlaceInfo['id'] }
  | { type: 'addSubPlace'; id: PlaceInfo['id']; subTitle?: string; subAmount?: number }
  | { type: 'changeSubPlaceTitle'; id: PlaceInfo['id']; subItem: PlaceInfo }
  | { type: 'changeSubPlaceAmount'; id: PlaceInfo['id']; subItem: PlaceInfo }
  | {
      type: 'toggleSubPlaceParticipant';
      id: PlaceInfo['id'];
      subId: PlaceInfo['id'];
      participant: string;
    }
  | { type: 'deleteSubPlace'; id: PlaceInfo['id']; subId: PlaceInfo['id'] };

export type Action =
  | { type: 'set'; data: Settlement }
  | { type: 'remove' }
  | { type: 'changeTitle'; title: string }
  | { type: 'changeDate'; date: string }
  | { type: 'changeTransfer'; transfer: Settlement['transfer'] }
  | PlaceActions;
