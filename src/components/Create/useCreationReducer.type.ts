import { BankTransfer, PaymentMethods, PlaceInfo, Settlement } from '../../apis/data';

type PlaceActions =
  | { type: 'addPlace' }
  | { type: 'changePlaceName'; data: PlaceInfo }
  | { type: 'changePlaceAmount'; data: PlaceInfo }
  | { type: 'toggleSelectedPlaceParticipant'; id: PlaceInfo['id']; participant: string }
  | { type: 'deletePlace'; id: PlaceInfo['id'] }
  | {
      type: 'addSubPlace';
      id: PlaceInfo['id'];
      subName?: PlaceInfo['name'];
      subAmount?: PlaceInfo['amount'];
    }
  | { type: 'changeSubPlaceName'; id: PlaceInfo['id']; subItem: PlaceInfo }
  | { type: 'changeSubPlaceAmount'; id: PlaceInfo['id']; subItem: PlaceInfo }
  | {
      type: 'toggleSelectedSubPlaceParticipant';
      id: PlaceInfo['id'];
      subId: PlaceInfo['id'];
      participant: string;
    }
  | { type: 'deleteSubPlace'; id: PlaceInfo['id']; subId: PlaceInfo['id'] };

type PaymentActions =
  | { type: 'changePayer'; payer: string }
  | {
      type: 'toggleSelectedPaymentMethod';
      paymentMethod: PaymentMethods[number];
    }
  | { type: 'changeBankTransfer'; data: BankTransfer };

export type Action =
  | { type: 'set'; data: Settlement }
  | { type: 'remove' }
  | { type: 'changeTitle'; title: string }
  | { type: 'changeDate'; date: string }
  | PlaceActions
  | PaymentActions;
