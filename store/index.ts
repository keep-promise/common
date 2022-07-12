class Store {

  private _store: Record<string, unknown>;
  
  constructor(store?: Record<string, unknown>) {
    this._store = store || {};
  }
  
  // 拦截get
  public get store(key: string): Record<string, unknown> {
    return this._store[key];
  }
  
  //  拦截set
  public set store(key: string, value: any) {
    this._store[key] = value;
  }
  
  public get<T>(key: string) {
    return this._store[key] as T;
  }
  
  public set(key: string, value: unkown) {
    this._store[key] = value;
  }

}

export const store = new Store();

export default store;

