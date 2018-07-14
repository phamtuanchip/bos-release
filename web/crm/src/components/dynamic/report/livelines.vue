<template>
  <div><vue-highcharts :Highcharts="Highcharts" :options="chartConfig" ref="lineCharts"></vue-highcharts></div>
</template>
<script>
  import Vue from 'vue'
  import VueHighcharts from 'vue2-highcharts'
  import Highcharts from 'highcharts';
  // import groupedCategories from 'highcharts-grouped-categories';

  // groupedCategories(Highcharts)
  export default {
    components: {
      VueHighcharts
    },
    props: ['chartInfo'],
    data() {
      return {
        Highcharts: Highcharts,
        chartConfig: {},
        // DisplaySeries: this.$Lodash.cloneDeep(this.chartInfo.chartData.series),
        chartName: this.chartInfo.Caption ? this.chartInfo.Caption : this.$defaultUndefined
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
      buildChart(obj, request) {
        var ctrl = this;
        // this.DisplaySeries = this.$Lodash.cloneDeep(this.chartInfo.chartData.series)
        this.chartName = this.chartInfo.Caption ? this.chartInfo.Caption : this.$defaultUndefined;
        this.Highcharts.setOptions({
          lang: {
            thousandsSep: '.',
            decimalPoint: ','
          },
          global: {
              useUTC: false
          }
        });
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
            type: 'area',
            events: {
              load:  function() {

                  // set up the updating of the chart each second
                  console.log(this.series)
                  var series = this.series[0]
                  this.setInterval = setInterval( function () {

                      ctrl.$Utils.post(request).then((data)=> {
                        var result = {}
                        var exp = obj.Result;
                        for (var i = 1;i <= eval(obj.R);i++){
                          if(obj["R" + i + "SummaryType"] == 'Count') {
                            result['R' + i] = ctrl.$Utils.getDataWithRoot(data["R" + i], obj["R" + i + "DataSource"])[0];
                          }
                          exp = exp.replaceAll('R' + i, result['R' + i])
                        }
                        console.log(result)
                        var x = (new Date()).getTime(), // current time
                            // y = Math.random();
                            y = eval(exp)
                        series.addPoint([x, y], true, true);
                      })
                  }, ctrl.chartInfo.Duration * 1000);
              }
            }
          },
          title: {
            text: this.chartInfo.Caption ? this.chartInfo.Caption : 'Báo cáo thống kê'
          },
          xAxis: {
            // categories: this.chartInfo.chartData.categories,
            type: 'datetime',
            tickPixelInterval: 150
          },
          tooltip: {
              formatter: function () {
                  return '<b>' + this.series.name + '</b><br/>' +
                      Highcharts.dateFormat('%d/%m/%Y %H:%M:%S', this.x) + '<br/>' +
                      Highcharts.numberFormat(this.y, 2);
              }
          },

          // yAxis: {
          //   title: { text: '' },
          //   lineWidth: 0,
          //   min: this.chartInfo.yMin,
          //   max: this.chartInfo.yMax,
          //   labels: {
          //     formatter: function () {
          //       var ret,
          //         numericSymbols = [' Nghìn', ' Triệu', ' Tỷ'],
          //         i = 6;
          //       if (this.value >= 1000 || this.value <= -1000) {
          //         while (i-- && ret === undefined) {
          //           var multi = Math.pow(1000, i + 1);
          //           if ((this.value >= multi || this.value <= -multi) && numericSymbols[i] !== null) {
          //             ret = (this.value / multi) + numericSymbols[i];
          //           }
          //         }
          //       }
          //       return (ret ? ret : this.value);
          //     }
          //   }
          // },
          plotOptions: {
            area: {
              dataLabels: {
                enabled: true,
                format: '{point.y:,.2f}'
              },
              pointPadding: 0.2,
              borderWidth: 0,
            },
            series: {
              cursor: 'pointer'
            }
          },
          credits: {
            enabled: false
          },
          legend: {
            y: -10,
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0
          },
          exporting: {
              enabled: false
          },
          series: [{
              name: 'Số',
              data: (function () {
                  // generate an array of random data
                  var data = [],
                      time = (new Date()).getTime(),
                      i;
                  for (i = -eval(ctrl.chartInfo.Display); i <= 0; i += 1) {
                      data.push({
                          x: time + i * 1000,
                          y: undefined
                      });
                  }
                  return data;
              }())
          }]
        };
        // $.each(this.DisplaySeries, (kC, chartSetting) => {
        //   if (chartSetting.setting && chartSetting.setting.FormatValue && (chartSetting.setting.FormatValue == "Triệu" ||
        //     chartSetting.setting.FormatValue == "Tỷ")) {
        //     this.chartConfig.plotOptions.line.tooltip.ySuffix = chartSetting.setting.FormatValue
        //     chartSetting.name += " (" + chartSetting.setting.FormatValue + ")";
        //     $.each(chartSetting.data, (item, value) => {
        //       chartSetting.data[item] = chartSetting.setting.FormatValue == "Triệu" ? value / 1000000 : value / 1000000000;
        //     })
        //     this.chartConfig.plotOptions.line.dataLabels.format = "{point.y:,.2f}";
        //   } else if (chartSetting.setting && chartSetting.setting.FormatValue) {
        //     this.chartConfig.plotOptions.line.dataLabels.format = chartSetting.setting.FormatValue == "(x).2f" ? "{point.y:,.2f}"
        //       : chartSetting.setting.FormatValue == "(x).1f" ? "{point.y:,.1f}"
        //         : chartSetting.setting.FormatValue == "(x).0f" ? "{point.y:,.0f}"
        //           : this.chartConfig.plotOptions.line.dataLabels.format;
        //     this.chartConfig.plotOptions.line.tooltip.pointFormat = chartSetting.setting.FormatValue == "(x).2f" ? '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:,.2f}</b><br/>'
        //       : chartSetting.setting.FormatValue == "(x).1f" ? '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:,.1f}</b><br/>'
        //         : chartSetting.setting.FormatValue == "(x).0f" ? '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:,.0f}</b><br/>'
        //           : this.chartConfig.plotOptions.line.tooltip.pointFormat;
        //   }
          
        //   if(chartSetting.setting && (chartSetting.setting.Percentage === true || chartSetting.setting.Percentage === 'true') && !this.existPercentage) {
        //     this.existPercentage = true
        //     this.chartConfig.plotOptions.line.dataLabels.format += '%'
        //   }

        //   if(chartSetting.setting && chartSetting.setting.Color) {
        //     chartSetting.color = chartSetting.setting.Color
        //   }
        // })
      },
      expressRequest(setting) {
        var ctrl = this;
        var obj = ctrl.$Utils.stringToObject(setting.RequestTemplate)
        var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
        request.TotalRequests = 0;
        for (var i = 1;i <= eval(obj.R);i++){
          var subfix = '';
          if(obj["R" + i + "SummaryType"] == 'Count') {
            subfix = '.Count'
          } else {
            subfix = '.Search'
          }
          request["R" + i + "_RequestTemplate"] = obj["R" + i + "RequestTemplate"] + subfix;
          request["R" + i + "_RequestDataGroup"] = obj["R" + i + "RequestDataGroup"];
          request["R" + i + "_RequestFields"] = obj["R" + i + "RequestFields"];
          request["R" + i + "_Code"] = obj["R" + i + "Code"];
          request.TotalRequests++;
          $.each(obj["R" + i + "RequestFields"].split(';'), (key, field)=> {
            if (ctrl.$Utils.isEmpty(obj["R" + i + field]) && field != "Code") {
                request["R" + i + "_" + field] = obj["R" + i + field];
            }
          })
        }
        // console.log()
        this.buildChart(obj, request);
      }

    },
    created() {
      // this.buildChart();
      this.expressRequest(this.chartInfo)
    },
    destroyed() {
      clearInterval(this.setInterval);
    }
  }
</script>
<style lang="scss">

</style>
