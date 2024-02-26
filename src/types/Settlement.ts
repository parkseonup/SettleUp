export interface PlaceInfo {
  id: string;
  title: string;
  amount: number;
  participants: string[];
}

export type SubPlaceList = PlaceInfo[];

export interface PlaceItem extends PlaceInfo {
  sub: SubPlaceList;
}

export type PlaceList = PlaceItem[];

export interface BankTransfer {
  bankName: string;
  accountNumber: string;
}

export type PaymentMethods = string[];

export interface Settlement {
  title: string;
  date: string;
  place: PlaceList;
  payment: {
    payer: string;
    paymentMethods: PaymentMethods;
    selectedPaymentMethods: PaymentMethods;
    bankTransfer: BankTransfer;
  };
}
