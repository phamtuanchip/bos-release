<template>
 <div><vue-highcharts :Highcharts="Highcharts" :options="chartConfig" ref="lineCharts"></vue-highcharts></div>   
 </template>

 <script>
 import Vue from 'vue'
import VueHighcharts from 'vue2-highcharts'
import Highcharts from 'highcharts';
// import groupedCategories from 'highcharts-grouped-categories';

// groupedCategories(Highcharts)
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
        var arrayChartSeries = [], yAxis = {column: 0, line: 1, pie: 3};
        $.each(this.chartInfo.chartData, (kC, childChartInfo) => {
          $.each(childChartInfo.chartData.series, (kS, series) => {
            series.type = childChartInfo.Chart.toLowerCase();
            series.yAxis = yAxis[childChartInfo.Chart.toLowerCase()];
            if (series.type == "column" && series.data.length > 20) {
              series.type = 'bar';
            }
            arrayChartSeries.push(series)
          });
        });
        this.Highcharts.setOptions({
          lang: {
            thousandsSep: '.',
            decimalPoint: ','
          }
        });
        this.chartConfig = {
          title: {
            text: this.chartInfo.Caption ? this.chartInfo.Caption : 'Báo cáo thống kê'
          },
          xAxis: [{categories: this.chartInfo.chartData[0].chartData.categories}],
          yAxis: [{ // Primary yAxis
            labels: {
              style: {
                color: this.Highcharts.getOptions().colors[0]
              },
              formatter: function() {
                var ret,
                    numericSymbols = [' Nghìn', ' Triệu', ' Tỷ'],
                    i = 6;
                if(this.value >=1000 || this.value <=-1000) {
                    while (i-- && ret === undefined) {
                        var multi = Math.pow(1000, i + 1);
                        if ((this.value >= multi || this.value <= -multi) && numericSymbols[i] !== null) {
                            ret = (this.value / multi) + numericSymbols[i];
                        }
                    }
                }
                return (ret ? ret : this.value);
              }
            },
            title: {
              text: '',
              style: {
                color: this.Highcharts.getOptions().colors[0]
              }
            },
          }, { // Secondary yAxis
            title: {
              text: '',
              style: {
                color: this.Highcharts.getOptions().colors[1]
              }
            },
            labels: {
              style: {
                color: this.Highcharts.getOptions().colors[1]
              },
              formatter: function() {
                var ret,
                    numericSymbols = [' Nghìn', ' Triệu', ' Tỷ'],
                    i = 6;
                if(this.value >=1000 || this.value <=-1000) {
                    while (i-- && ret === undefined) {
                        var multi = Math.pow(1000, i + 1);
                        if ((this.value >= multi || this.value <= -multi) && numericSymbols[i] !== null) {
                            ret = (this.value / multi) + numericSymbols[i];
                        }
                    }
                }
                return (ret ? ret : this.value);
              }
            },
            opposite: true,
          }],
          tooltip: {
            shared: true
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            column: {
              dataLabels: {
                enabled: true,
                format: "{point.y:,.0f}",
                allowOverlap:true,
                color: '#FFFFFF',
                inside: true,
                crop: false,
                overflow:"none",
                // formatter: function() {

                //   return this.series.name+ " "+ this.y;

                //   console.log(this.series.name);
                // },
                style:{
                    width:100
                }
              },
              pointPadding: 0.2,
              borderWidth: 0,
              series: {
                cursor: 'pointer'
              },
              tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:,.0f}</b><br/>'
              }
            },
            line: {
              dataLabels: {
                enabled: true,
                format: '{point.y:,.2f}',
                allowOverlap:true,
                crop: false,
                overflow:"none",
              },
              pointPadding: 0.2,
              borderWidth: 0,
              tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f}</b><br/>'
              },
              series: {
                cursor: 'pointer'
              }
            },
          },
          legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: (this.Highcharts.theme && this.Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
          },
          series: arrayChartSeries
        };
      }
    },
    created(){
      this.buildChart();
      
    }
 }
 </script>
 
  <style lang="scss">
  
  </style>