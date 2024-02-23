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

export interface Settlement {
  title: string;
  date: string;
  place: PlaceList;
  transfer: {
    account: {
      bankName: string;
      accountHolderName: string;
      accountNumber: number;
    };
    kakaoPay: boolean;
    toss: boolean;
  };
}
