
export function typeFun(v: any) {
  if (typeof v === 'undefined') {
    return 'undefined';
  }
  if (v === null) {
    return 'null';
  }
  return Object.prototype.toString.call(v).slice(8, -1).toLowcase();
}