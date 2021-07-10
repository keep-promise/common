import { typeFun } from '../type';

export default class Global {

  static data: Record<string, unknown> = {};

  getGlobalDate(key?: string) {
    if (key && typeof key === 'string') {
      return Global.data[key];
    }
    return Global.data;
  }

  setGlobalData(key: string | Object, value: any) {
    if (typeFun(key) === 'object') {
      Global.data = { ...Global.data, ...key };
      return true;
    }
    if (value && typeof key === 'string') {
      Global.data[key] = value;
      return true
    }
    return false;
  }
}