import { observable, action } from 'mobx';

class Store {
  @observable tab: number = 0;
  @observable menu: (EventTarget & Element) | null = null;

  @action
  openMenu = (event: React.MouseEvent) => {
    this.menu = event.currentTarget;
  };

  @action
  closeMenu = () => {
    this.menu = null;
  };
}

export default new Store();
