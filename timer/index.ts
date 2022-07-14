function getTime(time: number) {
  // 转换为时分秒
  let h: any = parseInt(String(time / 60 / 60 % 24))
  h = h < 10 ? '0' + h : h
  let m: any = parseInt(String(time / 60 % 60));
  m = m < 10 ? '0' + m : m
  let s: any = parseInt(String(time % 60));
  s = s < 10 ? '0' + s : s
  return [h, m, s]
}

function parseTime(time: number) {
  // 转换为分秒
  let m: any = parseInt(String(time / 60));
  m = m < 10 ? '0' + m : m
  let s: any = parseInt(String(time % 60));
  s = s < 10 ? '0' + s : s
  return `${m}:${s}`;
}
