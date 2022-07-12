interface Action {
  type: string;
  value: any;
}

class UniversalAction {

  // 全局action
  private _act: Record<string, Function>;

  constructor(act?: Record<string, Function>) {
    this._act = act || {};
  }

    // 拦截get，get act()
    public get act(): Record<string, Function> {
      // console.log('cache get =>>>')
      return this._act;
    }
  
    // 拦截set，set act()
    public set act(act: Record<string, Function>) {
      // console.log('cache set =>>>')
      this._act = act;
    }

  /**
   * @description: 设置act
   * @param {action map} _act
   * @return {void}
   */
  setAct(act: Record<string, Function>): void {
    this._act = {
      ...this._act,
      ...act
    };
  }

  /**
   * @description: 设置act
   * @return {Function}
   */
  getAct(key?: any): Function | Record<string, Function> {
    return key ? this._act[key] : this._act;
  }

  /**
   * @description: 注册action
   * @param {string} type action类型
   * @param {Function} actFun action动作
   * @return {*}
   */
  registerAct(type: string, actFun: Function) {
    this._act[type] = actFun;
  }

  /**
   * @description: 执行action
   * @param {Action} action
   * @param {Function} actFun
   * @return {*}
   */  
  runAct(action: Action, actFun?: Function) {
    console.log('UniversalAction', action);
    const { type, value } = action;
    actFun && this.registerAct(type, actFun);
    const actionFun = this._act[type];
    (typeof actionFun === 'function') && actionFun(value);
  }

}

export const UNI_ACT = new UniversalAction();

export default UNI_ACT;
