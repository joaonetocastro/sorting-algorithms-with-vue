<template>
  <div>
    <v-card
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Sorting Algorithms</div>
        <v-list-item-subtitle>Choose your Algorithm</v-list-item-subtitle>
        <div class="text-center">

          <v-btn v-on:click="chooseAlgorithm('BubbleSort')" :color="sorting.algorithm == 'BubbleSort' ?'primary' : ''" small >Bubble Sort</v-btn>
          <v-btn v-on:click="chooseAlgorithm('InsertionSort')" :color="sorting.algorithm == 'InsertionSort' ?'primary' : ''" small>Insertion Sort</v-btn>
        </div>

        <v-list-item-subtitle>Do you wanna See the animation?</v-list-item-subtitle>
        <div class="text-center">
          <v-switch v-model="sorting.seeAnimation" label="See Animation"></v-switch>
        </div>
        <v-slider min="25" max="400" v-model="length" @change="generateArray()"></v-slider>
        {{length}} Numbers
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn v-if="sorting.status == 'not_sorting' || sorting.status == 'finished_sorting' || sorting.status=='stopped_sorting'" small color="success" v-on:click="startSorting()">Start sorting</v-btn>
      <v-btn v-if="sorting.status == 'sorting'" small color="error" v-on:click="stopSorting()">Stop sorting</v-btn>
      <span v-if="getTimeElapsed()" class="caption font-weight-bold" :class="{
        'red--text': sorting.status == 'stopped_sorting',
        'green--text': sorting.status == 'finished_sorting'}">{{`<${Math.floor(getTimeElapsed()/1000)}s ${getTimeElapsed()%1000} ms>`}}</span>
    </v-card-actions>
  </v-card>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
      </v-col>
    </v-row>
    <svg width="550" :height="height">
      <g transform="translate(40,20)">
        <rect v-for="(number, index) in numbers"
        :class="{'focus' : highlited.includes(index)}"
        :ref="'column-'+index"
        class="bar"
        :x="(0.9*width/numbers.length)*index"
        :width="0.7*width/numbers.length"
        :height="getHeight(number)">
        </rect>
      </g>
    </svg>
  </v-container>
  </div>
</template>

<script>
  import BubbleSort from '../helpers/bubbleSort.js';
  import InsertionSort from '../helpers/insertionSort.js';
  import SortingHandler from '../helpers/sortingHandler.js';

  const HomeComponent = {
    name: 'HomeComponent',
    data(){
      return {
        sorting: {
          algorithm: "BubbleSort",
          status: 'not_sorting',
          seeAnimation: false,
          time: 0
        },
        width: 500,
        height: 800,
        numbers: [],
        highlited:[],
        length: 50,
        generateArray(){
          // this.stopSorting('stopped_sorting');
          let arr = Array.from({length:this.length}, () => { return Math.floor(Math.random()*1000)});
          this.numbers = arr;
        },
        getHeight(n){
          return n/Math.max.apply(null,this.numbers)*400;
        },
        highlight(numbers){
          return this.highlited = numbers;
        },
        startSorting(){
          let sortingHandler = new SortingHandler(this);
          this.sorting.starting_time = new Date();
          if(this.sorting.algorithm == 'BubbleSort'){
            this.sort = new BubbleSort(this.numbers, sortingHandler, this.sorting.seeAnimation);
          }else if(this.sorting.algorithm == 'InsertionSort'){
            this.sort = new InsertionSort(this.numbers, sortingHandler, this.sorting.seeAnimation);
          }
        },
        switchNumbers(numbers){
          let i = numbers[0];
          let j = numbers[1];
          let aux = this.numbers[i];
          this.numbers[i] = this.numbers[j];
          this.numbers[j] = aux;
          return this.numbers = this.numbers.slice();
        },
        updateNumbers(arr){
          return this.numbers = arr.slice();
        },
        chooseAlgorithm(name){
          return this.sorting.algorithm = name;
        },updateStatus(name){
          if(name == 'finished_sorting' || name == 'stopped_sorting'){
            let time = this.getTimeElapsed();
            this.sorting.time_elapsed = this.getTimeElapsed();
          }
          return this.sorting.status = name;
        },
        stopSorting(){
          this.sort.stopSorting('stopped_sorting');
        },
        getTimeElapsed(){
          if(this.sorting.status == 'sorting'){
            return ((new Date()).getTime() - this.sorting.starting_time.getTime());
          }else{
            return this.sorting.time_elapsed;
          }
        }
      };
    },
    created(){
      this.generateArray();
    }
  }
  export default HomeComponent;
</script>

<style scoped>
h1 {
  font: 24px sans-serif;
}
.bar {
  fill: #4EA2B5;
}

.bar.focus {
  fill: #7BE8C0;
}

.axis {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.x.axis path {
  display: none;
}
</style>
