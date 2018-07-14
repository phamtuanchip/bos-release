/**
* CreateEditTargetDialog Component
*
* Created by dbinh on 27/03/2018.
*/

<script>
  import api from '@/services/api'
  export default {
    name: 'CreateEditTargetDialog',
    components: {},
    props: {
      onCreate: Function,
      onCancelCreate: Function,
      onEdit: Function,
      onCancelEdit: Function,
      type: {
        type: String,
        default:
          () => 'create',
        validator:
          (val) => ['edit', 'create'].indexOf(val) !== -1
      },
      target: {
        type: Object
      }
    },
    data () {
      return {
        params: [],
        targetForm: this.type === 'edit' && this.target ? {...this.target} : {},
        targetFormTemp: {},
        rules: {
          Type: [
            { required: true, message: 'Phòng ban bắt buộc có', trigger: 'blur' }
          ],
          Description: [
            { required: true, message: 'Chỉ số bắt buộc có', trigger: 'blur' }
          ]
        },
        loadingUpdateTarget: false
      }
    },
    methods: {
      requestParamsSetting: function () {
        api.requestSetting('xSetting.Project.Parameter.Department')
          .then(data => {
            this.params = {
              ...this.params,
              Department: data
            }
          })
      },
      validateTargetForm: function (callback) {
        this.$refs['targetForm'].validate((valid) => {
          if (valid) {
            callback && callback()
          } else {
            return false
          }
        })
      },
      handleCreateTarget: function () {
        this.validateTargetForm(() => {
          this.loadingUpdateTarget = true
          api.createTarget(this.targetForm)
            .then(id => {
              this.targetForm.Id = id
              this.onCreate(JSON.parse(JSON.stringify(this.targetForm)))
              this.targetForm = {}
            })
            .finally(() => {
              this.loadingUpdateTarget = false
            })
        })
      },
      handleCancelCreate: function () {
        this.onCancelCreate()
      },
      handleEditTarget: function () {
        this.validateTargetForm(() => {
          this.loadingUpdateTarget = true
          api.updateTarget(this.targetForm)
            .then(id => {
              this.onEdit(JSON.parse(JSON.stringify(this.targetForm)))
              this.targetForm = {}
            })
            .finally(() => {
              this.loadingUpdateTarget = true
            })
        })
      },
      handleCancelEdit: function () {
        this.onCancelEdit()
      }
    },
    created: function () {
      this.requestParamsSetting()
    },
    computed: {},
    watch: {
      'targetForm.Type': function (newValue) {
        let selectedDepartment = this.params.Department.filter(department => department.Id === newValue)[0]
        this.targetForm.TypeName = selectedDepartment && selectedDepartment.Name
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <div class="CreateEditTargetDialog__ROOT">
    <el-form :model="targetForm" label-width="120px" ref="targetForm" :rules="rules" :label-position="$isMobileDevice ? 'top' : 'right'">
      <el-form-item label="Bộ phận" prop="Type">
        <el-select v-model="targetForm.Type" placeholder="Bộ phận">
          <el-option
            v-for="item in params.Department"
            :key="item.Id"
            :label="item.Name"
            :value="item.Id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Tên chỉ số" prop="Description">
        <el-input
          v-model="targetForm.Description"
          placeholder="Tên chỉ số"
        ></el-input>
      </el-form-item>

      <el-form-item label="Đơn vị tính" prop="ManagerName">
        <el-input
          v-model="targetForm.ManagerName"
          placeholder="Đơn vị tính"
        ></el-input>
      </el-form-item>

      <el-form-item label="Công thức tính toán" prop="Categories">
        <el-input
          v-model="targetForm.Categories"
          placeholder="Công thức tính toán"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="group-button" v-if="type === 'create'">
          <el-button
            type="primary"
            @click="handleCreateTarget"
            :loading="loadingUpdateTarget"
          >
            Tạo mới
          </el-button>
          <el-button @click="handleCancelCreate">Hủy</el-button>
        </div>

        <div class="group-button tac" v-if="type === 'edit'">
          <el-button
            type="primary"
            @click="handleEditTarget"
            v-if="type === 'edit'"
            :loading="loadingUpdateTarget"
          >
            Cập nhật
          </el-button>
          <el-button @click="handleCancelEdit">Hủy</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
