class Store {
  private __store: Record<string, any> = {};
  
  get store(key: string) {
    return this.__store[key];
  }
  
  set store(key: string, value: any) {
    this.__store[key] = value;
  }

}

export const store = new Store();

export default store;

