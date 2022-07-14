import { render } from 'react-dom';

const MOUNT = 'mount';


export function RecordSdkInit() {
  RecordPluginInit();
}

function createElement(id: string) {
  const _ele = document.getElementById(id);
  if (_ele) {
    return _ele;
  }
  const ele = document.createElement('div');
  ele.id = id;
  document.body.append(ele);
  return ele;
}

function RecordPluginInit() {
  const ele = createElement(MOUNT);
  render(<App />, ele);
}

function unmountEle(id: string) {
  console.log('unmountEle', id);
  const ele: any = document.getElementById(id);
  document.body.removeChild(ele);
  allowBodyScroll();
}

function disabledBodyScroll() {
  document.body.style.overflow = 'hidden';
}

function allowBodyScroll() {
  document.body.style.overflow = '';
}

class App {

  render() {
    return <div>新node</div>
  }
}
