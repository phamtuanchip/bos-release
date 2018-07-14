<template>
  <el-form ref="form" :model="model" :rules="rules" label-width="120px" class="documentForm">
    <el-form-item label="Tham số cha:">
      <strong>
        {{this.parent.Name || this.parent.Id}}
      </strong>
    </el-form-item>

    <el-form-item label="Tên" prop="Name">
      <el-input v-model="model.Name" ></el-input>
    </el-form-item>
    <el-form-item label="Tên hiển thị" prop="Name">
      <el-input v-model="model.Caption" ></el-input>
    </el-form-item>

    <el-form-item label="Mã" prop="Code">
      <el-input v-model="model.Code"></el-input>
    </el-form-item>

    <el-form-item label="Giá trị">
      <el-input v-model="model.Value"></el-input>
    </el-form-item>

    <el-form-item label="Mô tả">
      <el-input type="textarea" :rows="2" v-model="model.Description"></el-input>
    </el-form-item>
    <el-form-item label="Màu">
      <el-color-picker v-model="model.Color"></el-color-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">Lưu</el-button>
      <el-button @click="close">Đóng</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import API from '@/services/api'

  export default {
    name: 'parameter-adding-dialog',
    props: ['data'],
    data () {

      var validateName = (rule, value, callback) => {
        if (value === undefined || value === null || value.trim() === '') {
          callback(new Error('Tên cần phải có'))
        } if(this.checkExistName(value)) {
          callback(new Error('Tên đã được sử dụng'))
        } else {
          callback()
        }
      }
      var validateCode = (rule, value, callback) => {
        if (this.checkExistCode(value)) {
          callback(new Error('Mã đã được sử dụng'))
        } else {
          callback()
        }
      }

      return {
        model: {
          Id: null,
          Name: null,
          Value: null,
          Description: null,
          Color: null,
          Code: null,
          Caption: null
        },
        isAddNew: true,
        codes: [],
        params: [],
        selectedCode: '',
        selectedParam: '',
        selectedParamId: '',
        parent: {},
        siblings: [],
        rules: {
          Name: [
            { validator: validateName, trigger: 'blur' }
          ],
          Code: [
            { validator: validateCode, trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      getListCode (parentCode) {
        API.requestSetting(parentCode, true)
          .then(data => {
            let isFound = data.length > 0
            if (isFound) {
              this.parent = data[0]
              this.siblings = this.getSiblings(this.parent, data)
            }
          })
      },
      getSiblings (parent, allChild) {
        return allChild.filter(child => child.Level - parent.Level === 1)
      },
      checkExistCode (newCode) {
        if(newCode){
          return this.siblings.some(child => child.Code === newCode.trim())
        }else{
          return '';
        }
      },
       checkExistName (newName) {
        return this.siblings.some(child => child.Name === newName.trim())
      },
      async generateCodeByName (name = '', parentCode) {
        let baseCode = parentCode
        name = this.$Utils.toCapitalize(name).trim().replace(/\s/g, '_')
        let newCode = `${baseCode}.${name}`
        return newCode
      },
      onSubmit (formName) {
        this.$refs[formName].validate(valid => {
          //check dublicate name

          if (valid) {
            var vm = this

            var request = {
              RequestClass: 'xBase',
              RequestAction: 'Request',
              TotalRequests: 1
            }

            request.R1_NestedSetType = 'InsertLastChildNode'
            request.R1_Color = vm.model.Color
            request.R1_ReferenceId = vm.parent.Id
            request.R1_Name = vm.model.Name
            request.R1_Value = vm.model.Value,
            request.R1_Caption = vm.model.Caption
            request.R1_Description = vm.model.Description

            if (vm.$Utils.isEmpty(vm.model.Id)) {
              request.R1_RequestTemplate = 'Setting.Update'
              request.R1_Id = vm.model.Id
            } else {
              request.R1_RequestTemplate = 'Setting.Insert'
              request.R1_ParentId = vm.parent.Id
              request.R1_Code = vm.model.Code
            }

            if (vm.parent.Code === 'TaskPriority') {
              delete vm.model.ReferenceId
              delete vm.model.value
              if (
                vm.model.Id === undefined ||
                vm.model.Id === null ||
                vm.model.Id === ''
              ) {
                request.R1_RequestTemplate = 'xEdu.TaskPriority.Insert'
                request.R1_Code = 'TaskPriority'
                request.R1_RequestFields = 'Code; Name; Description; Lead;'
                request.R1_Lead = vm.model.Color
                delete request.R1_NestedSetType
              } else {
                request.R1_RequestTemplate = 'xEdu.TaskPriority.Update'
                request.R1_Code = 'TaskPriority'
                request.R1_RequestFields = 'Code; Name; Description; Id; Lead;'
                request.R1_Lead = vm.model.Color
                delete request.R1_NestedSetType
              }
            }

            vm.$Utils.post(request).then(response => {
              if (response.success) {
                vm.$Utils.showMessage('success', 'Lưu thành công')
                this.$hub.$emit('close-modal')
                if (this.type) {
                  vm.model.Id = response.R1.Data
                  this.$hub.$emit(this.type, vm.model)
                } else {
                  vm.$hub.$emit('loadParameter')
                }
              } else {
                vm.$Utils.showMessage('error', 'Có lỗi xảy ra')
                this.$hub.$emit('close-modal')
              }
            })
          } else {
            return false
          }
        })
      },
      close () {
        this.$hub.$emit('close-modal')
      }
    },
    created () {},
    mounted () {
      var vm = this
      if (vm.$Utils.isEmpty(vm.data, 'parent')) {
        vm.parent = vm.data.parent
      }
      if (vm.$Utils.isEmpty(vm.data, 'type')) {
        vm.type = vm.data.type
      }
      if (vm.$Utils.isEmpty(vm.data, 'isAddNew')) {
        vm.isAddNew = vm.data.isAddNew
      }
      if (vm.$Utils.isEmpty(vm.data, 'selectedCode')) {
        vm.selectedCode = vm.data.selectedCode
      }
      if (vm.$Utils.isEmpty(vm.data, 'selectedParam')) {
        vm.selectedParam = vm.data.selectedParam
      }
      if (vm.$Utils.isEmpty(vm.data, 'parameter')) {
        vm.model = {
          Id: vm.data.parameter.Id,
          Name: vm.data.parameter.Name,
          Value: vm.data.parameter.Value,
          Description: vm.data.parameter.Description,
          Color: vm.data.parameter.Color,
          Code: vm.data.parameter.Code,
          Caption : vm.data.parameter.Caption,
        }
      }

      if (vm.parent) {
        this.getListCode(vm.parent.Code)
      }
    },
    watch: {
      'model.Name': function (val) {
        var self = this
        /*
        this.generateCodeByName(val, this.parent.Code)
          .then(newCode => {
            self.model.Code = newCode
          })
        */
      }
    }
  }
</script>

<style scoped>

</style>
