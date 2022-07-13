// 生成随机字符串 Math.random().toString(36) --> 0.74zdm6nq5yt
// Math.random().toString(36).slice(2) --> 74zdm6nq5yt
export function random(): string {
  return Math.random().toString(36).slice(2);
}

/**
 * @description: 生成uuid
 * @param {*}
 * @return {*}
 */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
