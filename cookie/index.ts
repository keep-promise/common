
export function getAllCookie() {
  let cookie = document.cookie;
  let arr: any = [];
  if (cookie) {
    arr = cookie.split(';');
  }
  return arr;
}

export function getCookie(key: string) {
  let cookie = document.cookie;
  if (cookie) {
    let arr = cookie.split(';');
    let n = arr.length;
    for (let i = 0; i < n; i ++) {
      let item = arr[i].split('=');
      if (item[0] == key) {
        return item[1];
      }
    }
    return '';
  }
}

export function setCookie(key: string, value: string, expiresDay: number) {
  if (typeof expiresDay === 'number') {
    let expireTime = new Date();
    expireTime.setDate(expireTime.getDate() + expiresDay);
    document.cookie = `${key}=${value};expires=${expireTime};path=/`;
  } else {
    document.cookie = `${key}=${value};path=/`;
  }
}

// 通用 cookie 取值方法
export const getCookie2 = (key: any) => {
  const cookie_val = document.cookie.match(new RegExp('(?:^|;)\\s*' + key + '=([^;]+)'));
  return cookie_val ? cookie_val[1] : '';
};

export function getCookie3(name: string) {
  let arr,
    reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  if ((arr = document.cookie.match(reg))) {
    return decodeURI(arr[2]);
  }
  return null;
}
