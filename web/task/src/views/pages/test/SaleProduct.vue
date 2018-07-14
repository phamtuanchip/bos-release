<template>
   <div class="test container">
     <div class="test__block">
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
  import api from '@/services/api'
  export default {
    name: 'test',
    props: ['type'],
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
        if (number <= 0) {
          this.onClickStop()
          return
        }
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
            self.requestApiByType(chunk_id)
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
      requestApiByType (chunk_id) {
        switch (this.type) {
          case 'book':
            api.requestBookProduct()
              .then((data) => {
                this.logs[chunk_id].requests.push(data)
              })
            break
          case 'sell':
            api.requestSellProduct()
              .then((data) => {
                this.logs[chunk_id].requests.push(data)
              })
            break
          case 'exportTransfer':
            api.requestExportTransferProduct()
              .then((data) => {
                this.logs[chunk_id].requests.push(data)
              })
            break
          case 'importTransfer':
            api.requestImportTransferProduct()
              .then((data) => {
                this.logs[chunk_id].requests.push(data)
              })
            break
        }
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
</style>

<style>
  .mg10 {
    margin: 10px;
  }
  .pd10 {
    padding: 10px;
  }
</style>
