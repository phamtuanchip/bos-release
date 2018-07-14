<template>
 <div><vue-highcharts :Highcharts="Highcharts" :options="chartConfig" ref="lineCharts"></vue-highcharts></div>   
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
        this.existPercentage = false
        ctrl.buildChart();
      },
    },
      methods: {
        buildChart() {
          this.chartName = this.chartInfo.Caption ? this.chartInfo.Caption : '';
          if (this.labelitalic == 1) {
            this.xAx.labels = {
              groupedOptions: [{
                rotation: 0 // rotate labels for a 2nd-level
                // align: 'right'
              }],
              rotation: -45, // rotate labels for a 2nd-level
              align: 'right' // 0-level options aren't changed, use them as always

            };
          }

          this.chartConfig = {
              chart: {
                renderTo: "chart",
                type: 'area',
                height: 550
              },
              title: {
                text: this.chartInfo.Caption ? this.chartInfo.Caption : 'Báo cáo thống kê'
              },
              xAxis: {
                categories: this.chartInfo.chartData.categories
              },
              yAxis: {title: {text: ''}},
              tooltip: {
                shared: true
  //                                valueSuffix: ' millions'
              },
              plotOptions: {
                area: {
                  stacking: 'normal',
                  lineColor: '#fff',
                  lineWidth: 1,
                  marker: {
                    lineWidth: 1,
                    lineColor: '#fff'
                  }
                },
                series: {
                  cursor: 'pointer',
                  point: {
                    // events: {
                    //     click: clickCallback()
                    // }
                  }
                }
              },
              credits: {
                enabled: false
              },
              legend: {
                y: -10,
                align: 'center',
                verticalAlign: 'bottom',
                borderColor: '#cdd6eb',
                borderWidth: 1
              },
            series: this.chartInfo.chartData.series
          };
          $.each(this.DisplaySeries, (kC, chartSetting) => {
            // if (chartSetting.setting && chartSetting.setting.FormatValue && (chartSetting.setting.FormatValue == "Triệu" ||
            //   chartSetting.setting.FormatValue == "Tỷ")) {
            //   config.plotOptions.column.tooltip.ySuffix = chartSetting.setting.FormatValue
            //   chartSetting.name += " (" + chartSetting.setting.FormatValue + ")";
            //   $.each(chartSetting.data, (item, value) => {
            //     chartSetting.data[item] = chartSetting.setting.FormatValue == "Triệu" ? value / 1000000 : value / 1000000000;
            //   })
            //   config.plotOptions.column.dataLabels.format = "{point.y:,.2f}";
            // } else if(chartSetting.setting && chartSetting.setting.FormatValue) {
            //   config.plotOptions.column.dataLabels.format = chartSetting.setting.FormatValue=="(x).2f" ? "{point.y:,.2f}" 
            //                                                         : chartSetting.setting.FormatValue=="(x).1f" ? "{point.y:,.1f}" 
            //                                                         : chartSetting.setting.FormatValue=="(x).0f" ? "{point.y:,.0f}" 
            //                                                         : config.plotOptions.column.dataLabels.format;
            //   config.plotOptions.column.tooltip.pointFormat = chartSetting.setting.FormatValue=="(x).2f" ? '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:,.2f}</b><br/>'
            //                                                           : chartSetting.setting.FormatValue=="(x).1f" ? '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:,.1f}</b><br/>'
            //                                                           : chartSetting.setting.FormatValue=="(x).0f" ? '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:,.0f}</b><br/>'
            //                                                           : config.plotOptions.column.tooltip.pointFormat;
            // }
            if(chartSetting.setting && (chartSetting.setting.Percentage === true || chartSetting.setting.Percentage === 'true') && !this.existPercentage) {
              this.existPercentage = true
              config.plotOptions.area.dataLabels.format += '%'
            }

            if(chartSetting.setting && chartSetting.setting.Color) {
              chartSetting.color = chartSetting.setting.Color
            }
          })
        }
      },
      created(){
        this.buildChart();
      }

 }
 </script>
 
  <style lang="scss">
  
  </style>