export interface PlaceInfo {
  id: string;
  title: string;
  amount: number;
}

export type SubPlaceList = PlaceInfo[];

export interface PlaceItem extends PlaceInfo {
  sub: SubPlaceList;
}

export type PlaceList = PlaceItem[];
