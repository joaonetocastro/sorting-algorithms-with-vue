export default class Sort{
  constructor(numbers, sortingHandler, seeAnimation){
    this.sortingHandler = sortingHandler;
    this.arr = numbers;
    this.speed = 1000;
    this.seeAnimation = seeAnimation;
    this.continueSorting = true;

    this.sortingHandler.update({type:'updateStatus', data:"sorting"});
  }
  stopSorting(status_name='finished_sorting'){
    this.continueSorting = false;
    this.sortingHandler.update({type:'highlight',data:[]});
    this.sortingHandler.update({type:'updateStatus', data:status_name});
  }
  callLoop(i, j){
    if(this.continueSorting){
      if(this.seeAnimation){
        setImmediate(() => {
          this.delayedLoop(i,j);
        });
      }else{
        this.instantLoop();
      }
    }
    return;
  }
}
