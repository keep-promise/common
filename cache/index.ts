// 单实例cache
export default class Cache {

  private _cache: Record<string, unknown>;

  constructor(cache?: Record<string, unknown>) {
    this._cache = cache || {};
  }

  // 拦截get，通过cache.cache获取_cache，get cache()
  public get cache(): Record<string, unknown> {
    // console.log('cache get =>>>')
    return this._cache;
  }

  // 拦截set，通过cache.cache = {}, set cache()
  public set cache(value: Record<string, unknown>) {
    // console.log('cache set =>>>')
    this._cache = value;
  }


  public get<T>(key: string) {
    return this._cache[key] as T;
  }

  public set(key: string, value: unknown) {
    this._cache[key] = value;
  }

} 
