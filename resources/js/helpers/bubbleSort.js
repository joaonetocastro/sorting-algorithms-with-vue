import Sort from './sort.js';
export default class BubbleSort extends Sort{
  constructor(numbers, sortingHandler, seeAnimation){
    super(numbers, sortingHandler, seeAnimation);
    this.callLoop(0,0);
  }
  delayedLoop(i, repeated_times){
    this.sortingHandler.update({type:'highlight',data:[i,i+1]});
    // this.sortingHandler.highlight([i,i+1]);
    if(this.arr[i] > this.arr[i+1]) {
      let aux = this.arr[i];
      this.arr[i] = this.arr[i+1];
      this.arr[i+1] = aux;
      this.arr = this.sortingHandler.update({type:"updateNumbers", data:this.arr});
    }
    if(++i < this.arr.length-1-repeated_times){
      this.callLoop(i, repeated_times);
    }else if(repeated_times < this.arr.length-1){
      this.callLoop(0, ++repeated_times);
    }else{
      this.stopSorting();
    }
    return;
  }
  instantLoop(){
    for(let i = this.arr.length-1; i > 0; i--){
      for(let j = 0; j < i; j++){
        if(this.arr[j] > this.arr[j+1]){
          let aux = this.arr[j];
          this.arr[j] = this.arr[j+1];
          this.arr[j+1] = aux;
        }
      }
    }
    this.arr = this.sortingHandler.update({type:"updateNumbers", data:this.arr});
    this.stopSorting();
  }

}
