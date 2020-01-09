import Sort from './sort.js';
export default class InsertionSort extends Sort{
  constructor(numbers, sortingHandler, seeAnimation){
    super(numbers, sortingHandler, seeAnimation);
    this.callLoop(1,0);
  }
  instantLoop(){
    for(let i = 1; i < this.arr.length; i++){
      for(let j = 0; j < i; j++){
        if(this.arr[j] > this.arr[i]){
          let aux = this.arr[i];
          for(let k = i; k>j+1;k--){
            this.arr[k] = this.arr[k-1];
          }
          this.arr[j] = aux;
          break;
        }
      }
    }
    this.stopSorting();
  }
  delayedLoop(i, j){
    this.sortingHandler.update({type: 'highlight', data: [i,j]});
    if(this.arr[j] > this.arr[i]){
      let aux = this.arr[i];
      for(let k = i; k>j+1; k--){
        this.arr[k] = this.arr[k-1];
      }
      this.arr[j] = aux;
      this.arr = this.sortingHandler.update({type: 'updateNumbers', data: this.arr});
      if(++i < this.arr.length) {
        this.callLoop(i,0);
      }
    } else{
      if(++j < i){
        this.callLoop(i,j);
      }else if(++i < this.arr.length){
        this.callLoop(i,0);
      }
    }
    if(i == this.arr.length){
      this.stopSorting();
    }
  }
}
