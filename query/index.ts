export function getQueryObj(url: string) {
    const _url = url || window.location.href;
    const quertStr = _url.split('?')[1] || '';
    const paramArr = quertStr.split('&');
    const n = paramArr.length;
    let queryObj: any = { };
    for(let i = 0; i < n; i++) {
        let item = paramArr[i];
        const kv = item.split('=');
        queryObj[kv[0]] = kv[1];
    }
    queryObj.quertStr = quertStr;
    return queryObj;
}
