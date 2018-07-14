<script>
  export default {
      name: "AuditReceipt",
      props: [],
      components: {},
      data: function  (){
        var model = {
          AUDIT_WH_PREFIX : 'AUDIT_WH_',
          equalizeTypeLst : ['none', 'replace', 'plus'],
          equalizeType: 'none',
          currentTable: 'all',
          receiptModel: {
            Id: '',
            Status: '',
            Category: '',
            StatusName: '',
            AuthorDate: new Date(),
            TotalReadingTimes: 0,
            TotalDownloads: 0,
            TotalPages: 0,
          },
          params: {
            warehouses : [],
          },
          cart: [],
          cartObj: {},
          cartObjCached: {},
          cartObjOri: {},
          cachedBarcodes: [],
          barcode_search_keyword: '',
          formSetting: {
            whAudit : '',
            whAuditDetails : '',
            warehouse : ''
          },
          done: false,
          currentUser: JSON.parse(this.$Utils.getUserInfo()),
          cartMisMatched: [],
          cartMatched: [],
          cartAll: [],
          cartToDo: [],
          showEditProductModal : false,
          editingRow : {},
          indexWhReq:0,
          colors : {
            none: {
              key: 'none',
              color : 'green',
              text : 'Không xử lý',
            },
            plus: {
              key: 'plus',
              color : 'yellow',
              text : 'Cộng thêm',
            },
            replace: {
              key: 'replace',
              color : 'red',
              text : 'Ghi đè',
            }
          }
        }
        // if(this.$getItemLocalStorage(model.AUDIT_WH_PREFIX + this.item.name)){
        //   model = JSON.parse(this.$getItemLocalStorage(model.AUDIT_WH_PREFIX + this.item.name));
        // }
        return {
          model: model,
        }
      },
      methods: {
        rowUpdated () {
          var row = this.$Lodash.cloneDeep(this.model.editingRow);
          delete row.index;
          this.model.cartObj[row.MetaKeywords] = row;
          this.updateCart();
          this.handleCloseEditProductModal();
        },
        updateCart (newVal) {
          this.model.cartAll = Object.values(this.model.cartObj);
          this.model.cartMatched = [];
          this.model.cartMisMatched = [];
          this.model.cartToDo = [];
          this.model.receiptModel.TotalReadingTimes = 0;
          this.model.receiptModel.TotalDownloads = 0;
          this.model.receiptModel.TotalPages = 0;

          this.model.cartAll.filter(item => {
            this.model.receiptModel.TotalReadingTimes += item.TotalReadingTimes;
            this.model.receiptModel.TotalDownloads += item.TotalDownloads;
            this.model.receiptModel.TotalPages += item.TotalDownloads * item.TotalPages;

            if(item.TotalDownloads === 0){
              this.model.cartMatched.push(item)
            } else if (item.TotalDownloads !== 0) {
              this.model.cartMisMatched.push(item)
            }
            if(item.OfficialNumber !== 'none' || item.ParentType !== 'none'){
              this.model.cartToDo.push(item);
            }
          });

          if(newVal==='all') {
            this.model.cart = this.model.cartAll;
          } else if(newVal==='misMatched') {
            this.model.cart = this.model.cartMisMatched;
          } else if(newVal==='matched') {
            this.model.cart = this.model.cartMatched;
          } else if(newVal==='toDo') {
            this.model.cart = this.model.cartToDo;
          }
        },
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
          });
          //
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
            // this.model.fields[type] = this.$Utils.rotateDementionArr(sourceSetting[0].Description.Fields, 'Name');
          });
        },
        handleBarcodeSearchConfirm () {
          if(this.model.barcode_search_keyword == '') {
            // this.$message({message: 'Chưa điền barcode', center: true, type: 'error'});model.Warehouse
          }
          else if(this.model.receiptModel.Category == ''){
            this.$message({message: 'Phải chọn kho hàng trước',center: true,type: 'error'});
          }else {
            var barcodeSearched = this.$Lodash.cloneDeep(this.model.barcode_search_keyword);
            if(this.model.cachedBarcodes.indexOf(barcodeSearched) >-1){
              this.model.cartObj[barcodeSearched].TotalReadingTimes +=1;
              this.model.cartObj[barcodeSearched].TotalDownloads += 1;
              this.model.cartObj[barcodeSearched].TotalComments += 1;
              this.updateCart(this.model.currentTable)

              //for reset purpose
              this.model.cartObjOri[barcodeSearched].TotalReadingTimes +=1;
              this.model.cartObjOri[barcodeSearched].TotalDownloads += 1;
              this.model.cartObjOri[barcodeSearched].TotalComments += 1;
              // this.$setItemLocalStorage(this.model.AUDIT_WH_PREFIX + this.item.name, JSON.stringify(this.model));
              // this.$hub.$emit('saveAuditReceipts');
            } else {
              var request = {
                RequestClass: "xBase",
                RequestAction: "Request",
                TotalRequests: 1,
                R1_RequestDataGroup: "DataGroup.warehouse.0fd40",
                R1_RequestFields: "Id;Code;TotalAttachments;ProductCode;Priority;MetaKeywords;TotalPages",
                R1_Code: "Warehouse",
                R1_MetaKeywords: barcodeSearched,
                R1_Status: this.model.receiptModel.Category,
                R1_RequestTemplate: "xDocument_Document.Search",
              };
              this.$Utils.post(request).then(response => {
                var response = this.$Utils.getDataWithRoot(response.R1,"Data.DocumentDS.Document");
                if(response.length >1){
                  this.$message({
                    message: 'Có nhiều hơn 1 sản phẩm có barcode '+barcodeSearched+ ' trong kho '+ this.model.receiptModel.CategoryName+ '. Xin hãy kiểm tra lại',
                    center: true,
                    type: 'error'
                  });
                }else{
                  this.model.cartObj[barcodeSearched] = response[0];
                  this.model.cartObj[barcodeSearched].TotalReadingTimes = 1;
                  this.model.cartObj[barcodeSearched].TotalDownloads = 1 - this.model.cartObj[barcodeSearched].TotalAttachments;
                  this.model.cartObj[barcodeSearched].TotalComments = 1 - this.model.cartObj[barcodeSearched].TotalAttachments;
                  this.model.cartObj[barcodeSearched].OfficialNumber = this.model.equalizeTypeLst[0];
                  this.model.cartObj[barcodeSearched].ParentType = this.model.equalizeTypeLst[0];
                  this.model.cachedBarcodes.push(barcodeSearched)
                  this.updateCart(this.model.currentTable)
                  //for reset purpose
                  this.model.cartObjOri[barcodeSearched] = this.$Lodash.cloneDeep(response[0]);
                  this.model.cartObjOri[barcodeSearched].TotalReadingTimes = 1;
                  this.model.cartObjOri[barcodeSearched].TotalDownloads = 1 - this.model.cartObjOri[barcodeSearched].TotalAttachments;
                  this.model.cartObjOri[barcodeSearched].TotalComments = 1 - this.model.cartObjOri[barcodeSearched].TotalAttachments;
                  this.model.cartObjOri[barcodeSearched].OfficialNumber = this.model.equalizeTypeLst[0];
                  this.model.cartObjOri[barcodeSearched].ParentType = this.model.equalizeTypeLst[0];

                  // this.$setItemLocalStorage(this.model.AUDIT_WH_PREFIX + this.item.name, JSON.stringify(this.model));
                  // this.$hub.$emit('saveAuditReceipts');
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
        updateWHReq (requestUpdateWH, val) {
          if(val.OfficialNumber === 'replace' && val.ParentType === 'replace'){
            requestUpdateWH['R'+ this.model.indexWhReq +'_RequestDataGroup'] =  'DataGroup.warehouse.0fd40';
            requestUpdateWH['R'+ this.model.indexWhReq +'_RequestFields'] = "Id;Name;MetaDescription;MetaDescriptionName;Priority;ProductCode;OfficialNumber;ProductColor;Size;Style;ProductColorName;" +
              "SizeName;MetaKeywords;CodeName;TotalPages;Status;CategoryName;Unit;FullCodeName;ProductShopCode;ProductCode;Status;Categories;CategoriesName;TotalAttachments;FormSetting;" +
              "Changed;UpdateWarehouse";
            requestUpdateWH['R'+ this.model.indexWhReq +'_RequestTemplate'] = 'xDocument_Document.Update';
            requestUpdateWH['R'+ this.model.indexWhReq +'_Id']  = val.Id;
            requestUpdateWH['R'+ this.model.indexWhReq +'_Code'] =  'Warehouse';
            requestUpdateWH['R'+ this.model.indexWhReq +'_TotalAttachments']= val.TotalReadingTimes;
            requestUpdateWH['R'+ this.model.indexWhReq +'_Priority']= val.TotalReadingTimes;
            requestUpdateWH['R'+ this.model.indexWhReq +'_ModifiedByName'] = this.model.currentUser.Username;
            requestUpdateWH['R'+ this.model.indexWhReq +'_FormSetting'] = this.model.formSetting.warehouse;
            requestUpdateWH['R'+ this.model.indexWhReq +'_Changed'] = JSON.stringify([
              {
                "ColumnCaption": "Số lượng( Tồn sẵn có)",
                "ColumnName": "Priority",
                "OldDisplayValue": "",
                "OldValue": "",
                "NewDisplayValue": val.TotalReadingTimes + "",
                "NewValue": val.TotalReadingTimes + ""
              },
              {
                "ColumnCaption": "Số lượng (Tồn thực thế)",
                "ColumnName": "TotalAttachments",
                "OldDisplayValue": "",
                "OldValue": "",
                "NewDisplayValue": val.TotalReadingTimes + "",
                "NewValue": val.TotalReadingTimes + ""
              }
            ]);
            this.model.indexWhReq ++;
          } else if(val.OfficialNumber === 'plus' && val.ParentType === 'plus'){
            requestUpdateWH['R'+ this.model.indexWhReq +'_UpdateWarehouse'] = true;
            requestUpdateWH['R'+ this.model.indexWhReq +'_RequestDataGroup'] =  'DataGroup.warehouse.0fd40';
            requestUpdateWH['R'+ this.model.indexWhReq +'_RequestFields'] = "Id;Name;MetaDescription;MetaDescriptionName;Priority;ProductCode;OfficialNumber;ProductColor;Size;Style;ProductColorName;" +
              "SizeName;MetaKeywords;CodeName;TotalPages;Status;CategoryName;Unit;FullCodeName;ProductShopCode;ProductCode;Status;Categories;CategoriesName;TotalAttachments;FormSetting;" +
              "Changed;UpdateWarehouse";
            requestUpdateWH['R'+ this.model.indexWhReq +'_RequestTemplate'] = 'xDocument_Document.Update';
            requestUpdateWH['R'+ this.model.indexWhReq +'_Id']  = val.Id;
            requestUpdateWH['R'+ this.model.indexWhReq +'_Code'] = 'Warehouse';
            requestUpdateWH['R'+ this.model.indexWhReq +'_TotalAttachments'] = val.TotalDownloads;
            requestUpdateWH['R'+ this.model.indexWhReq +'_Priority'] = val.TotalComments;
            requestUpdateWH['R'+ this.model.indexWhReq +'_ModifiedByName'] = this.model.currentUser.Username;
            requestUpdateWH['R'+ this.model.indexWhReq +'_FormSetting'] = this.model.formSetting.warehouse;
            requestUpdateWH['R'+ this.model.indexWhReq +'_Changed'] = JSON.stringify([
              {
                "ColumnCaption": "Số lượng( Tồn sẵn có)",
                "ColumnName": "Priority",
                "OldDisplayValue": "",
                "OldValue": "",
                "NewDisplayValue": val.TotalComments + "",
                "NewValue": val.TotalComments + ""
              },
              {
                "ColumnCaption": "Số lượng (Tồn thực thế)",
                "ColumnName": "TotalAttachments",
                "OldDisplayValue": "",
                "OldValue": "",
                "NewDisplayValue": val.TotalDownloads + "",
                "NewValue": val.TotalDownloads + ""
              }
            ]);
            this.model.indexWhReq ++;
          }

          else
          {
            if(val.OfficialNumber === 'replace') {
              requestUpdateWH['R' + this.model.indexWhReq + '_RequestDataGroup'] = 'DataGroup.warehouse.0fd40';
              requestUpdateWH['R' + this.model.indexWhReq + '_RequestFields'] = "Id;Name;MetaDescription;MetaDescriptionName;Priority;ProductCode;OfficialNumber;ProductColor;Size;Style;ProductColorName;" +
                "SizeName;MetaKeywords;CodeName;TotalPages;Status;CategoryName;Unit;FullCodeName;ProductShopCode;ProductCode;Status;Categories;CategoriesName;TotalAttachments;FormSetting;" +
                "Changed;UpdateWarehouse";
              requestUpdateWH['R' + this.model.indexWhReq + '_RequestTemplate'] = 'xDocument_Document.Update';
              requestUpdateWH['R' + this.model.indexWhReq + '_Id'] = val.Id;
              requestUpdateWH['R' + this.model.indexWhReq + '_Code'] = 'Warehouse';
              requestUpdateWH['R' + this.model.indexWhReq + '_TotalAttachments'] = val.TotalReadingTimes;
              requestUpdateWH['R' + this.model.indexWhReq + '_ModifiedByName'] = this.model.currentUser.Username;
              requestUpdateWH['R' + this.model.indexWhReq + '_FormSetting'] = this.model.formSetting.warehouse;
              requestUpdateWH['R' + this.model.indexWhReq + '_Changed'] = JSON.stringify([
                {
                  "ColumnCaption": "Số lượng (Tồn thực thế)",
                  "ColumnName": "TotalAttachments",
                  "OldDisplayValue": "",
                  "OldValue": "",
                  "NewDisplayValue": val.TotalReadingTimes + "",
                  "NewValue": val.TotalReadingTimes + ""
                }
              ]);
              this.model.indexWhReq++;
            } else if(val.OfficialNumber === 'plus'){
              requestUpdateWH['R'+ this.model.indexWhReq +'_UpdateWarehouse'] = true;
              requestUpdateWH['R'+ this.model.indexWhReq +'_RequestDataGroup'] =  'DataGroup.warehouse.0fd40';
              requestUpdateWH['R'+ this.model.indexWhReq +'_RequestFields'] = "Id;Name;MetaDescription;MetaDescriptionName;Priority;ProductCode;OfficialNumber;ProductColor;Size;Style;ProductColorName;" +
                "SizeName;MetaKeywords;CodeName;TotalPages;Status;CategoryName;Unit;FullCodeName;ProductShopCode;ProductCode;Status;Categories;CategoriesName;TotalAttachments;FormSetting;" +
                "Changed;UpdateWarehouse";
              requestUpdateWH['R'+ this.model.indexWhReq +'_RequestTemplate'] = 'xDocument_Document.Update';
              requestUpdateWH['R'+ this.model.indexWhReq +'_Id']  = val.Id;
              requestUpdateWH['R'+ this.model.indexWhReq +'_Code'] = 'Warehouse';
              requestUpdateWH['R'+ this.model.indexWhReq +'_TotalAttachments'] = val.TotalDownloads;
              requestUpdateWH['R'+ this.model.indexWhReq +'_ModifiedByName'] = this.model.currentUser.Username;
              requestUpdateWH['R'+ this.model.indexWhReq +'_FormSetting'] = this.model.formSetting.warehouse;
              requestUpdateWH['R'+ this.model.indexWhReq +'_Changed'] = JSON.stringify([
                {
                  "ColumnCaption": "Số lượng (Tồn thực thế)",
                  "ColumnName": "TotalAttachments",
                  "OldDisplayValue": "",
                  "OldValue": "",
                  "NewDisplayValue": val.TotalDownloads + "",
                  "NewValue": val.TotalDownloads + ""
                }
              ]);
              this.model.indexWhReq ++;
            }
            if(val.ParentType === 'plus'){
              requestUpdateWH['R'+ this.model.indexWhReq +'_UpdateWarehouse'] = true;
              requestUpdateWH['R'+ this.model.indexWhReq +'_RequestDataGroup'] =  'DataGroup.warehouse.0fd40';
              requestUpdateWH['R'+ this.model.indexWhReq +'_RequestFields'] = "Id;Name;MetaDescription;MetaDescriptionName;Priority;ProductCode;OfficialNumber;ProductColor;Size;Style;ProductColorName;" +
                "SizeName;MetaKeywords;CodeName;TotalPages;Status;CategoryName;Unit;FullCodeName;ProductShopCode;ProductCode;Status;Categories;CategoriesName;TotalAttachments;FormSetting;" +
                "Changed;UpdateWarehouse";
              requestUpdateWH['R'+ this.model.indexWhReq +'_RequestTemplate'] = 'xDocument_Document.Update';
              requestUpdateWH['R'+ this.model.indexWhReq +'_Id']  = val.Id;
              requestUpdateWH['R'+ this.model.indexWhReq +'_Code'] = 'Warehouse';
              requestUpdateWH['R'+ this.model.indexWhReq +'_Priority'] = val.TotalComments;
              requestUpdateWH['R'+ this.model.indexWhReq +'_ModifiedByName'] = this.model.currentUser.Username;
              requestUpdateWH['R'+ this.model.indexWhReq +'_FormSetting'] = this.model.formSetting.warehouse;
              requestUpdateWH['R'+ this.model.indexWhReq +'_Changed'] = JSON.stringify([
                {
                  "ColumnCaption": "Số lượng( Tồn sẵn có)",
                  "ColumnName": "Priority",
                  "OldDisplayValue": "",
                  "OldValue": "",
                  "NewDisplayValue": val.TotalComments + "",
                  "NewValue": val.TotalComments + ""
                }
              ]);
              this.model.indexWhReq ++;
            } else if(val.ParentType === 'replace'){
              requestUpdateWH['R'+ this.model.indexWhReq +'_RequestDataGroup'] =  'DataGroup.warehouse.0fd40';
              requestUpdateWH['R'+ this.model.indexWhReq +'_RequestFields'] = "Id;Name;MetaDescription;MetaDescriptionName;Priority;ProductCode;OfficialNumber;ProductColor;Size;Style;ProductColorName;" +
                "SizeName;MetaKeywords;CodeName;TotalPages;Status;CategoryName;Unit;FullCodeName;ProductShopCode;ProductCode;Status;Categories;CategoriesName;TotalAttachments;FormSetting;" +
                "Changed;UpdateWarehouse";
              requestUpdateWH['R'+ this.model.indexWhReq +'_RequestTemplate'] = 'xDocument_Document.Update';
              requestUpdateWH['R'+ this.model.indexWhReq +'_Id']  = val.Id;
              requestUpdateWH['R'+ this.model.indexWhReq +'_Code'] =  'Warehouse';
              requestUpdateWH['R'+ this.model.indexWhReq +'_Priority'] = val.TotalReadingTimes;
              requestUpdateWH['R'+ this.model.indexWhReq +'_ModifiedByName'] = this.model.currentUser.Username;
              requestUpdateWH['R'+ this.model.indexWhReq +'_FormSetting'] = this.model.formSetting.warehouse;
              requestUpdateWH['R'+ this.model.indexWhReq +'_Changed'] = JSON.stringify([
                {
                  "ColumnCaption": "Số lượng( Tồn sẵn có)",
                  "ColumnName": "Priority",
                  "OldDisplayValue": "",
                  "OldValue": "",
                  "NewDisplayValue": val.TotalReadingTimes + "",
                  "NewValue": val.TotalReadingTimes + ""
                }
              ]);
              this.model.indexWhReq ++;
            }
          }
          return requestUpdateWH;
        },
        save(status, statusName){
          if(this.model.cart.length == 0){
            this.$message.error('Danh sách sản phẩm trống');
            return;
          }
          if(this.model.receiptModel.Name == undefined || this.model.receiptModel.Name == ''){
            this.$message.error('Mã phiếu trống');
            return;
          }
          // this.$refs['receiptForm'].validate((valid) => {
          //   if(valid){
              this.model.indexWhReq=1;
              // if(this.model.receiptModel.Id !==''){
              //   this.model.indexWhReq++;
              //   var requestReceipt = {
              //     RequestClass: 'xBase',
              //     RequestAction: 'Request',
              //     R1_RequestDataGroup : 'DataGroup.WhAudit.0fx75',
              //     R1_RequestTemplate  : 'xDocument_Document.Update',
              //     R1_Id : this.model.receiptModel.Id,
              //     R1_ModifiedByName : this.model.currentUser.Username,
              //     R1_Status: status,
              //     R1_StatusName: statusName,
              //     R1_RequestFields : 'Id;Status;StatusName;ModifiedByName;FromSetting',
              //     R1_FormSetting : this.model.formSetting.whAudit,
              //   }
              //   $.each(this.model.cart, (k,val)=> {
              //     requestReceipt = this.updateWHReq(requestReceipt, val);
              //   });
              //   requestReceipt.TotalRequests = this.model.indexWhReq;
              //   // this.$Utils.postCheckResult(requestReceipt).then(respond=> {
              //   //
              //   // });
              //   console.log('requestUpdateWH', requestReceipt)
              // }

              var requestReceipt = {
                RequestClass: 'xBase',
                RequestAction: 'Request',
                TotalRequests: 1
              }
              var requestReceiptProduct = {
                RequestClass: 'xBase',
                RequestAction: 'Request',
                TotalRequests: this.model.cart.length,
              }
              var requestUpdateWH = {
                RequestClass: 'xBase',
                RequestAction: 'Request',
              }
              this.model.receiptModel.Status = status;
              this.model.receiptModel.StatusName = statusName;
              requestReceipt = this.$Utils.updateParamsSingleRequest(requestReceipt,this.model.receiptModel, 1);
              requestReceipt.R1_RequestDataGroup = 'DataGroup.WhAudit.0fx75';
              requestReceipt.R1_RequestTemplate = 'xDocument_Document.Insert';
              requestReceipt.R1_CreatedByName = this.model.currentUser.Username;
              requestReceipt.R1_ModifiedByName = this.model.currentUser.Username;
              requestReceipt.R1_Code = 'WhAudit';
              requestReceipt.R1_FormSetting = this.model.formSetting.whAudit;
              requestReceipt.R1_RequestFields = 'Code;Created;CreatedBy;CreatedByName;Modified;ModifiedBy;' +
                'ModifiedByName;Status;StatusName;Changed;FormSetting;Name;Description;AuthorDate;Category;CategoryName;TotalReadingTimes;' +
                'TotalDownloads;TotalPages';
              $.each(this.model.cart, (k,val)=> {
                requestReceiptProduct = this.$Utils.updateParamsSingleRequest(requestReceiptProduct, val, (k+1));
                requestReceiptProduct['R'+ (k+1) +'_RequestDataGroup']= 'DataGroup.WhAuditDetails.0fx75';
                requestReceiptProduct['R'+ (k+1) +'_RequestTemplate']= 'xDocument_Document.Insert';
                requestReceiptProduct['R'+ (k+1) +'_CreatedByName']= this.model.currentUser.Username;
                requestReceiptProduct['R'+ (k+1) +'_ModifiedByName']= this.model.currentUser.Username;
                requestReceiptProduct['R'+ (k+1) +'_Code']= 'WhAuditDetails';
                requestReceiptProduct['R'+ (k+1) +'_FormSetting']= this.model.formSetting.whAuditDetails;
                requestReceiptProduct['R'+ (k+1) +'_RequestFields']=   'Code;Created;CreatedBy;CreatedByName;Modified;' +
                  'ModifiedBy;ModifiedByName;MetaDescription;MetaKeywords;TotalAttachments;Status;Priority;Keyword;Changed;' +
                  'FormSetting;FriendlyUrl;TotalDownloads;TotalComments;Name;OfficialNumber;TotalReadingTimes;ParentType;Parent';
                //
                delete requestReceiptProduct['R'+ (k+1) +'_Id'];
                requestUpdateWH = this.updateWHReq(requestUpdateWH, val);
              })
              requestUpdateWH.TotalRequests = this.model.indexWhReq-1;
              if(requestUpdateWH.TotalRequests === 0 && this.model.receiptModel.Status =='confirmed'){
                this.$message.error('Không có sản phẩm nào cần điều chỉnh');
                return;
              }
              this.$Utils.postCheckResult(requestReceipt).then(respond=> {
                if(respond.success){
                  $.each(this.model.cart, (k1)=> {
                    requestReceiptProduct['R'+(k1+1)+'_Parent'] = respond.R1.Data;
                  });
                  this.$Utils.postCheckResult(requestReceiptProduct).then(respondReceiptProduct=> {
                    var x1 = 0;
                    var y1 = 0;
                    delete respondReceiptProduct.msg;
                    delete respondReceiptProduct.success;
                    $.each(respondReceiptProduct, (k2,v2) => {
                      x1++;
                        if (v2.success) {
                          y1++;
                        }
                        if (x1 === requestReceiptProduct.TotalRequests) {
                          if (y1 === x1) {
                            // this.$setItemLocalStorage(this.model.AUDIT_WH_PREFIX + this.item.name, JSON.stringify(this.model));
                            this.$message.success('Đã lưu phiếu thành công');
                            this.model.receiptModel.Id = respond.R1.Data;
                            if (requestUpdateWH.TotalRequests === 0) {
                              this.$message.warning('Không có sản phẩm nào được điều chỉnh');
                              return;
                            }
                            this.$Utils.postCheckResult(requestUpdateWH).then(respondUpdateWH => {
                              var x2 = 0;
                              var y2 = 0;
                              delete respondUpdateWH.msg;
                              delete respondUpdateWH.success;
                              $.each(respondUpdateWH, (k3, v3) => {
                                  x2++;
                                  if (v3.success) {
                                    y2++;
                                  }
                                  if (x2 === requestUpdateWH.TotalRequests) {
                                    if (y2 === x2) {
                                      this.$message.success('Cập nhật kho thành công');
                                      this.model.done = true;
                                    }else{
                                      this.$message.error('Cập nhật kho lỗi');
                                    }
                                  }

                              })
                            });
                          }else {
                            this.$message.error('Lưu phiếu lỗi');
                          }
                        }
                    })
                  });
                }
              });
            // }
          // });
        },
        print(){},
        handleDeleteRow(index, item){
          if(this.model.done == true){
            return;
          }
          this.$confirm('Bạn muốn xóa? ', 'Warning', {
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            type: 'warning'
          }).then(() => {
            delete this.model.cartObjCached[item.MetaKeywords]
            delete this.model.cartObj[item.MetaKeywords]
            delete this.model.cartObjOri[item.MetaKeywords]
            this.updateCart(this.model.currentTable)
            this.model.cachedBarcodes = this.model.cachedBarcodes.filter(barcode => {
              return barcode != item.MetaKeywords;
            })
            // this.model.cart.splice(index, 1);
            // this.$setItemLocalStorage(this.model.AUDIT_WH_PREFIX + this.item.name, JSON.stringify(this.model));
            this.model.cachedBarcodes.splice(this.model.cachedBarcodes.indexOf(item.Barcode), 1);
            this.$message({
              type: 'success',
              message: 'Đã xóa'
            });
          }).catch(() => {
          });
        },
        equalizeTypeChanged (row, currentVal, name) {
          if(this.model.done == true){
            return;
          }
          var index = (this.model.equalizeTypeLst.indexOf(currentVal) +1) % this.model.equalizeTypeLst.length;
          row[name] = this.model.equalizeTypeLst[index];
          this.model.cartObj[row.MetaKeywords] = row;
          this.updateCart(this.model.currentTable)
        },
        productScanned (row) {
          if(this.model.done == true){
            return;
          }
          row.TotalDownloads  = row.TotalReadingTimes - row.TotalAttachments;
          row.TotalComments  = row.TotalReadingTimes - row.TotalAttachments;
          this.model.cartObj[row.MetaKeywords] = row;
          this.updateCart(this.model.currentTable)
        },
        handleUpdateRow (index, row) {
          if(this.model.done == true){
            return;
          }
          this.model.editingRow = row
          this.model.editingRow.index = index;
          this.model.showEditProductModal = true
        },
        handleCloseEditProductModal () {
          this.model.editingRow = {}
          this.model.showEditProductModal = false
        },
        changeWh (val) {
          if(this.model.cart.length === 0) {
            $.each(this.model.params.warehouses, (k,v)=> {
              if(v.Id===val){
                this.model.receiptModel.CategoryName = v.Name;
                return false;
              }
            })
          }else{
            this.$confirm('Thay kho sẽ xoá tất cả dánh sách dữ liệu vừa thêm? ', 'Warning', {
              confirmButtonText: 'Có',
              cancelButtonText: 'Không',
              type: 'warning'
            }).then(() => {
              this.model.cartObj = {};
              this.model.cartObjCached = {};
              this.model.cartObjOri = {};
              this.updateCart(this.model.currentTable)
              $.each(this.model.params.warehouses, (k,v)=> {
                if(v.Id===val){
                  this.model.receiptModel.CategoryName = v.Name;
                  return false;
                }
              })
            }).catch(() => {
            });
          }
        }
      },
      created: function (){
        this.loadResources();
        this.getFormSetting('whAudit', 'Form.phieu-dieu-chinh-kho.07g34');
        this.getFormSetting('whAuditDetails', 'Form.chi-tiet-phieu-dieu-chinh-kho.09936');
        this.getFormSetting('warehouse', 'Form.chinh-sua-du-lieu-ton-kho.0c240');
      },
      watch : {
        'model.currentTable' (newVal) {
          this.updateCart(newVal);
        },
        'model.equalizeType' (newVal, oldVal) {
          if(oldVal === 'none'){
            this.model.cartObjCached = this.$Lodash.cloneDeep(this.model.cartObj);
          }
          if(newVal === 'reset'){
            this.model.cartObj = this.$Lodash.cloneDeep(this.model.cartObjOri);
          } else if(newVal === 'none'){
            this.model.cartObj = this.$Lodash.cloneDeep(this.model.cartObjCached);
          } else {
            this.model.cart = [];
            $.each(this.model.cartObj, (key, val)=> {
              if(val){
                val.OfficialNumber = newVal;
                val.ParentType = newVal;
              }
            })
          }
          this.updateCart(this.model.currentTable)
        }
      }
    }
</script>
<template>
  <el-card style="height: 95vh">
    <el-col :span="18">
      <div class="row" style="padding-right: 8px">
        <div class="col-lg-5">
          <el-select :disabled="model.done" v-model="model.receiptModel.Category" placeholder="Chọn kho hàng (bắt buộc)" filterable @change="changeWh">
            <el-option v-for="item in model.params.warehouses" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
          </el-select>
        </div>
        <div class="col">
          <el-input v-if="!model.done" placeholder="Nhập Barcode và Enter" autofocus suffix-icon="el-icon-search"
                    v-model="model.barcode_search_keyword" @keyup.enter.native="handleBarcodeSearchConfirm"></el-input>
        </div>
      </div>
      <div style="padding-right: 8px">
        <el-card>
          <el-row type="flex" justify="space-between">
            <el-col>
              <el-radio-group v-model="model.currentTable" text-color="#ffffff" fill="#409EFF" :disabled="model.done">
                <el-radio-button v-if="model.cartAll" label="all">Tất cả ({{model.cartAll.length}})</el-radio-button>
                <el-radio-button v-if="model.cartMisMatched" label="misMatched">Lệch ({{model.cartMisMatched.length}})</el-radio-button>
                <el-radio-button v-if="model.cartMatched" label="matched">Khớp ({{model.cartMatched.length}})</el-radio-button>
                <el-radio-button v-if="model.cartToDo" label="toDo">DS điều chỉnh ({{model.cartToDo.length}})</el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col :push="2">
              <el-radio-group v-model="model.equalizeType" text-color="#ffffff" fill="#409EFF" :disabled="model.done">
                <el-radio-button label="none">Không chọn</el-radio-button>
                <el-radio-button label="replace">Ghi đè</el-radio-button>
                <el-radio-button label="plus">Cộng thêm</el-radio-button>
                <el-radio-button label="reset">Làm lại</el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
          <div style="float: right;">
            <span v-for="color in Object.values(model.colors)"><i class="fa fa-square ml-3" :style="'color:'+ color.color"></i>{{color.text}}&nbsp</span>
          </div>
          <el-table :data="model.cart" style="width: 100%" empty-text="Chưa có sản phẩm" border>
            <el-table-column type="index" width="40" align="center" header-align="center"></el-table-column>
            <el-table-column prop="MetaKeywords" width="75" label="Barcode"></el-table-column>
            <el-table-column prop="ProductCode" width="160" label="Mã">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.ProductCode" placement="top">
                  <span>{{scope.row.ProductCode}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="Tồn thực tế">
              <el-table-column label="Trước" width="60" prop="TotalAttachments"></el-table-column>
              <el-table-column prop="TotalDownloads" label="Sau" width="60">
                <template slot-scope="scope">
                  <div :style="'text-align: center; color:blue ;background-color:'+model.colors[scope.row.OfficialNumber].color">
                    {{scope.row.OfficialNumber==='none'?'--':scope.row.OfficialNumber==='replace'?'='+scope.row.TotalReadingTimes:
                    scope.row.TotalDownloads>0?'+'+scope.row.TotalDownloads:scope.row.TotalDownloads}}
                    <i class="icon-refresh" @click="equalizeTypeChanged(scope.row, scope.row.OfficialNumber, 'OfficialNumber')"></i>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="Tồn sẵn có">
              <el-table-column prop="Priority" width="60" label="Trước"></el-table-column>
              <el-table-column prop="TotalComments" label="Sau" width="60">
                <template slot-scope="scope">
                  <div :style="'text-align: center; color:blue; background-color:'+model.colors[scope.row.ParentType].color">
                    {{scope.row.ParentType==='none'?'--':scope.row.ParentType==='replace'?'='+scope.row.TotalReadingTimes:
                    scope.row.TotalComments>0?'+'+scope.row.TotalComments:scope.row.TotalComments}}
                    <i class="icon-refresh" @click="equalizeTypeChanged(scope.row, scope.row.ParentType, 'ParentType')"></i>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="TotalReadingTimes" label="SL kiểm kê" width="180" >
              <template slot-scope="scope">
                <div style="text-align: center">
                  <el-input-number :disabled="model.done" v-model="scope.row.TotalReadingTimes" @change="productScanned(scope.row)"></el-input-number>
                  <div>Lệch SL: {{scope.row.TotalDownloads}}</div>
                  <div>Lệch tiền: {{format_curency(scope.row.TotalDownloads * scope.row.TotalPages)}} đ</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="">
              <template slot-scope="scope">
                <div style="text-align: center">
                  <i style="color: #ff4f4c; cursor: pointer" class="el-icon-delete" :disabled="model.done" @click="handleDeleteRow(scope.$index, scope.row)"></i>&nbsp&nbsp
                  <i style="cursor: pointer" class="el-icon-edit" @click="handleUpdateRow(scope.$index, scope.row)"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6">
      <el-card>
            <el-form :model="model.receiptModel" label-position="left" ref="receiptForm" :disabled="model.done">
              <i class='fa fa-user-circle-o'></i>&nbsp<b>{{model.currentUser.Username}}</b> {{' ('+model.currentUser.LoginName+')'}}
              <el-form-item label="Ngày lập phiếu:">
                <el-date-picker  type="datetime" format='dd/MM/yyyy HH:mm' v-model="model.receiptModel.AuthorDate"></el-date-picker>
              </el-form-item>
              <el-form-item label="Mã phiếu:">
                <el-input v-model="model.receiptModel.Name"></el-input>
              </el-form-item>
              <el-form-item label="Trạng thái:">
                <a>{{model.receiptModel.StatusName===''?'Chưa lưu':model.receiptModel.StatusName}}</a>
              </el-form-item>
              <el-form-item label="Tổng SL kiểm kê:">
                <a>{{model.receiptModel.TotalReadingTimes}}</a>
              </el-form-item>
              <el-form-item label="Tổng SL lệch:">
                <a>{{model.receiptModel.TotalDownloads}}</a>
              </el-form-item>
              <el-form-item label="Tổng tiền lệch:">
                <a>{{format_curency(model.receiptModel.TotalPages)}} đ</a>
              </el-form-item>
              <el-form-item label="Ghi chú:" >
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3}" v-model="model.receiptModel.Description"></el-input>
              </el-form-item>
              <el-form-item label="" label-width="0px">
                <br/>
                <div class="row">
                  <!--<el-button type="warning" class="col btn btn-block" :disabled="model.receiptModel.Id !== '' && model.receiptModel.Status != '' " @click="save('draft', 'Phiếu tạm')">Lưu tạm</el-button>-->
                  <el-button type="danger" class="col btn btn-block" :disabled="model.receiptModel.Id !== '' && model.receiptModel.Status == 'confirmed'" @click="save('confirmed', 'Đã điều chỉnh')">Hoàn tất</el-button>
                </div>
                <!--<el-button type="info" hidden class="btn btn-block fa fa-print" @click="print">In</el-button>-->
              </el-form-item>
            </el-form>
      </el-card>
    </el-col>
    <el-dialog title="Chỉnh sửa thông tin" :visible.sync="model.showEditProductModal" :before-close="handleCloseEditProductModal">
      <el-form :disabled="model.disabled" :model="model.editingRow" label-width="150px" ref="editingRow" :label-position="$isMobileDevice ? 'top' : 'right'">
        <el-form-item label="Barcode">
          <el-input v-model="model.editingRow.MetaKeywords" disabled ></el-input>
        </el-form-item>
        <el-form-item label="Mã">
          <el-input v-model="model.editingRow.ProductCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="Đơn giá">
          <el-input v-model="model.editingRow.TotalPages" disabled></el-input>
        </el-form-item>
        <el-form-item label="Phương thức điều chỉnh tồn thực tế">
          <el-radio-group v-model="model.editingRow.OfficialNumber" text-color="#ffffff" fill="#409EFF">
            <el-radio-button label="none">Không chọn</el-radio-button>
            <el-radio-button label="replace">Ghi đè</el-radio-button>
            <el-radio-button label="plus">Cộng thêm</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="SL điều chỉnh tồn thực tế">
          <el-input v-if="model.editingRow.OfficialNumber!=='none'" v-model="model.editingRow.TotalDownloads"></el-input>
          <el-input v-else v-bind:value="0" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="Phương thức điều chỉnh tồn sẵn có">
          <el-radio-group v-model="model.editingRow.ParentType" text-color="#ffffff" fill="#409EFF">
            <el-radio-button label="none">Không chọn</el-radio-button>
            <el-radio-button label="replace">Ghi đè</el-radio-button>
            <el-radio-button label="plus">Cộng thêm</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="SL điều chỉnh tồn sẵn có">
          <el-input v-if="model.editingRow.ParentType!=='none'" v-model="model.editingRow.TotalComments"></el-input>
          <el-input v-else v-bind:value="0" disabled=""></el-input>
        </el-form-item>
        <el-form-item>
          <div class="group-button tac">
            <el-button type="primary" @click="rowUpdated">Cập nhật</el-button>
            <el-button @click="handleCloseEditProductModal">Hủy</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>
<style lang="scss">

  /*.el-select {*/
    /*display: block;*/
  /*}*/
  /*.el-tabs__new-tab {*/
    /*margin-right: 20px;*/
  /*}*/
  /*.el-date-editor.el-input, .el-date-editor.el-input__inner {*/
    /*width: 100%;*/
  /*}*/
  /*.Store__ROOT {*/
    /*background: #fff;*/
    /*min-height: "~calc(100vh - 100px)";*/
    /*.col-lg-8, .col-lg-4, .col-lg-6, .col-lg-9, .col-lg-3 {*/
      /*float: left;*/
    /*}*/
    /*.block__label {*/
      /*padding: 10px;*/
      /*border: solid 1px #eee;*/
      /*border-left: 0;*/
      /*border-right: 0;*/
      /*font-weight: 600;*/
      /*background: #f5f7ff;*/
    /*}*/
    /*.block__wrapper {*/
      /*padding: 10px;*/
    /*}*/
    /*.step__wrapper {*/
      /*padding-top: 10px;*/
    /*}*/
    /*.el-form-item__label{*/
      /*margin-bottom: 0;*/
      /*padding-bottom: 0;*/
    /*}*/

    /*.el-step__title {*/
      /*font-size: 13px;*/
    /*}*/
    /*.el-step__icon {*/
      /*font-size: 12px;*/
      /*width: 18px;*/
      /*height: 18px;*/
    /*}*/
  /*}*/
  /*.Payment__ROOT {*/
    /*border-left: solid 1px #999;*/
    /*padding-bottom: 20px;*/
  /*}*/
  /*.Contact__ROOT,.Order__ROOT {*/
    /*.contact__header {*/
      /*padding: 3px 3px 3px 10px;*/
      /*line-height: 27px;*/
      /*background: #f5f7fe;*/
      /*.el-input__inner {*/
        /*border: none;*/
        /*background: "#00000008";*/
      /*}*/
    /*}*/
  /*}*/
  /*.Cart__ROOT {*/
    /*.cart__header {*/
      /*padding: 3px 3px 3px 10px;*/
      /*line-height: 27px;*/
      /*background: #f5f7fe;*/
      /*.el-input__inner {*/
        /*border: none;*/
        /*background: "#00000008";*/
      /*}*/
    /*}*/
  /*}*/
</style>
