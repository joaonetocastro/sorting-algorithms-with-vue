export default class SortingHandler{
  constructor(myComponent){
    this.myComponent = myComponent;
  }
  update(notification){
    return this.myComponent[notification.type](notification.data);
    // if(notification.type == "switchNumbers") return this.myComponent.switchNumbers(notification.data);
    // else if(notification.type == "highlight") this.myComponent.highlight(notification.data);
    // else if(notification.type == "updateNumbers") return this.myComponent.updateNumbers(notification.data);
    // else if(notification.type == 'updateStatus') return this.myComponent.updateStatus(notification.data);
    // return;
    // console.log(notification.data[1]);
  }
}
