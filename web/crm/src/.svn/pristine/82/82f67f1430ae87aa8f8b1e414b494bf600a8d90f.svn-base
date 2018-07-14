<template>
  <div style="margin: 20px;">
    <el-form label-position="top" label-width="100px">
      <el-form-item label="">
        <el-col :span="12">
          <label>Link Request</label>
          <el-input v-model="model.RequestUrl"></el-input>
        </el-col>
        <el-col :span="12">
          <label>SessionId</label>
          <el-input v-model="model.SessionId"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="">
        <el-col :span="12">
          <label>Mã Node Gốc</label>
          <el-input v-model="viewModel.Code"></el-input>
        </el-col>
        <el-col :span="12">
          <label>&nbsp&nbsp&nbsp&nbsp</label><br>
          <el-button type="primary" @click="getTarget()">Get Id</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="">
        <el-col :span="12">
          <label>Id Node Đích</label>
          <el-input v-model="model.ReferenceId"></el-input>
        </el-col>
        <el-col :span="12">
          <label>Tên Node Mới</label>
          <el-input v-model="model.Name"></el-input>
        </el-col>
      </el-form-item>
       <el-form-item label="">
        <el-col :span="12"></el-col>
          <label>RequestTemplate </label>
          <el-input placeholder="xDocument_Document.Insert" v-model="model.RequestTemplate"></el-input>
       </el-form-item>
       <el-form-item label="">
        <el-col :span="12"></el-col>
          <label>RequestDataGroup </label>
          <el-input placeholder="DataGroup.campaign.0d1gf" v-model="model.RequestDataGroup"></el-input>
       </el-form-item>
      <el-form-item label="">
        <el-col :span="12">
          <label>Mã Node Mới</label>
          <el-input placeholder="Campaign" v-model="model.Code"></el-input>
        </el-col>
        <el-col :span="12">
          <label>Role Everyone</label>
          <el-input v-model="model.RoleEveryOneId"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="">
        <el-col :span="6">
          <label>Giữ Id</label>
          <el-checkbox v-model="model.KeepId">
          </el-checkbox>
        </el-col>
        <el-col :span="6">
          <label>Sinh mã mới</label>
          <el-checkbox v-model="model.NewCode">
          </el-checkbox>
        </el-col>
        <el-col :span="6">
          <label>Không lấy Node cha nguồn</label>
          <el-checkbox v-model="model.NotParentSource">
          </el-checkbox>
        </el-col>
        <el-col :span="6">
          <label>Thêm phân quyền Everyone</label>
          <el-checkbox v-model="model.EveryoneLinked">
          </el-checkbox>
        </el-col>
      </el-form-item>
      <!-- <el-form-item>
      <el-button  @click="openPermissionSelector()">Phân quyền</el-button>
      </el-form-item> -->
      <el-form-item>
<!--         <el-col :span="5">&ensp;</el-col>
        <el-col :span="14"> -->
          <el-button type="primary" @click="save()">Lưu</el-button>
          <el-button @click="cancel()">Đóng</el-button>
<!--         </el-col>
        <el-col :span="5">&ensp;</el-col> -->
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
  import PermissionSelector from '@/components/static/PermissionSelector'
  import utilsLibrary from '@/services/utils.js'

  export default {
    props:['data'],
    components: {PermissionSelector},
    data() {
      return {
        model: {
          RequestUrl: "",
          SessionId: "",
          ReferenceId: "",
          Name: "",
          Code: "",
          RoleEveryOneId: "",
          KeepId: "",
          NewCode: "",
          NotParentSource: "",
          EveryoneLinked: "",
        },
        viewModel: {}
      };
    },
    methods:{
      getTarget(){
        console.log(this.viewModel.Code);
        var ctrl = this;
        ctrl.model.ReferenceId = "";
        var requestUrl = ctrl.model.RequestUrl != '/xRequest.ashx' ? ctrl.model.RequestUrl : null;
        var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
        request.R1_RequestTemplate = 'Setting.SearchSetting';
        request.R1_Code = ctrl.viewModel.Code;
        request.SessionId = ctrl.model.SessionId;
        if(ctrl.viewModel.Code && ctrl.viewModel.Code!=""){
          utilsLibrary.post(request).then((data) => {
            data = utilsLibrary.getDataWithRoot(data.R1, 'Data.DynamicDS.Setting');
            ctrl.model.ReferenceId = data[0].Id;
            ctrl.$forceUpdate()
          })
        } else {
          utilsLibrary.showMessage('error', 'Chưa nhập Mã Node Gốc!');
        }
      },
      save() {
        var ctrl = this;
        ctrl.$rootScope.RequestUrl = ctrl.$Lodash.cloneDeep(ctrl.model.RequestUrl);
        ctrl.$rootScope.SessionId = ctrl.$Lodash.cloneDeep(ctrl.model.SessionId);
        var isValidated = true;
        var message = '';
        var arrRequireKey = [
          {Name: 'ReferenceId', Message: 'Id Node'},
          {Name: 'RequestUrl', Message: 'Link Request'},
          // {Name: 'SessionId', Message: 'SessionId'}
        ];
        arrRequireKey.forEach((item) => {
          if (message == '' && ctrl.model[item.Name] == '' || ctrl.model[item.Name] == undefined) {
            isValidated = false;
            message = item.Message;
          }
        });

        if (isValidated) {
          var requestUrl = ctrl.model.RequestUrl != '/xRequest.ashx' ? ctrl.model.RequestUrl : null;
          var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
          request.R1_RequestTemplate = 'Setting.SearchSetting';
          request.R1_Id = ctrl.model.CurrentNodeId;

          request.R2_RequestTemplate = 'Setting.SearchSetting';
          request.R2_ParentId = ctrl.model.CurrentNodeId;
          request.TotalRequests = 2;

          utilsLibrary.post(request).then((data) => {
            console.log(data)
            
            if (data.success) {
              var arrChildNodes = utilsLibrary.getDataWithRoot(data.R2, 'Data.DynamicDS.Setting');
              var arrCopyNodes = [{ParentId: ctrl.model.CurrentNodeId}];
              if (ctrl.model.NotParentSource) {
                arrCopyNodes[0].ReferenceId = ctrl.model.ReferenceId;
                ctrl.copyChildNodes(arrCopyNodes, arrChildNodes, requestUrl);
              }
              else {
                var currentNode = utilsLibrary.getDataWithRoot(data.R1, 'Data.DynamicDS.Setting')[0];
                utilsLibrary.deleteAutoValue(currentNode);
                if (ctrl.model.Name != '' && ctrl.model.Name != undefined) {
                  currentNode.Name = ctrl.model.Name;
                }
                if (ctrl.model.Code != '' && ctrl.model.Code != undefined) {
                  currentNode.Code = ctrl.model.Code;
                }
                if (ctrl.model.NewCode && currentNode.Code != undefined && currentNode.Code != '') {
                  currentNode.Code = currentNode.Code.substring(0, currentNode.Code.length - 5) + Math.random().toString(18).replace(/[^a-zA-Z0-9]+/g, '').substr(0, 5);
                }
                if (ctrl.model.KeepId == undefined || ctrl.model.KeepId == false) {
                  delete currentNode.Id;
                }

                request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
                request.R1_RequestTemplate = 'Setting.Insert';
                //request.R1_NestedSetType = 'InsertLastChildNode';
                request.R1_ReferenceId = ctrl.model.ReferenceId;
                request.SessionId = ctrl.model.SessionId;
                request = utilsLibrary.updateParamsSingleRequest(request, currentNode);
                console.log(request)
                return ;
                /*
                utilsLibrary.post(request, true, requestUrl).then(function (data) {
                  if (data.success) {
                    arrCopyNodes[0].ReferenceId = data.R1.Data;
                    if (ctrl.model.EveryoneLinked) {
                      utilsLibrary.linkToRoleEveryone([{
                        Id: data.R1.Data,
                        Caption: currentNode.Caption,
                        Name: currentNode.Name
                      }], requestUrl, ctrl.model.SessionId);
                    }
                    ctrl.copyChildNodes(arrCopyNodes, arrChildNodes, requestUrl);
                  }
                });
                */
              }
            }
          });
        }
        else {
          utilsLibrary.showMessage('error', message + ' chưa được nhập đầy đủ!');
        }
      },

      copyChildNodes(copyNodes, source, requestUrl) {
        var ctrl = this;
        var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
        var arrCopyNodes = [];
        copyNodes.forEach((copyNode) => {
          source.forEach((sourceItem) => {
            if (sourceItem.ParentId == copyNode.ParentId) {
              arrCopyNodes.push({
                ParentId: sourceItem.Id,
                Caption: sourceItem.Caption != undefined ? sourceItem.Caption : '',
                Name: sourceItem.Name != undefined ? sourceItem.Name : ''
                //Code: ctrl.model.Code
              });
              //console.log(ctrl.model.Code && ctrl.model.Code != undefined && sourceItem.Code != '')
              if(ctrl.model.Code && ctrl.model.Code != undefined && sourceItem.Code != '') {
              request['R' + request.TotalRequests + '_RequestTemplate'] = 'xDocument_Document.Insert'; 
              request['R' + request.TotalRequests + '_RequestDataGroup'] = 'DataGroup.campaign.0d1gf'
              //request['R' + request.TotalRequests + '_NestedSetType'] = 'InsertLastChildNode';
              //request['R' + request.TotalRequests + '_ReferenceId'] = copyNode.ReferenceId;
              request['R' + request.TotalRequests + '_Code'] = ctrl.model.Code;
              request['R' + request.TotalRequests + '_RequestFields'] ='Id;Code;Name;Description;DisplayDate;ExpiredDate;StatusName;Status;Created;StatusName';
              if (ctrl.model.KeepId == undefined || ctrl.model.KeepId == false) {
                delete sourceItem.Id;
              }
              if (ctrl.model.NewCode && sourceItem.Code != undefined && sourceItem.Code != '') {
                sourceItem.Code = sourceItem.Code.substring(0, sourceItem.Code.length - 5) + Math.random().toString(18).replace(/[^a-zA-Z0-9]+/g, '').substr(0, 5);
              }

              utilsLibrary.deleteAutoValue(sourceItem);
              request = utilsLibrary.updateParamsSingleRequest(request, sourceItem, request.TotalRequests);
              request.TotalRequests += 1;
              }
            }
          });
        });
        request.SessionId = ctrl.model.SessionId;
        if (request.TotalRequests == 1) {
          utilsLibrary.showMessage('success', 'Copy Node thành công');
        }
        else {
          request.TotalRequests -= 1;
          console.log(request)
          //return;
          utilsLibrary.postCheckResult(request, true, requestUrl).then((data) => {
            if (data.success) {
              $.each(arrCopyNodes, (index, copyNode) => {
                copyNode.ReferenceId = data['R' + (index + 1)].Data;
                copyNode.Id = copyNode.ReferenceId;
              });

              if (ctrl.model.EveryoneLinked) {
                utilsLibrary.linkToRoleEveryone(arrCopyNodes, requestUrl, ctrl.model.SessionId);
              }
              ctrl.copyChildNodes(arrCopyNodes, source, requestUrl);
            }
          });
        }
      },

      cancel() {
        var ctrl = this;
        //$mdDialog.hide();
        this.$hub.$emit("close-modal");
      },

      init() {
        var ctrl = this;
        ctrl.model = {
          RequestUrl: '/xRequest.ashx',
          CurrentNodeId: this.data.data.Id,
          //Code: this.data.data.Code,
          SessionId: ctrl.$getItemLocalStorage(ctrl.$localStorageConstant.SessionId),
          RoleEveryOneId: ctrl.$roleEveryoneId,
          EveryoneLinked: true,
          KeepId : true,
          NotParentSource: true,
          ReferenceId: this.data.data.Id
        };

        if(ctrl.$rootScope.RequestUrl && ctrl.$rootScope.RequestUrl!="") {
          ctrl.model.RequestUrl = ctrl.$Lodash.cloneDeep(ctrl.$rootScope.RequestUrl);
        }

        if(ctrl.$rootScope.SessionId && ctrl.$rootScope.SessionId!="") {
          ctrl.model.SessionId = ctrl.$Lodash.cloneDeep(ctrl.$rootScope.SessionId);
        } 
        // ctrl.communication = {action: '', item: {}, index: '', scope: ctrl};
        ctrl.viewModel.Code =  this.data.data.Code;
        

      },
    },
    mounted(){
      var ctrl = this;
    },
    created(){
      var ctrl = this;
      ctrl.init();
      // if(this.model.Id){
      //   var request = {
      //     RequestClass: 'xBase',
      //     RequestAction: 'Request',
      //     TotalRequests: 1,
      //     R1_RequestTemplate: 'Setting.SearchSetting',
      //     R1_Id: this.model.Id,//'xSetting.Project.Parameter',
      //   }
      //   this.$Utils.postCheckResult(request).then(data => {
      //     this.model = this.$Utils.getDataWithRoot(data.R1, "Data.DynamicDS.Setting")[0];
      //   })
      // }
    }
  }
</script>
