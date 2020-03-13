<template>
  <div id="myDiv" ref="myDiv">
    <svg :width="width" :height="height" id="mySVG">
        <rect v-for="(number, index) in numbers"
        :class="{'focus' : highlighted.includes(index)}"
        class="bar"
        :x="getPos(index)"
        :width="getWidth()"
        :height="getHeight(number)"
        :key="index">
      </rect>
  </svg>
  </div>
</template>

<script>
  const MyColumnChart = {
    name: 'MyColumnChart',
    props:{
      numbers:{
        default: [],
        type: Array
      },
      highlighted: {
        default: [],
        type: Array
      },
    },
    data(){
      return {
        width: 0,
        height: 0,
        getHeight(n){
          return 0.8*n/Math.max.apply(null,this.numbers)*this.height;
        },
        highlight(numbers){
          return this.highlighted = numbers;
        },
        getWidth(){
          // return 3;
          return 0.8*this.width/this.numbers.length;
        },
        getGap(){
          return 0.2*this.width/this.numbers.length;
          // return 1;
        },
        getPos(n){
          return (this.getWidth()+this.getGap())*n;
        }
      }
    },
    mounted(){
      this.width = this.$refs.myDiv.clientWidth;
      this.height = this.$refs.myDiv.clientWidth <=250 ? this.$refs.myDiv.clientWidth : 250;
    }
  };
  export default MyColumnChart;
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
