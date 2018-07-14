<template>
   <div class="test container">
     <div class="test__block">
       <h2 class="tac pd10">Test Book Product - 17000215</h2>
        FILTER
       <el-tabs
           v-model="activeName"
           @tab-click="handleClick"
           :tab-position="top"
           :type="card|border-card"
       >
           <el-tab-pane label="Giữ hàng" name="first">

           </el-tab-pane>
           <el-tab-pane label="Xuất bán" name="second">

           </el-tab-pane>
           <el-tab-pane label="Xuất luân chuyển" name="third">

           </el-tab-pane>
           <el-tab-pane label="Nhập luân chuyển" name="fourth">

           </el-tab-pane>
       </el-tabs>
       <!--<div class="filter__wrapper">-->
         <!--<el-collapse class="header-filter filter__wrapper" v-model="activeName"  v-if="pModule.ModuleType == 'Filter' && pModule.Fields" >-->
           <!--<el-collapse-item title="Bộ lọc"  name="true">-->
             <!--<DynamicFilter :pSetting="pModule"></DynamicFilter>-->
           <!--</el-collapse-item>-->
         <!--</el-collapse>-->
       <!--</div>-->

       <el-form ref="formBookProduct" :model="formBookProduct" label-width="120px">
         <el-form-item label="Số lượng">
           <el-input v-model="formBookProduct.number"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="onSubmitBookProduct" v-if="sending !== true">Send</el-button>
           <el-button v-if="sending" @click="onClickStop">Stop</el-button>
         </el-form-item>
       </el-form>

       <div class="book-product-result__wrapper">
         <hr>
         <div class="status__wrapper" style="font-size: 30px;">
           <div v-if="sending">SENDING...</div>
           <div v-if="forceStop">STOPPED!</div>
           <div v-if="done">DONE!!</div>
         </div>
         <hr>
         <h2>Result:</h2>
         <div class="log__item" v-for="(log, key) in logs" :key="key">
           <span>Created_time: </span><b>{{new Date(log.created_time)}}</b>
           <span>Number: </span><b>{{log.number}}</b>
           <span>Start: </span><b>{{log.start}}</b>
           <div>Request:</div>
           <ul>
             <li v-for="req in log.requests">
               <span>Status: </span> {{req.R1.success}}
             </li>
           </ul>
         </div>
       </div>
     </div>
     <hr>
   </div>
</template>

<script>
  import api from '../../services/api'
  export default {
    name: 'test',
    data () {
      return {
        formBookProduct: {
          number: 1
        },
        logs: {},
        id: 0,
        forceStop: false,
        sending: false,
        done: false
      }
    },
    methods: {
      random (min, max) {
        return Math.round(Math.random() * min + (max - min))
      },
      indexID () {
        this.id += 1
        return this.id
      },
      sendMultipleRequest () {
        let number = this.formBookProduct.number || 0
        if (number <= 0) return
        let numberDone = 0
        let self = this
        function sendChunk () {
          /* init */
          let num_req_perchunk = self.random(2, 5)
          /* init chunk */
          var chunk_id = self.indexID()
          num_req_perchunk = Math.min(num_req_perchunk, number)
          /* anchor */
          if (num_req_perchunk <= 0 || self.forceStop) {
            self.done = true
            self.sending = false
            return
          }
          /* save log */
          self.logs = {
            ...self.logs,
            [chunk_id]: {
              created_time: Date.now(),
              number: num_req_perchunk,
              requests: [],
              start: numberDone
            }
          }
          /* loop in chunk */
          for (let i = 0; i < num_req_perchunk; i++) {
            api.requestBookProduct()
              .then((data) => {
                //console.log('data', data)
                self.logs[chunk_id].requests.push(data)
              })
          }
          numberDone += num_req_perchunk
          number -= num_req_perchunk
          /* next chunk */
          setTimeout(() => {
            sendChunk()
          }, 1000)
        }
        /* start */
        sendChunk()
      },
      onSubmitBookProduct () {
        this.reset()
        this.sending = true
        this.sendMultipleRequest()
      },
      onClickStop () {
        this.forceStop = true
        this.sending = false
      },
      reset () {
        this.logs = {}
        this.forceStop = false
        this.done = false
        this.sending = false
        this.index = 0
      }
    },
    created () {

    }
  }
</script>

<style scoped>
  .test {
    background: #fff;
  }
  .mg10 {
    margin: 10px;
  }
  .pd10 {
    padding: 10px;
  }
</style>
