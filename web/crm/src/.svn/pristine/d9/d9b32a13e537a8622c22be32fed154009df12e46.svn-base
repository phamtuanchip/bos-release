<template>
  <div>
    <el-form>
      <el-form-item label="Tên nhóm">
        <el-input v-model="model.Caption"/>
      </el-form-item>
      <el-form-item label="Quyền hiển thị">
        <el-select v-model="model.UserPermissions" multiple clearable>
          <el-option-group label="Người dùng">
            <el-option v-if="viewModel.UserPermissions" v-for="item in viewModel.UserPermissions" :value="item.GroupId"
                       :label="item.GroupName"></el-option>
          </el-option-group>

          <el-option-group label="Phòng ban">
            <div v-for="item in viewModel.GroupPermissions">
              <el-option :value="item.GroupId" :label="item.GroupName"></el-option>
              <el-option v-if="viewModel.RolePermissions[item.GroupId]" v-for="child in viewModel.RolePermissions[item.GroupId]" :value="child.GroupId"
                         :label="'--' + child.GroupName"></el-option>
            </div>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="Quyền nhân sự">
        <el-select v-model="model.listUsers" multiple>
          <el-option v-if="viewModel.listUsers" v-for="item in viewModel.listUsers" :value="item.UserId" :label="item.LoginName">
            <span style="float: left">{{ item.LoginName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.Username }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Menu Icon">
        <el-input v-model="model.MenuIcon"/>
      </el-form-item>
      <el-form-item label="Tỉ lệ trên laptop (%)">
        <el-input v-model="model.Flex"/>
      </el-form-item>
      <el-form-item label="Tỉ lệ trên tablet (%)">
        <el-input v-model="model.FlexSM"/>
      </el-form-item>
      <el-form-item label="Tỉ lệ trên điện thoại (%)">
        <el-input v-model="model.FlexXS"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="save">Lưu</el-button>
        <el-button @click="cancel">Đóng</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  export default {
    name: "page-advance-group-info",
    props: ['data'],
    data() {
      this.data.scope.treeFullData.children= this.data.scope.treeFullData.children?this.data.scope.treeFullData.children:[];
      this.data.scope.model.Description.Groups= this.data.scope.treeFullData.children;
      var dat = {
        model: {
          Caption: '',
          UserPermissions: [],
          listUsers: [],
          MenuIcon: '',
          Flex: '',
          GroupDisplayType: 'Default',
          FlexSM: 50,
          FlexXS: 100,
          action: '',
          children:[],
          level: '0',
        },
        viewModel: {
          UserPermissions: this.data.scope.viewModel.UserPermissions,
          GroupPermissions: this.data.scope.viewModel.GroupPermissions,
          RolePermissions: this.data.scope.viewModel.RolePermissions,
          listUsers: this.data.scope.viewModel.listUsers,
        },
        centerDialogVisible: true,
        treeLst: this.data.scope.model.Description.Groups,
        dataToPass: this.data,
      };
      return dat;
    },
    methods: {
      save() {
        var ctrl = this;
        ctrl.model.collapseIcon = 'fa fa-plus-square';
        ctrl.model.expandIcon = 'fa fa-minus-square';
        ctrl.model.level = '0';
        ctrl.model.Level = '5';
        if (ctrl.data.action == 'edit') {
          $.each(this.treeLst, (i, val)=>{
            if(val.Id == ctrl.model.Id){
              this.treeLst[i] = ctrl.model;
              //console.log(this.treeLst,'xx')
              return false;
            }
          })
          // ctrl.treeLst.splice(ctrl.data.index, 1);
          // ctrl.treeLst.splice(ctrl.data.index, 0, ctrl.model);
        }else{
          ctrl.model.Id = ctrl.makeId();
          ctrl.model.Name = ctrl.model.Id;
          ctrl.treeLst.push(ctrl.model);
        }
        this.data.scope.model.Description.Groups = this.treeLst;
        ctrl.$hub.$emit('reloadFieldTree', ctrl.treeLst);
        ctrl.clearModel();
      },
      cancel() {
        this.$hub.$emit('close-modal')
      },
      clearModel() {
        this.$hub.$emit('close-modal')
      },
      makeId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-0123456789";
        for (var i = 0; i < 36; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
      }
    },
    created() {
      var ctrl = this;
      if (ctrl.data.action == 'edit') {
        ctrl.action = 'edit';
        var model = ctrl.$Lodash.cloneDeep(ctrl.data.item);
        //console.log('model', model)
        $.each(model, (k, v)=>{
            ctrl.$set(ctrl.model,k,v);
        })
      }
    }
  }
</script>

<style scoped>
  .el-select {
    width: 100%;
  }
</style>
