import { Settlement } from './data';

interface BaseService {
  getAll(): Settlement[];
  setAll(newDatas: Settlement[]): void;
  getItem(id: Settlement['id']): Settlement | undefined;
  hasItem(id: Settlement['id']): boolean;
  addItem(newData: Settlement): Settlement[];
  changeItem(newData: Settlement): Settlement[];
  removeAll(): void;
  removeItem(id: Settlement['id']): Settlement;
}

export default class LocalStorageService implements BaseService {
  private KEY = 'SETTLE_UP';

  getAll(): Settlement[] {
    const localJSONData = localStorage.getItem(this.KEY);

    return localJSONData ? JSON.parse(localJSONData) : [];
  }

  setAll(newDatas: Settlement[]): void {
    localStorage.setItem(this.KEY, JSON.stringify(newDatas));
  }

  getItem(id: string): Settlement | undefined {
    return this.getAll().find((item) => item.id === id);
  }

  hasItem(id: Settlement['id']): boolean {
    return !!this.getItem(id);
  }

  addItem(newData: Settlement): Settlement[] {
    if (this.hasItem(newData.id))
      throw new Error(`${newData.id}에 해당하는 정산 내역이 이미 생성되어 있습니다.`);

    this.setAll([...this.getAll(), newData]);
    return this.getAll();
  }

  changeItem(newData: Settlement): Settlement[] {
    let targetItem: Settlement | undefined;

    const newDatas = this.getAll().map((item) => {
      if (item.id === newData.id) {
        targetItem = item;
        return newData;
      }
      return item;
    });

    if (!targetItem) throw new Error(`${newData.id}에 해당하는 정산 내역이 없습니다.`);

    this.setAll(newDatas);
    return this.getAll();
  }

  removeAll(): void {
    localStorage.removeItem(this.KEY);
  }

  removeItem(id: string): Settlement {
    let targetItem: Settlement | undefined;

    const newDatas = this.getAll().filter((item) => {
      if (item.id === id) {
        targetItem = item;
        return false;
      }
      return true;
    });

    if (!targetItem) throw new Error(`${id}에 해당하는 정산 내역이 없습니다.`);

    this.setAll(newDatas);
    return targetItem;
  }
}
