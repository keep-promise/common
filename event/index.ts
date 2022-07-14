interface Hooks {
  emit(key: string, value: any): void;
  on(key: string, callback: (value: any) => void): void;
  off(key: string, callback?: (value: any) => void): void;
  has(key: string): boolean;
}

class Event implements Hooks {
  eventEmitter: object;

  constructor() {
    this.eventEmitter = {};
  }

  emit(key: string, ...args) {
    const keyEmitter = this.eventEmitter[key];

    if (!Array.isArray(keyEmitter) || (Array.isArray(keyEmitter) && keyEmitter.length === 0)) {
      console.warn(`event.emit: no callback is called for ${key}`);
      return;
    }

    keyEmitter.forEach(cb => {
      cb(...args);
    });
  }

  on(key: string, callback: (value: any) => void) {
    if (typeof key !== 'string') {
      console.warn('event.on: key should be string');
      return;
    }

    if (callback === undefined || typeof callback !== 'function') {
      console.warn('event.on: callback is required, should be function');
      return;
    }

    if (!this.eventEmitter[key]) {
      this.eventEmitter[key] = [];
    }

    this.eventEmitter[key].push(callback);
  }

  off(key: string, callback?: (value: any) => void) {
    if (typeof key !== 'string') {
      console.warn('event.off: key should be string');
      return;
    }

    if (!Array.isArray(this.eventEmitter[key])) {
      console.warn(`event.off: ${key} has no callback`);
      return;
    }

    if (callback === undefined) {
      this.eventEmitter[key] = undefined;
      return;
    }

    this.eventEmitter[key] = this.eventEmitter[key].filter(cb => cb !== callback);
  }

  has(key: string) {
    const keyEmitter = this.eventEmitter[key];
    return Array.isArray(keyEmitter) && keyEmitter.length > 0;
  }
}

export const event = new Event();

export default event;
