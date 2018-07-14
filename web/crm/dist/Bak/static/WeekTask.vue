<template>
    <div class="source">
      <div class="el-table__body-wrapper grab-bing" v-dragscroll>
        <table>
          <thead>
          <tr>
            <th class="tgWeek default-column" rowspan="2">{{datasrc.TypeName}}</th>
            <th class="default-column" :colspan="datasrc.ListCols['Kế hoạch'].length">Kế hoạch</th>
            <th class="c default-column" rowspan="2"></th>
            <th class="default-column" v-if="datasrc.ListCols['Thực hiện']" :colspan="datasrc.ListCols['Thực hiện'].length">Thực hiện</th>
          </tr>
          <tr>
            <th :class="'default-column cl-'+ item.Name" v-for="item in datasrc.ListCols['Kế hoạch']">{{item.Caption}}</th>
            <th :class="'default-column cl-' + item.Name" v-for="item in datasrc.ListCols['Thực hiện']">{{item.Caption}}</th>
          </tr>
          </thead>
          <tbody v-if="datasrc.cells" style="background-color: white;">
          <tr :class="cell.CellType " v-for="cell in datasrc.cells" :style="cell.CellType == 'h'?'background-color:#f50808 ; color: white; font-weight:bold; font-size: 15px': ''">
            <td :colspan="cell.CellType =='h' ? 2 : 1">
              <div v-if="cell.CellType != 'h'"  class="default-column">
                <router-link :to="'/dynamic/view/Index='+ cell.Index" v-on:click="showSetting(item)">
                  <span :style="'text-decoration:' + (taskDone.indexOf(cell.Status) >-1 ? 'line-through' : '')">{{cell.Index}}</span>
                </router-link>
                <br/>
                <el-progress :width = '35' type="circle" :percentage="parseInt(cell.Progress)" ></el-progress>
              </div>
              <div v-else style="padding-left: 30px">
                <span>{{cell.Index}}</span><br/>
                <!--<span>{{cell.Progress}}%</span>-->
              </div>
            </td>
            <td :class="'tg-' + item.Name" v-for="(item, index) in datasrc.ListCols['Kế hoạch']"
                v-if="!(cell.CellType == 'h' && index == 0)">
              <router-link v-if="item.Redirect" :to="'/dynamic/view/Index=' + cell.Index">
                <span :style="'text-decoration:' + (taskDone.indexOf(cell.Status) >-1 ? 'line-through' : '')">
                  {{cell[item.DynamicText? item.DynamicText : !item.Expression ? item.Name : item.Expression]}}
                </span>
                </router-link>
              <span v-if="item.Format && item.FieldColumnType == 'DateTime'">{{cell[item.DynamicText ? item.DynamicText : !item.Expression ? item.Name : item.Expression] ? $Utils.formatDateTime(cell[item.DynamicText ? item.DynamicText : !item.Expression ? item.Name : item.Expression], (cell.CellType == 'h' ? 'DD/MM/YYYY' : 'HH:mm')) : ''}}</span>
              <span v-if="item.FieldColumnType != 'DateTime' && !item.Redirect">{{cell[item.DynamicText ? item.DynamicText : !item.Expression ? item.Name : item.Expression]}}</span>
            </td>
            <td class="default-column c"></td>
            <td :class="'default-column tg-' + item.Name" v-for="item in datasrc.ListCols['Thực hiện']" >
                <!--:style="{'background-color': item.Name == 'StatusName' ? arrStatusColor[cell.Status] : 'none'} ">-->
              <router-link v-if="item.Redirect" :to="'/dynamic/view/Index=' + cell.Index">{{cell[item.DynamicText
                ? item.DynamicText : !item.Expression ? item.Name : item.Expression]}}</router-link>
              <span v-if="item.Expression == 'SpentTime'" style="white-space: nowrap;">{{convertSpendTime(cell.SpentTime)}}
                          <i v-if="cell.CellType !='h'" class="fa  fa-clock-o fa-lg mt-4"
                             :style="{color: cell.SpentTime < 0 ? 'red' : 'blue'}"></i>
                        </span>
              <el-progress v-if="item.Name == 'Progress' && cell.CellType !='h'" :text-inside="true"
                           :stroke-width="18" :percentage="cell.Progress?parseInt(cell.Progress):0"
                           :status=" cell.Progress!=undefined? (parseInt(cell.Progress) >= 100 ? 'success' : parseInt(cell.Progress) == 0 ? 'exception': '') : 'exception'"></el-progress>
              <span v-if="item.Name == 'Progress' && cell.CellType =='h'">{{cell.Progress}}%</span>
              <span v-if="item.Format && item.FieldColumnType == 'DateTime'">{{$Utils.formatDateTime(cell[item.DynamicText ? item.DynamicText : !item.Expression ? item.Name : item.Expression], 'DD/MM/YYYY HH:mm') }}</span>

              <div :style="(cell.CellType !='h' && cell.Status != undefined && item.Name === 'StatusName') ? 'background-color: ' + statusColors[cell.Status.toUpperCase()] : ''" v-if="item.FieldColumnType != 'DateTime' && !item.Redirect && item.Expression != 'SpentTime' && item.Name != 'Progress'">{{cell[item.DynamicText ? item.DynamicText : !item.Expression ? item.Name : item.Expression]}}</div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
 </template>

 <script>
   // import WeekTaskData from "@/temp/WeekTaskData.json"
   import Vue from "vue"
   import vuedragscroll from 'vue-dragscroll'

   Vue.use(vuedragscroll)
   Vue.use(require('vue-moment'));
   export default {
     name: 'WeekTask',
     props: ['datasrc'],
     inject:['taskDone','statusColors'],
     data() {
       return {};
     },
     methods:{
       convertSpendTime(data) {
         var exp = "";
         if (Math.abs(data) >= 24) {
           exp = parseFloat(eval(data) / 24).toFixed(0) + " ngày";
         } else if (data != 0) {
           exp = data + " giờ";
         } else
           exp = data;
         return exp;
       },
     }

   }
 </script>

  <style >
    .el-progress--circle .el-progress__text {
      font-size: 12px !important;
    }
  </style>
