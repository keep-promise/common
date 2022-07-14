/**
 * @description: html编码（转义）
 * @param {string} str
 * @return {*}
 */
export function encodeHtml(str: string) {
  if(!isString(str) || str.length == 0) {
    return "";
  }
  let encodeStr = "";
  encodeStr = str.replace(/&/g, "&amp;");
  encodeStr = encodeStr.replace(/</g, "&lt;");
  encodeStr = encodeStr.replace(/>/g, "&gt;");
  encodeStr = encodeStr.replace(/\s/g, "&nbsp;");
  encodeStr = encodeStr.replace(/\'/g, "&#39;");
  return encodeStr;
}

/**
 * @description: html解码（反转义）
 * @param {string} str
 * @return {*}
 */
export function decodeHtml(str: string) {
  if(!isString(str) || str.length == 0) {
    return "";
  }
  var decodeStr = "";
  decodeStr = str.replace(/&amp;/g, "&");
  decodeStr = decodeStr.replace(/&lt;/g, "<");
  decodeStr = decodeStr.replace(/&gt;/g, ">");
  decodeStr = decodeStr.replace(/&nbsp;/g, " ");
  decodeStr = decodeStr.replace(/&#39;/g, "\'");
  decodeStr = decodeStr.replace(/&quot;/g, "\"");
  return decodeStr;
}
