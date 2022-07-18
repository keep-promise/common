/**
精确计算
1.先转整数
2.整数运算
3.化为小数
 */



/**
 * @description: 小数点后的长度
 * @param {number} num
 * @return {*}
 */
function decimalDigits(num: number | string): number {
  let n = 0;
  try {
    n = num.toString().split('.')[1].length;
  } catch(e) {
    console.error('')
  }
  return n;
}

/**
 * @description: 精确的加法 0.1+0.2：先转整数相加
 * @param {number} a
 * @param {number} b
 * @return {*}
 */
function add(a: number | string, b: number | string) {
  const ra = decimalDigits(a);
  const rb = decimalDigits(b);
  const r = Math.pow(10, Math.max(ra, rb));
  const result = (Number(a) * r + Number(b) * r) / r;
  return result;
}

console.log('js prototype add', 0.1 + 0.2);
console.log('js add calc', add(0.1, 0.2));

/**
 * @description: 精确的乘法
 * @param {number} a
 * @param {number} b
 * @return {*}
 */
function multiply(a: number | string, b: number | string) {
  let m = 0;
  m += decimalDigits(a);
  m += decimalDigits(b);
  const a1 = Number(a.toString().replace('.', ''));
  const b1 = Number(b.toString().replace('.', ''));
  const result = a1 * b1 / Math.pow(10, m);
  return result;
}

/**
 * @description: 精确的除法
 * @param {number} a
 * @param {number} b
 * @return {*}
 */
function divide(a: number | string, b: number | string) {
  const m1 = decimalDigits(a);
  const m2 = decimalDigits(b);
  const a1 = Number(a.toString().replace('.', ''));
  const b2 = Number(b.toString().replace('.', ''));
  const result = (a1 / b2) * Math.pow(10, m2 - m1);
  return result;
}

/**
 * @description: 小数转百分数
 * @param {number} a
 * @return {*}
 */
function decimalToPercent(a: number) {
  const m1 = (a * 100).toFixed(0);
  return `${m1}%`;
}
