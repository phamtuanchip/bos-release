<template>
 <div>
  <vue-highcharts :Highcharts="Highcharts" :options="chartConfig" ref="lineCharts"></vue-highcharts>
 </div>   
 </template>

 <script>
 import Vue from 'vue'
import VueHighcharts from 'vue2-highcharts'
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
// import groupedCategories from 'highcharts-grouped-categories';

// groupedCategories(Highcharts)
highchartsMore(Highcharts);
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
    watch: {
      chartInfo: function(val){
        var ctrl = this;
        ctrl.buildChart();
      },
    },
    methods: {
      buildChart() {
        var arr = [], display = 0, min = 0;
        for (var i = this.chartInfo.chartData.series.length - 1; i >= 0; i--) {
          var sers = this.chartInfo.chartData.series[i], y = 0;
          $.each(sers.data, (k, val) => {
            y += parseFloat(val);
          });
          if (i == 0) {
            display = y;
          } else if (i == 1) {
            display = -y;
          } else {
            display = min - y;
            min += y;
          }
          var object = {
            name: sers.name,
            y: display,
            text: '<b>' + sers.name + ':</b> ' + y,
            dataText: '<b>' + y + '</b>',
            color: this.Highcharts.getOptions().colors[i],
            calculator: y
          };
          arr.unshift(object);
        }
        $.each(arr, (key, chartObj) => {
          var strDataText = '<br/>', strText = '<br/>';
          if (key > 0) {
            strDataText += parseFloat(chartObj.calculator / arr[0].calculator * 100).toFixed(2) + "%";
            strText += 'Tỉ lệ: ' + parseFloat(chartObj.calculator / arr[0].calculator * 100).toFixed(2) + "%";
            if (key > 1) {
              if (arr[key - 1] && arr[key - 1].calculator == 0) {
                strDataText += '<br/> 0.00%'
                strText += '<br/>Tỉ lệ chuyển đổi: 0.00%';
              } else {
                strDataText += '<br/>' + parseFloat(chartObj.calculator / arr[key - 1].calculator * 100).toFixed(2) + "%";
                strText += '<br/>Tỉ lệ chuyển đổi: ' + parseFloat(chartObj.calculator / arr[key - 1].calculator * 100).toFixed(2) + "%";
              }
            }
          }
          chartObj.dataText += strDataText;
          chartObj.text += strText;
        });
        this.chartConfig = {
            chart: {
              type: 'waterfall'
            },
            title: {
              text: this.chartInfo.Caption
            },
            xAxis: {
              type: 'category'
            },
            yAxis: {
              title: {
                text: 'Số liên hệ'
              }
            },
            legend: {
              enabled: false
            },
            tooltip: {
              pointFormat: '{point.text}'
            },
            credits: {
              enabled: false
            },
            series: [{
              upColor: this.Highcharts.getOptions().colors[2],
              color: this.Highcharts.getOptions().colors[3],
              data: arr,
              dataLabels: {
                enabled: true,
                format: '{point.dataText}',
                style: {
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  textShadow: '0px 0px 3px black'
                }
              },
              pointPadding: 0
            }]
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