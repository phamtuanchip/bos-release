webpackJsonp([14,20],{1066:function(e,t,o){var a=o(1067);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);o(932)("6e134319",a,!0)},1067:function(e,t,o){t=e.exports=o(931)(!0),t.push([e.i,'.el-select{display:block}.el-tabs__new-tab{margin-right:20px}.el-date-editor.el-input,.el-date-editor.el-input__inner{width:100%}.Store__ROOT{background:#fff;min-height:"~calc(100vh - 100px)"}.Store__ROOT .col-lg-3,.Store__ROOT .col-lg-4,.Store__ROOT .col-lg-6,.Store__ROOT .col-lg-8,.Store__ROOT .col-lg-9{float:left}.Store__ROOT .block__label{padding:10px;border:1px solid #eee;border-left:0;border-right:0;font-weight:600;background:#f5f7ff}.Store__ROOT .block__wrapper{padding:10px}.Store__ROOT .step__wrapper{padding-top:10px}.Store__ROOT .el-form-item__label{margin-bottom:0;padding-bottom:0}.Store__ROOT .el-step__title{font-size:13px}.Store__ROOT .el-step__icon{font-size:12px;width:18px;height:18px}.Payment__ROOT{border-left:1px solid #999;padding-bottom:20px}.Contact__ROOT .contact__header,.Order__ROOT .contact__header{padding:3px 3px 3px 10px;line-height:27px;background:#f5f7fe}.Contact__ROOT .contact__header .el-input__inner,.Order__ROOT .contact__header .el-input__inner{border:none;background:"#00000008"}.Cart__ROOT .cart__header{padding:3px 3px 3px 10px;line-height:27px;background:#f5f7fe}.Cart__ROOT .cart__header .el-input__inner{border:none;background:"#00000008"}',"",{version:3,sources:["/Users/yuukininomae/Sites/vue-crm2/src/components/static/ImpExpWarehouse/ImpExpReceipt.vue"],names:[],mappings:"AACA,WACE,aAAe,CAChB,AACD,kBACE,iBAAmB,CACpB,AACD,yDACE,UAAY,CACb,AACD,aACE,gBAAiB,AACjB,iCAAmC,CACpC,AACD,mHACI,UAAY,CACf,AACD,2BACI,aAAc,AACd,sBAAuB,AACvB,cAAe,AACf,eAAgB,AAChB,gBAAiB,AACjB,kBAAoB,CACvB,AACD,6BACI,YAAc,CACjB,AACD,4BACI,gBAAkB,CACrB,AACD,kCACI,gBAAiB,AACjB,gBAAkB,CACrB,AACD,6BACI,cAAgB,CACnB,AACD,4BACI,eAAgB,AAChB,WAAY,AACZ,WAAa,CAChB,AACD,eACE,2BAA4B,AAC5B,mBAAqB,CACtB,AACD,8DACE,yBAA0B,AAC1B,iBAAkB,AAClB,kBAAoB,CACrB,AACD,gGACI,YAAa,AACb,sBAAwB,CAC3B,AACD,0BACE,yBAA0B,AAC1B,iBAAkB,AAClB,kBAAoB,CACrB,AACD,2CACI,YAAa,AACb,sBAAwB,CAC3B",file:"ImpExpReceipt.vue",sourcesContent:['\n.el-select {\n  display: block;\n}\n.el-tabs__new-tab {\n  margin-right: 20px;\n}\n.el-date-editor.el-input, .el-date-editor.el-input__inner {\n  width: 100%;\n}\n.Store__ROOT {\n  background: #fff;\n  min-height: "~calc(100vh - 100px)";\n}\n.Store__ROOT .col-lg-8, .Store__ROOT .col-lg-4, .Store__ROOT .col-lg-6, .Store__ROOT .col-lg-9, .Store__ROOT .col-lg-3 {\n    float: left;\n}\n.Store__ROOT .block__label {\n    padding: 10px;\n    border: solid 1px #eee;\n    border-left: 0;\n    border-right: 0;\n    font-weight: 600;\n    background: #f5f7ff;\n}\n.Store__ROOT .block__wrapper {\n    padding: 10px;\n}\n.Store__ROOT .step__wrapper {\n    padding-top: 10px;\n}\n.Store__ROOT .el-form-item__label {\n    margin-bottom: 0;\n    padding-bottom: 0;\n}\n.Store__ROOT .el-step__title {\n    font-size: 13px;\n}\n.Store__ROOT .el-step__icon {\n    font-size: 12px;\n    width: 18px;\n    height: 18px;\n}\n.Payment__ROOT {\n  border-left: solid 1px #999;\n  padding-bottom: 20px;\n}\n.Contact__ROOT .contact__header, .Order__ROOT .contact__header {\n  padding: 3px 3px 3px 10px;\n  line-height: 27px;\n  background: #f5f7fe;\n}\n.Contact__ROOT .contact__header .el-input__inner, .Order__ROOT .contact__header .el-input__inner {\n    border: none;\n    background: "#00000008";\n}\n.Cart__ROOT .cart__header {\n  padding: 3px 3px 3px 10px;\n  line-height: 27px;\n  background: #f5f7fe;\n}\n.Cart__ROOT .cart__header .el-input__inner {\n    border: none;\n    background: "#00000008";\n}\n'],sourceRoot:""}])},1068:function(e,t,o){"use strict";(function(e,a){var r=o(4),i=o.n(r);t.a={name:"ImpExpReceipt",props:["item"],components:{},data:function(){var e={receiptRules:{sourceId:[{required:!0,message:"Bắt buộc",trigger:"blur"}],sourceUrlId:[{required:!0,message:"Bắt buộc",trigger:"blur"}]},receiptModel:{SourceUrl:{},Source:{},StatusType:{Id:"576b56bb-5d50-4b67-b4c7-137bc1c7385f",Name:"Nhập luân chuyển"},typeId:"576b56bb-5d50-4b67-b4c7-137bc1c7385f",sourceId:"",sourceUrlId:"",StoreCode:"",ReferenceNumber:"",RelatedDocuments:"",Id:"",ExpiredDate:new Date},params:{warehouses:[],statusTypes:[{Id:"515a2438-5274-4d1f-9fa6-7dbee94c524b",Name:"Xuất luân chuyển",Caption:"Xuất"},{Id:"576b56bb-5d50-4b67-b4c7-137bc1c7385f",Name:"Nhập luân chuyển",Caption:"Nhập"}]},cart:[],radio:"",cachedBarcodes:[],cachedIds:{},barcode_search_keyword:"",Warehouse:{},formSetting:{warehouse:"",ImportExportWarehouse:"",import:"",importProduct:"",export:"",impExpProduct:""},fields:{warehouse:{},ImportExportWarehouse:{},import:{},importProduct:{},export:{}},currentStore:{},done:!1,warehousesObj:{}};return this.$getItemLocalStorage(this.item.name)&&(e=JSON.parse(this.$getItemLocalStorage(this.item.name))),{model:e}},methods:{loadResources:function(){var t=this,o={RequestClass:"xBase",RequestAction:"Request",TotalRequests:1,R1_RequestDataGroup:"DataGroup.warehouses.01dh7",R1_RequestFields:"Id;Code;Name;",R1_Code:"Warehouses",R1_RequestTemplate:"xDocument_Document.Search"};this.$Utils.post(o).then(function(o){t.model.params.warehouses=t.$Utils.getDataWithRoot(o.R1,"Data.DocumentDS.Document");var a={RequestClass:"xBase",RequestAction:"Request",TotalRequests:1,R1_RequestDataGroup:"DataGroup.pointofsales.09egb",R1_RequestFields:"Id;Code;Promulgator;Name;Category;Type;",R1_Code:"POS",R1_RequestTemplate:"xDocument_Document.Search",R1_Promulgator:JSON.parse(localStorage.getItem("LoggedOnUser")).Project.GroupId};t.$Utils.post(a).then(function(o){t.model.params.poses=t.$Utils.getDataWithRoot(o.R1,"Data.DocumentDS.Document");var a=t.$Lodash.cloneDeep(t.model.params.poses);t.model.warehousesObj=t.$Utils.rotateDementionArr(a,"Id"),t.model.params.poses[0]&&e.each(t.model.params.warehouses,function(e,o){if(o.Id==t.model.params.poses[0].Category)return t.model.currentStore=o,"515a2438-5274-4d1f-9fa6-7dbee94c524b"==t.model.receiptModel.StatusType.Id?(t.model.receiptModel.SourceUrl={},t.model.receiptModel.Source=t.model.currentStore,t.model.receiptModel.sourceId=t.model.currentStore.Id):"576b56bb-5d50-4b67-b4c7-137bc1c7385f"==t.model.receiptModel.StatusType.Id&&(t.model.receiptModel.Source={},t.model.receiptModel.SourceUrl=t.model.currentStore,t.model.receiptModel.sourceUrlId=t.model.currentStore.Id),!1})})});var a={RequestAction:"SearchUsers",RequestClass:"BPM",ConditionFields:"IncludedGroupManager;Group;Status;LoginName;UserId,Status",StaticFields:"UserId;Username;Description;Status;LoginName",DynamicFields:"Avatar;Facebook;Email;Skype;Birthday;Biography;WorkProcess;Telephone",StructFields:"GroupRoot;GroupRootName;PhoneId;PhoneGroup;Public;RoleRootName;GroupManage;Notification",Status:1};this.$Utils.post(a).then(function(o){t.model.params.users=[],o=t.$Utils.getDataWithRoot(o,"Data.UserDS.User"),e.each(o,function(e,o){"superadmin"!==o.LoginName&&t.model.params.users.push({Id:o.UserId,Name:o.Username,LoginName:o.LoginName})})});var r={RequestClass:"xBase",RequestAction:"Request",TotalRequests:1,R1_RequestTemplate:"Setting.SearchBase",R1_ParentCode:"xSetting.Project.Parameter.CRM.Customer.Source"};this.isMobile=this.$isMobileDevice,this.$Utils.post(r).then(function(e){t.model.params.sources=t.$Utils.getDataWithRoot(e.R1,"Data.DynamicDS.Setting")});var i={RequestClass:"xBase",RequestAction:"Request",TotalRequests:1,R1_RequestTemplate:"Setting.SearchBase",R1_ParentCode:"xSetting.Project.Parameter.CRM.Lead.CampaignCode"};this.isMobile=this.$isMobileDevice,this.$Utils.post(i).then(function(e){t.model.params.campaignCodes=t.$Utils.getDataWithRoot(e.R1,"Data.DynamicDS.Setting")});var s={RequestClass:"xBase",RequestAction:"Request",TotalRequests:1,R1_RequestTemplate:"Setting.SearchBase",R1_ParentCode:"xSetting.Project.Parameter.CRM.Activity.TimeFrame"};this.isMobile=this.$isMobileDevice,this.$Utils.post(s).then(function(e){t.model.params.timeFrameNames=t.$Utils.getDataWithRoot(e.R1,"Data.DynamicDS.Setting")});var l={RequestClass:"xBase",RequestAction:"Request",TotalRequests:1,R1_RequestTemplate:"Setting.SearchBase",R1_ParentCode:"xSetting.Project.Parameter.CRM.Customer.Gender"};this.isMobile=this.$isMobileDevice,this.$Utils.post(l).then(function(e){t.model.params.genders=t.$Utils.getDataWithRoot(e.R1,"Data.DynamicDS.Setting")});var n={RequestClass:"xBase",RequestAction:"Request",TotalRequests:1,R1_RequestTemplate:"Setting.SearchBase",R1_ParentCode:"xSetting.Project.Parameter.CRM.Lead.Province"};this.isMobile=this.$isMobileDevice,this.$Utils.post(n).then(function(e){t.model.params.provinces=t.$Utils.getDataWithRoot(e.R1,"Data.DynamicDS.Setting")})},getFormSetting:function(t,o){var r=this,s=this.$Lodash.cloneDeep(this.$singleRequest);s.R1_RequestTemplate="SettingNew.SearchSetting",s.R1_Code=o,this.$Utils.post(s).then(function(o){o=r.$Utils.getDataWithRoot(o.R1,"Data.DynamicDS.Setting");for(var s=0;s<o.length;s++){var l=o[s];if(l.Description=l.Description?JSON.parse(l.Description):"",r.$Utils.isEmpty(l,"F1")){l.Description.Fields="";for(var s=1;s<=l.Description.FCount;s++)void 0!=l["F"+s]&&(l.Description.Fields+=l["F"+s],delete l["F"+s]);l.Description.Fields="string"==typeof l.Description.Fields?JSON.parse(l.Description.Fields):[]}l.Description.Code=l.Code,l.Description.DataGroup=l.Name,l.Description.Value=l.Value,l.Description.ModuleType=a.ModuleType,"Filter"==a.ModuleType&&(l.Description.functions||(l.Description.functions={}),l.Description.functions.onFilter=r.onFilter)}var n=r.$Lodash.cloneDeep(o);e.each(n.Fields,function(e,t){"Select"!==t.ElementType&&"Multi"!==t.ElementType&&"Radio"!==t.ElementType&&"Tree"!==t.ElementType&&"MultiTree"!==t.ElementType&&"Autocomplete"!==t.ElementType||(delete t.Data,delete t.treeData,delete t.sourceData)}),e.each(n.Permissions,function(t,o){if(r.$Utils.isEmpty(o.Permissions))if(n.Permissions[t].Permissions=r.$Utils.stringToObject(o.Permissions),"Script"!=o.Name&&"Static"!=o.Name)for(var a=1;r.$Utils.isEmpty(o.Permissions["Value"+a]);)n.Permissions[t].Permissions["Value"+a]=sourceData[o.Permissions["Value"+a]],a++;else"Script"==o.Name&&(n.Permissions[t].LeadershipDynamicOrganization=sourceData[n.Permissions[t].LeadershipDynamicOrganization]);else if("Replica"==o.Name){var i=r.$Lodash.cloneDeep(n.Permissions[t].DynamicPermissions.split(";"));n.Permissions[t].DynamicPermissions="",e.each(i,function(e,o){""!=o&&r.$Utils.isEmpty(sourceData[o])&&(n.Permissions[t].DynamicPermissions+=sourceData[o]+";")}),r.$Utils.isEmpty(n.Permissions[t].FormCode)&&r.$Utils.isEmpty(sourceData.StatusDisplay)&&(n.Permissions[t].StatusDisplay=sourceData.StatusDisplay)}}),r.model.formSetting[t]=i()(n[0].Description),r.model.fields[t]=r.$Utils.rotateDementionArr(n[0].Description.Fields,"Name")})},handleBarcodeSearchConfirm:function(){var t=this;if(""==this.model.barcode_search_keyword);else if(this.$Utils.equals(this.model.receiptModel.SourceUrl,{}))this.$message({message:"Phải chọn kho hàng trước",center:!0,type:"error"});else{var o=this.$Lodash.cloneDeep(this.model.barcode_search_keyword);if(this.model.cachedBarcodes.indexOf(o)>-1)this.model.cart.forEach(function(e){if(e.MetaKeywords==o)return"515a2438-5274-4d1f-9fa6-7dbee94c524b"==t.model.receiptModel.StatusType.Id&&parseInt(e.Priority)==e.Quantity?void t.$message.error("Không đủ sản phẩm để xuất"):(e.Quantity+=1,t.$setItemLocalStorage(t.item.name,i()(t.model)),!1)});else{var a="";a="515a2438-5274-4d1f-9fa6-7dbee94c524b"==this.model.receiptModel.StatusType.Id?this.model.receiptModel.sourceId:this.model.receiptModel.sourceUrlId;var r={RequestClass:"xBase",RequestAction:"Request",TotalRequests:2,R1_RequestDataGroup:"DataGroup.warehouse.0fd40",R1_RequestFields:"Id;Code;Name;MetaDescription;MetaDescriptionName;Priority;ProductCode;OfficialNumber;ProductColor;Size;Style;ProductColorName;SizeName;MetaKeywords;CodeName;TotalPages;Category;CategoryName;Unit;FullCodeName;ProductShopCode;ProductCode;Status;Categories;CategoriesName;",R1_Code:"Warehouse",R1_MetaKeywords:o,R1_Status:a,R1_RequestTemplate:"xDocument_Document.Search",R2_RequestTemplate:"xDocument_Document.Search",R2_RequestDataGroup:"DataGroup.product.19jev",R2_Code:"Product",R2_RequestFields:"Id;Code;Barcode;OfficialNumber;Name;ProductCode;CodeName;SubCode;SubCodeName;Metarial;Style;ArmStyle;ColorName;SizeName;Price;NeckStyle;Category;CategoryName",R2_Barcode:o};this.$Utils.post(r).then(function(a){var r=t.$Utils.getDataWithRoot(a.R2,"Data.DocumentDS.Document");r=r.map(function(e){return{MetaKeywords:e.Barcode,OfficialNumber:e.OfficialNumber,Name:e.Name,ProductCode:e.ProductCode,Lead:e.CodeName,MetaDescription:e.SubCode,MetaTitle:e.Metarial,Signer:e.Style,Title:e.ArmStyle,Source:e.NeckStyle,ProductColorName:e.ColorName,SizeName:e.SizeName,TotalPages:e.Price,Quantity:1,Categories:e.Category,CategoriesName:e.CategoryName,MetaDescriptionName:e.SubCodeName}});var s=r[0],l=t.$Utils.getDataWithRoot(a.R1,"Data.DocumentDS.Document");if(l&&1==l.length){var n=!1;e.each(t.model.cart,function(e){if(e.MetaKeywords==l[0].MetaKeywords)return n=!0,e.Quantity+=1,!1}),n||(l[0].Quantity=1,"515a2438-5274-4d1f-9fa6-7dbee94c524b"!=t.model.receiptModel.StatusType.Id&&(l[0].Priority=99999),t.model.cart.push(l[0]),t.model.cachedBarcodes.push(o)),t.$setItemLocalStorage(t.item.name,i()(t.model)),t.$hub.$emit("saveReceipts")}else if(l&&0==l.length&&"576b56bb-5d50-4b67-b4c7-137bc1c7385f"==t.model.receiptModel.StatusType.Id){var d={RequestClass:"xBase",RequestAction:"Request",TotalRequests:1,R1_RequestDataGroup:"DataGroup.warehouse.0fd40",R1_RequestTemplate:"xDocument_Document.Insert",R1_Code:"Warehouse",R1_Priority:0,R1_TotalAttachments:0,R1_RequestFields:"Code;MetaKeywords;OfficialNumber;Name;ProductCode;Lead;MetaDescription;MetaTitle;Signer;Title;Source;ProductColorName;SizeName;TotalPages;Priority;TotalAttachments;Status;StatusName",R1_Status:t.model.receiptModel.SourceUrl.Id,R1_StatusName:t.model.receiptModel.SourceUrl.Name};e.each(s,function(e,t){d["R1_"+e]=t}),t.$Utils.post(d).then(function(e){e.success?(s.Id=e.R1.Data,t.model.cachedBarcodes.push(o),t.model.cart.push(s),t.$setItemLocalStorage(t.item.name,i()(t.model)),t.$hub.$emit("saveReceipts")):t.$message({message:"Có lỗi, xin thử lại",center:!0,type:"error"})})}else t.$message({message:"Sản phẩm "+o+" có lỗi trong kho "+t.model.receiptModel.SourceUrl.Name+". Xin hãy kiểm tra lại",center:!0,type:"error"})})}}this.model.barcode_search_keyword=""},format_curency:function(e){return void 0==e?0:isNaN(parseInt(e))?"0":(e=(""+e).replaceAll(".",""),e=parseInt(e),(e+"").replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1."))},typeChange:function(t){var o=this;this.model.cart=[],this.model.cachedBarcodes=[],e.each(this.model.params.statusTypes,function(e,a){if(a.Id==t)return o.model.receiptModel.StatusType=a,"515a2438-5274-4d1f-9fa6-7dbee94c524b"==t?(o.model.receiptModel.SourceUrl={},o.model.receiptModel.sourceUrlId="",o.model.receiptModel.Source=o.model.currentStore,o.model.receiptModel.sourceId=o.model.currentStore.Id):"576b56bb-5d50-4b67-b4c7-137bc1c7385f"==t&&(o.model.receiptModel.Source={},o.model.receiptModel.sourceId="",o.model.receiptModel.SourceUrl=o.model.currentStore,o.model.receiptModel.sourceUrlId=o.model.currentStore.Id),!1})},sourceIdChange:function(t){var o=this;e.each(this.model.params.warehouses,function(e,a){if(a.Id==t)return o.model.receiptModel.Source=a,!1})},sourceUrlIdChange:function(t){var o=this;e.each(this.model.params.warehouses,function(e,a){if(a.Id==t)return o.model.receiptModel.SourceUrl=a,!1})},save:function(){var t=this;if(0==this.model.cart.length)return void this.$message("Danh sách sản phẩm trống");this.$refs.receiptForm.validate(function(o){if(o){var a={RequestClass:"xBase",RequestAction:"Request",TotalRequests:t.model.cart.length};e.each(t.model.cart,function(e,o){a["R"+(e+1)+"_RequestDataGroup"]="DataGroup.warehouse.0fd40",a["R"+(e+1)+"_RequestFields"]="Id;Code;Name;MetaDescription;MetaDescriptionName;Priority;ProductCode;OfficialNumber;ProductColor;Size;Style;ProductColorName;SizeName;MetaKeywords;CodeName;TotalPages;Category;CategoryName;Unit;FullCodeName;ProductShopCode;ProductCode;Status;Categories;CategoriesName;",a["R"+(e+1)+"_Code"]="Warehouse",a["R"+(e+1)+"_MetaKeywords"]=o.MetaKeywords,a["R"+(e+1)+"_RequestTemplate"]="xDocument_Document.Search","515a2438-5274-4d1f-9fa6-7dbee94c524b"==t.model.receiptModel.StatusType.Id?a["R"+(e+1)+"_Status"]=t.model.receiptModel.Source.Id:a["R"+(e+1)+"_Status"]=t.model.receiptModel.SourceUrl.Id}),t.$Utils.post(a).then(function(o){if(o.success){e.each(t.model.cart,function(e,a){var r=t.$Utils.getDataWithRoot(o["R"+(e+1)],"Data.DocumentDS.Document");if(1!=r.length)return void t.$message.error("Có lỗi. Liên hệ kĩ thuật để xử lý");a.Id=r[0].Id});var a={RequestClass:"xBase",RequestAction:"Request",TotalRequests:1,R1_RequestDataGroup:"DataGroup.phieu-kho.1302n",R1_RequestTemplate:"xDocument_Document.Insert",R1_CreatedByName:JSON.parse(localStorage.getItem("LoggedOnUser")).Username,R1_ModifiedByName:JSON.parse(localStorage.getItem("LoggedOnUser")).Username,R1_Version:1,R1_Code:"ImpExpReceipt",R1_RequestFields:"Code;ExpiredDate;StoreCode;ReferenceNumber;SourceUrl;Source;RelatedDocuments;StatusType;MetaKeywords;ProductCode;OfficialNumber;ProductColor;Size;TotalComments;Id;Created;Code;CreatedBy;CreatedByName;ModifiedBy;ModifiedByName;StatusTypeName;SourceName;SourceUrlName;CategoriesName;ProductColorName;SizeName;ChangedStatusName;AuthorName;;CustomerGenderName;OrderStatusName;LogisticOrgName;DisplayImageName;UpdateWarehouse;Changed;FormSetting;DocumentForm",R1_FormSetting:t.model.formSetting.import},r={RequestClass:"xBase",RequestAction:"Request",TotalRequests:t.model.cart.length},s={RequestClass:"xBase",RequestAction:"Request",TotalRequests:t.model.cart.length},l=[];e.each(t.model.receiptModel,function(e,o){if("Name"==e||e.indexOf("Name")!=e.length-4){if(t.model.fields.impExpProduct[e])var r={ColumnCaption:t.model.fields.impExpProduct[e].Caption,ColumnName:e,OldDisplayValue:"",OldValue:"",NewDisplayValue:a["R1_"+e+"Name"]?a["R1_"+e+"Name"]:a["R1_"+e],NewValue:a["R1_"+e]};l.push(r)}}),e.each(t.model.cart,function(o,a){s["R"+(o+1)+"_Changed"]=i()(l),s["R"+(o+1)+"_SourceUrl"]=t.model.receiptModel.SourceUrl.Id,s["R"+(o+1)+"_SourceUrlName"]=t.model.receiptModel.SourceUrl.Name,s["R"+(o+1)+"_Source"]=t.model.receiptModel.Source.Id,s["R"+(o+1)+"_SourceName"]=t.model.receiptModel.Source.Name,s["R"+(o+1)+"_StatusType"]=t.model.receiptModel.StatusType.Id,s["R"+(o+1)+"_StatusTypeName"]=t.model.receiptModel.StatusType.Name,s["R"+(o+1)+"_StoreCode"]=t.model.receiptModel.StoreCode,s["R"+(o+1)+"_ReferenceNumber"]=t.model.receiptModel.ReferenceNumber,s["R"+(o+1)+"_RelatedDocuments"]=t.model.receiptModel.RelatedDocuments,s["R"+(o+1)+"_ExpiredDate"]=t.$Utils.formatDateTime(t.model.receiptModel.ExpiredDate),s["R"+(o+1)+"_RequestDataGroup"]="DataGroup.nhap-xuat-kho.0614g",s["R"+(o+1)+"_RequestTemplate"]="xDocument_Document.Insert",s["R"+(o+1)+"_CreatedByName"]=JSON.parse(localStorage.getItem("LoggedOnUser")).Username,s["R"+(o+1)+"_ModifiedByName"]=JSON.parse(localStorage.getItem("LoggedOnUser")).Username,s["R"+(o+1)+"_Version"]=1,s["R"+(o+1)+"_Code"]="ImportExportWarehouse",s["R"+(o+1)+"_RequestFields"]="Code;ExpiredDate;StoreCode;ReferenceNumber;SourceUrl;Source;RelatedDocuments;StatusType;MetaKeywords;ProductCode;OfficialNumber;ProductColor;Size;TotalComments;Id;Created;Code;CreatedBy;CreatedByName;ModifiedBy;ModifiedByName;StatusTypeName;SourceName;SourceUrlName;CategoriesName;ProductColorName;SizeName;ChangedStatusName;AuthorName;;CustomerGenderName;OrderStatusName;LogisticOrgName;DisplayImageName;UpdateWarehouse;Changed;FormSetting;DocumentForm;Parent",s["R"+(o+1)+"_FormSetting"]=t.model.formSetting.impExpProduct,"515a2438-5274-4d1f-9fa6-7dbee94c524b"==t.model.receiptModel.StatusType.Id?s["R"+(o+1)+"_TotalDownloads"]=a.Quantity:s["R"+(o+1)+"_TotalComments"]=a.Quantity,e.each(a,function(e,t){"Code"!=e&&"AutoId"!=e&&"Id"!=e&&(s["R"+(o+1)+"_"+e]=t)}),r["R"+(o+1)+"_UpdateWarehouse"]=!0,r["R"+(o+1)+"_RequestDataGroup"]="DataGroup.warehouse.0fd40",r["R"+(o+1)+"_RequestFields"]="Id;Name;MetaDescription;MetaDescriptionName;Priority;ProductCode;OfficialNumber;ProductColor;Size;Style;ProductColorName;SizeName;MetaKeywords;CodeName;TotalPages;Category;CategoryName;Unit;FullCodeName;ProductShopCode;ProductCode;Status;Categories;CategoriesName;TotalAttachments;FormSetting;Changed;UpdateWarehouse",r["R"+(o+1)+"_RequestTemplate"]="xDocument_Document.Update",r["R"+(o+1)+"_Version"]=1,r["R"+(o+1)+"_Id"]=a.Id,r["R"+(o+1)+"_Code"]="Warehouse","515a2438-5274-4d1f-9fa6-7dbee94c524b"==t.model.receiptModel.StatusType.Id?(r["R"+(o+1)+"_TotalAttachments"]=-a.Quantity,r["R"+(o+1)+"_Priority"]=-a.Quantity):(r["R"+(o+1)+"_TotalAttachments"]=a.Quantity,r["R"+(o+1)+"_Priority"]=a.Quantity),r["R"+(o+1)+"_Changed"]=i()([{ColumnCaption:"Số lượng( Tồn sẵn có)",ColumnName:"Priority",OldDisplayValue:"",OldValue:"",NewDisplayValue:a.Quantity+"",NewValue:a.Quantity+""},{ColumnCaption:"Số lượng (Tồn thực thế)",ColumnName:"TotalAttachments",OldDisplayValue:"",OldValue:"",NewDisplayValue:a.Quantity+"",NewValue:a.Quantity+""}]),r["R"+(o+1)+"_ModifiedByName"]=JSON.parse(localStorage.getItem("LoggedOnUser")).Username,r["R"+(o+1)+"_FormSetting"]=t.model.formSetting.warehouse}),a.R1_Changed=i()(l),a.R1_SourceUrl=t.model.receiptModel.SourceUrl.Id,a.R1_SourceUrlName=t.model.receiptModel.SourceUrl.Name,a.R1_Source=t.model.receiptModel.Source.Id,a.R1_SourceName=t.model.receiptModel.Source.Name,a.R1_StatusType=t.model.receiptModel.StatusType.Id,a.R1_StatusTypeName=t.model.receiptModel.StatusType.Name,a.R1_StoreCode=t.model.receiptModel.StoreCode,a.R1_ReferenceNumber=t.model.receiptModel.ReferenceNumber,a.R1_RelatedDocuments=t.model.receiptModel.RelatedDocuments,a.R1_ExpiredDate=t.$Utils.formatDateTime(t.model.receiptModel.ExpiredDate),a.R1_FormSetting=t.model.formSetting.impExpProduct,t.$Utils.postCheckResult(a).then(function(o){o.success&&(e.each(t.model.cart,function(e,t){s["R"+(e+1)+"_Parent"]=o.R1.Data}),t.$Utils.postCheckResult(s).then(function(e){t.model.done=!0,t.$setItemLocalStorage(t.item.name,i()(t.model)),t.$message.success("Đã lưu phiếu thành công")}))}),t.$Utils.postCheckResult(r).then(function(e){t.$hub.$emit("saveReceipts")})}})}})},print:function(){},handleDeleteProduct:function(e,t){var o=this;this.$confirm("Bạn muốn xóa? ","Warning",{confirmButtonText:"Có",cancelButtonText:"Không",type:"warning"}).then(function(){o.model.cart.splice(e,1),o.$setItemLocalStorage(o.item.name,i()(o.model)),o.model.cachedBarcodes.splice(o.model.cachedBarcodes.indexOf(t.Barcode),1),o.$message({type:"success",message:"Đã xóa"})}).catch(function(){})}},created:function(){this.loadResources(),this.getFormSetting("warehouse","Form.chinh-sua-du-lieu-ton-kho.0c240"),this.getFormSetting("import","Form.nhap-kho-luan-chuyen.0da0a"),this.getFormSetting("impExpProduct","Form.phieu-kho.09b7a")}}}).call(t,o(2),o(984)(e))},1069:function(e,t,o){"use strict";var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"Store__ROOT"},[o("div",{staticClass:"col-lg-8"},[o("div",{staticClass:"step__wrapper"},[o("el-card",{attrs:{label:"Giỏ hàng"}},[o("div",{staticClass:"Cart__ROOT"},[o("div",{staticClass:"cart__header"},[o("div",{staticClass:"col-lg-6 pd0"},[o("strong",[e._v("Danh sách sản phẩm")])]),e._v(" "),o("div",{staticClass:"col-lg-6 pd0"},[e.model.done?e._e():o("el-input",{attrs:{placeholder:"Nhập Barcode và Enter",autofocus:"","suffix-icon":"el-icon-search"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.handleBarcodeSearchConfirm(t)}},model:{value:e.model.barcode_search_keyword,callback:function(t){e.$set(e.model,"barcode_search_keyword",t)},expression:"model.barcode_search_keyword"}})],1),e._v(" "),o("div",{staticClass:"clearfix"})]),e._v(" "),o("div",{staticClass:"cart__content"},[o("el-table",{staticStyle:{width:"100%"},attrs:{data:e.model.cart,"empty-text":"Chưa có sản phẩm",border:""}},[o("el-table-column",{attrs:{type:"index",width:"40",align:"center","header-align":"center"}}),e._v(" "),o("el-table-column",{attrs:{prop:"MetaKeywords",width:"75",label:"Barcode"}}),e._v(" "),o("el-table-column",{attrs:{prop:"ProductCode",width:"200",label:"Mã sản phẩm in trên tem mác"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.Name,placement:"top"}},[o("span",[e._v(e._s(t.row.ProductCode))])])]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"Số lượng",width:"150",prop:"Quantity"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-input-number",{attrs:{disabled:e.model.done,min:1,max:parseInt(t.row.Priority)},model:{value:t.row.Quantity,callback:function(o){e.$set(t.row,"Quantity",o)},expression:"scope.row.Quantity"}})]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"ProductColorName",label:"Màu sắc"}}),e._v(" "),o("el-table-column",{attrs:{prop:"SizeName",label:"Size"}}),e._v(" "),o("el-table-column",{attrs:{prop:"TotalPages",label:"Đơn giá"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("div",{staticClass:"ovf-elipsis"},[e._v("\n                    "+e._s(e.format_curency(parseInt(t.row.TotalPages))+" đ")+"\n                  ")])]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"Hành động"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"danger",disabled:e.model.done},nativeOn:{click:function(o){o.preventDefault(),e.handleDeleteProduct(t.$index,t.row)}}},[o("i",{staticClass:"fa fa-trash"})])]}}])})],1)],1),e._v(" "),o("div",{staticClass:"modal__wrapper"})])])],1),e._v(" "),o("div",{staticClass:"step-content__wrapper",staticStyle:{"padding-top":"20px"}})]),e._v(" "),o("div",{staticClass:"col-lg-4 pd0"},[o("el-card",[o("div",{staticClass:"payment__wrapper"},[o("div",{staticClass:"block__label"},[e._v("\n          Thông tin phiếu\n        ")]),e._v(" "),o("div",{staticClass:"block__wrapper"},[o("el-form",{ref:"receiptForm",attrs:{model:e.model.receiptModel,"label-width":"100px","label-position":"left",disabled:e.model.done,rules:e.model.receiptRules}},[o("el-form-item",{attrs:{label:"Ngày lập"}},[o("el-date-picker",{attrs:{format:"dd/MM/yyyy"},model:{value:e.model.receiptModel.ExpiredDate,callback:function(t){e.$set(e.model.receiptModel,"ExpiredDate",t)},expression:"model.receiptModel.ExpiredDate"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"Loại",prop:"StatusType"}},[o("el-radio-group",{on:{change:e.typeChange},model:{value:e.model.receiptModel.typeId,callback:function(t){e.$set(e.model.receiptModel,"typeId",t)},expression:"model.receiptModel.typeId"}},e._l(e.model.params.statusTypes,function(t){return o("el-radio",{key:t.Id,attrs:{label:t.Id,border:""}},[e._v(e._s(t.Caption))])}))],1),e._v(" "),o("el-form-item",{attrs:{label:"Nguồn",prop:"sourceId"}},[o("el-select",{attrs:{placeholder:"Chọn kho hàng",filterable:""},on:{change:e.sourceIdChange},model:{value:e.model.receiptModel.sourceId,callback:function(t){e.$set(e.model.receiptModel,"sourceId",t)},expression:"model.receiptModel.sourceId"}},e._l(e.model.params.warehouses,function(e){return o("el-option",{key:e.Id,attrs:{label:e.Name,value:e.Id}})}))],1),e._v(" "),o("el-form-item",{attrs:{label:"Đích:",prop:"sourceUrlId"}},[o("el-select",{attrs:{placeholder:"Chọn kho hàng",filterable:""},on:{change:e.sourceUrlIdChange},model:{value:e.model.receiptModel.sourceUrlId,callback:function(t){e.$set(e.model.receiptModel,"sourceUrlId",t)},expression:"model.receiptModel.sourceUrlId"}},e._l(e.model.params.warehouses,function(e){return o("el-option",{key:e.Id,attrs:{label:e.Name,value:e.Id}})}))],1),e._v(" "),o("el-form-item",{attrs:{label:"Mã phiếu"}},[o("el-input",{model:{value:e.model.receiptModel.StoreCode,callback:function(t){e.$set(e.model.receiptModel,"StoreCode",t)},expression:"model.receiptModel.StoreCode"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"Mã phiếu liên quan"}},[o("el-input",{model:{value:e.model.receiptModel.ReferenceNumber,callback:function(t){e.$set(e.model.receiptModel,"ReferenceNumber",t)},expression:"model.receiptModel.ReferenceNumber"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"Ghi chú"}},[o("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:3}},model:{value:e.model.receiptModel.RelatedDocuments,callback:function(t){e.$set(e.model.receiptModel,"RelatedDocuments",t)},expression:"model.receiptModel.RelatedDocuments"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"","label-width":"0px"}},[o("br"),e._v(" "),o("el-button",{staticClass:"btn btn-block",attrs:{type:"danger",disabled:e.model.done},on:{click:e.save}},[e._v("Hoàn tất")]),e._v(" "),o("el-button",{staticClass:"btn btn-block fa fa-print",attrs:{type:"info",hidden:""},on:{click:e.print}},[e._v("In")])],1)],1)],1)])])],1),e._v(" "),o("div",{staticClass:"clearfix"})])},r=[],i={render:a,staticRenderFns:r};t.a=i},1242:function(e,t,o){var a=o(1243);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);o(932)("89d53730",a,!0)},1243:function(e,t,o){t=e.exports=o(931)(!0),t.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"ImpExpReceipts.vue",sourceRoot:""}])},1244:function(e,t,o){"use strict";var a=o(4),r=o.n(a),i=o(941);t.a={name:"ImpExpReceipts",components:{ImpExpReceipt:i.default},data:function(){var e={editableTabsValue:"1",editableTabs:[{title:"Phiếu 1",name:"1"}],tabIndex:1},t=this.$getItemLocalStorage("RECEIPTS");return t&&"undefined"!=t&&JSON.parse(t).editableTabs.length>0&&(e=JSON.parse(t)),{model:e}},methods:{handleTabsEdit:function(e,t){var o=this;if("add"===t){var a=++this.model.tabIndex+"";this.model.editableTabs.push({title:"Phiếu "+a,name:a}),this.model.editableTabsValue=a}"remove"===t&&this.$confirm("Bạn muốn đóng, dữ liệu chưa lưu có thể bị hủy?","Warning",{cancelButtonText:"Không",confirmButtonText:"Có",type:"warning"}).then(function(){if(1==o.model.editableTabs.length){var t=++o.model.tabIndex+"";o.model.editableTabs.push({title:"Phiếu "+t,name:t}),o.model.editableTabsValue=t,o.model.editableTabs=o.model.editableTabs.filter(function(t){return t.name!==e}),delete localStorage[e],delete localStorage.RECEIPTS}else{var a=o.model.editableTabsValue;a===e&&o.model.editableTabs.forEach(function(t,r){if(t.name===e){var i=o.model.editableTabs[r+1]||o.model.editableTabs[r-1];i&&(a=i.name)}}),o.model.editableTabsValue=a,o.model.editableTabs=o.model.editableTabs.filter(function(t){return t.name!==e}),delete localStorage[e],o.$setItemLocalStorage("RECEIPTS",r()(o.model))}}).catch(function(){})}},created:function(){var e=this;this.$hub.$on("saveReceipts",function(){e.$setItemLocalStorage("RECEIPTS",r()(e.model))})},destroyed:function(){}}},1245:function(e,t,o){"use strict";var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-tabs",{attrs:{type:"border-card",editable:""},on:{edit:e.handleTabsEdit},model:{value:e.model.editableTabsValue,callback:function(t){e.$set(e.model,"editableTabsValue",t)},expression:"model.editableTabsValue"}},e._l(e.model.editableTabs,function(e,t){return o("el-tab-pane",{key:e.name,attrs:{label:e.title,name:e.name}},[o("ImpExpReceipt",{attrs:{item:e}})],1)}))},r=[],i={render:a,staticRenderFns:r};t.a=i},941:function(e,t,o){"use strict";function a(e){o(1066)}Object.defineProperty(t,"__esModule",{value:!0});var r=o(1068),i=o(1069),s=o(0),l=a,n=s(r.a,i.a,!1,l,null,null);t.default=n.exports},966:function(e,t,o){"use strict";function a(e){o(1242)}Object.defineProperty(t,"__esModule",{value:!0});var r=o(1244),i=o(1245),s=o(0),l=a,n=s(r.a,i.a,!1,l,"data-v-5f682532",null);t.default=n.exports},984:function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}}});
//# sourceMappingURL=14.e1828b0b5c6b21d739cf.js.map