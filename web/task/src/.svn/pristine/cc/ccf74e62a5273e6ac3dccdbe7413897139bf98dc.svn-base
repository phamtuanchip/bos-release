<template>
  <el-form :model="model.Description" label-width="120px" :rules="rules" ref="form">
    <el-form-item>
      <el-button @click="back">Quay lại</el-button>
      <el-button type="primary" @click="save">Lưu</el-button>
    </el-form-item>
    <el-form-item label="Mã" prop="Code">
        <el-input v-model="model.Code" disabled ></el-input>
      </el-form-item>
    <el-form-item label="Tên" prop="Caption">
      <el-input v-model="model.Description.Caption" placeholder="Nhập tên..."/>
    </el-form-item>
    <el-form-item label="Mô tả">
      <el-input v-model="model.Description.More" placeholder="Nhập mô tả ..."/>
    </el-form-item>
    <el-form-item label="Khối dữ liệu">
      <SelectTree :datasource="viewModel.DataGroup.source" :nameField="['Caption','Code']" :value="value"
                  :selectedValue="viewModel.selectedDataGroup" :callback="onSelectDataGroup"/>
    </el-form-item>
    <el-form-item label="Cho phép quản trị">
      <el-checkbox v-model="model.Description.isAdminSeen"/>
    </el-form-item>
    <el-form-item label="Trường dữ liệu">
      
      <el-col :span="12">
        <el-select v-model="viewModel.Field" clearable placeholder="Chọn trường dữ liệu thêm vào bộ lọc"
                   style="width: 100%" filterable>
          <el-option
            v-for="item in viewModel.CurrentDataGroup.Fields"
            :key="item.Name"
            :label="item.Caption+' ('+item.Name+')'"
            :value="item.Name" v-if="item.FilterIsUsed == 'true'">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="viewModel.Group" clearable placeholder="Nhóm bộ lọc" style="width: 90%">
          <el-option
            v-for="item in model.Description.Groups"
            :key="item.Caption"
            :label="item.Caption"
            :value="item.Caption">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" :disabled="viewModel.Group === ''" @click="insertField()">Thêm</el-button>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-card>
        <sortable-tree v-for="(item, index) in viewModel.Groups" :data="item"
                       :dragEnable="true" closeStateKey="$foldClose">
          <template slot-scope="{item}">
            <div class="custom-tree-content" :class="{'exitChild': item.children && item.children.length}">
              <span v-if="item['$foldClose'] && item.children && item.children.length" @click="changeState(item)"><i
                :class='item.collapseIcon'></i></span>
              <span v-else-if="!item['$foldClose'] && item.children && item.children.length" @click="changeState(item)"><i
                :class='item.expandIcon'></i></span>
              <span class="mr-3"><a href="javascript:void(0)">{{item.Caption}}</a></span>
              <span><i class="el-icon-edit" v-if="!item.children" @click="editField(item)"></i></span>
              <span><i class="el-icon-delete" v-if="!item.children" @click="removeField(item, index)"></i></span>
            </div>
          </template>
        </sortable-tree>
      </el-card>
    </el-form-item>
  </el-form>
</template>
<script>
  import SelectTree from '@/components/dynamic/SelectTree'
  import FieldInfoDialog from '@/components/static/advance/FieldInfoDialog';

  export default {
    components: {
      SelectTree, FieldInfoDialog
    },
    props: ['selectedItem', 'isShow', 'isNew', 'closeCallback'],
    data() {
      return {
        checked: false,
        dataBlock: [],
        dataField: '',
        dataFields: [],
        options: [],
        value4: '',
        value: '',
        inputName: '',
        inputDescription: '',
        action: '',
        model: {},
        parentSetting: {},
        loadField: '',
        viewModel: {
          SelectedDataGroup: '',
          Field: '',
          Group: '',
          Groups: [],
          DataGroup: {
            source: []
          },
          OrderFields: {
            source: []
          },
          CurrentDataGroup: {
            Fields: []
          }
        },
        rules: {
          Caption: [{required: true, message: 'Trường bắt buộc', trigger: 'blur'}]
        }
      };
    },
    methods: {
      editField(item) {
        var ctrl = this;
        var ctrl = this;
        var communication = {
          item: item,
          action: 'edit',
          type: 'Filter',
        };
        ctrl.$hub.$emit(
          "set-modal-data",
          "Thông tin trường dữ liệu",
          "50%",
          true,
          "center",
          FieldInfoDialog,
          false,
          "",
          communication
        );
      },
      removeField(item, index) {
        var ctrl = this;
        var temp = [];
        $.each(ctrl.viewModel.Groups[index].children, (key, value) => {
          if (item.Name === value.Name) {
            ctrl.viewModel.Groups[index].children.splice(key, 1);
            temp = ctrl.$Lodash.cloneDeep(ctrl.viewModel.Groups);
            ctrl.model.Description.Groups = ctrl.$Lodash.cloneDeep(temp);
            $.each(ctrl.model.ObjectFields, (key, value) => {
              if (item.Name === value.Name) {
                ctrl.model.ObjectFields.splice(key, 1);
                return false
              }
            });
            return false
          }
        });
      },
      handleChange(data) {

      },
      onSelectDataGroup(data) {
        var ctrl = this;
        ctrl.viewModel.SelectedDataGroup = data;
        ctrl.viewModel.OrderFields.source = [];
        ctrl.viewModel.ListDataGroups.forEach(datagroup => {
          if (datagroup.Id === ctrl.viewModel.SelectedDataGroup[ctrl.viewModel.SelectedDataGroup.length - 1]) {
            var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
            request.R1_RequestTemplate = 'SettingNew.SearchSetting';
            request.R1_Code = datagroup.Code;
            ctrl.$Utils.postCheckResult(request).then((result) => {
              result = ctrl.$Utils.getDataWithRoot(result.R1, 'Data.DynamicDS.Setting');
              result = result[0];
              result.Description = JSON.parse(result.Description);
              result.Fields = '';
              for (var i = 1; i <= result.Description.FCount; i++) {
                if (result['F' + i] != undefined) {
                  result.Fields += result['F' + i];
                  delete result['F' + i];
                }
              }
              result.Fields = JSON.parse(result.Fields);
              ctrl.viewModel.CurrentDataGroup = {Fields: result.Fields};
            });
          }
        });
      },
      changeState(item) {
        this.$set(item, '$foldClose', !item['$foldClose'])
      },
      editTreeNode(selectedItem) {

      },
      back() {
        if (this.closeCallback) this.closeCallback();
      },
      save() {
        var ctrl = this;
        ctrl.$refs['form'].validate((valid) => {
          if (valid) {
            var savedData = ctrl.bindSavedData();
            var action = 'edit';
            var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
            request = ctrl.$Utils.updateParamsSingleRequest(request, savedData);
            if (ctrl.model.Id)
              request = ctrl.$Utils.updateParamsSingleRequest(request, {RequestTemplate: 'SettingNew.Update'});
            else {
              action = 'insert';
              request = ctrl.$Utils.updateParamsSingleRequest(request, {
                Code: 'Filter.' + ctrl.$Utils.removeVNCharacters(savedData.Caption) + '.' + Math.random().toString(18).replace(/[^a-zA-Z0-9]+/g, '').substr(0, 5),
                RequestTemplate: 'SettingNew.Insert',
                ReferenceId: ctrl.parentSetting.Id,
                NestedSetType: 'InsertLastChildNode'
              });
            }
            ctrl.$Utils.postCheckResult(request).then((data) => {
              if (data.success) {
                ctrl.model.Id = data.R1.Data;
                if (action === 'insert') {
                  ctrl.$Utils.linkToRoleEveryone([{
                    Id: ctrl.model.Id,
                    Caption: ctrl.model.Caption,
                    Name: ctrl.model.Name
                  }]);
                  //$state.go('app.configuration.filters.detail', {id: ctrl.model.Id});
                }
                ctrl.$Utils.showMessage('success', ctrl.$toastMessage.updateItemPre + ctrl.$toastMessage.updateItemSuf);
              }
            });
          } else {
            return false;
          }
        });
      },
      bindEditor() {
        var ctrl = this;
        if (!ctrl.isNew) {
          ctrl.action = 'edit';
          var currentForm = ctrl.$Lodash.cloneDeep(ctrl.selectedItem);
          currentForm.Description = JSON.parse(currentForm.Description);
          currentForm.ObjectFields = '';
          for (var i = 1; i <= currentForm.Description.OFCount; i++) {
            if (currentForm['OF' + i] !== undefined) {
              currentForm.ObjectFields += currentForm['OF' + i];
              // delete currentForm['F' + i];
              delete currentForm['OF' + i];
            }
          }
          currentForm.ObjectFields = JSON.parse(currentForm.ObjectFields);
          $.each(currentForm.Description, (value, key) => {
            if (value === 'true')
              currentForm.Description[key] = true;
            else if (value === 'false')
              currentForm.Description[key] = false;
          });
          ctrl.model = currentForm;
          ctrl.viewModel.CurrentDataGroup.Fields = ctrl.$Lodash.cloneDeep(ctrl.model.ObjectFields);
          $.each(ctrl.model.Description.Groups, (key, item) => {
            if (item.ListFields) {
              var tempListField = item.ListFields;
              var temp = tempListField.split(";");
              item.children = [];
              $.each(temp, (k, data) => {
                $.each(ctrl.model.ObjectFields, (k, field) => {
                  if (field.Name === data) {
                    item.children.push(field);
                    ctrl.viewModel.OrderFields.source.push(field);
                  }
                })
              });
              item.collapseIcon = 'fa fa-plus-square';
              item.expandIcon = 'fa fa-minus-square';
              item.level = '0';
              item.Level = '5';
              item.Name = item.Caption;
            }
          });
          ctrl.viewModel.Groups = ctrl.$Lodash.cloneDeep(ctrl.model.Description.Groups);
        }
        else {
          ctrl.action = '';
        }

        ctrl.bindDataGroupSource();

        if (ctrl.action === '') {
          ctrl.model = {
            Description: {
              Groups: [
                {Caption: 'Lọc chính'},
                {Caption: 'Lọc nâng cao'}
              ],
              Dependencies: [],
              Link: {}
            },
            ObjectFields: []
          };
          ctrl.viewModel.Groups = ctrl.$Lodash.cloneDeep(ctrl.model.Description.Groups);
          ctrl.viewModel.Groups.forEach(item => {
            item.ListFields = "";
            item.children = [];
            item.collapseIcon = 'fa fa-plus-square';
            item.expandIcon = 'fa fa-minus-square';
            item.level = '0';
            item.Level = '5';
            item.Name = item.Caption;
          });
          ctrl.bindParentSetting();
        }
      },
      bindParentSetting() {
        var ctrl = this;
        var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
        request.R1_RequestTemplate = 'Setting.SearchBase';
        request.R1_Code = 'xSetting.Project.Filter';
        ctrl.$Utils.post(request).then((data) => {
          data = ctrl.$Utils.getDataWithRoot(data.R1, 'Data.DynamicDS.Setting');
          ctrl.parentSetting = data[0];
        })
      },
      bindDataGroupSource() {
        var ctrl = this
        var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
        request.R1_RequestTemplate = 'SettingNew.SearchSetting';
        request.R1_ParentCode = 'xSetting.Project.DataGroup';
        request.R1_Level = '4;5';
        ctrl.$Utils.post(request).then((data) => {
          ctrl.viewModel.ListDataGroups = ctrl.$Utils.getDataWithRoot(data.R1, 'Data.DynamicDS.Setting');
          ctrl.viewModel.DataGroup.source = ctrl.$Lodash.cloneDeep(ctrl.viewModel.ListDataGroups);
          ctrl.viewModel.DataGroup.source.forEach(item => {
            var ret = true;
            if (item.Code === ctrl.selectedItem.Name) {
              var tmp = [item.ParentId, item.Id];
              ctrl.$set(ctrl.viewModel, 'selectedDataGroup', tmp);
              ctrl.onSelectDataGroup(ctrl.viewModel.selectedDataGroup);
              ret = false;
            }
            return ret;
          })
        });
      },
      bindSavedData() {
        var ctrl = this;
        var savedData = ctrl.$Lodash.cloneDeep(ctrl.model);
        ctrl.$Utils.deleteAutoValue(savedData);
        ctrl.viewModel.ListDataGroups.forEach((dataGroup) => {
          if (dataGroup.Id === ctrl.viewModel.SelectedDataGroup[ctrl.viewModel.SelectedDataGroup.length - 1]) {
            var refDataGroup = ctrl.$Lodash.cloneDeep(dataGroup);
            refDataGroup.Description = JSON.parse(refDataGroup.Description);
            savedData.Name = refDataGroup.Code;
            savedData.Caption = savedData.Description.Caption;
            savedData.Description.DataGroupCaption = refDataGroup.Caption;
            savedData.Description.Link = refDataGroup.Description.Link;
            savedData.Description.RootData = refDataGroup.Description.RootData;
            savedData.Description.DataSource = refDataGroup.Description.DataSource;
            savedData.Description.AdditionConditions = refDataGroup.Description.AdditionConditions;
            savedData.Description.Dependencies = refDataGroup.Description.Dependencies;
          }
        });

        savedData.ObjectFields = [];

        $.each(savedData.Description.Groups, (key, group) => {
          group.ListFields = '';
          if(ctrl.viewModel.Groups[key].children && ctrl.viewModel.Groups[key].children.length > 0){
            ctrl.viewModel.Groups[key].children.forEach(child => {
              group.ListFields += child.Name + ";";
              savedData.ObjectFields.push(child);
            });
          }
        });

        savedData.Fields = ctrl.$Lodash.cloneDeep(savedData.ObjectFields);
        var refFields = ctrl.$Lodash.cloneDeep(ctrl.viewModel.CurrentDataGroup.Fields);
        savedData.Fields.forEach((field) => {
          refFields.forEach((dgField) => {
            if (dgField.Name === field.Name) {
              $.each(dgField, (key, value) => {
                if (!ctrl.$Utils.isEmpty(field[key]))
                  field[key] = value;
              });
              ctrl.$Utils.deleteAutoValue(field);
            }
          });
        });

        refFields.forEach((field) => {
          ctrl.$Utils.deleteAutoValue(field);
          if (field.FormFieldType === 'Hidden')
            savedData.Fields.push(field);
          if (field.DynamicText !== undefined && field.DynamicText != null)
            savedData.Fields.push({Name: field.DynamicText, FieldStorageType: 'Dynamic'});
        });

        savedData.ObjectFields.forEach(item => {
          delete item.$parent;
        });

        savedData.ObjectFields = JSON.stringify(savedData.ObjectFields);
        var iStartIndex = 0;
        var iFieldCount = 0;
        for (var i = 1; i < 7; i++) {
          if (savedData.ObjectFields.length > iStartIndex) {
            savedData['OF' + i] = savedData.ObjectFields.substring(iStartIndex, iStartIndex + 9999);
            iStartIndex = 10000 * i - i;
            iFieldCount = i;
          }
        }
        savedData.Description.OFCount = iFieldCount;
        delete savedData.ObjectFields;

        iStartIndex = 0;
        iFieldCount = 0;
        savedData.Fields.forEach(item => {
          delete item.$parent;
        });
        savedData.Fields = JSON.stringify(savedData.Fields);
        for (var i = 1; i < 7; i++) {
          if (savedData.Fields.length > iStartIndex) {
            savedData['F' + i] = savedData.Fields.substring(iStartIndex, iStartIndex + 9999);
            iStartIndex = 10000 * i - i;
            iFieldCount = i;
          }
        }
        savedData.Description.FCount = iFieldCount;
        delete savedData.Fields;

        // var orderFieldsItems = ctrl.$Lodash.cloneDeep(ctrl.model.ObjectFields);
        // savedData.Description.Groups.forEach((group) => {
        //   group.ListFields = '';
        //   var treeItemId = '';
        //   orderFieldsItems.forEach((item) => {
        //     if (item.label === group.Caption && item.level === 0)
        //       treeItemId = item.id;
        //   });
        //   orderFieldsItems.forEach((item) => {
        //     if (item.parentId === treeItemId)
        //       group.ListFields += item.value + ';';
        //   });
        //   orderFieldsItems.forEach(item => {
        //
        //   })
        // });

        $.each(savedData.Description, (key, value) => {
          if (value === true & !ctrl.isNumeric(savedData.Description[key]))
            savedData.Description[key] = 'true';
          if (value === false && value !== '')
            savedData.Description[key] = 'false';
        });

        savedData.Description.ModuleType = 'Filter';
        savedData.Description = JSON.stringify(savedData.Description);
        return savedData;
      },
      insertField() {
        var ctrl = this;
        ctrl.loadField = 'Đang thêm ...'
        var exist = false;
        var temp = [];
        if (ctrl.viewModel.Field !== '') {
          ctrl.model.ObjectFields.forEach(selectedField => {
            if (selectedField.Name === ctrl.viewModel.Field) {
              exist = true;
            }
          });
          if (exist === false) {
            ctrl.viewModel.Groups.forEach(group => {
              if (group.Caption === ctrl.viewModel.Group) {
                group.ListFields += ctrl.viewModel.Field + ";";
                ctrl.viewModel.CurrentDataGroup.Fields.forEach(field => {
                  if (field.Name === ctrl.viewModel.Field) {
                    group.children.push(field);
                    ctrl.model.ObjectFields.push(field);
                  }
                })
              }
            });
            temp = ctrl.$Lodash.cloneDeep(ctrl.viewModel.Groups);
            ctrl.model.Description.Groups = ctrl.$Lodash.cloneDeep(temp);
            temp = JSON.stringify(ctrl.model.Description.Groups);
            ctrl.model.Description.Groups = JSON.parse(temp);
            ctrl.$forceUpdate();
            ctrl.$nextTick();
          }
          else {
            ctrl.$Utils.showMessage('error', 'Trường dữ liệu đã được thêm vào');
          }
        }
        else {
          ctrl.$Utils.showMessage('error', 'Hãy chọn 1 trường dữ liệu');
        }
        ctrl.viewModel.Field = '';
      },
      isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
    },
    created() {
      this.bindEditor();
    },
    mounted() {

    }
  }
</script>
<style scoped lang="scss">
  .children {
    padding-left: 10px;
  }

  .custom-tree-content {
    position: relative;
    top: 2px;
    z-index: 1;
    &.exitChild {
      margin-left: -7px;
    }
  }
</style>
