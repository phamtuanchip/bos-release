<template>
  <el-form ref="form" :model="model" :rules="rules" label-width="120px" class="documentForm">
    <el-form-item label="Loại tham số:" v-if="!isAddNew">      
      <el-select v-model="selectedParamCode" disabled placeholder="Chọn">
        <el-option v-for="item in codes"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Tham số:" v-if="!isAddNew">
      <el-select v-model="selectedParam" disabled placeholder="Chọn">
        <el-option v-for="item in params"
                   :key="item.Id"
                   :label="item.Name"
                   :value="item.Code">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Id" prop="Id">
        <el-input v-model="model.Id" disabled></el-input>
      </el-form-item>
    <el-form-item label="Tên hiển thị" prop="Name">
      <el-input v-model="model.Caption"></el-input>
    </el-form-item>
     <el-form-item label="Tên" prop="Name">
      <el-input v-model="model.Name"></el-input>
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
export default {
  name: "ParameterSetting",
  props: ["data", "type"],
  data() {
    var validateName = (rule, value, callback) => {
      if (value === undefined || value === null || value.trim() === "") {
        callback(new Error("Tên cần phải có"));
      } else {
        callback();
      }
    };
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
      selectedParamCode: "",
      selectedParam: "",
      selectedParamsId: "",
      rules: {
        Name: [{ validator: validateName, trigger: "blur" }]
      }
    };
  },
  methods: {
    async checkExistCode(newCode) {
      return false;
    },
    async generateCodeByName(name = "", parentCode) {
      let baseCode = parentCode;
      name = this.$Utils
        .toCapitalize(name)
        .trim()
        .replace(/\s/g, "_");
      let newCode = `${baseCode}.${name}`;
      let isExsistCode = await this.checkExistCode(newCode);
      if (isExsistCode) {
        newCode = `${newCode}-${Date.now()}`;
      }
      return newCode;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var vm = this;

          var request = {
            RequestClass: "xBase",
            RequestAction: "Request",
            TotalRequests: 1
          };
          if (vm.$Utils.isEmpty(vm.model.Id)) {
            request.R1_RequestTemplate = "Setting.Update";
            request.R1_Id = vm.model.Id;
          } else {
            request.R1_RequestTemplate = "Setting.Insert";
          }
          request.R1_NestedSetType = "InsertLastChildNode";
          request.R1_Color = vm.model.Color;
          request.R1_ReferenceId = vm.selectedParamsId;
          request.R1_Caption = vm.model.Caption;
          request.R1_Name = vm.model.Name;
          request.R1_Code = vm.model.Code;
          request.R1_Value = vm.model.Value;
          request.R1_Description = vm.model.Description;
          if (vm.selectedParam === "TaskPriority") {
            delete vm.model.ReferenceId;
            delete vm.model.value;
            if (
              vm.model.Id === undefined ||
              vm.model.Id === null ||
              vm.model.Id === ""
            ) {
              request.R1_RequestTemplate = "xEdu.TaskPriority.Insert";
              request.R1_Code = "TaskPriority";
              request.R1_RequestFields = "Code; Name; Description; Lead;";
              request.R1_Lead = vm.model.Color;
              delete request.R1_NestedSetType;
            } else {
              request.R1_RequestTemplate = "xEdu.TaskPriority.Update";
              request.R1_Code = "TaskPriority";
              request.R1_RequestFields = "Code; Name; Description; Id; Lead;";
              request.R1_Lead = vm.model.Color;
              delete request.R1_NestedSetType;
            }
          }
          vm.$Utils.post(request).then(response => {
            if (response.success) {
              vm.$Utils.showMessage("success", "Lưu thành công");
              vm.$hub.$emit("loadParameter");
              this.$hub.$emit("close-modal");
            } else {
              vm.$Utils.showMessage("error", "Có lỗi xảy ra");
              this.$hub.$emit("close-modal");
            }
          });
        } else {
          return false;
        }
      });
    },
    close() {
      this.$hub.$emit("close-modal");
    }
  },
  mounted() {
    var vm = this;
    console.log(this.data);
    if (vm.$Utils.isEmpty(vm.data, "selectedParamsId")) {
      vm.selectedParamsId = vm.data.selectedParamsId;
    }
    if (vm.$Utils.isEmpty(vm.data, "isAddNew")) {
      vm.isAddNew = vm.data.isAddNew;
    }
    if (vm.$Utils.isEmpty(vm.data, "codes")) {
      vm.codes = vm.data.codes;
    }
    if (vm.$Utils.isEmpty(vm.data, "params")) {
      vm.params = vm.data.params;
    }
    if (vm.$Utils.isEmpty(vm.data, "selectedCodes")) {
      vm.selectedParamCode = vm.data.selectedCodes;
    }
    if (vm.$Utils.isEmpty(vm.data, "selectedParams")) {
      vm.selectedParam = vm.data.selectedParams;
    }
    if (vm.$Utils.isEmpty(vm.data, "parameter")) {
      vm.model = {
        Id: vm.data.parameter.Id,
        Name: vm.data.parameter.Name,
        Value: vm.data.parameter.Value,
        Description: vm.data.parameter.Description,
        Color: vm.data.parameter.Color,
        Code: vm.data.parameter.Code,
        Caption: vm.data.parameter.Caption
      };
    }
  },
  watch: {
    "model.Name": function(val) {
      var self = this;
      /*
        if(this.data.parent)
        this.generateCodeByName(val, this.data.parent.Code)
          .then(newCode => {
            self.model.Code = newCode
          })
        */
    }
  }
};
</script>
<style>
</style>
