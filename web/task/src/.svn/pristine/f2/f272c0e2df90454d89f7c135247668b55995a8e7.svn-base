<template>
 <div><vue-highcharts :Highcharts="Highcharts" :options="chartConfig" ref="lineCharts"></vue-highcharts></div>   
 </template>

 <script>
  import Vue from 'vue'
  import VueHighcharts from 'vue2-highcharts'
  import Highcharts from 'highcharts';
  import highchartsFunnel from 'highcharts/modules/funnel';
  // import groupedCategories from 'highcharts-grouped-categories';

  // groupedCategories(Highcharts)
  highchartsFunnel(Highcharts);
  Vue.use(VueHighcharts, {Highcharts});
   export default {
     components: {
        VueHighcharts
      },
      props: ['chartInfo'],
      data(){
        return{
          Highcharts: Highcharts,
        }
      },
      methods: {
        buildChart() {
          var series = [];
          var percentSeries = this.$Lodash.cloneDeep(this.chartInfo.chartData.series);
          console.log(this.chartInfo)
          if(this.chartInfo.Percentage ==='true'){
            for (var i = 0; i < this.chartInfo.chartData.series.length; i++) {
              if(this.chartInfo.chartData.series[i].data) {
                $.each(this.chartInfo.chartData.series[i].data, (key, value) => {
                  if(i == 0){
                    percentSeries[i].data[key] = 100;
                  } else if(this.chartInfo.chartData.series[i].data[key] == 0 || this.chartInfo.chartData.series[i - 1].data[key] == 0) {
                    percentSeries[i].data[key] = 0;
                  } else {
                    percentSeries[i].data[key] = (this.chartInfo.chartData.series[i].data[key] / this.chartInfo.chartData.series[i - 1].data[key]) * 100
                  }
                })
              }
            }
          }
          $.each(this.chartInfo.chartData.categories, (key, cat) => {
            var ser = {
              data: [],
              y: 0,
              name: cat,
              center: [(100 / this.chartInfo.chartData.categories.length * key + 50 / this.chartInfo.chartData.categories.length) + '%', '50%']
            };
            $.each(percentSeries, (k, s) => {

              ser.data.push({name: s.name, y: s.data[key]});
            });
            series.push(ser);
          });
          series[0].showInLegend = true;
          var height = this.chartInfo.chartData.categories.length > 3 ? 300 / this.chartInfo.chartData.categories.length : 100;
          if (height < 50) {
            height = 50;
          }
          this.chartConfig = {
              chart: {
                type: 'funnel',
                events: {
                  load: this.generateSeriesNames,
                  redraw: this.generateSeriesNames
                }
              },
              title: {
                text: this.chartInfo.Caption ? this.chartInfo.Caption : ''
              },
              plotOptions: {
                series: {
                  dataLabels: {
                    x: 0,
                    distance: 3,
                    padding: 0,
                    rotation: series.length > 5 ? 45 : null,
                    format: (series.length <= 3 ? '<b>{point.name}:</b>' : '') + '{point.y:,.0f}',
                    color: (this.Highcharts.theme && this.Highcharts.theme.contrastTextColor) || 'black',
                    softConnector: true
                  },
                  width: (this.chartInfo.chartData.categories.length > 3 ? 90 / this.chartInfo.chartData.categories.length : 45) + '%',
                  height: height - 20 + '%',
                  neckWidth: '0%',
                  neckHeight: '0%',
                  tooltip: {
                    pointFormat: (series.length <= 3 ? '<b>{point.name}:</b>' : '') + '{point.y:,.0f}' + (this.chartInfo.Percentage ==='true' ? '%' : '')
                  }
                }
              },
              credits: {
                enabled: false
              },
              legend: {
                enabled: false,
                y: -10,
                align: 'center',
                verticalAlign: 'bottom',
                borderWidth: 0
              },
              series: series
          };

          var arrayOfSeriesLabels = [];
        },
        generateSeriesNames() {
          var chart = this,
            series = this.chartInfo.chartData.series,
            numberOfSeries = series  ? series.length : 0,
            xPixelFirst,
            yPixelFirst;

          if (arrayOfSeriesLabels && arrayOfSeriesLabels.length > 0) {
            arrayOfSeriesLabels.forEach((element, index) => {
              if (element.line) {
                element.line.destroy();
              }
              element.text.destroy();
            });
            arrayOfSeriesLabels = [];
          } else if(!arrayOfSeriesLabels){
            var arrayOfSeriesLabels = [];
          }
          
          for (var i = 0; i < numberOfSeries; i++) {
            var seriesName = series[i].name,
              firstPoint = series[i].points ? series[i].points[0] : {},
              yPathOffset = (chart.plotTop / 2) - 10,
              yTextOffset = 0,
              lineOffset = 10;
            
            arrayOfSeriesLabels.push({});

            if (!(i % 2)) {
              yTextOffset = chart.plotTop / 2;
              yPathOffset = 0;
            } else {
              if(chart.renderer)
                arrayOfSeriesLabels[i].line = chart.renderer.path([
                  'M', firstPoint.plotX + lineOffset, chart.plotHeight - lineOffset,
                  'L', firstPoint.plotX + lineOffset, chart.plotHeight - yPathOffset - 5
                ])
                  .attr({
                    'stroke-width': 1,
                    stroke: 'black',
                    zIndex: 5
                  })
                  .add();
            }
            if(!arrayOfSeriesLabels[i])
              arrayOfSeriesLabels[i] = {};
            if(chart.renderer)
              arrayOfSeriesLabels[i].text = chart.renderer.text(seriesName, firstPoint.plotX, chart.plotHeight - yTextOffset + lineOffset).css({
                width: '5px',
                'word-wrap': 'break-word',
                fontSize: '10px'
              }).attr({
                width: 10,
                zIndex: 5
              }).add();
          }
        }
      },
      created(){
        this.buildChart();
      }

 }
 </script>
 
  <style lang="scss">
  
  </style>