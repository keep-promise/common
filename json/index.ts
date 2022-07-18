/**
 * @description: 安全的json string转json object
 * @param {string} str
 * @return {*}
 */
export function jsonStrToObj(str: string): any {
  let json = {};
  try {
    json = JSON.parse(str);
  } catch (err: any) {
    console.error('jsonStrToObj err', err);
  }
  return json;
}

/**
 * @description: 安全的json object转json string
 * @param {Object} json
 * @return {*}
 */
export function objToJsonStr(json: Object): string {
  let str = '';
  try {
    str = JSON.stringify(json);
  } catch (err: any) {
    console.error('objToJsonStr err', err);
  }
  return str;
}
