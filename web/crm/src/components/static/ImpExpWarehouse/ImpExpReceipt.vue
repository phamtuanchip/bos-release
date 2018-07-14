<template>

</template>

<script>
  export default {
      name: "ImpExpReceipt",
      props: ['item'],
      components: {},
      data: function  (){
        var model = {
          receiptRules: {
            sourceId: [
              { required: true, message: 'Bắt buộc', trigger: 'blur' },
            ],
            sourceUrlId: [
              { required: true, message: 'Bắt buộc', trigger: 'blur' },
            ],
          },
          receiptModel: {
            SourceUrl: {},
            Source: {},
            StatusType: {
              Id: '576b56bb-5d50-4b67-b4c7-137bc1c7385f',
              Name: 'Nhập luân chuyển'
            },
            typeId : '576b56bb-5d50-4b67-b4c7-137bc1c7385f',
            sourceId : '',
            sourceUrlId : '',
            StoreCode: '',
            ReferenceNumber: '',
            RelatedDocuments: '',
            Id: '',
            ExpiredDate: new Date(),
          },
          params: {
            warehouses : [],
            statusTypes : [
              {
                Id: '515a2438-5274-4d1f-9fa6-7dbee94c524b',
                Name: 'Xuất luân chuyển',
                Caption: 'Xuất'
              },
              {
                Id: '576b56bb-5d50-4b67-b4c7-137bc1c7385f',
                Name: 'Nhập luân chuyển',
                Caption: 'Nhập'
              }
            ]
          },
          cart: [],
          radio: '',
          cachedBarcodes: [],
          cachedIds: {},
          barcode_search_keyword: '',
          Warehouse: {},
          formSetting: {
            warehouse: '',
            ImportExportWarehouse: '',
            import: '',
            importProduct: '',
            export: '',
            impExpProduct: '',
          },
          fields: {
            warehouse: {},
            ImportExportWarehouse: {},
            import: {},
            importProduct: {},
            export: {},
          },
          currentStore: {},
          done: false,
          warehousesObj : {},
        }
        if(this.$getItemLocalStorage(this.item.name)){
          model = JSON.parse(this.$getItemLocalStorage(this.item.name));
        }
        // var model =  this.$getItemLocalStorage(this.item.name)&& this.$getItemLocalStorage(this.item.name)!= 'undefined'?JSON.parse(this.$getItemLocalStorage(this.item.name)):newModel;
        return {
          model: model,
        }
      },
      methods: {
        loadResources(){
          //load warehouse: params.warehouses
          var reqWarehouses = {
            RequestClass: "xBase",
            RequestAction: "Request",
            TotalRequests: 1,
            R1_RequestDataGroup: "DataGroup.warehouses.01dh7",
            R1_RequestFields: "Id;Code;Name;",
            R1_Code: "Warehouses",
            R1_RequestTemplate: "xDocument_Document.Search"
          };
          this.$Utils.post(reqWarehouses).then(response => {
            this.model.params.warehouses = this.$Utils.getDataWithRoot(response.R1, 'Data.DocumentDS.Document');
            //load stores: params.poses
            var request = {
              RequestClass: "xBase",
              RequestAction: "Request",
              TotalRequests: 1,
              R1_RequestDataGroup: "DataGroup.pointofsales.09egb",
              R1_RequestFields: "Id;Code;Promulgator;Name;Category;Type;",
              R1_Code: "POS",
              R1_RequestTemplate: "xDocument_Document.Search",
              R1_Promulgator: JSON.parse(localStorage.getItem("LoggedOnUser")).Project.GroupId,
            };
            this.$Utils.post(request).then(response => {
              this.model.params.poses = this.$Utils.getDataWithRoot(response.R1, 'Data.DocumentDS.Document');
              var warehouses = this.$Lodash.cloneDeep(this.model.params.poses);
              this.model.warehousesObj = this.$Utils.rotateDementionArr(warehouses, 'Id');
              if(this.model.params.poses[0])
                $.each(this.model.params.warehouses, (k,value)=> {
                  if(value.Id == this.model.params.poses[0].Category){
                    this.model.currentStore = value;
                    if(this.model.receiptModel.StatusType.Id=='515a2438-5274-4d1f-9fa6-7dbee94c524b'){
                      this.model.receiptModel.SourceUrl ={};
                      this.model.receiptModel.Source = this.model.currentStore;
                      this.model.receiptModel.sourceId = this.model.currentStore.Id;
                    }else if(this.model.receiptModel.StatusType.Id=='576b56bb-5d50-4b67-b4c7-137bc1c7385f'){ // nếu là nhập
                      this.model.receiptModel.Source ={};
                      this.model.receiptModel.SourceUrl = this.model.currentStore;
                      this.model.receiptModel.sourceUrlId = this.model.currentStore.Id;
                    }
                    return false;
                  }
                });
            });
          });

          //load users: params.users
          var reqUsers = {
            RequestAction: 'SearchUsers',
            RequestClass: 'BPM',
            ConditionFields: 'IncludedGroupManager;Group;Status;LoginName;UserId,Status',
            StaticFields: 'UserId;Username;Description;Status;LoginName',
            DynamicFields: 'Avatar;Facebook;Email;Skype;Birthday;Biography;WorkProcess;Telephone',
            StructFields: 'GroupRoot;GroupRootName;PhoneId;PhoneGroup;Public;RoleRootName;GroupManage;Notification',
            Status: 1
          };
          this.$Utils.post(reqUsers).then((data) => {
            this.model.params.users = [];
            data = this.$Utils.getDataWithRoot(data, 'Data.UserDS.User');
            $.each(data, (k, value) => {
              if (value.LoginName !== 'superadmin') {
                this.model.params.users.push({
                  Id: value.UserId,
                  Name: value.Username,
                  LoginName: value.LoginName
                })
              }
            });
          });

          //load sources: params.sources
          var reqSources = {
            RequestClass: 'xBase',
            RequestAction: 'Request',
            TotalRequests: 1,
            R1_RequestTemplate: 'Setting.SearchBase',
            R1_ParentCode: 'xSetting.Project.Parameter.CRM.Customer.Source'
          };
          this.isMobile = this.$isMobileDevice;
          this.$Utils.post(reqSources).then(response => {
            this.model.params.sources = this.$Utils.getDataWithRoot(response.R1, 'Data.DynamicDS.Setting');
          })

          //load campaigns: params.campaignCodes
          var reqCampaignCodes = {
            RequestClass: 'xBase',
            RequestAction: 'Request',
            TotalRequests: 1,
            R1_RequestTemplate: 'Setting.SearchBase',
            R1_ParentCode: 'xSetting.Project.Parameter.CRM.Lead.CampaignCode'
          };
          this.isMobile = this.$isMobileDevice;
          this.$Utils.post(reqCampaignCodes).then(response => {
            this.model.params.campaignCodes = this.$Utils.getDataWithRoot(response.R1, 'Data.DynamicDS.Setting');
          })

          //load time period: params.timeFrameNames
          var reqTimeFrameNames = {
            RequestClass: 'xBase',
            RequestAction: 'Request',
            TotalRequests: 1,
            R1_RequestTemplate: 'Setting.SearchBase',
            R1_ParentCode: 'xSetting.Project.Parameter.CRM.Activity.TimeFrame'
          };
          this.isMobile = this.$isMobileDevice;
          this.$Utils.post(reqTimeFrameNames).then(response => {
            this.model.params.timeFrameNames = this.$Utils.getDataWithRoot(response.R1, 'Data.DynamicDS.Setting');
          })

          //load time period: params.genders
          var reqGenders = {
            RequestClass: 'xBase',
            RequestAction: 'Request',
            TotalRequests: 1,
            R1_RequestTemplate: 'Setting.SearchBase',
            R1_ParentCode: 'xSetting.Project.Parameter.CRM.Customer.Gender'
          };
          this.isMobile = this.$isMobileDevice;
          this.$Utils.post(reqGenders).then(response => {
            this.model.params.genders = this.$Utils.getDataWithRoot(response.R1, 'Data.DynamicDS.Setting');
          })

          //load time period: params.provinces
          var reqProvinces = {
            RequestClass: 'xBase',
            RequestAction: 'Request',
            TotalRequests: 1,
            R1_RequestTemplate: 'Setting.SearchBase',
            R1_ParentCode: 'xSetting.Project.Parameter.CRM.Lead.Province'
          };
          this.isMobile = this.$isMobileDevice;
          this.$Utils.post(reqProvinces).then(response => {
            this.model.params.provinces = this.$Utils.getDataWithRoot(response.R1, 'Data.DynamicDS.Setting');
          })

        },
        getFormSetting(type, formCode){
          var req = this.$Lodash.cloneDeep(this.$singleRequest);
          req.R1_RequestTemplate = 'SettingNew.SearchSetting';
          req.R1_Code = formCode;
          this.$Utils.post(req).then((response)=>{
            response = this.$Utils.getDataWithRoot(response.R1, 'Data.DynamicDS.Setting');
            for (var i = 0; i < response.length; i++) {
              var refModule = response[i];
              refModule.Description = refModule.Description ? JSON.parse(refModule.Description) : "";
              if (this.$Utils.isEmpty(refModule, "F1")) {
                refModule.Description.Fields = '';
                for (var i = 1; i <= refModule.Description.FCount; i++) {
                  if (refModule['F' + i] != undefined) {
                    refModule.Description.Fields += refModule['F' + i];
                    delete refModule['F' + i];
                  }
                }
                refModule.Description.Fields = typeof refModule.Description.Fields ==='string' ? JSON.parse(refModule.Description.Fields) : [];
              }
              refModule.Description.Code = refModule.Code;
              refModule.Description.DataGroup = refModule.Name;
              refModule.Description.Value = refModule.Value;
              refModule.Description.ModuleType = module.ModuleType;
              if (module.ModuleType == "Filter") {
                if(!refModule.Description.functions){
                  refModule.Description.functions = {};
                }
                refModule.Description.functions.onFilter = this.onFilter;
              }
            }

            var sourceSetting = this.$Lodash.cloneDeep(response)
            $.each(sourceSetting.Fields, (key, element) => {
              if (
                element.ElementType === 'Select' ||
                element.ElementType === 'Multi' ||
                element.ElementType === 'Radio' ||
                element.ElementType === 'Tree' ||
                element.ElementType === 'MultiTree' ||
                element.ElementType === 'Autocomplete'
              ) {
                delete element.Data
                delete element.treeData
                delete element.sourceData
              }
            })
            $.each(sourceSetting.Permissions, (key, value) => {
              if (this.$Utils.isEmpty(value.Permissions)) {
                sourceSetting.Permissions[
                  key
                  ].Permissions = this.$Utils.stringToObject(value.Permissions)
                if (value.Name != 'Script' && value.Name != 'Static') {
                  var i = 1
                  while (this.$Utils.isEmpty(value.Permissions['Value' + i])) {
                    sourceSetting.Permissions[key].Permissions['Value' + i] =
                      sourceData[value.Permissions['Value' + i]]
                    i++
                  }
                } else if (value.Name == 'Script') {
                  sourceSetting.Permissions[key].LeadershipDynamicOrganization =
                    sourceData[
                      sourceSetting.Permissions[key].LeadershipDynamicOrganization
                      ]
                }
              } else if (value.Name == 'Replica') {
                var arrDP = this.$Lodash.cloneDeep(
                  sourceSetting.Permissions[key].DynamicPermissions.split(';')
                )
                sourceSetting.Permissions[key].DynamicPermissions = ''
                $.each(arrDP, (k, val) => {
                  if (val != '' && this.$Utils.isEmpty(sourceData[val])) {
                    sourceSetting.Permissions[key].DynamicPermissions +=
                      sourceData[val] + ';'
                  }
                })
                if (
                  this.$Utils.isEmpty(sourceSetting.Permissions[key].FormCode) &&
                  this.$Utils.isEmpty(sourceData.StatusDisplay)
                ) {
                  sourceSetting.Permissions[key].StatusDisplay =
                    sourceData.StatusDisplay
                }
              }
            })
            var desc = sourceSetting[0].Description;
            desc.Permissions.forEach(permission => {
              if(typeof permission.Permissions === 'string') {
                permission.Permissions = this.$Utils.stringToObject(permission.Permissions);
              }
            });
            this.model.formSetting[type] = JSON.stringify(desc);
            this.model.fields[type] = this.$Utils.rotateDementionArr(sourceSetting[0].Description.Fields, 'Name');
          });
        },
        handleBarcodeSearchConfirm () {
          if(this.model.barcode_search_keyword == '') {
            // this.$message({message: 'Chưa điền barcode', center: true, type: 'error'});
          }
          else if(this.$Utils.equals(this.model.receiptModel.SourceUrl,{})){
            this.$message({message: 'Phải chọn kho hàng trước',center: true,type: 'error'});
          }else {
            var barcodeSearched = this.$Lodash.cloneDeep(this.model.barcode_search_keyword);
            if(this.model.cachedBarcodes.indexOf(barcodeSearched) >-1){
              this.model.cart.forEach((item)=>{
                if(item.MetaKeywords == barcodeSearched){

                  //xuất
                  if(this.model.receiptModel.StatusType.Id=='515a2438-5274-4d1f-9fa6-7dbee94c524b' && parseInt(item.Priority) == item.Quantity){
                    this.$message.error('Không đủ sản phẩm để xuất');
                    return;
                  }
                  item.Quantity += 1;
                  this.$setItemLocalStorage(this.item.name, JSON.stringify(this.model));
                  return false;

                }
              });
            } else {
              var fromWH = '';

              //xuất
              if(this.model.receiptModel.StatusType.Id=='515a2438-5274-4d1f-9fa6-7dbee94c524b'){
                fromWH = this.model.receiptModel.sourceId;
              }else{
                fromWH = this.model.receiptModel.sourceUrlId;
              }

              var request = {
                RequestClass: "xBase",
                RequestAction: "Request",
                TotalRequests: 2,
                R1_RequestDataGroup: "DataGroup.warehouse.0fd40",
                R1_RequestFields: "Id;Code;Name;MetaDescription;MetaDescriptionName;Priority;ProductCode;OfficialNumber;ProductColor;Size;Style;ProductColorName;SizeName;MetaKeywords;CodeName;TotalPages;Category;CategoryName;Unit;FullCodeName;ProductShopCode;ProductCode;Status;Categories;CategoriesName;",
                R1_Code: "Warehouse",
                R1_MetaKeywords: barcodeSearched,
                R1_Status: fromWH,
                R1_RequestTemplate: "xDocument_Document.Search",
                R2_RequestTemplate : "xDocument_Document.Search",
                R2_RequestDataGroup : "DataGroup.product.19jev",
                R2_Code : "Product",
                R2_RequestFields : "Id;Code;Barcode;OfficialNumber;Name;ProductCode;CodeName;SubCode;SubCodeName;Metarial;Style;ArmStyle;ColorName;SizeName;Price;NeckStyle;Category;CategoryName",
                R2_Barcode: barcodeSearched,

              };
              this.$Utils.post(request).then(response => {
                var respondR2 = this.$Utils.getDataWithRoot(response.R2,"Data.DocumentDS.Document");
                respondR2 = respondR2.map((p)=> {
                  return {
                    MetaKeywords: p.Barcode,
                    OfficialNumber: p.OfficialNumber,
                    Name: p.Name,
                    ProductCode: p.ProductCode,
                    Lead: p.CodeName,
                    MetaDescription: p.SubCode,
                    MetaTitle: p.Metarial,
                    Signer: p.Style,
                    Title: p.ArmStyle,
                    Source: p.NeckStyle,
                    ProductColorName: p.ColorName,
                    SizeName: p.SizeName,
                    TotalPages: p.Price,
                    Quantity: 1,
                    Categories:p.Category,
                    CategoriesName:p.CategoryName,
                    MetaDescriptionName:p.SubCodeName,
                  }
                });
                var product = respondR2[0];
                var productLst = this.$Utils.getDataWithRoot(response.R1, 'Data.DocumentDS.Document');
                if(productLst && productLst.length ==1){
                  var existed = false;
                  $.each(this.model.cart, (item)=>{
                    if(item.MetaKeywords == productLst[0].MetaKeywords){
                      existed = true;
                      item.Quantity += 1;
                      return false;
                    }
                  });
                  if(!existed){
                    productLst[0].Quantity = 1;

                    if(this.model.receiptModel.StatusType.Id !='515a2438-5274-4d1f-9fa6-7dbee94c524b'){
                      productLst[0].Priority = 99999
                    }
                    this.model.cart.push(productLst[0]);
                    this.model.cachedBarcodes.push(barcodeSearched);
                  }
                  this.$setItemLocalStorage(this.item.name, JSON.stringify(this.model));
                  this.$hub.$emit('saveReceipts');
                }else if(productLst && productLst.length ==0 && this.model.receiptModel.StatusType.Id == '576b56bb-5d50-4b67-b4c7-137bc1c7385f'){
                  var requestInsertWH = {
                    RequestClass: "xBase",
                    RequestAction: "Request",
                    TotalRequests: 1,
                    R1_RequestDataGroup: "DataGroup.warehouse.0fd40",
                    R1_RequestTemplate: "xDocument_Document.Insert",
                    R1_Code: 'Warehouse',
                    R1_Priority: 0,
                    R1_TotalAttachments: 0,
                    R1_RequestFields: 'Code;MetaKeywords;OfficialNumber;Name;ProductCode;Lead;MetaDescription;MetaTitle;Signer;Title;Source;ProductColorName;SizeName;' +
                    'TotalPages;Priority;TotalAttachments;Status;StatusName',
                    R1_Status: this.model.receiptModel.SourceUrl.Id,
                    R1_StatusName: this.model.receiptModel.SourceUrl.Name,
                  }
                  $.each(product, (k, v)=> {
                    requestInsertWH['R1_'+k] = v;
                  });
                  this.$Utils.post(requestInsertWH).then(respondInsertWH => {
                    if(respondInsertWH.success){
                      product.Id=respondInsertWH.R1.Data;
                      this.model.cachedBarcodes.push(barcodeSearched);
                      this.model.cart.push(product);
                      this.$setItemLocalStorage(this.item.name, JSON.stringify(this.model));
                      this.$hub.$emit('saveReceipts');
                    }
                    else
                      this.$message({message: 'Có lỗi, xin thử lại',center: true,type: 'error'});
                  })
                }else{
                  this.$message({
                    message: 'Sản phẩm '+barcodeSearched+ ' có lỗi trong kho '+ this.model.receiptModel.SourceUrl.Name+ '. Xin hãy kiểm tra lại',
                    center: true,
                    type: 'error'
                  });
                }
              });
            }
          }
          this.model.barcode_search_keyword = '';
        },
        format_curency(a) {
          if(a ==undefined)
            return 0;
          // if((''+ a).substring((''+ a).length-3, (''+ a).length)=== '.00')
          //   a = (''+ a).substring(0, (''+ a).length-3);
          if(isNaN(parseInt(a)))
            return '0';
          else {
            a = (''+ a).replaceAll('.','');
            a = parseInt(a);
            return (a + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          }
        },
        typeChange(item){
          this.model.cart=[];
          this.model.cachedBarcodes =[];
          $.each(this.model.params.statusTypes, (k,v)=>{
            if(v.Id==item){
              this.model.receiptModel.StatusType = v;
              //Nếu là xuất
              if(item=='515a2438-5274-4d1f-9fa6-7dbee94c524b'){
                  this.model.receiptModel.SourceUrl ={};
                  this.model.receiptModel.sourceUrlId ='';
                  this.model.receiptModel.Source = this.model.currentStore;
                  this.model.receiptModel.sourceId = this.model.currentStore.Id;
              }else if(item=='576b56bb-5d50-4b67-b4c7-137bc1c7385f'){ // nếu là nhập
                  this.model.receiptModel.Source ={};
                this.model.receiptModel.sourceId ='';
                  this.model.receiptModel.SourceUrl = this.model.currentStore;
                  this.model.receiptModel.sourceUrlId = this.model.currentStore.Id;
              }
              return false;
            }
          });
        },
        sourceIdChange(item){
          $.each(this.model.params.warehouses, (k, val)=>{
            if(val.Id==item){
              this.model.receiptModel.Source = val;
              return false;
            }
          })
        },
        sourceUrlIdChange(item){
          $.each(this.model.params.warehouses, (k, val)=>{
            if(val.Id==item){
              this.model.receiptModel.SourceUrl = val;
              return false;
            }
          })
          // this.model.receiptModel.SourceUrl = this.model.warehousesObj[item];
        },
        save(){
          if(this.model.cart.length == 0){
            this.$message('Danh sách sản phẩm trống');
            return;
          }
          this.$refs['receiptForm'].validate((valid) => {
            if(valid){

              var searchWH = {
                RequestClass: "xBase",
                RequestAction: "Request",
                TotalRequests: this.model.cart.length,
              }
              $.each(this.model.cart, (k,val)=> {
                searchWH['R'+(k+1)+'_RequestDataGroup'] = "DataGroup.warehouse.0fd40";
                searchWH['R'+(k+1)+'_RequestFields'] = "Id;Code;Name;MetaDescription;MetaDescriptionName;Priority;ProductCode;OfficialNumber;ProductColor;Size;Style;ProductColorName;SizeName;MetaKeywords;CodeName;TotalPages;Category;CategoryName;Unit;FullCodeName;ProductShopCode;ProductCode;Status;Categories;CategoriesName;";
                searchWH['R'+(k+1)+'_Code'] = "Warehouse";
                searchWH['R'+(k+1)+'_MetaKeywords'] = val.MetaKeywords;
                searchWH['R'+(k+1)+'_RequestTemplate'] = "xDocument_Document.Search";
                if(this.model.receiptModel.StatusType.Id=='515a2438-5274-4d1f-9fa6-7dbee94c524b')//xuất
                  searchWH['R'+ (k+1) +'_Status']= this.model.receiptModel.Source.Id;
                else//nhập
                  searchWH['R'+ (k+1) +'_Status']= this.model.receiptModel.SourceUrl.Id;
              });

              this.$Utils.post(searchWH).then(resSearchWH=>{
                if(resSearchWH.success){
                  $.each(this.model.cart, (k,val)=> {
                    // val.Id =  resSearchWH['R'+(k+1)].Data;
                    var resultLst =  this.$Utils.getDataWithRoot(resSearchWH['R'+(k+1)],"Data.DocumentDS.Document");
                    if(resultLst.length !=1){
                      this.$message.error('Có lỗi. Liên hệ kĩ thuật để xử lý')
                      return;
                    }else{
                      val.Id = resultLst[0].Id;
                    }
                  });
                  var requestReceipt = {
                    RequestClass: 'xBase',
                    RequestAction: 'Request',
                    TotalRequests: 1,
                    R1_RequestDataGroup: 'DataGroup.phieu-kho.1302n',
                    R1_RequestTemplate: 'xDocument_Document.Insert',
                    R1_CreatedByName: JSON.parse(localStorage.getItem("LoggedOnUser")).Username,
                    R1_ModifiedByName: JSON.parse(localStorage.getItem("LoggedOnUser")).Username,
                    R1_Version: 1,
                    R1_Code: 'ImpExpReceipt',
                    R1_RequestFields: 'Code;ExpiredDate;StoreCode;ReferenceNumber;SourceUrl;Source;RelatedDocuments;StatusType;MetaKeywords;ProductCode;OfficialNumber;ProductColor;Size;' +
                    'TotalComments;Id;Created;Code;CreatedBy;CreatedByName;ModifiedBy;ModifiedByName;StatusTypeName;SourceName;SourceUrlName;CategoriesName;ProductColorName;SizeName;' +
                    'ChangedStatusName;AuthorName;;CustomerGenderName;OrderStatusName;LogisticOrgName;DisplayImageName;UpdateWarehouse;Changed;FormSetting;DocumentForm',
                    R1_FormSetting: this.model.formSetting.import,
                  }
                  var requestUpdateWH = {
                    RequestClass: 'xBase',
                    RequestAction: 'Request',
                    TotalRequests: this.model.cart.length,
                  }
                  var requestReceiptProduct = {
                    RequestClass: 'xBase',
                    RequestAction: 'Request',
                    TotalRequests: this.model.cart.length,
                  }
                  var receiptChanges = [];

                  $.each(this.model.receiptModel, (k,v)=> {
                    if(k == 'Name' || k.indexOf('Name') != k.length-4){
                      if(this.model.fields['impExpProduct'][k]){
                        var change = {
                          "ColumnCaption": this.model.fields['impExpProduct'][k].Caption,
                          "ColumnName": k,
                          "OldDisplayValue": '',
                          "OldValue": '',
                          "NewDisplayValue": requestReceipt['R1_'+k+'Name']?requestReceipt['R1_'+k+'Name']: requestReceipt['R1_'+k],
                          "NewValue": requestReceipt['R1_'+k],
                        }
                      }
                      receiptChanges.push(change);
                    }
                  });
                  $.each(this.model.cart, (k,val)=> {
                    requestReceiptProduct['R'+ (k+1) +'_Changed'] = JSON.stringify(receiptChanges);
                    requestReceiptProduct['R'+ (k+1) +'_SourceUrl']= this.model.receiptModel.SourceUrl.Id;
                    requestReceiptProduct['R'+ (k+1) +'_SourceUrlName']= this.model.receiptModel.SourceUrl.Name;
                    requestReceiptProduct['R'+ (k+1) +'_Source']= this.model.receiptModel.Source.Id;
                    requestReceiptProduct['R'+ (k+1) +'_SourceName']= this.model.receiptModel.Source.Name;
                    requestReceiptProduct['R'+ (k+1) +'_StatusType'] = this.model.receiptModel.StatusType.Id;
                    requestReceiptProduct['R'+ (k+1) +'_StatusTypeName'] = this.model.receiptModel.StatusType.Name;
                    requestReceiptProduct['R'+ (k+1) +'_StoreCode']= this.model.receiptModel.StoreCode;
                    requestReceiptProduct['R'+ (k+1) +'_ReferenceNumber'] =  this.model.receiptModel.ReferenceNumber;
                    requestReceiptProduct['R'+ (k+1) +'_RelatedDocuments'] =  this.model.receiptModel.RelatedDocuments;
                    requestReceiptProduct['R'+ (k+1) +'_ExpiredDate'] =  this.$Utils.formatDateTime(this.model.receiptModel.ExpiredDate);
                    requestReceiptProduct['R'+ (k+1) +'_RequestDataGroup']= 'DataGroup.nhap-xuat-kho.0614g';
                    requestReceiptProduct['R'+ (k+1) +'_RequestTemplate']= 'xDocument_Document.Insert';
                    requestReceiptProduct['R'+ (k+1) +'_CreatedByName']= JSON.parse(localStorage.getItem("LoggedOnUser")).Username;
                    requestReceiptProduct['R'+ (k+1) +'_ModifiedByName']= JSON.parse(localStorage.getItem("LoggedOnUser")).Username;
                    requestReceiptProduct['R'+ (k+1) +'_Version']=   1;
                    requestReceiptProduct['R'+ (k+1) +'_Code']= 'ImportExportWarehouse';
                    requestReceiptProduct['R'+ (k+1) +'_RequestFields']=   'Code;ExpiredDate;StoreCode;ReferenceNumber;SourceUrl;Source;RelatedDocuments;StatusType;MetaKeywords;ProductCode;OfficialNumber;ProductColor;Size;' +
                      'TotalComments;Id;Created;Code;CreatedBy;CreatedByName;ModifiedBy;ModifiedByName;StatusTypeName;SourceName;SourceUrlName;CategoriesName;ProductColorName;SizeName;' +
                      'ChangedStatusName;AuthorName;;CustomerGenderName;OrderStatusName;LogisticOrgName;DisplayImageName;UpdateWarehouse;Changed;FormSetting;DocumentForm;Parent';
                    requestReceiptProduct['R'+ (k+1) +'_FormSetting']= this.model.formSetting.impExpProduct;
                    if(this.model.receiptModel.StatusType.Id=='515a2438-5274-4d1f-9fa6-7dbee94c524b')//xuất
                      requestReceiptProduct['R'+ (k+1) +'_TotalDownloads']= val.Quantity;
                    else//nhập
                      requestReceiptProduct['R'+ (k+1) +'_TotalComments']= val.Quantity;

                    $.each(val, (key,value)=>{
                      if(key !='Code' && key!='AutoId' && key!='Id' ){
                        requestReceiptProduct['R'+ (k+1) +'_'+key] = value;
                      }
                    })
                    //
                    requestUpdateWH['R'+ (k+1) +'_UpdateWarehouse'] =  true;
                    requestUpdateWH['R'+ (k+1) +'_RequestDataGroup'] =  'DataGroup.warehouse.0fd40';
                    requestUpdateWH['R'+ (k+1) +'_RequestFields'] = "Id;Name;MetaDescription;MetaDescriptionName;Priority;ProductCode;OfficialNumber;ProductColor;Size;Style;ProductColorName;" +
                      "SizeName;MetaKeywords;CodeName;TotalPages;Category;CategoryName;Unit;FullCodeName;ProductShopCode;ProductCode;Status;Categories;CategoriesName;TotalAttachments;FormSetting;" +
                      "Changed;UpdateWarehouse";
                      requestUpdateWH['R'+ (k+1) +'_RequestTemplate'] = 'xDocument_Document.Update';
                    requestUpdateWH['R'+ (k+1) +'_Version'] = 1;
                    requestUpdateWH['R'+ (k+1) +'_Id']  = val.Id;
                    requestUpdateWH['R'+ (k+1) +'_Code'] =  'Warehouse';
                    if(this.model.receiptModel.StatusType.Id=='515a2438-5274-4d1f-9fa6-7dbee94c524b'){//xuất
                      requestUpdateWH['R'+ (k+1) +'_TotalAttachments']= -val.Quantity;
                      requestUpdateWH['R'+ (k+1) +'_Priority']= -val.Quantity;
                    }
                    else{//nhập
                      requestUpdateWH['R'+ (k+1) +'_TotalAttachments']= val.Quantity;
                      requestUpdateWH['R'+ (k+1) +'_Priority']= val.Quantity;
                    }
                    requestUpdateWH['R'+ (k+1) +'_Changed'] = JSON.stringify([
                      {
                        "ColumnCaption": "Số lượng( Tồn sẵn có)",
                        "ColumnName": "Priority",
                        "OldDisplayValue": "",
                        "OldValue": "",
                        "NewDisplayValue": val.Quantity + "",
                        "NewValue": val.Quantity + ""
                      },
                      {
                        "ColumnCaption": "Số lượng (Tồn thực thế)",
                        "ColumnName": "TotalAttachments",
                        "OldDisplayValue": "",
                        "OldValue": "",
                        "NewDisplayValue": val.Quantity + "",
                        "NewValue": val.Quantity + ""
                      }
                    ]);
                    requestUpdateWH['R'+ (k+1) +'_ModifiedByName'] = JSON.parse(localStorage.getItem("LoggedOnUser")).Username;
                    requestUpdateWH['R'+ (k+1) +'_FormSetting'] = this.model.formSetting.warehouse;
                  })


                  requestReceipt.R1_Changed = JSON.stringify(receiptChanges);
                  requestReceipt.R1_SourceUrl= this.model.receiptModel.SourceUrl.Id;
                  requestReceipt.R1_SourceUrlName= this.model.receiptModel.SourceUrl.Name;
                  requestReceipt.R1_Source= this.model.receiptModel.Source.Id;
                  requestReceipt.R1_SourceName= this.model.receiptModel.Source.Name;
                  requestReceipt.R1_StatusType = this.model.receiptModel.StatusType.Id;
                  requestReceipt.R1_StatusTypeName = this.model.receiptModel.StatusType.Name;
                  requestReceipt.R1_StoreCode= this.model.receiptModel.StoreCode;
                  requestReceipt.R1_ReferenceNumber =  this.model.receiptModel.ReferenceNumber;
                  requestReceipt.R1_RelatedDocuments =  this.model.receiptModel.RelatedDocuments;
                  requestReceipt.R1_ExpiredDate =  this.$Utils.formatDateTime(this.model.receiptModel.ExpiredDate);
                  requestReceipt.R1_FormSetting = this.model.formSetting.impExpProduct;

                  this.$Utils.postCheckResult(requestReceipt).then(respond=> {
                    if(respond.success){
                      $.each(this.model.cart, (k,val)=> {
                        requestReceiptProduct['R'+(k+1)+'_Parent'] = respond.R1.Data;
                      });
                      this.$Utils.postCheckResult(requestReceiptProduct).then(respond=> {
                        this.model.done = true;
                        this.$setItemLocalStorage(this.item.name, JSON.stringify(this.model));
                        this.$message.success('Đã lưu phiếu thành công');
                      });
                    }
                  });
                  this.$Utils.postCheckResult(requestUpdateWH).then(respond=> {
                    this.$hub.$emit('saveReceipts');
                  });
                }
              });
            }
            else {

            }
          });
        },
        print(){},
        handleDeleteProduct(index, item){
          this.$confirm('Bạn muốn xóa? ', 'Warning', {
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            type: 'warning'
          }).then(() => {
            this.model.cart.splice(index, 1);
            this.$setItemLocalStorage(this.item.name, JSON.stringify(this.model));
            this.model.cachedBarcodes.splice(this.model.cachedBarcodes.indexOf(item.Barcode), 1);
            this.$message({
              type: 'success',
              message: 'Đã xóa'
            });
          }).catch(() => {
          });
        }
      },
      created: function (){
        this.loadResources();
        this.getFormSetting('warehouse', 'Form.chinh-sua-du-lieu-ton-kho.0c240');
        this.getFormSetting('import', 'Form.nhap-kho-luan-chuyen.0da0a');
        this.getFormSetting('impExpProduct', 'Form.phieu-kho.09b7a');
      }
    }
</script>
<template>
  <div class="Store__ROOT">
    <div class="col-lg-8">
      <div class="step__wrapper">
        <el-card label="Giỏ hàng">
          <div class="Cart__ROOT">
            <div class="cart__header">
              <div class="col-lg-6 pd0">
                <strong>Danh sách sản phẩm</strong>
              </div>
              <div class="col-lg-6 pd0">
                <el-input v-if="!model.done" placeholder="Nhập Barcode và Enter" autofocus suffix-icon="el-icon-search" v-model="model.barcode_search_keyword" @keyup.enter.native="handleBarcodeSearchConfirm"></el-input>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="cart__content">
              <el-table :data="model.cart" style="width: 100%" empty-text="Chưa có sản phẩm" border>
                <el-table-column type="index" width="40" align="center" header-align="center"></el-table-column>
                <el-table-column prop="MetaKeywords" width="75" label="Barcode"></el-table-column>
                <el-table-column prop="ProductCode" width="200" label="Mã sản phẩm in trên tem mác">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.Name" placement="top">
                      <span>{{scope.row.ProductCode}}</span>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <!--<el-table-column prop="Name" label="Tên sản phẩm" width="200" ></el-table-column>-->
                <el-table-column label="Số lượng" width="150" prop="Quantity">
                  <template slot-scope="scope">
                    <el-input-number :disabled="model.done" v-model="scope.row.Quantity" :min="1" :max="parseInt(scope.row.Priority)"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductColorName" label="Màu sắc"></el-table-column>
                <el-table-column prop="SizeName" label="Size"></el-table-column>
                <el-table-column prop="TotalPages" label="Đơn giá">
                  <template slot-scope="scope">
                    <div class="ovf-elipsis">
                      {{format_curency(parseInt(scope.row.TotalPages))+' đ'}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="Hành động">
                  <template slot-scope="scope">
                    <el-button type="danger"  :disabled="model.done" @click.native.prevent="handleDeleteProduct(scope.$index, scope.row)">
                      <i class="fa fa-trash"></i>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="modal__wrapper">

            </div>
          </div>
        </el-card>
      </div>
      <div class="step-content__wrapper" style="padding-top: 20px;"></div>
    </div>
    <div class="col-lg-4 pd0">
      <el-card>
        <div class="payment__wrapper">
          <div class="block__label">
            Thông tin phiếu
          </div>
          <div class="block__wrapper">
            <el-form :model="model.receiptModel" label-width="100px" label-position="left" ref="receiptForm" :disabled="model.done" :rules="model.receiptRules">
              <el-form-item label="Ngày lập">
                <el-date-picker format='dd/MM/yyyy' v-model="model.receiptModel.ExpiredDate"></el-date-picker>
              </el-form-item>
              <el-form-item label="Loại" prop="StatusType">
                <el-radio-group v-model="model.receiptModel.typeId" @change="typeChange">
                  <el-radio v-for="item in model.params.statusTypes" :key="item.Id" :label="item.Id" border>{{item.Caption}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Nguồn" prop="sourceId">
                <el-select v-model="model.receiptModel.sourceId" placeholder="Chọn kho hàng" filterable @change="sourceIdChange">
                  <el-option v-for="item in model.params.warehouses" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Đích:" prop="sourceUrlId">
                <el-select v-model="model.receiptModel.sourceUrlId" placeholder="Chọn kho hàng" filterable @change="sourceUrlIdChange">
                  <el-option v-for="item in model.params.warehouses" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Mã phiếu">
                <el-input v-model="model.receiptModel.StoreCode"></el-input>
              </el-form-item>
              <el-form-item label="Mã phiếu liên quan">
                <el-input v-model="model.receiptModel.ReferenceNumber"></el-input>
              </el-form-item>
              <el-form-item label="Ghi chú" >
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3}" v-model="model.receiptModel.RelatedDocuments"></el-input>
              </el-form-item>
              <el-form-item label="" label-width="0px">
                <br/>
                <el-button type="danger" class="btn btn-block" :disabled="model.done" @click="save">Hoàn tất</el-button>
                <el-button  type="info" hidden class="btn btn-block fa fa-print"   @click="print">In</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
    </div>
    <div class="clearfix"></div>
  </div>
</template>
<style lang="scss">

  .el-select {
    display: block;
  }
  .el-tabs__new-tab {
    margin-right: 20px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }
  .Store__ROOT {
    background: #fff;
    min-height: "~calc(100vh - 100px)";
    .col-lg-8, .col-lg-4, .col-lg-6, .col-lg-9, .col-lg-3 {
      float: left;
    }
    .block__label {
      padding: 10px;
      border: solid 1px #eee;
      border-left: 0;
      border-right: 0;
      font-weight: 600;
      background: #f5f7ff;
    }
    .block__wrapper {
      padding: 10px;
    }
    .step__wrapper {
      padding-top: 10px;
    }
    .el-form-item__label{
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .el-step__title {
      font-size: 13px;
    }
    .el-step__icon {
      font-size: 12px;
      width: 18px;
      height: 18px;
    }
  }
  .Payment__ROOT {
    border-left: solid 1px #999;
    padding-bottom: 20px;
  }
  .Contact__ROOT,.Order__ROOT {
    .contact__header {
      padding: 3px 3px 3px 10px;
      line-height: 27px;
      background: #f5f7fe;
      .el-input__inner {
        border: none;
        background: "#00000008";
      }
    }
  }
  .Cart__ROOT {
    .cart__header {
      padding: 3px 3px 3px 10px;
      line-height: 27px;
      background: #f5f7fe;
      .el-input__inner {
        border: none;
        background: "#00000008";
      }
    }
  }
</style>
