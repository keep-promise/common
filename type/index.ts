export function typeOf(v: any) {
  if (typeof v === 'undefined') {
    return 'undefined';
  }

  if (v === null) {
    return null;
  }

  return Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
}

export function isString(v: any) {
  return typeof v === 'string';
}

export function isNumber(v: any) {
  return typeof v === 'number';
}

export function isBoolean(v: any) {
  return typeof v === 'boolean';
}

export function isUndefined(v: any) {
  return typeof v === 'undefined';
}

export function isNull(v: any) {
  return v == null;
}

export function isArray(v: any) {
  //typeOf(v) === 'array'
  return Array.isArray(v);
}

export function isObject(v: any) {
  return typeOf(v) === 'object';
}

function isFunction(v: any) {
  return typeOf(v) === 'function';
}

export function isRegExp(v: any) {
  return typeOf(v) === 'regexp';
}

export function isDate(v: any) {
  return typeOf(v) === 'date';
}

export function isTrue(v: any) {
  return v === 'true' || v === true;
}

export function isFalse(v: any) {
  return v === 'false' || v === false;
}

export function isValue(v: any) {
  let t = typeOf(v);

  if (t === 'number') {
    return isFinite(v);
  }

  if (t === 'null') {
    return false
  }

  if (t === 'undefined') {
    return false;
  }

  return !!t;

}