export interface CreationServiceType<T> {
  get(): T | null;
  set(data: T): T | null;
  remove(): void;
}

export default class CreationService<T> implements CreationServiceType<T> {
  private key = 'SETTLEMENT';

  get(): T | null {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : null;
  }

  set(data: T): T | null {
    localStorage.setItem(this.key, JSON.stringify(data));
    return this.get();
  }

  remove() {
    localStorage.removeItem(this.key);
  }
}
