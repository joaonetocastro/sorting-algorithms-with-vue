<template>
  <div>
    <v-card
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
        <v-slider min="25" max="70" v-model="length" @change="generateArray()"></v-slider>
        {{length}} Numbers
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn v-if="sorting.status == 'not_sorting' || sorting.status == 'finished_sorting' || sorting.status=='stopped_sorting'" small color="success" v-on:click="startSorting()">Start sorting</v-btn>
      <v-btn v-if="sorting.status == 'sorting'" small color="error" v-on:click="stopSorting()">Stop sorting</v-btn>
      <span v-if="sorting.status != 'not_sorting'" class="overline font-weight-bold" :class="{
        'red--text': sorting.status == 'stopped_sorting',
        'green--text': sorting.status == 'finished_sorting'}">
        <span v-html="'\<'"></span>{{`${Math.floor(getTimeElapsed()/1000)} s ${getTimeElapsed()%1000} ms>`}}
        </span>
    </v-card-actions>
  <v-card-text>
    <MyColumnChart 
    :numbers="numbers" 
    :highlighted="highlighted"/>
  </v-card-text>
</v-card>
  </div>
</template>

<script>
  import BubbleSort from '../helpers/bubbleSort.js';
  import InsertionSort from '../helpers/insertionSort.js';
  import SortingHandler from '../helpers/sortingHandler.js';
  import MyColumnChart from './MyColumnChart.vue';

  const HomeComponent = {
    name: 'HomeComponent',
    components: {
      MyColumnChart
    },
    data(){
      return {
        sorting: {
          algorithm: "InsertionSort",
          status: 'not_sorting',
          seeAnimation: true,
          time: 0
        },
        highlighted: [],
        length: 100,
        startSorting(){
          let sortingHandler = new SortingHandler(this);
          this.sorting.starting_time = new Date();
          if(this.sorting.algorithm == 'BubbleSort'){
            this.sort = new BubbleSort(this.numbers, sortingHandler, this.sorting.seeAnimation);
          }else if(this.sorting.algorithm == 'InsertionSort'){
            this.sort = new InsertionSort(this.numbers, sortingHandler, this.sorting.seeAnimation);
          }
        },
        chooseAlgorithm(name){
          return this.sorting.algorithm = name;
        },updateStatus(name){
          if(name == 'finished_sorting' || name == 'stopped_sorting'){
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
        },
        generateArray(){
          if(Object.keys(this).includes('sort') && this.sort.continueSorting){
            return;
          }
          let arr = Array.from({length:this.length}, () => { return Math.floor(Math.random()*1000)});
          this.numbers = arr;
        },
        highlight(numbers){
          return this.highlighted = numbers;
        },
        updateNumbers(arr){
          return this.numbers = arr.slice();
        },
      };
    },
    created(){
      this.generateArray();
    }
  }
  export default HomeComponent;
  // export default {components:MyColumnChart};
</script>

<style scoped>

</style>
