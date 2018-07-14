<template>
    <div>
      <el-form :inline="true" :rules="rules" ref="ruleForm"  :model="ruleForm" class="demo-form-inline">
          <el-form-item label="Mã" prop="name">
            <el-input  size="medium" v-model="paramCode" placeholder="" @keyup.enter.native="submitForm('ruleForm')" ></el-input>
          </el-form-item>
          <el-form-item label="">
           <el-radio-group v-model="ruleForm.radio">
          <el-radio :label="1">Mặc định</el-radio>
          <el-radio :label="0">Request</el-radio>

        </el-radio-group>

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Tìm kiếm</el-button>
            <!-- <el-button type="primary" @click="manualUpdate">Cập nhật</el-button> -->
          </el-form-item>
        </el-form>
      <div class="project-categories">
        <b-card>
          <!-- <button @click="consoleData">consoleData</button> -->
          <sortable-tree :data="treeData" mixinParentKey="$parent" @changePosition="changePosition" :dragEnable="true" closeStateKey="$foldClose">
            <template slot-scope="{item}">
              <div class="custom-tree-content" :class="{'exitChild': item.children && item.children.length}">
                <span v-if="item['$foldClose'] && item.children && item.children.length" @click="changeState(item)"><i :class='item.collapseIcon'></i></span>
                <span v-else-if="!item['$foldClose'] && item.children && item.children.length" @click="changeState(item)"><i :class='item.expandIcon'></i></span>
                <span class="mr-3"><a href="javascript:void(0)" @click="changeState(item)">{{item.Name}}</a></span><span v-if="item.level!='0'">
                     <a href="javascript:void(0)" @click="addPara(item)"><i class="fa fa-plus" aria-hidden="true"></i></a> |
                    <a href="javascript:void(0)" @click="editPara(item)"><i class="el-icon-edit" aria-hidden="true"></i></a> |
                    <a href="javascript:void(0)" @click="exportPara(item)"><i class="el-icon-download" aria-hidden="true"></i></a> |
                    <a href="javascript:void(0)" @click="copyPara(item)"><i class="fa fa-copy" aria-hidden="true"></i></a> |
                    <a href="javascript:void(0)" @click="copyToNewGroupPara(item)"><i class="fa fa-object-ungroup" aria-hidden="true"></i></a> |
                    <a href="javascript:void(0)" @click="deletePara(item)"><i class="fa fa-trash" aria-hidden="true"></i></a>
                </span>
              </div>
            </template>
          </sortable-tree>
        </b-card>
        <el-dialog
          title="Xóa"
          :visible.sync="DialogVisible"
          width="30%"
          center>
          <span>Bạn có chắc muốn xóa không ?</span>
          <el-button type="primary" @click="DialogVisible = false">Lưu</el-button>
          <el-button @click="DialogVisible = false">Đóng</el-button>
        </el-dialog>
      </div>
  </div>
</template>
<script>
let id = 1000;
  import Vue from 'vue'
  import SortableTree from 'vue-sortable-tree'
  import ParameterForm from '@/components/static/advance/ParameterForm'
  import Copy from '@/components/static/advance/Copy'
  import CopyToNewGroup from '@/components/static/advance/CopyToNewGroup'
  Vue.component(SortableTree.name, SortableTree)

export default {
    components:{ParameterForm},
    data(){
        return {
            isEditParam: false,
            paramCode:'',
            ruleForm: {
                name: '',
                radio:1
            },
            rules: {
              name: [
                // { required: true, message: 'Mã cần có', trigger: 'blur' }
              ]
            },
            Name: '',
            Parent: '',
            ListData: [],
            treeData: {

            },
            tempTree: {
                Name: 'Các tham số',
                children: [],
                level: '0',
                Level: '5',
                collapseIcon:'fa fa-cog',
                expandIcon: 'fa fa-cog'
            },
            viewModel: {},
            DialogVisible:false
        }
    },
    destroyed(){
      this.$hub.$off('update-param-tree');
    },
    created(){
        this.paramCode = this.$route.params.param;
        this.isEditParam = (this.paramCode != null &&  this.paramCode != '');
        //alert(this.paramCode);
        if(!this.isEditParam) this.paramCode='xSetting.Default';
        this.ruleForm.name = this.paramCode;
        this.init();
    },
    mounted(){
        this.$hub.$on('update-param-tree', code =>{
          this.paramCode = code;
          this.init()
        });
    },
    methods: {
      exportPara(selectedItem){
          if (!selectedItem) return;
          // var request = angular.copy(singleRequest);
          var request = this.$Lodash.cloneDeep(this.$singleRequest);
          request.R1_RequestTemplate = 'Setting.SearchSetting';
          request.R1_ParentId = selectedItem.value;
          request.R1_IncludedNestedSetParent = true;
          // request.R1_Level = eval(selectedItem.Level) + 1;
          this.$Utils.post(request).then((data)=> {
            data = this.$Utils.getDataWithRoot(data.R1, 'Data.DynamicDS.Setting');
            var blob = new Blob([JSON.stringify(data)], {
              type: "application/json"
            });
            this.saveAs(blob, selectedItem.Name + ".json")
          })
      },
       saveAs(blob, fileName) {
      if (window.navigator.msSaveOrOpenBlob) { // For IE:
        navigator.msSaveBlob(blob, fileName);
      } else { // For other browsers:
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(link.href);
      }
    },


      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           // alert('submit!');
           //this.code = this.ruleForm.name;
           this.$hub.$emit('update-param-tree', this.paramCode);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      manualUpdate(){
        var requestP = {
              RequestClass: "BPM",
              RequestAction: "UpdateGroupForNestedSet",
            };
        // this.$Utils.post(requestP).then(() => {});
        var request = this.$Lodash.cloneDeep(this.$singleRequest); 
          // var params = {
          //     RequestAction: 'InsertTarget',
          //     RequestClass: 'Tasks',
          //     StaticFields: "Index;Code;Name;Description;",
          //     //DynamicFields: "",
          //     //StructFields: "",
          //     ReferenceId: 'ece50e8e-a449-4482-b561-20546dd3c3de',
          //     // SessionId: getItemLocalStorage(localStorageConstant.SessionId),
          //     NestedSetType: 'InsertLastChildNode',
          //     // ParentCode: 'xSystem.Category.Status',
          //     ConditionFields: 'ParentCode',
          //     Name: '123',
          // };
            // $scope.formData['Status'] = {
            //     parameters: JSON.stringify(params),
            //     rootdata: "TaskCategoryDS.Task"
            // };

        // function comboMilestone() {
        //     var params = {
        //         RequestAction: 'SearchMilestone',
        //         RequestClass: 'Tasks',
        //         SessionId: getItemLocalStorage(localStorageConstant.SessionId),
        //         StaticFields: 'Name;Description',
        //         limit: 50,
        //         start: 0,
        //         page: 1
        //     };
        //     $scope.formData['Milestones'] = {
        //         parameters: JSON.stringify(params),
        //         rootdata: "Data.TasksDS.Milestone"
        //     };
        // }
        // request.R1_RequestTemplate =  'xDocument_Document.Search';
        // request.R1_RequestDataGroup = 'DataGroup.order.9ejnl';
        // request.R1_Code = 'Order';
        // // request.R1_Id = '2f5';
        // request.R1_RequestFields = "Id;Created";
        // request.R1_CreatedStartValue = '2018-05-01T00:00:00'
        // request.R1_CreatedEndValue = '2018-05-04T23:59:59'
        request['R1_RequestTemplate'] =  'xDocument_Document.Search';
        request['R1_RequestDataGroup'] = 'DataGroup.orderpart.82fjy';
        request.R1_Code = 'OrderPart';
        // request['R2_Parent'] = val.Id;
        // request['R1_Promulgator'] = objPos[item.Store];
        request['R1_RequestFields'] = "Id;Parent;BillCode";
        // request.R2_CreatedStartValue = '2018-05-01T00:00:00'
        // request.R2_CreatedEndValue = '2018-05-04T23:59:59'
        // request.R2_RequestTemplate =  'xDocument_Document.Search';
        // request.R2_RequestDataGroup = 'DataGroup.product.19jev';
        // request.R2_Code = 'Product';
        // request.R2_RequestFields = "Id;Name;ProductCode";
        // request.R1_RequestTemplate =  'xDocument_Document.Search';
        // request.R1_RequestDataGroup = 'DataGroup.warehouse.0fd40';
        // request.R1_Code = 'Warehouse';
        // request.R1_RequestFields = "Id;MetaKeywords";

        // request.R2_RequestTemplate =  'xDocument_Document.Search';
        // request.R2_RequestDataGroup = 'DataGroup.product.19jev';
        // request.R2_Code = 'Product';
        // request.R2_RequestFields = "Id;Barcode;Metarial;Style;ArmStyle;NeckStyle";
        // // console.log(arr);
        // request.TotalRequests = 2;
        // request.R1_RequestTemplate="xDocument_Document.Search"
        // request.R1_RequestDataGroup="DataGroup.orderpart.82fjy"
        // request.R1_RequestFields="Id;OrderId";
        // request.R1_Code="OrderPart";
        // request.R1_Id="F5A50C1A-1C1C-449C-A95F-0569BFC2F8FD;170A47EE-17F2-496C-86EB-0D37BDBF3096;9C9874CA-CCDF-4907-8F0F-171BAAB88609;A26B1581-BCD4-4334-94E4-223F74D1FFE0;C7BA85D5-CCFA-4C08-8A18-285FFF8B77CC;F52C8EB0-22FD-40C2-8CBC-29AACA92BAD8;64D226A5-1732-4391-AF43-2E782FB0C867;14F81C11-521F-4C3D-BD4A-36D9FE23FB4E;D5515189-74BE-4C3E-B403-3EF8FDE1F4BF;89DC2F27-3CD6-41E2-82DB-43226BD13AAC;287583D3-ACE2-474A-9324-44C29296B3EB;908DD277-5CE1-42DB-8C30-4B7486DB5090;F0B029B8-E89B-4B3B-B295-512CECB45DB1;9D92CC38-E283-4044-B0FD-550A8053D22F;F1FA927B-93B6-49AC-BB12-5DDF8DCF09CF;0F4B1A45-7283-48D1-83C5-6F76C4C28451;6CCD93F0-9059-4443-A5AF-713175519706;48A9321E-5A64-4D95-B351-761AD0077BE3;7864C843-541D-4015-99F0-794E70A73AD1;88BDFF30-AF2E-40BA-B926-7A282B56DE06;269AF5D2-F4CF-4EA2-97ED-7B59EB078E66;D69C62FC-BE18-4246-82EC-7B7EBDDCBE03;6CAFF5CD-7DE0-4CDE-B64F-7D585BA80723;F0FA6DDF-949B-42E5-BF26-7F2D8B0F87E8;86F8F92E-6E21-482B-A5C3-8356CF4C894D;04DE1950-B464-4C9B-8158-84E43AC203FC;465FD5DB-6ECB-481A-9262-8705190ADF57;E1010329-A664-4B58-B8A1-8A3224A2DF71;ED6FE477-3BD5-4766-B2A4-8A37F3250DDB;9CDDA2C6-D313-4A24-BBED-8D803C6AC2FE;50CED0C4-6F97-4855-9498-9477B1EE9116;3B8A1ECE-7A7F-4679-8082-94ECCBC4E2E7;71053AB9-5A2E-4093-9667-98194C5C4689;DC25C98A-D566-41E6-9DF2-9BA22C79F325;09D4B64D-D3E8-4E1E-91DA-9D5B574E12F2;DB04C65B-B78A-4488-99F8-9E77A43F6E3E;DFDAC915-9B41-4996-9D74-9FFDA22692D9;4FEA39A7-8CFE-4B7A-AD8A-AC29F44ACAC3;E02A058C-C2D2-4F60-A564-ADCAAB7BFC6B;D9E3C7D9-2044-413E-8444-ADCFBEDC2A61;EFFF3235-2363-423E-BE02-ADCFC1DD19FA;B7BDEA60-8214-4089-B44F-B1A808C603DF;9FEBC1D3-4557-40B0-9D13-B958948F7DC5;519BB89F-E483-4C11-9C50-C1BC8485540F;52F4712C-C1FC-4DD4-ADF1-D506185E96D3;BEE55A94-08BC-4542-B497-DB2A77047261;2EB44F2A-8925-40A7-80D9-DC96273AFFBC;5F1DF754-F109-40D4-A7B1-DCAFAF88A4AE;48DB8D39-0B98-46EE-9EB6-EB1A2177F11A"
        // request.R1_StartIndex = 1;
        // request.R1_EndIndex = 1000;
        // request.R1_CreatedStartValue="2018-03-03T00:00:00"
        // request.R1_CreatedEndValue="2018-03-03T23:59:59"
        // request.R1_Source="dba5d63b-6398-40f7-a610-f72717b0af9c";
        // for(var i=0;i < arr.length;i++){
        //   request['R' + (i+1) + '_RequestTemplate'] =  'xDocument_Document.Update';
        //   request['R' + (i+1) + '_RequestDataGroup'] = 'DataGroup.orderpart.82fjy';
        //   // request['R' + (i+1) + '_Code'] = 'OrderPart';
        //   request['R' + (i+1) + '_Id'] = arr[i][0];
        //   request['R' + (i+1) + '_DeliveryStatusName'] = arr[i][1];
        //   request['R' + (i+1) + '_DeliveryStatus'] = arr[i][2];
        //   // request['R' + (i+1) + '_Priority'] = 0;
        //   request['R' + (i+1) + '_RequestFields'] = "Id;Code;DeliveryStatus;DeliveryStatusName";
        // }
        // console.log(request)
        // this.$Utils.post(request).then(data => {
          // var arrPages = this.$Utils.getDataWithRoot(data.R1,"Data.DocumentDS.Document");
          // var arrProduct = this.$Utils.getDataWithRoot(data.R1,"Data.DocumentDS.Document");
          // var arrPos = this.$Utils.getDataWithRoot(data.R2,"Data.DocumentDS.Document");
          // var objPos = this.$Lodash.chain(arrPos).keyBy('Barcode').value();
          // console.log(objPos)
          // var params = {
          //     RequestTemplate: 'xDocument_Document.Search',
          //     // RequestDataGroup: 'DataGroup.kpi.03adg',
          //     // RequestFields: 'Id;Tool;TypeName;Type;StatusName;Status;FeatureName;Feature;ManagerName;Manager;MilestoneName;Milestone;CategoryName;Category;CategoriesName;Categories;Planned;State;Priority;PlanStartDate;PlanFinishDate;TypeName;StatusName;FeatureName;ManagerName;MilestoneName;CategoryName;CategoriesName;Id;Code;Changed;FormSetting;ParentName;Level;ParentCode;ParentId;LeftIndex;RightIndex',
          //     // SessionId: getItemLocalStorage(localStorageConstant.SessionId),
          //     // NestedSetType: true,
          //     // StaticFields: 'Name;LeftIndex;RightIndex',
          //     // ParentCode: 'xSystem.Category.Status',
          //     // ConditionFields: 'ParentCode',
          //     // NestedSetType: 'InsertLastChildNode',
          //     ParentCode: 'xSetting.Default',
          //     // Name: 'KPI'
          //     // ParentId: 'f67f69d7-9624-4a83-b570-38f092b8e563'
          // };
          // request = this.$Utils.updateParamsSingleRequest(request, params, 1)
          this.$Utils.post(request).then((data) => {
            // var arrPages = this.$Utils.getDataWithRoot(data.R1 ,"Data.DocumentDS.Document");
            var arrChild = this.$Utils.getDataWithRoot(data.R1 ,"Data.DocumentDS.Document");
          // });
          // var arrPages = this.$Utils.getDataWithRoot(data.R1,"TaskCategoryDS.Task");
          // console.log(arrPages)
            var Count = 0;
          //   $.each(arrPages, (key,val) =>{
          //     // var upRequest = this.$Lodash.cloneDeep(this.$singleRequest);
          //     // upRequest['R1_RequestTemplate'] =  'xDocument_Document.Search';
          //     // upRequest['R1_RequestDataGroup'] = 'DataGroup.orderpart.82fjy';
          //     // upRequest['R1_Parent'] = val.Id;
          //     // // upRequest['R1_Promulgator'] = objPos[item.Store];
          //     // upRequest['R1_RequestFields'] = "Id;Parent;Created";
          //     // this.$Utils.postCheckResult(upRequest).then((zData) => {
          //     //   var arrChild = this.$Utils.getDataWithRoot(zData.R1 ,"Data.DocumentDS.Document");
          //       arrChild.forEach(item => {
          //         if(val.Id === item.Parent && this.$Utils.formatDateTime(item.Created, 'DD/MM/YYYY') != this.$Utils.formatDateTime(val.Created, 'DD/MM/YYYY')) {
          //           Count ++
          //           console.log(val, item, Count);
          //         }
          //       // })
          //     });
          //   // upRequest.TotalRequests ++;
          // })
          arrChild.forEach(item => {
              if(!item.Parent && item.BillCode) {
                console.log(item)
                Count ++
                var request = this.$Lodash.cloneDeep(this.$singleRequest); 
                request.R1_RequestTemplate =  'xDocument_Document.Search';
                request.R1_RequestDataGroup = 'DataGroup.order.9ejnl';
                request.R1_Code = 'Order';
                request.R1_BillCode = item.BillCode;
                request['R1_RequestFields'] = "Id;BillCode";
                this.$Utils.post(request).then((mdata) => {
                  var arrPages = this.$Utils.getDataWithRoot(mdata.R1 ,"Data.DocumentDS.Document")[0];
                  console.log(arrPages)
                  var upRequest = this.$Lodash.cloneDeep(this.$singleRequest);
                  upRequest['R1_RequestTemplate'] =  'xDocument_Document.Update';
                  upRequest['R1_RequestDataGroup'] = 'DataGroup.orderpart.82fjy';
                  upRequest['R1_Parent'] = arrPages.Id;
                  upRequest['R1_OrderId'] = arrPages.Id;
                  // console.log(upRequest)
                  upRequest['R1_Id'] = item.Id;
                  upRequest['R1_RequestFields'] = "Id;Parent;OrderId";
                  console.log(upRequest)
                  // this.$Utils.postCheckResult(upRequest).then((zData) => {})
              //   var arrChild = this.$Utils.getDataWithRoot(zData.R1 ,"Data.DocumentDS.Document");

                // console.log(item, Count);
              })
            }
          });
          // for(var i=0;i < arr.length;i++){
          //   var arrPages = this.$Utils.getDataWithRoot(data['R' + (i+1)],"Data.DocumentDS.Document");
          //   // console.log(arrPages);
            // if(arrPages.length > 0){
            //   var upRequest = this.$Lodash.cloneDeep(this.$singleRequest);
            //   upRequest.TotalRequests = 0
            //   $.each(arrPages, (key, item) => {
            //     upRequest['R' + (key + 1) + '_RequestTemplate'] =  'xDocument_Document.Update';
            //     upRequest['R' + (key + 1) + '_RequestDataGroup'] = 'DataGroup.orderpart.82fjy';
            //     upRequest['R' + (key + 1) + '_Id'] = item.Id;
            //     upRequest['R' + (key + 1) + '_Promulgator'] = objPos[item.Store];
            //     upRequest['R' + (key + 1) + '_RequestFields'] = "Id;Promulgator";
            //     upRequest.TotalRequests ++;
            //   })
            //   // console.log(upRequest)
            //   this.$Utils.postCheckResult(upRequest).then(() => {

                // if(arrProduct.length > 0){
                //   var unRequest = this.$Lodash.cloneDeep(this.$singleRequest);
                //   unRequest.TotalRequests = 0
                //   var objUpdate = 
                //     {
                //       // Barcode: 'MetaKeywords',
                //       Metarial: 'MetaTitle',
                //       Style: 'Signer',
                //       ArmStyle: 'Title',
                //       NeckStyle: 'Source'
                //     }
                //   $.each(arrProduct, (key, item) => {
                //     unRequest['R' + (key + 1) + '_RequestTemplate'] =  'xDocument_Document.Update';
                //     unRequest['R' + (key + 1) + '_RequestDataGroup'] = 'DataGroup.warehouse.0fd40';
                //     unRequest['R' + (key + 1) + '_Id'] = item.Id;
                //     // unRequest['R' + (key + 1) + '_MetaKeywords'] = objPos[item.MetaKeywords]['Barcode'];
                //     unRequest['R' + (key + 1) + '_RequestFields'] = "Id;";
                //     $.each(objUpdate, (k, val) => {
                //       unRequest['R' + (key + 1) + '_' + val] = objPos[item.MetaKeywords][k];
                //       unRequest['R' + (key + 1) + '_RequestFields'] += val + ';';
                //     })
                //     unRequest.TotalRequests ++;
                //   })
                //   // console.log(unRequest)
                //   this.$Utils.postCheckResult(unRequest).then(() => {});
                // }

              // });
            // }

            
          //   // request['R' + (i+1) + '_RequestTemplate'] =  'xDocument_Document.Search';
          //   // request['R' + (i+1) + '_RequestDataGroup'] = 'DataGroup.orderpart.82fjy';
          //   // request['R' + (i+1) + '_Code'] = 'OrderPart';
          //   // // request['R' + (i+1) + '_Barcode'] = arr[i][0];
          //   // // request['R' + (i+1) + '_BillCode'] = arr[i][1];
          //   // request['R' + (i+1) + '_RequestFields'] = "Id;Code;Barcode;BillCode";
          // }
        //   // var Urequest = this.$Lodash.cloneDeep(this.$singleRequest);
        //   // console.log(this.$Lodash.cloneDeep(arrPages));
          // var request = this.$Lodash.cloneDeep(this.$singleRequest);
          // var index = 0
          // request.TotalRequests = arrPages.length;
          // arrPages.forEach( arr => {
          //   index ++
          //   arr.Parent = arr.OrderId
          //   arr.RequestTemplate="xDocument_Document.Update"
          //   arr.RequestDataGroup="DataGroup.orderpart.82fjy"
          //   arr.RequestFields="Id;Parent";
          //   delete arr.AutoId;
          //   delete arr.State;
            // request = this.$Utils.updateParamsSingleRequest(request, arr, index)
        //     var objOrder = {};
        //     // objOrder.Id = arr.OrderId;
        //     // if(arr.OrderId && arr.OrderId != ""){
        //     //   objOrder.RequestTemplate =  'xDocument_Document.Search';
        //     //   objOrder.RequestDataGroup = 'DataGroup.order.9ejnl';
        //     //   // objOrder.RequestFields = "Id;Code;CampaignCode;CampaignCodeName;TimeFrame;TimeFrameName;Author;AuthorName;PaymentStatus;PaymentStatusName;Status;StatusName;Source;SourceName;Gender;GenderName;Title;TitleName;Location;LocationName;Type;TypeName;CardType;CardTypeName";
        //     //   objOrder.RequestFields = "Id;Code;ProductShopCode";
        //     //   // Urequest.TotalRequests ++;
        //     //   Urequest = this.$Utils.updateParamsSingleRequest(Urequest, objOrder)
        //     //   // console.log(Urequest)
        //     //   this.$Utils.post(Urequest).then((uData) => {
        //         // var uData = this.$Utils.getDataWithRoot(uData.R1,"Data.DocumentDS.Document")[0];
        //         var oRequest = this.$Lodash.cloneDeep(this.$singleRequest);
        //         delete arr.AutoId;
        //         delete arr.State;
        //         delete arr.OrderId;
        //         arr.ProductShopCode = arr.ProductShopCode.slice(1);
        //         arr.RequestTemplate =  'xDocument_Document.Update';
        //         arr.RequestDataGroup = 'DataGroup.orderpart.82fjy';
        //         arr.RequestFields = "Id;ProductShopCode";
        //         // Urequest.TotalRequests ++;
        //         oRequest = this.$Utils.updateParamsSingleRequest(oRequest, arr)
        //         // console.log(oRequest)
        //         // this.$Utils.post(oRequest).then(() => {});
        //       // });
        //     // }
          // })
          // this.$Utils.postCheckResult(request).then(() => {});
        })

      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      init() {
        //console.log(this.$getItemLocalStorage(this.$localStorageConstant.ListPages))
        var sessionID = this.$getItemLocalStorage(
          this.$localStorageConstant.SessionId
        )
        var request = {
          RequestClass: 'xBase',
          RequestAction: 'Request',
          TotalRequests: 1,
          R1_RequestTemplate: 'SettingNew.SearchSetting',
          R1_ParentCode: this.paramCode,//'xSetting.Project.Parameter',
          R1_IncludedNestedSetParent: true,
          SessionId: sessionID
        }


        this.$Utils.post(request).then(data => {
          //console.log(data);
          var arrPages = [];
          arrPages = this.$Utils.getDataWithRoot(
            data.R1,
            "Data.DynamicDS.Setting"
          );
          var tree = this.$Utils.createCustomTreeFromList(
            arrPages,
            "Id",
            "ParentId",
            "children",
            {Caption: 'Name', Id: 'value'},
            {
              type: "data-group",
              collapseIcon: 'fa fa-plus-square-o',
              expandIcon: 'fa fa-minus-square-o',
              icon: "icon-folder",
              unread: 0,
              total: 0,
              $foldClose: true
            }
          );
          //console.log('abcc',tree);
          if(this.$Utils.isEmpty(this.paramCode) && this.paramCode.trim() != '') {
            this.treeData = tree[0];
            this.treeData['$foldClose']=false;
          } else {
            this.treeData = this.$Lodash.cloneDeep(this.tempTree);
            this.treeData.children = tree;
            this.treeData['$foldClose']=false;
             //this.$set(this.treeData,'children',tree);
            // console.log('this.treeData',this.treeData);
          }
        });

      },
      getSetting() {

      },
      consoleData(item) {
        //console.log(this.treeData)
        //console.log(item)
      },
      changeState(item) {
        this.$set(item, '$foldClose', !item['$foldClose'])
      },
      changePosition(option) {
        var request = this.$Lodash.cloneDeep(this.$singleRequest);
        request.R1_RequestTemplate = 'Setting.MoveNode';
        request.R1_Id = option.data.Id;
        if (option.afterParent.children && option.afterParent.children.length > 1) {
          var index = 0;
          $.each(option.afterParent.children, (key, value) => {
            if (value.Id == option.data.Id && key > 0) {
              index = key - 1;
              request.R1_ReferenceId = option.afterParent.children[index].Id;
              request.R1_NestedSetType = 'MoveToAfterAnother';
            } else if (value.Id == option.data.Id && key == 0) {
              index = 1;
              request.R1_ReferenceId = option.afterParent.children[index].Id;
              request.R1_NestedSetType = 'MoveToBeforeAnother';
            }
          })
        } else {
          request.R1_ReferenceId = option.afterParent.Id;
          request.R1_NestedSetType = 'MoveToLastChildNode';
        }
        this.$Utils.post(request).then((data) => {
          // this.$Utils.showLoading('stop');
          // this.getAllLevel(option.afterParent.Level, option.data);
          // this.inputData.push()

        });
      },
      editPara(item) {
        var dataToPass = {
          data: item,
          radio: this.ruleForm.radio,
          loadData: this.init
        }
        var formWidth = "40%";
        if(this.ruleForm.radio != 1) {
            formWidth = "80%"
        }
        this.$hub.$emit(
          "set-modal-data",
          "Sửa tham số",
          formWidth,
          true,
          "center",
          ParameterForm,
          false,
          '',
          dataToPass
        );
        // alert(item);
        //console.log(item);
        //this.$hub.$emit('fill-data-to-data-group', item);
      },
      addPara(item) {
        var pass = { ParentId: item.Id }
        var dataToPass = {
          data: pass,
          radio: this.ruleForm.radio,
          loadData: this.init
        }
        var formWidth = "40%";
        if(this.ruleForm.radio != 1) {
            formWidth = "80%"
        }
        this.$hub.$emit(
          "set-modal-data",
          "Thêm khối dữ liệu",
          formWidth,
          true,
          "center",
          ParameterForm,
          false,
          '',
          dataToPass
        );
      },

      copyPara(item) {
        var dataToPass = {
          data: item,
        }
        this.$hub.$emit(
          "set-modal-data",
          "Thông tin Node đích",
          "80%",
          true,
          "center",
          Copy,
          false,
          '',
          dataToPass
        );
        // alert(item);
        //console.log(item);
        //this.$hub.$emit('fill-data-to-data-group', item);
      },
      copyToNewGroupPara(item) {
        var dataToPass = {
          data: item,
        }
        this.$hub.$emit(
          "set-modal-data",
          "Thông tin Khối đích",
          "80%",
          true,
          "center",
          CopyToNewGroup,
          false,
          '',
          dataToPass
        );
        // alert(item);
        //console.log(item);
        //this.$hub.$emit('fill-data-to-data-group', item);
      },
      deletePara(data) {
        // return;
        var ctrl = this;
        if (ctrl.$Utils.isEmpty(data)) {
          var request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
          request.R1_RequestTemplate = "Setting.SearchBase";
          request.R1_ParentId = data.Id;
          request.R1_IncludedNestedSetParent = true;
          ctrl.$Utils.post(request).then((dData) => {
            dData = ctrl.$Utils.getDataWithRoot(dData.R1, 'Data.DynamicDS.Setting');
            request = ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);
            var strListId = '';
            request.TotalRequests = 0;
            dData.forEach((setting) => {
              request.TotalRequests++;
              request['R' + request.TotalRequests + '_RequestTemplate'] = 'SettingNew.Delete';
              request['R' + request.TotalRequests + '_Id'] = setting.Id;
              strListId += setting.Id + ';'
            });
            if (request.TotalRequests > 0) {
              ctrl.$Utils.postCheckResult(request).then(() => {
                ctrl.$Utils.showMessage('success', ctrl.$toastMessage.deleteItemPre + ctrl.$toastMessage.deleteItemSuf);
                ctrl.$Utils.removeAllLink(strListId);
                ctrl.init();
              });
            }
          })
        }
        ;
      },
    }
}
</script>
<style lang="scss" scoped>
  .project-categories{
    .card{
      margin-bottom: 0px;
    }
    .custom-tree-content {
      position: relative;
      top: 2px;
      z-index: 1;
      &.exitChild {
        margin-left: -7px;
      }
    }
  }
</style>
