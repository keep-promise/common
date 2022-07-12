
const key = 'pubsub';

export default class PubSub {
  static id = 0;

  static listen: any = {};

  /**
   * @description: 区分相同事情的不同订阅
   * @param
   * @return
   */  
  static genPubSubKey() {
    PubSub.id += 1;
    return `${key}-${PubSub.id}`;
  };

  /**
   * @description: 发布
   * @param {string} eventKey - 发布key
   * @param {array} args
   * @return void
   */  
  static publish(eventKey: string, ...args: any) {
    const listeners = this.listen[eventKey] || [];
    listeners.forEach((listener: Function) => {
      listener(...args);
    });
  }

  /**
   * @description: 订阅
   * @param {string} eventKey - 订阅key
   * @param {any} handler 回调
   * @return void
   */  
  static subscribe(eventKey: string, handler: any) {
    if (!handler) {
      return null;
    }
    this.listen[eventKey] = this.listen[eventKey] || [];
    this.listen[eventKey].push(handler);
    handler.__pubsubKey = this.genPubSubKey();
    return handler.__pubsubKey;
  }

  /**
   * @description: 取消订阅
   * @param {string} eventKey 取消订阅key
   * @param {string} key 
   * @return void
   */  
  static unSubscribe(eventKey: string, pubsubKey: string) {
    if (!pubsubKey) {
      this.listen[eventKey] = null;
    } else {
      const listeners = this.listen[eventKey] || [];
      this.listen[eventKey] = listeners.filter((handler: any) => handler.__pubsubKey !== pubsubKey);
    }
  }
}
