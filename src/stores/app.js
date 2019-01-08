import { observable, runInAction, action, decorate } from 'mobx';

class App {

  menuActiveKey = '';
  menuCollapsed = false;

  setMenuActiveKey(activeKey) {
    runInAction('setMenuActiveKey', () => {
      this.menuActiveKey = activeKey;
    });
  }

  setMenuCollapsed(collapsed) {
    runInAction('setMenuCollpased', () => {
      this.menuCollapsed = collapsed;
    });
  }
}

decorate(App, {
  menuActiveKey: observable,
  menuCollapsed: observable,
  setMenuActiveKey: action,
  setMenuCollapsed: action
});

export default new App();