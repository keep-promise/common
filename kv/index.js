interface KV {
  key: string;
  value: any;
}


/**
 * @description: key value数组转对象
 * @param {KV} kvs
 * @return {*}
 */
export function kvToObj(kvs: KV[]) {
  const obj: Record<string, any> = {};
  kvs.forEach((kv: KV) => {
    obj[kv.key] = kv.value;
  });
  return obj;
}

/**
 * @description: 对象转key value
 * @param {Record} obj
 * @param {*} any
 * @return {*}
 */
export function objToKv(obj: Record<string, any>) {
  const keys: string[] = Object.keys(obj);
  const kv: KV[] = [];
  keys.forEach((key: string) => {
    kv.push({key: key, value: obj[key]});
  });
  return kv;
}
