export function downloadByA(url: string, fileName: string = '未知文件') {
  const el = document.createElement('a');
  el.style.display = 'none';
  el.setAttribute('target', '_blank');
  /**
   * download的属性是HTML5新增的属性
   * href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。
   * 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式
   * 所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)
   */
  fileName && el.setAttribute('download', fileName);
  el.href = url;
  console.log(el);
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}

/**
 * @param {String} method - 请求方法get/post
 * @param {String} url
 * @param {String} paramsKey - 请求参数名
 * @param {String} paramsValue - 请求参数值
*/
export function formDownloadEvt(method: string, url: string, key: string, value: string) {
  const form = document.createElement('form');
  form.style.display = 'none';
  form.setAttribute('target', '_blank');
  form.setAttribute('method', method);
  form.setAttribute('action', url);
  const input = document.createElement('input');
  input.setAttribute('type','hidden');
  input.setAttribute('name', key);
  input.setAttribute('value', value);
  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

export function downloadByOpen(url: string) {
  window.open(url, '_self');
}

export function downloadByIframe(url: string) {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;
  document.body.appendChild(iframe);
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 200);
}

export function downloadByHref(url: string) {
  window.location.href = url;
}


// 根据header里的contenteType转换请求参数
function transformRequestData(contentType, requestData) {
  requestData = requestData || {};
  if (contentType.includes('application/x-www-form-urlencoded')) {
    // formData格式：key1=value1&key2=value2，方式二：qs.stringify(requestData, {arrayFormat: 'brackets'}) -- {arrayFormat: 'brackets'}是对于数组参数的处理
    let str = '';
    for (const key in requestData) {
      if (Object.prototype.hasOwnProperty.call(requestData, key)) {
        str += `${key}=${requestData[key]}&`;
      }
    }
    return encodeURI(str.slice(0, str.length - 1));
  } else if (contentType.includes('multipart/form-data')) {
    const formData = new FormData();
    for (const key in requestData) {
      const files = requestData[key];
      // 判断是否是文件流
      const isFile = files ? files.constructor === FileList || (files.constructor === Array && files[0].constructor === File) : false;
      if (isFile) {
        for (let i = 0; i < files.length; i++) {
          formData.append(key, files[i]);
        }
      } else {
        formData.append(key, files);
      }
    }
    return formData;
  }
  // json字符串{key: value}
  return Object.keys(requestData).length ? JSON.stringify(requestData) : '';
}

/**
 * ajax实现文件下载、获取文件下载进度
 * @param {String} method - 请求方法get/post
 * @param {String} url
 * @param {Object} [params] - 请求参数，{name: '文件下载'}
 * @param {Object} [config] - 方法配置
 */
export function downLoadAjaxEvt(method = 'get', url: string, params: any, config: any) {
  const _method = method.toUpperCase();
  const _config = Object.assign({
    contentType: _method === 'GET' ? 'application/x-www-form-urlencoded' : 'application/json',  // 请求头类型
    fileName: '未知文件',                                        // 下载文件名(必填，若为空，下载下来都是txt格式)
    async: true,                                                // 请求是否异步-true异步、false同步
    token: 'token'                                              // 用户token
  }, config);
​
  const queryParams = transformRequestData(_config.contentType, params);
  const _url = `${url}${_method === 'GET' && queryParams ? '?' + queryParams : ''}`;
​
  const ajax = new XMLHttpRequest();
  ajax.open(_method, _url, _config.async);
  ajax.setRequestHeader('Authorization', _config.token);
  ajax.setRequestHeader('Content-Type', _config.contentType);
  // responseType若不设置，会导致下载的文件可能打不开
  ajax.responseType = 'blob';
  // 获取文件下载进度
  ajax.addEventListener('progress', (progress) => {
    const percentage = ((progress.loaded / progress.total) * 100).toFixed(2);
    const msg = `下载进度 ${percentage}%...`;
    console.log(msg);
  });
  ajax.onload = function () {
    if (this.status === 200 || this.status === 304) {
      // 通过FileReader去判断接口返回是json还是文件流
      const fileReader = new FileReader();
      fileReader.onloadend = (e: any) => {
        if (this.getResponseHeader('content-type').includes('application/json')) {
          console.log(fileReader, e)
        } else {
          // 两种解码方式，区别自行百度: decodeURIComponent/decodeURI（主要获取后缀名，否则低版本浏览器会一律识别为txt，导致下载下来的都是txt）
          const _fileName = decodeURIComponent((this.getResponseHeader('content-disposition') || '; filename="未知文件"').split(';')[1].trim().slice(9));
          /**
          * Blob.type一个字符串，表明该 Blob 对象所包含数据的 MIME 类型。如果类型未知，则该值为空字符串。
          * 对于pdf：type为application/pdf  同时 a标签 不设置download属性, 可以直接预览
          */
          const blob = new Blob([this.response]);
          const href = URL.createObjectURL(blob);
          downloadByA(href, _fileName);
          // 释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象
          URL.revokeObjectURL(href);
        }
      };
      // 调用readAsText读取文件，少了readAsText将不会触发onloadend事件
      fileReader.readAsText(this.response);
    } else {
      alert('服务器出现问题，请联系管理员');
    }
  };
  // send(string): string：仅用于 POST 请求
  ajax.send(queryParams);
}


/**
 * ajax实现文件下载、获取文件下载进度
 * @param {String} method - 请求方法get/post
 * @param {String} url
 * @param {Object} [params] - 请求参数，{name: '文件下载'}
 * @param {Object} [config] - 方法配置
 */
export function downLoadAjax(method = 'get', url, params, config) {
  const _method = method.toUpperCase();
  const _config = Object.assign({
    contentType: _method === 'GET' ? 'application/x-www-form-urlencoded' : 'application/json',  // 请求头类型
    fileName: '未知文件',                                       // 下载文件名(必填，若为空，下载下来都是txt格式)
    async: true,                                               // 请求是否异步-true异步、false同步
    token: 'token'                                             // 用户token
  }, config);
​
  const queryParams = transformRequestData(_config.contentType, params);
  const _url = `${url}${_method === 'GET' && queryParams ? '?' + queryParams : ''}`;
​
  const ajax = new XMLHttpRequest();
  ajax.open(_method, _url, _config.async);
  ajax.setRequestHeader('Authorization', _config.token);
  ajax.setRequestHeader('Content-Type', _config.contentType);
  // responseType若不设置，会导致下载的文件可能打不开
  ajax.responseType = 'blob';
  // 获取文件下载进度
  ajax.addEventListener('progress', (progress) => {
    const percentage = ((progress.loaded / progress.total) * 100).toFixed(2);
    const msg = `下载进度 ${percentage}%...`;
    console.log(msg);
  });
  ajax.onload = function () {
    if (this.status === 200 || this.status === 304) {
      // 通过FileReader去判断接口返回是json还是文件流
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.response);
      fileReader.onload = () => {
        if (this.getResponseHeader('content-type').includes('application/json')) {
          alert('服务器出现问题，请联系管理员');
        } else {
          // 两种解码方式，区别自行百度: decodeURIComponent/decodeURI（主要获取后缀名，否则某些浏览器会一律识别为txt，导致下载下来的都是txt）
          const _fileName = decodeURIComponent((this.getResponseHeader('content-disposition') || '; filename="未知文件"').split(';')[1].trim().slice(9));
          // 也可以用FileSaver（需提前引入https://github.com/eligrey/FileSaver.js）: saveAs(fileReader.result, _fileName);
          downloadByA(fileReader.result, _fileName);
        }
      }
    } else {
      alert('服务器出现问题，请联系管理员');
    }
  };
  // send(string): string：仅用于 POST 请求
  ajax.send(queryParams);
}
