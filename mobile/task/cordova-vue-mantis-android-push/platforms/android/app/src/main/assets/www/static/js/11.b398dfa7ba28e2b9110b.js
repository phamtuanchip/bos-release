webpackJsonp([11],{1e3:function(e,t,a){var r=a(1001);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(937)("77e39fee",r,!0)},1001:function(e,t,a){t=e.exports=a(936)(!0),t.push([e.i,"#tTbl #plusBtn{position:fixed;top:120px;right:30px;z-index:99;cursor:pointer}","",{version:3,sources:["/Users/yuukininomae/Sites/vue-crm3/src/components/static/TargetSetting.vue"],names:[],mappings:"AACA,eACE,eAAgB,AAChB,UAAW,AACX,WAAY,AACZ,WAAY,AACZ,cAAgB,CACjB",file:"TargetSetting.vue",sourcesContent:["\n#tTbl #plusBtn {\n  position: fixed;\n  top: 120px;\n  right: 30px;\n  z-index: 99;\n  cursor: pointer;\n}\n"],sourceRoot:""}])},1002:function(e,t,a){"use strict";var r=a(3),s=a(281),i=a(30),l=a.n(i),o=a(990);r.default.use(a(40)),t.a={props:["targetLst","options","typeLst","workerLst","departmentLst","targetFieldLst","getTargets","getObject","rootId","targetSavedLst","years","months","firstDayOfWeekCfg"],components:{ElTreeGrid:l.a,ElTableTreeColumn:s.a},data:function(){return{dtSrc:[],userWithAvatarLst:[],editableUser:!1,weeksOfYear:this.years}},methods:{loadAvatar:function(e){return void 0==e&&(e="assets/images/avatars/profile.png"),e=e.replace("profile.jpg","profile.png"),"assets/images/avatars/profile.png"===e?this.$appUri.BaseURL+e:this.$appUri.BaseURL+e.replace("/","")+"&Height=50&Width=50"},openTargetDetail:function(e){var t={item:e,workers:this.workerLst,isEditable:!1,targetLst:this.targetLst,departmentLst:this.departmentLst,disabled:!0,targetFields:JSON.parse(this.targetFieldLst),getTargets:this.getTargets,getObject:this.getObject,targetSavedLst:this.targetSavedLst,weeksOfYear:this.weeksOfYear,months:this.months,firstDayOfWeekCfg:this.firstDayOfWeekCfg};this.$hub.$emit("set-modal-data","","50%",!0,"center",o.a,!1,"",t,!0),this.$hub.$emit("open-modal")},addNewTarget:function(){if(!this.targetFieldLst||this.targetFieldLst.constructor==Array){var e={item:{},workers:this.workerLst,departments:this.departmentLst,isEditable:!0,targetLst:this.targetLst,departmentLst:this.departmentLst,disabled:!1,targetFields:JSON.parse(this.targetFieldLst),rootId:this.rootId,getTargets:this.getTargets,getObject:this.getObject,targetSavedLst:this.targetSavedLst,weeksOfYear:this.weeksOfYear,months:this.months,firstDayOfWeekCfg:this.firstDayOfWeekCfg};this.$hub.$emit("set-modal-data","","50%",!0,"center",o.a,!1,"",e,!1),this.$hub.$emit("open-modal")}}},watch:{targetLst:function(e){this.dtSrc=this.$Utils.treeify(e,this.options.key,this.options.parentKey,"level")}},created:function(){this.userWithAvatarLst=this.$Utils.rotateDementionArr(this.workerLst,"UserId"),this.targetsObj=this.$Utils.rotateDementionArr(this.typeLst,"Id"),this.dtSrc=this.$Utils.treeify(this.targetLst,this.options.key,this.options.parentKey,"level");var e=JSON.parse(this.$getItemLocalStorage(this.$localStorageConstant.LoggedOnUser));this.$isSystemAdmin()||this.$isMantisAdmin()?this.editableUser=!0:e.GroupRoles?(e.GroupRoles.Leader&&e.GroupRoles.Leader.indexOf(e.Project.GroupId)>-1||e.GroupRoles.Director&&e.GroupRoles.Director.indexOf(e.Project.GroupId)>-1)&&(this.editableUser=!0):this.editableUser=!1}}},1003:function(e,t,a){var r=a(1004);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(937)("5aa07319",r,!0)},1004:function(e,t,a){t=e.exports=a(936)(!0),t.push([e.i,"@media only screen and (max-width:768px){.el-input[data-v-1bb2e27e],.el-radio[data-v-1bb2e27e],.el-select[data-v-1bb2e27e]{width:100%}.el-radio[data-v-1bb2e27e]{margin-left:0!important}}","",{version:3,sources:["/Users/yuukininomae/Sites/vue-crm3/src/components/static/TargetDialog.vue"],names:[],mappings:"AACA,yCAEA,kFAGI,UAAY,CACf,AACD,2BACI,uBAA4B,CAC/B,CACA",file:"TargetDialog.vue",sourcesContent:["\n@media only screen and (max-width: 768px) {\n  /* For mobile phones: */\n.el-input[data-v-1bb2e27e],\n  .el-select[data-v-1bb2e27e],\n  .el-radio[data-v-1bb2e27e] {\n    width: 100%;\n}\n.el-radio[data-v-1bb2e27e] {\n    margin-left: 0px !important;\n}\n}\n"],sourceRoot:""}])},1005:function(module,__webpack_exports__,__webpack_require__){"use strict";(function($){var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__=__webpack_require__(4),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__),__WEBPACK_IMPORTED_MODULE_1__components_dynamic_HistoryGrid__=__webpack_require__(1006),__WEBPACK_IMPORTED_MODULE_2_vue__=__webpack_require__(3);__WEBPACK_IMPORTED_MODULE_2_vue__.default.use(__webpack_require__(40)),__webpack_exports__.a={components:{HistoryGrid:__WEBPACK_IMPORTED_MODULE_1__components_dynamic_HistoryGrid__.a},props:["data"],data:function(){var e=this,t=JSON.parse(this.$getItemLocalStorage(this.$localStorageConstant.LoggedOnUser)),a=!this.$isMantisAdmin()&&!this.$isMantisAdmin()&&t.GroupRoles&&t.GroupRoles.Leader&&t.GroupRoles.Leader.indexOf(t.Project.GroupId)>-1,r={};return void 0!=this.data.item.Name?(r=this.$Lodash.cloneDeep(this.data.item),void 0==this.data.item.Assigned||this.$Utils.equals(this.data.item.Assigned,"")?r.Assigned=[]:r.Assigned=this.data.item.Assigned.split(";").filter(function(t){return!e.$Utils.equals(t,"")}),r.autoCal=!1,r.oldName=this.data.item.Name+"",r.IsPublic="0"!==r.IsPublic):(r.Name="",r.Value="",r.TargetType="",r.IsPublic=!0,r.ActualStartDate="",r.ActualFinishDate="",r.Assigned=[],r.ParentId="",r.Owner="",r.Plan="",r.Done="",r.Unit="",r.Progress=0,r.autoCal=!0,r.oldName="",r.Milestone="",r.MilestoneVal={}),{isShowAllTarget:!1,oldObject:this.$Lodash.cloneDeep(r),typeLst:[{Id:"1",Name:"Mục tiêu công ty"},{Id:"2",Name:"Mục tiêu phòng ban"},{Id:"3",Name:"Mục tiêu cá nhân"}],ruleForm:r,isLeader:a,dataCopied:this.$Lodash.cloneDeep(this.data),viewHistoryModel:[],rules:{Name:[{required:!0,message:"Tên bắt buộc phải điền",trigger:"blur"}],Value:[{required:!0,message:"Phòng ban bắt buộc phải chọn",trigger:"change"}],ParentId:[{required:!0,message:"Mục tiêu cha bắt buộc phải chọn",trigger:"change"}]}}},watch:{},methods:{changeMilestoneVal:function(e,t){this.ruleForm.ActualStartDate=e,"week"===t?this.ruleForm.ActualFinishDate=__WEBPACK_IMPORTED_MODULE_2_vue__.default.moment(e).isoWeekday(this.dataCopied.firstDayOfWeekCfg).endOf("isoweek")._d:"month"===t?this.ruleForm.ActualFinishDate=__WEBPACK_IMPORTED_MODULE_2_vue__.default.moment(e).endOf("month")._d:"year"===t&&(this.ruleForm.ActualFinishDate=__WEBPACK_IMPORTED_MODULE_2_vue__.default.moment(e).endOf("year")._d),this.$forceUpdate()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.checkExits()})},autoCal:function(){if(1==this.ruleForm.autoCal){var e=Math.round(Number(this.ruleForm.Done)/Number(this.ruleForm.Plan)*100);this.ruleForm.Progress=isNaN(e)?this.ruleForm.Progress:e}},resetForm:function(e){this.$refs[e].resetFields()},close:function(){this.$hub.$emit("close-modal")},deleteTarget:function deleteTarget(){var _this2=this,ctrl=this;this.$confirm("Mục tiêu sẽ bị xóa hoàn toàn. Tiếp tục?","Cảnh báo",{confirmButtonText:"Xóa",cancelButtonText:"Bỏ qua",type:"warning"}).then(function(){ctrl.recursiveDeleteTarget({Id:ctrl.data.item.Id,Level:ctrl.data.item.Level}),ctrl.close();var tRequest=_this2.$Utils.clone(_this2.$singleRequest);tRequest.R1_RequestTemplate="AG_Task_Task.Search",tRequest.R1_RequestDataGroup="DataGroup.danh-sach-cong-viec.04b66",tRequest.R1_RequestFields="Id;Targets;TargetsName;";for(var i=1;i<=eval(ctrl.data.item.Level-5);i++)tRequest.R1_RequestFields+="TargetsLevel"+i+";";tRequest["R1_TargetsLevel"+[ctrl.model.Level-5]]=ctrl.model.Id,ctrl.$Utils.post(tRequest).then(function(response){response=ctrl.$Utils.getDataWithRoot(response.R1,"Data.TasksDS.Task");var updateRequest=ctrl.$Lodash.cloneDeep(ctrl.$singleRequest);$.each(response,function(index,value){var fVal={};fVal.Id=ctrl.$Lodash.cloneDeep(value.Id),fVal.Targets="",fVal.TargetsName="",fVal.RequestTemplate="AG_Task_Task.Update",fVal.RequestDataGroup="DataGroup.danh-sach-cong-viec.04b66",fVal.RequestFields="Id;Targets;TargetsName;",$.each(value.Targets.split(";"),function(key,val){key<eval(ctrl.data.item.Level-6)&&(fVal.Targets+=val+";",fVal["TargetsLevel"+[key+1]]=val,fVal.RequestFields+="TargetsLevel"+[key+1]+";")}),$.each(value.TargetsName.split(";"),function(key,val){key<eval(ctrl.data.item.Level-6)&&(fVal.TargetsName+=val+";")}),updateRequest.TotalRequests=index+1,updateRequest=ctrl.$Utils.updateParamsSingleRequest(updateRequest,fVal,index+1)}),ctrl.$Utils.post(updateRequest)})}).catch(function(){})},recursiveDeleteTarget:function(e){var t=this;if(t.$Utils.isEmpty(e)){var a=t.$Lodash.cloneDeep(t.$singleRequest);a.R1_RequestTemplate="Setting.Delete",a.R1_Id=e.Id,t.$Utils.post(a).then(function(a){$.each(t.data.targetLst,function(a,r){e.Id==r.ParentId&&t.recursiveDeleteTarget(r)}),t.data.getTargets(),t.data.getObject()})}},loadHistory:function(e){var t=this,a={RequestAction:"Request",RequestClass:"xBase",TotalRequests:"1",R1_RequestTemplate:"ChangedLogs",R1_Code:"ChangedHistory",R1_SourceId:e},r=[];r=t.data.targetFields.filter(function(e){return"true"==e.History}),t.$Utils.post(a).then(function(e){if(e.success&&e.R1.success){var a=t.$Utils.getDataWithRoot(e,"R1.Data.DataDS.Logs");$.each(a,function(e,a){try{t.viewHistoryModel.push({type:"head",value:a});var s=JSON.parse(a.Changes);$.each(s,function(e,s){if(r.length>0&&"Assigned"!==s.ColumnName&&"Id"!==s.ColumnName){if("ActualStartDate"===s.ColumnName||"ActualFinishDate"===s.ColumnName||"Created"===s.ColumnName){var i=t.$Utils.stringToDate(s.OldDisplayValue);s.OldDisplayValue="1"===a.Version?"":t.$Utils.formatDateTime(i,"DD/MM/YYYY"),i=t.$Utils.stringToDate(s.NewDisplayValue),s.NewDisplayValue=t.$Utils.formatDateTime(i,"DD/MM/YYYY")}0==("AssignedName"===s.ColumnName&&!s.OldDisplayValue&&""===s.NewDisplayValue)&&r.forEach(function(e){var r={type:"body",value:s},i=void 0!=e.DynamicText&&""!=e.DynamicText?e.DynamicText:e.Name;s.ColumnName==i&&("TargetType"===s.ColumnName?t.typeLst.filter(function(e){e.Id===s.OldDisplayValue&&(s.OldDisplayValue="1"===a.Version?"":e.Name),e.Id===s.NewDisplayValue&&(s.NewDisplayValue=e.Name)}):"IsPublic"===s.ColumnName&&(s.OldDisplayValue="1"===a.Version?"":"0"===s.OldDisplayValue||0==s.OldDisplayValue?"Riêng tư":"Công khai",s.NewDisplayValue="0"===s.NewDisplayValue||0==s.OldDisplayValue?"Riêng tư":"Công khai"),t.viewHistoryModel.push(r))})}})}catch(e){console.log(e)}})}})},checkExits:function(){var e=this,t=e.$Lodash.cloneDeep(this.$singleRequest);t.R1_RequestTemplate="xDynamicData_Setting.Search",t.R1_RequestFields="Name;ParentId;",t.R1_Name=e.ruleForm.Name,t.R1_RequestDataGroup="DataGroup.muc-tieu.091fb",t.R1_ParentId=e.ruleForm.Parent?e.ruleForm.Parent.Id:e.ruleForm.ParentId,e.$Utils.post(t).then(function(t){var a=e.$Utils.getDataWithRoot(t.R1,"Data.DynamicDS.Setting");a=a.filter(function(t){return t.Name!=e.ruleForm.oldName}),0!=a.length?e.$message.error("Tên mục tiêu đã có"):e.saveOrUpdate()})},saveOrUpdate:function(){var e=this,t=e.$Lodash.cloneDeep(this.$singleRequest);e.ruleForm.Id?(t.R1_RequestTemplate="xDynamicData_Setting.Update",t.R1_Id=e.ruleForm.Id):(t.R1_RequestTemplate="xDynamicData_Setting.Insert",t.R1_ReferenceId=e.ruleForm.ParentId?e.ruleForm.ParentId:e.data.rootId,t.R1_NestedSetType="InsertLastChildNode"),t.R1_RequestFields="Plan;Done;Progress;Unit;Assigned;AssignedName;Owner;OwnerName;TargetType;Id;Index;Code;Name;Value;Description;LeftIndex;ParentId;Level;Value;RightIndex;Created;CreatedBy;Modified;IsPublic;ActualStartDate;ActualFinishDate;ValueName;Milestone",t.R1_RequestDataGroup="DataGroup.muc-tieu.091fb",t.R1_Name=e.ruleForm.Name,t.R1_Plan=e.ruleForm.Plan,t.R1_Done=e.ruleForm.Done,t.R1_Owner=e.ruleForm.Owner,t.R1_TargetType=e.ruleForm.TargetType,t.R1_Milestone=e.ruleForm.Milestone,isNaN(parseFloat(e.ruleForm.Progress+""))?delete e.ruleForm.Progress:t.R1_Progress=e.ruleForm.Progress,t.R1_Unit=e.ruleForm.Unit,t.R1_IsPublic=1==e.ruleForm.IsPublic?1:0,t.R1_Value=e.ruleForm.Value,$.each(e.departmentLst,function(a,r){var s=r.GroupId!==e.ruleForm.Value;return s||(t.R1_ValueName=r.GroupName),s}),t.R1_Assigned="",t.R1_AssignedName="",$.each(e.ruleForm.Assigned,function(a,r){t.R1_Assigned+=r+";",e.data.workers.filter(function(e){e.UserId&&e.UserId===r&&(t.R1_AssignedName+=e.Username+",")})}),e.data.workers.filter(function(a){a.UserId&&a.UserId===e.ruleForm.Owner&&(t.R1_OwnerName=a.Username)}),e.$Utils.isEmpty(e.ruleForm.ActualStartDate)&&(t.R1_ActualStartDate=e.$Utils.formatDateTime(e.ruleForm.ActualStartDate)),e.$Utils.isEmpty(e.ruleForm.ActualFinishDate)&&(t.R1_ActualFinishDate=e.$Utils.formatDateTime(e.ruleForm.ActualFinishDate)),e.$Utils.post(t).then(function(a){e.objectReturn=e.$Lodash.cloneDeep(e.ruleForm),e.objectReturn.Id=a.R1.Data,e.$Utils.isEmpty(e.objectReturn,"autoCals")&&delete e.objectReturn.autoCals,e.$Utils.isEmpty(e.objectReturn,"oldName")&&delete e.objectReturn.oldName,e.data.item=e.$Lodash.cloneDeep(e.objectReturn),e.objectReturn.AssignedName=t.R1_AssignedName,e.objectReturn.OwnerName=t.R1_OwnerName,e.objectReturn.Assigned=t.R1_Assigned,e.objectReturn.Value=t.R1_Value;var r=e.compareChange(e.objectReturn,e.oldObject);e.$Utils.isEmpty(r)&&r.length>0&&(t.R1_RequestTemplate,e.createHistoryLogs(r));var s=e.$Lodash.cloneDeep(e.ruleForm);s.Id=a.R1.Data,e.saveOrUpdatePermissions(""!==e.ruleForm.oldName,s),e.close()})},compareChange:function(e,t){var a=this,r=[];return a.objTemp=a.$Lodash.cloneDeep(a.oldObject),$.each(e,function(s,i){if(a.$Utils.isEmpty(i)){var l=i,o="",n={};$.each(a.data.targetFields,function(e,t){t.Name===s&&"true"==t.History&&(o=t.Caption,n=t)});var u={};$.each(t,function(e,t){s==e&&0==a.$Utils.equals(t,l)&&(u[e]=t)});var d={ColumnCaption:o,ColumnName:s,OldDisplayValue:u[s],OldValue:u[s],NewDisplayValue:e[s]?e[s]:l,NewValue:l};if(a.$Utils.isEmpty(n))switch(n.FieldColumnType){case"DateTime":a.$Utils.stringToDate(i).getTime()==a.$Utils.stringToDate(d.OldValue).getTime()&&(d=void 0);break;case"Double":case"Integer":!a.$Utils.isEmpty(a.objTemp[s])&&a.$Utils.isEmpty(e[s])&&(d.OldDisplayValue=0,d.OldValue=0)}d&&a.$Utils.isEmpty(o)&&""!=o&&r.push(d)}}),r},createHistoryLogs:function(e){var t=this,a=t.$Utils.updateParamsSingleRequest(t.$Lodash.cloneDeep(t.$singleRequest),{RequestTemplate:"ChangedLogs.Count",SourceId:t.objectReturn.Id,Code:"ChangedHistory"});t.$Utils.post(a).then(function(r){if(t.$Utils.isEmpty(r,"R1.Data")){var s=t.$Utils.updateParamsSingleRequest(a,{RequestTemplate:"ChangedLogs.Insert",Version:parseInt(r.R1.Data)+1,Changes:__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(e),CreatedByName:t.$Utils.getUserInfo("Username")});t.$Utils.post(s).then(function(e){})}})},saveOrUpdatePermissions:function(e,t){var a=this;a.$Lodash.cloneDeep(a.$singleRequest);if(1==e){var r={RequestAction:"SearchLinked",RequestClass:"Addition",ConditionFields:"Parent;",StaticFields:"Code;Child;Parent;Name;Created;Description",OrderFields:"Created DESC",Parent:t.Id};a.$Utils.post(r).then(function(e){if(e.TotalCount>0){var r=1==e.TotalCount?[e.Data.DataDS.Linked]:e.Data.DataDS.Linked,s={RequestClass:"xBase",RequestAction:"Request",TotalRequests:r.length,RequestTemplate:"Permission.Remove"};$.each(r,function(e,t){s["R"+(t+1)+"_Id"]=e.Id}),a.savePermission(t,s)}})}else a.savePermission(t)},savePermission:function(e,t){var a=this;if(1==e.IsPublic)a.$Utils.linkToRoleEveryone([{Id:e.Id,Caption:e.Name}]),a.data.getTargets(),a.data.getObject();else{var r=[],s=[],i=[];if(i.push(e.Value),i&&i.length>0){var l={};i.filter(function(e,t){l["R"+a.ix+"_RequestTemplate"]="OrgnizationList",l["R"+a.ix+"_GroupName"]="Leader",l["R"+a.ix+"_GroupParent"]=e.GroupId,l["R"+a.ix+"_RequestDataType"]="json",l["R"+a.ix+"_GroupType"]="2",a.ix++}),l.TotalRequests=a.ix-1,l.RequestClass="xBase",l.RequestAction="Request",a.$Utils.post(l).then(function(l){for(var o=1;o<a.ix;o++){var n=a.$Utils.getDataWithRoot(l,"R"+o+".Data.UserDS.Group");void 0!=n[0]&&"Leader"===n[0].GroupName&&(s=s.concat(n))}var u="";if(s.filter(function(t,a){if(t.GroupParent==i[0].GroupId)if(u+=t.GroupId+";","2"==e.TargetType||"1"==e.TargetType){var s={Parrent:e.Id,Code:"Edit",Name:e.Name+" - Edit",Child:t.GroupId,ChildTable:"tblGroup"};r.push(s)}else if("3"==e.TargetType){var l={Parrent:e.Id,Code:"Manage",Name:e.Name+" - Manage",Child:t.GroupId,ChildTable:"tblGroup"};r.push(l)}}),e.Owner&&-1==u.indexOf(e.Owner)){var d={Parrent:e.Id,Code:"Edit",Name:e.Name+" - Edit",Child:e.Owner,ChildTable:"tblUser"};r.push(d)}e.Assigned&&e.Assigned.filter(function(t,a){if(""!==t&&-1==u.indexOf(t)){var s={Parrent:e.Id,Code:"Edit",Name:e.Name+" - Edit",Child:t,ChildTable:"tblUser"};r.push(s)}});var c={Parrent:e.Id,Code:"Manage",Name:e.Name+" - Manage",Child:a.$administrator,ChildTable:"tblGroup"};r.push(c);var m={Parrent:e.Id,Code:"Manage",Name:e.Name+" - Manage",Child:a.$supervisor,ChildTable:"tblGroup"};r.push(m);var p={},h=1;r.filter(function(e,t){p["R"+h+"_RequestClass"]="xBase",p["R"+h+"_RequestAction"]="LinkUserToObject",p["R"+h+"_ParentTable"]="xObject",p["R"+h+"_RequestTemplate"]="Permission.Insert",p["R"+h+"_Parent"]=e.Parrent,p["R"+h+"_Child"]=e.Child,p["R"+h+"_Code"]=e.Code,p["R"+h+"_Name"]=e.Name,p["R"+h+"_ChildTable"]=e.ChildTable,h++}),p.TotalRequests=r.length,p.RequestClass="xBase",p.RequestAction="Request",void 0==t?a.$Utils.post(p).then(function(e){a.data.getObject(),a.data.getTargets()}):a.$Utils.post(t).then(function(e){a.$Utils.post(p).then(function(e){a.data.getTargets(),a.data.getObject()})})})}}},changeEditState:function(){this.data.disabled=!this.data.disabled},changeType:function changeType(type){this.dataCopied.targetLst=this.data.targetLst.filter(function(ele){return void 0!=ele&&eval(type)-1+""===ele.TargetType}),this.$set(this.dataCopied,"targetFullLst",this.data.targetSavedLst.filter(function(ele){return void 0!=ele&&eval(type)-1+""===ele.TargetType}))},setParent:function(e){var t=this;3==t.ruleForm.TargetType&&$.each(t.departmentLst,function(a,r){t.$Utils.isEmpty(e)&&r.GroupId==e&&(t.ruleForm.Value=r)})}},created:function(){var e=this;e.ruleForm.Id?(e.loadHistory(e.ruleForm.Id),e.changeType(e.ruleForm.TargetType),void 0==e.ruleForm.IsPublic&&(e.ruleForm.IsPublic=!0),$.each(e.data.targetLst,function(t,a){if(e.ruleForm.Id===a.Id)return e.ruleForm.Permission=a.Permission,!1}),e.ruleForm.MilestoneVal=new Date(e.ruleForm.ActualStartDate)):(e.ruleForm.Permission="Edit",e.isLeader?(e.ruleForm.TargetType=e.typeLst[2].Id,e.changeType(e.typeLst[2].Id)):(e.ruleForm.TargetType=e.typeLst[0].Id,e.changeType(e.typeLst[0].Id)),e.ruleForm.IsPublic=!0),"superadmin"!==JSON.parse(e.$getItemLocalStorage(e.$localStorageConstant.LoggedOnUser)).LoginName&&(e.data.workers=e.data.workers.filter(function(e){return e.LoginName&&-1===e.LoginName.indexOf("superadmin")}))}}}).call(__webpack_exports__,__webpack_require__(2))},1006:function(e,t,a){"use strict";function r(e){a(1007)}var s=a(1009),i=a(1010),l=a(0),o=r,n=l(s.a,i.a,!1,o,null,null);t.a=n.exports},1007:function(e,t,a){var r=a(1008);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(937)("7608b78c",r,!0)},1008:function(e,t,a){t=e.exports=a(936)(!0),t.push([e.i,"#history-grid th{text-align:center!important}#history-grid td,#history-grid th,#history-grid tr{border:thin solid #d3d3d3}","",{version:3,sources:["/Users/yuukininomae/Sites/vue-crm3/src/components/dynamic/HistoryGrid.vue"],names:[],mappings:"AACA,iBACE,2BAA8B,CAE/B,AACD,mDAFE,yBAA6B,CAI9B",file:"HistoryGrid.vue",sourcesContent:["\n#history-grid th {\n  text-align: center !important;\n  border: solid thin lightgray;\n}\n#history-grid tr, #history-grid td {\n  border: solid thin lightgray;\n}\n"],sourceRoot:""}])},1009:function(e,t,a){"use strict";t.a={props:["dtSource","dtHeader"],methods:{},data:function(){return{}}}},1010:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-card",{staticClass:"box-card",attrs:{id:"history-grid"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("Lịch sử")])]),e._v(" "),a("div",{staticClass:"el-table__body-wrapper is-scroll-left"},[a("table",{staticStyle:{width:"100%"}},[a("thead",{staticClass:"positive-bg light text-bold"},[a("tr",e._l(e.dtHeader,function(t){return a("th",[e._v(e._s(t))])}))]),e._v(" "),a("tbody",e._l(e.dtSource,function(t){return a("tr",{style:{"background-color":"body"==t.type?"#e4e5e6":"#fff"}},["head"==t.type?a("td",{staticClass:"success",attrs:{colspan:"3"}},[e._v("\n          v."+e._s(t.value.Version+".0 ")),a("strong",[e._v(e._s(t.value.CreatedByName))]),e._v(", "+e._s(e.$Utils.formatDateTime(t.value.Created,"DD-MM-YYYY HH:mm"))+"\n        ")]):e._e(),e._v(" "),"body"==t.type?a("td",[e._v(e._s(t.value.ColumnCaption))]):e._e(),e._v(" "),"body"==t.type?a("td",[e._v(e._s(t.value.OldDisplayValue))]):e._e(),e._v(" "),"body"==t.type?a("td",[e._v(e._s(t.value.NewDisplayValue))]):e._e()])}))])])])},s=[],i={render:r,staticRenderFns:s};t.a=i},1011:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",{staticStyle:{float:"left"}},[e._v("Thông tin mục tiêu")]),e._v(" "),a("div",{staticStyle:{float:"right",padding:"3px 0"}},[0==e.data.disabled&&e.ruleForm.Permission&&"View"!==e.ruleForm.Permission?a("el-button",{attrs:{icon:"fa fa-save"},on:{click:function(t){e.submitForm("ruleForm")}}}):e._e(),e._v(" "),1==e.data.disabled&&e.ruleForm.Permission&&"View"!==e.ruleForm.Permission?a("el-button",{attrs:{icon:"el-icon-edit"},on:{click:e.changeEditState}}):e._e(),e._v(" "),1==e.data.isEditable&&void 0==e.data.item.Permission?a("el-button",{attrs:{icon:"fa fa-eraser"},on:{click:function(t){e.resetForm("ruleForm")}}}):e._e(),e._v(" "),e.ruleForm.Permission&&"Manage"===e.ruleForm.Permission?a("el-button",{attrs:{icon:"el-icon-delete"},on:{click:function(t){e.deleteTarget()}}}):e._e()],1)]),e._v(" "),a("div",[a("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-position":e.$isMobileDevice?"top":"right","label-width":"150px"}},[a("el-form-item",{attrs:{label:"Tên:",prop:"Name"}},[a("el-input",{attrs:{disabled:e.data.disabled},model:{value:e.ruleForm.Name,callback:function(t){e.$set(e.ruleForm,"Name",t)},expression:"ruleForm.Name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"Hiển thị:",prop:"IsPublic"}},[a("el-switch",{staticStyle:{display:"block"},attrs:{disabled:e.data.disabled,"active-color":"#13ce66","inactive-color":"#ff4949","active-text":"Công khai","inactive-text":"Riêng tư"},model:{value:e.ruleForm.IsPublic,callback:function(t){e.$set(e.ruleForm,"IsPublic",t)},expression:"ruleForm.IsPublic"}})],1),e._v(" "),a("el-form-item",{staticClass:"demo-form-inline",attrs:{label:"Loại thời gian:",prop:"Milestone"}},[a("el-select",{attrs:{filterable:"",placeholder:"--Chọn--",disabled:e.data.disabled},on:{change:function(t){e.ruleForm.MilestoneVal=""}},model:{value:e.ruleForm.Milestone,callback:function(t){e.$set(e.ruleForm,"Milestone",t)},expression:"ruleForm.Milestone"}},[a("el-option",{attrs:{label:"Tuần",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"Tháng",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"Năm",value:"3"}}),e._v(" "),a("el-option",{attrs:{label:"Tuỳ chọn",value:"4"}})],1),e._v(" "),1==e.ruleForm.Milestone?a("el-date-picker",{attrs:{type:"week",format:"Tuần WW",placeholder:"--Chọn tuần--",disabled:e.data.disabled},on:{change:function(t){e.changeMilestoneVal(t,"week")}},model:{value:e.ruleForm.MilestoneVal,callback:function(t){e.$set(e.ruleForm,"MilestoneVal",t)},expression:"ruleForm.MilestoneVal"}}):e._e(),e._v(" "),2==e.ruleForm.Milestone?a("el-date-picker",{attrs:{type:"month",format:"MM",placeholder:"--Chọn tháng--",disabled:e.data.disabled},on:{change:function(t){e.changeMilestoneVal(t,"month")}},model:{value:e.ruleForm.MilestoneVal,callback:function(t){e.$set(e.ruleForm,"MilestoneVal",t)},expression:"ruleForm.MilestoneVal"}}):e._e(),e._v(" "),3==e.ruleForm.Milestone?a("el-date-picker",{attrs:{type:"year",placeholder:"--Chọn năm--",disabled:e.data.disabled},on:{change:function(t){e.changeMilestoneVal(t,"year")}},model:{value:e.ruleForm.MilestoneVal,callback:function(t){e.$set(e.ruleForm,"MilestoneVal",t)},expression:"ruleForm.MilestoneVal"}}):e._e()],1),e._v(" "),a("el-form-item",{staticClass:"demo-form-inline",attrs:{label:"Thời gian:",prop:"startEndDate"}},[a("el-date-picker",{attrs:{format:"dd-MM-yyyy",disabled:e.data.disabled,type:"date",placeholder:"Bắt đầu"},model:{value:e.ruleForm.ActualStartDate,callback:function(t){e.$set(e.ruleForm,"ActualStartDate",t)},expression:"ruleForm.ActualStartDate"}}),e._v(" "),a("el-date-picker",{attrs:{format:"dd-MM-yyyy",disabled:e.data.disabled,type:"date",placeholder:"Kết thúc"},model:{value:e.ruleForm.ActualFinishDate,callback:function(t){e.$set(e.ruleForm,"ActualFinishDate",t)},expression:"ruleForm.ActualFinishDate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"Loại mục tiêu:",prop:"TargetType"}},[a("el-radio-group",{attrs:{disabled:!e.data.isEditable},on:{change:function(t){e.changeType(e.ruleForm.TargetType)}},model:{value:e.ruleForm.TargetType,callback:function(t){e.$set(e.ruleForm,"TargetType",t)},expression:"ruleForm.TargetType"}},e._l(e.typeLst,function(t){return a("el-radio",{key:t.Id,attrs:{size:"mini",label:t.Id,border:"","ng-show":"data.disabled?true:(t.Id ===ruleForm.TargetType) "}},[e._v(e._s(t.Name))])}))],1),e._v(" "),void 0!=e.dataCopied.targetLst.length&&"1"!==e.ruleForm.TargetType?a("el-form-item",{attrs:{label:"Mục tiêu cha:",prop:"ParentId"}},[e.isShowAllTarget||!e.data.isEditable?a("el-select",{attrs:{placeholder:"--Chọn--",disabled:void 0!==e.ruleForm.Id},on:{change:function(t){e.setParent(e.ruleForm.ParentId)}},model:{value:e.ruleForm.ParentId,callback:function(t){e.$set(e.ruleForm,"ParentId",t)},expression:"ruleForm.ParentId"}},e._l(e.dataCopied.targetFullLst,function(e){return a("el-option",{key:e.Id,attrs:{label:e.Name,value:e.Id}})})):a("el-select",{attrs:{placeholder:"--Chọn--",disabled:!e.data.isEditable},on:{change:function(t){e.setParent(e.ruleForm.ParentId)}},model:{value:e.ruleForm.ParentId,callback:function(t){e.$set(e.ruleForm,"ParentId",t)},expression:"ruleForm.ParentId"}},e._l(e.dataCopied.targetLst,function(e){return a("el-option",{key:e.Id,attrs:{label:e.Name,value:e.Id}})})),e._v("\n             \n          "),void 0===e.ruleForm.Id?a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Bộ lọc thời gian sẽ ảnh hưởng tới số lượng mục tiêu cha hiển thị. Để hiển thị tất cả mục tiêu, hãy chọn 'Hiển thị tất cả'",placement:"top"}},[a("i",{staticClass:"fa fa-lg fa-info-circle"})]):e._e(),e._v("\n             \n          "),void 0===e.ruleForm.Id?a("el-checkbox",{attrs:{label:"Hiển thị tất cả"},model:{value:e.isShowAllTarget,callback:function(t){e.isShowAllTarget=t},expression:"isShowAllTarget"}}):e._e()],1):e._e(),e._v(" "),e.data.departmentLst.length>0?a("el-form-item",{attrs:{label:"Thuộc phòng ban:",prop:"Value"}},[a("el-select",{attrs:{filterable:"",placeholder:"--Chọn--",disabled:e.data.disabled},model:{value:e.ruleForm.Value,callback:function(t){e.$set(e.ruleForm,"Value",t)},expression:"ruleForm.Value"}},e._l(e.data.departmentLst,function(e){return a("el-option",{key:e.GroupId,attrs:{label:e.GroupName,value:e.GroupId}})}))],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"Quản lý:",prop:"Owner"}},[a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"--Chọn--",disabled:e.data.disabled},model:{value:e.ruleForm.Owner,callback:function(t){e.$set(e.ruleForm,"Owner",t)},expression:"ruleForm.Owner"}},e._l(e.data.workers,function(t){return-1!=t.UserId.indexOf(";")||!e.ruleForm.Id&&1!=t.Status?e._e():a("el-option",{key:t.UserId,attrs:{label:t.Username,value:t.UserId}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"Nhân sự thực hiện:",prop:"Assigned"}},[a("el-select",{attrs:{filterable:"",multiple:"",placeholder:"--Chọn--",disabled:e.data.disabled},model:{value:e.ruleForm.Assigned,callback:function(t){e.$set(e.ruleForm,"Assigned",t)},expression:"ruleForm.Assigned"}},e._l(e.data.workers,function(t){return e.ruleForm.Id||1==t.Status?a("el-option",{key:t.UserId,attrs:{label:t.Username,value:t.UserId}}):e._e()}))],1),e._v(" "),a("el-form-item",{attrs:{label:"KPIs kế hoạch:",prop:"Plan"}},[a("el-input",{attrs:{disabled:e.data.disabled},on:{change:function(t){e.autoCal()}},model:{value:e.ruleForm.Plan,callback:function(t){e.$set(e.ruleForm,"Plan",t)},expression:"ruleForm.Plan"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"KPIs đạt:",prop:"Done"}},[a("el-input",{attrs:{disabled:e.data.disabled},on:{change:function(t){e.autoCal()}},model:{value:e.ruleForm.Done,callback:function(t){e.$set(e.ruleForm,"Done",t)},expression:"ruleForm.Done"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"Đơn vị tính:",prop:"Unit"}},[a("el-input",{attrs:{disabled:e.data.disabled},model:{value:e.ruleForm.Unit,callback:function(t){e.$set(e.ruleForm,"Unit",t)},expression:"ruleForm.Unit"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"Tính % Hoàn thành:",prop:"autoCal"}},[a("el-switch",{attrs:{disabled:e.data.disabled},on:{change:function(t){e.autoCal()}},model:{value:e.ruleForm.autoCal,callback:function(t){e.$set(e.ruleForm,"autoCal",t)},expression:"ruleForm.autoCal"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"Tỉ lệ hoành thành:",prop:"Progress"}},[a("el-input",{attrs:{disabled:e.data.disabled},model:{value:e.ruleForm.Progress,callback:function(t){e.$set(e.ruleForm,"Progress",t)},expression:"ruleForm.Progress"}})],1)],1)],1)]),e._v(" "),e.data.isEditable?e._e():a("HistoryGrid",{attrs:{dtSource:e.viewHistoryModel,dtHeader:["Mục","Giá trị cũ","Giá trị mới"]}})],1)},s=[],i={render:r,staticRenderFns:s};t.a=i},1012:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"tTbl"}},[a("div",{staticStyle:{flex:"1",display:"flex","align-items":"center","justify-content":"space-between","font-size":"14px","padding-right":"8px"}},[a("el-row"),e._v(" "),e.editableUser&&!e.$isMobileDevice?a("el-tooltip",{attrs:{content:"Thêm mới mục tiêu",placement:"top"}},[a("el-button",{attrs:{size:"mini",icon:"fa fa-plus"},on:{click:function(t){e.addNewTarget()}}})],1):e._e(),e._v(" "),e.editableUser&&e.$isMobileDevice?a("el-button",{attrs:{size:"mini",icon:"fa fa-plus"},on:{click:function(t){e.addNewTarget()}}}):e._e()],1),e._v(" "),a("el-table",{attrs:{data:e.dtSrc,border:"","empty-text":"Không có dữ liệu"}},[a("el-table-column",{attrs:{label:"",width:"50px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticStyle:{"text-align":"center",cursor:"pointer"},on:{click:function(a){e.openTargetDetail(t.row)}}},[a("i",{staticClass:"fa-lg icon-magnifier-add"})])]}}])}),e._v(" "),a("el-table-tree-column",{attrs:{prop:"Name",label:"Tên",levelKey:"level",treeKey:"Id",parentKey:"ParentId","min-width":"200px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Progress",label:"Hoàn thành","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,percentage:Math.round(isNaN(e.row.Progress)?0:e.row.Progress)}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"TargetType",label:"Loại","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(e.targetsObj[t.row.TargetType]?e.targetsObj[t.row.TargetType].Name:"---")+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"Plan",label:"Kế hoạch","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{prop:"Done",label:"Đạt được","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{prop:"Unit",label:"Đơn vị","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{prop:"Owner",label:"Người quản lý","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[void 0!=e.userWithAvatarLst[t.row.Owner]?a("img",{staticClass:"avatar",staticStyle:{margin:"8px 10px 0 0"},attrs:{height:"35",width:"35",title:e.userWithAvatarLst[t.row.Owner].Username,src:e.loadAvatar(e.userWithAvatarLst[t.row.Owner].Avatar)}}):a("span",[e._v(e._s(t.row.OwnerName))])])]}}])})],1)],1)},s=[],i={render:r,staticRenderFns:s};t.a=i},940:function(e,t,a){"use strict";function r(e){a(1e3)}Object.defineProperty(t,"__esModule",{value:!0});var s=a(1002),i=a(1012),l=a(0),o=r,n=l(s.a,i.a,!1,o,null,null);t.default=n.exports},990:function(e,t,a){"use strict";function r(e){a(1003)}var s=a(1005),i=a(1011),l=a(0),o=r,n=l(s.a,i.a,!1,o,"data-v-1bb2e27e",null);t.a=n.exports}});
//# sourceMappingURL=11.b398dfa7ba28e2b9110b.js.map