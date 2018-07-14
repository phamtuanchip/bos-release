/**
* Store Component
*
* Created by dbinh on 30/03/2018.
*/

<script>
  const POS_PREFIX = 'BILL';
  export default {
    name: 'POS',
    components: {
    },
    props: ['item'],
    data () {
      // var validatePayment = (rule, value, callback) => {
      //   if(parseInt(value.toString().replaceAll('.',''))<0){
      //     callback(new Error('Tiền trả lại không hợp lệ'));
      //   } else {
      //     callback()
      //   }
      // };
      /*var validateGender = (rule, value, callback) => {
        if(this.$Utils.equals(value, {}))
          callback(new Error('Bắt buộc'));
        else {
          callback()
        }
      };*/
      /*var validateCampaign = (rule, value, callback) => {
        if(this.$Utils.equals(value, {}))
          callback(new Error('Bắt buộc'));
        else {
          callback()
        }
      };*/

      var newModel =  {
        disabled: false,
        formSetting: {
          contact: '',
          lead: '',
          order: '',
          orderPart: '',
          warehouse: '',
        },
        posModel: {
          seller: {
            Id: JSON.parse(localStorage.getItem("LoggedOnUser")).UserId,
            Name: JSON.parse(localStorage.getItem("LoggedOnUser")).Username,
            LoginName: JSON.parse(localStorage.getItem("LoggedOnUser")).LoginName,
          },
          pos: '',
        },
        paymentModel: {
          sum_of_payment: '0',
          cash: '0',
          change: '0',
          customerCard: '0',
          bankMoney: '0',
          gaveMoney: '0',
        },
        contactModel: {
          Id: '',
          CustomerCode: '',
          Source: {},
          Birthday: '',
          Address: '',
          CampaignCode: {},
          Location: {},
          Gender: {},
          OfficialNumber: '',
        },
        orderModel: {
          Id: '',
          Created: this.$Utils.formatDateTime(new Date()),
          TimeFrame: {},
          BillCode: '',
          Warehouse: {},
          Name: '',
          Phone: '',
          MetaDescription: '',
          IsProcessing: false
        },
        contact_search_keyword: '',
        barcode_search_keyword: '',
        showEditProductModal: false,
        productEditing: {},
        cart: [],
        params: {
          'sources': [],
          'genders': [],
          'campaignCodes': [],
          'timeFrameNames': [],
          'provinces': [],
          'poses': [],
          'users': [],
          'customers': [],
          'warehouses': [],
        },
        contactRules: {
          CustomerCode: [
            {required: true, message: 'Bắt buộc', trigger: 'blur'},
          ],
          CampaignCode: [
            // {validator: validateCampaign, trigger: 'change'},
            { required: true, message: 'Bắt buộc', trigger: 'change'},
            // { type: 'object', required: true, message: 'Please select at least one activity type', trigger: 'change' }
          // ]
          // , Gender: [
          //   {validator: validateGender, trigger: 'blur'},
          //   {required: true, message: 'Bắt buộc'},
          ],
          OfficialNumber: [
            {required: true, message: 'Bắt buộc', trigger: 'blur'},
          ],
        },
        orderRules: {
          Name: [
            {required: true, message: 'Bắt buộc', trigger: 'blur'},
            {min: 5, max: 50, message: 'Độ dài phải từ 5 đến 50 kí tự', trigger: 'blur'}
          ],
          Phone: [
            {required: true, message: 'Bắt buộc', trigger: 'blur'},
            {min: 10, max: 11, message: 'Độ dài phải là 10 hoặc 11 kí tự', trigger: 'blur'}
          ],
          Created: [
            {required: true, message: 'Bắt buộc', trigger: 'blur'},
          ],
          TimeFrame: [
            {required: true, message: 'Bắt buộc', trigger: 'change'},
          ],
          BillCode: [
            {required: true, message: 'Bắt buộc', trigger: 'blur'},
          ],
        },
        posRules: {
          pos: [
            {required: true, message: 'Bắt buộc', trigger: 'change'},
          ],
          seller: [
            {required: true, message: 'Bắt buộc', trigger: 'change'},
          ],
        },
        paymentRules: {
          // change: [
          //   {validator: validatePayment, trigger: 'blur'}
          // ],
        },
        cachedContact: {},
        contactFields: {
          Name: {Caption: 'Tên khách hàng'},
          IdentityCode: {Caption: 'Mã khách hàng'},
          LeadSource: {Caption: 'Nguồn khách hàng'},
          Phone: {Caption: 'SĐT KH 1'},
          Birthday: {Caption: 'Năm sinh'},
          Location: {Caption: 'Tỉnh thành'},
          Gender: {Caption: 'Giới tính'},
        },
        leadFields: {
          'Store': {Caption: 'Cửa hàng'},
          'CreatedBy': {Caption: 'Người tạo'},
          'ModifiedBy': {Caption: 'Người sửa'},
          'Name': {Caption: 'Tên khách hàng'},
          'Phone': {Caption: 'SĐT KH1'},
          'TimeFrame': {Caption: 'Khung giờ'},
          'OfficialNumber': {Caption: 'Mã lượt liên hệ'},
          'Author': {Caption: 'Nhân viên bán hàng'},
          'Source': {Caption: 'Nguồn khách hàng'},
          'CampaignCode': {Caption: 'Mã chiến dịch'},
          'CustomerCode': {Caption: 'Mã khách hàng'},
        },
        orderFields: {
          'CreatedBy': {Caption: 'Người tạo'},
          'ModifiedBy': {Caption: 'Người sửa'},
          'Store': {Caption: 'Cửa hàng'},
          Name: {Caption: 'Tên khách hàng'},
          Birthday: {Caption: 'Năm sinh'},
          'Phone': {Caption: 'SĐT KH1'},
          'TimeFrame': {Caption: 'Khung giờ'},
          'BillCode': {Caption: 'Mã hoá đơn'},
          'OfficialNumber': {Caption: 'Mã lượt liên hệ'},
          'Author': {Caption: 'Nhân viên bán hàng'},
          'Source': {Caption: 'Nguồn khách hàng'},
          'CampaignCode': {Caption: 'Mã chiến dịch'},
          'CustomerCode': {Caption: 'Mã khách hàng'},
          Location: {Caption: 'Tỉnh thành'},
        },
        orderPartFields: {
          'CreatedBy': {Caption: 'Người tạo'},
          'ModifiedBy': {Caption: 'Người sửa'},
          'Store': {Caption: 'Cửa hàng'},
          'Name': {Caption: 'Tên khách hàng'},
          'Birthday': {Caption: 'Năm sinh'},
          'Phone': {Caption: 'SĐT KH1'},
          'TimeFrame': {Caption: 'Khung giờ'},
          'BillCode': {Caption: 'Mã hoá đơn'},
          'OfficialNumber': {Caption: 'Mã lượt liên hệ'},
          'Author': {Caption: 'Nhân viên bán hàng'},
          'Source': {Caption: 'Nguồn khách hàng'},
          'CampaignCode': {Caption: 'Mã chiến dịch'},
          'CustomerCode': {Caption: 'Mã khách hàng'},
          'ProductCode': {Caption: 'Mã Sản phẩm'},
          'ProductType': {Caption: 'Dòng Sản phẩm'},
          'ProductPrice': {Caption: 'Đơn giá'},
          'Price': {Caption: 'Giá trị đơn hàng'},
          'ProductColor': {Caption: 'Màu sắc'},
          'ProductSize': {Caption: 'Size'},
          'Category': {Caption: 'Xuất từ kho'},
          'Location': {Caption: 'Tỉnh thành'},
          'DiscountMoney': {Caption: 'Chiết khấu (bằng hình thức số tiền)'},
          'DiscountPercent': {Caption: 'Chiết khấu (bằng hình thức %)'},
          'ProductCount': {Caption: 'Số lượng'},
          'Total': {Caption: 'Tổng thanh toán'},
          'Status': {Caption: 'Loại đơn hàng (Bán/ Đổi)'},
          'DeliveryStatus': {Caption: 'Tình trạng vận đơn'},
          'PaymentStatus': {Caption: 'Tình trạng thanh toán'},
          'ProductUnit': {Caption: 'Đơn vị tính'},
          'ProductShopCode': {Caption: 'Mã hàng'},
          'MetaKeywords': {Caption: 'Barcode'},
        },
        fieldMappingPrinter: {
          'BillCode': 'model.orderModel.BillCode',
          'Name': 'model.orderModel.Name',
          'Phone': 'model.orderModel.Phone',
          'Address': 'model.contactModel.Address',
          'Barcode': 'MetaKeywords.loopVal',
          'ProductCode': 'ProductCode.loopVal',
          'ProductCount': 'Quantity.loopVal',
          'Total': 'Total.loopVal',
          'TotalPages': 'model.paymentModel.customerCard',
          'ProductPrice': 'TotalPages.loopVal',
          'TotalComments': 'model.paymentModel.gaveMoney',
          'TotalDownloads': 'model.paymentModel.cash',
          'TotalRatingPoints': 'model.paymentModel.bankMoney',
          'TotalRatings': 'model.paymentModel.change',
          'DiscountPercent': 'DiscountPercent.loopVal',
          'DiscountMoney': 'DiscountMoney.loopVal',
          'Price': 'model.paymentModel.sum_of_payment',
          'DataGroup.pointofsales.09egb.Description': 'model.posModel.pos.Description',
          'Created': 'model.orderModel.Created',
          'User.LoginName': 'model.posModel.seller.LoginName',
        },
        passedItem: this.item,
        campaignId: undefined,
      }
      var model =  this.$getItemLocalStorage(POS_PREFIX + this.item.name)&& this.$getItemLocalStorage(POS_PREFIX + this.item.name)!= 'undefined'?JSON.parse(this.$getItemLocalStorage(POS_PREFIX + this.item.name)):newModel;
      return {
        model:model,
      }
    },
    methods: {
      loadResources(){
        //load warehouse: params.warehouses
        var requestWH = {
          RequestClass: "xBase",
          RequestAction: "Request",
          TotalRequests: 1,
          R1_RequestDataGroup: "DataGroup.warehouses.01dh7",
          R1_RequestFields: "Id;Code;Name;",
          R1_Code: "Warehouses",
          R1_RequestTemplate: "xDocument_Document.Search"
        };
        this.$Utils.post(requestWH).then(response => {
          this.model.params.warehouses = this.$Utils.getDataWithRoot(response.R1, 'Data.DocumentDS.Document');
          //load stores: params.poses
          var request = {
            RequestClass: "xBase",
            RequestAction: "Request",
            TotalRequests: 1,
            R1_RequestDataGroup: "DataGroup.pointofsales.09egb",
            R1_RequestFields: "Id;Code;Promulgator;Name;Category;Type;Description",
            R1_Code: "POS",
            R1_RequestTemplate: "xDocument_Document.Search"
          };
          this.$Utils.post(request).then(response => {
            this.model.params.poses = this.$Utils.getDataWithRoot(response.R1, 'Data.DocumentDS.Document');
            $.each(this.model.params.warehouses, (k,value)=> {
              if(value.Id == this.model.params.poses[0].Category){
                this.model.orderModel.Warehouse = value;
                return false;
              }
            });
          });
        });


        //load users: params.users
        var parameter = {
          RequestAction: 'SearchUsers',
          RequestClass: 'BPM',
          ConditionFields: 'IncludedGroupManager;Group;Status;LoginName;UserId,Status',
          StaticFields: 'UserId;Username;Description;Status;LoginName',
          DynamicFields: 'Avatar;Facebook;Email;Skype;Birthday;Biography;WorkProcess;Telephone',
          StructFields: 'GroupRoot;GroupRootName;PhoneId;PhoneGroup;Public;RoleRootName;GroupManage;Notification',
          Status: 1
        };
        this.$Utils.post(parameter).then((data) => {
          this.model.params.users = [];
          data = this.$Utils.getDataWithRoot(data, 'Data.UserDS.User');
          $.each(data, (k, value) => {
            if (value.LoginName !== 'superadmin') {
              this.model.params.users.push({
                Id: value.UserId,
                Name: value.LoginName,
                // LoginName: value.LoginName
              })
            }
          });
        });

        //load sources: params.sources
        var request = {
          RequestClass: 'xBase',
          RequestAction: 'Request',
          TotalRequests: 1,
          R1_RequestTemplate: 'Setting.SearchBase',
          R1_ParentCode: 'xSetting.Project.Parameter.CRM.Customer.Source'
        };
        this.isMobile = this.$isMobileDevice;
        this.$Utils.post(request).then(response => {
         this.model.params.sources = this.$Utils.getDataWithRoot(response.R1, 'Data.DynamicDS.Setting');
        })

        //load campaigns: params.campaignCodes
        var request = {
          RequestClass: 'xBase',
          RequestAction: 'Request',
          TotalRequests: 1,
          R1_RequestTemplate: 'xDocument_Document.Search',
          R1_RequestDataGroup: 'DataGroup.campaign.0d1gf',
          R1_RequestFields: 'Id;Code;Name;',
          R1_Code: 'Campaign'
        };
        this.isMobile = this.$isMobileDevice;
        this.$Utils.post(request).then(response => {
          this.model.params.campaignCodes = this.$Utils.getDataWithRoot(response.R1, 'Data.DocumentDS.Document');
          this.model.campaignId = this.model.params.campaignCodes[0].Id;
        })

        //load time period: params.timeFrameNames
        var request = {
          RequestClass: 'xBase',
          RequestAction: 'Request',
          TotalRequests: 1,
          R1_RequestTemplate: 'Setting.SearchBase',
          R1_ParentCode: 'xSetting.Project.Parameter.CRM.Activity.TimeFrame'
        };
        this.isMobile = this.$isMobileDevice;
        this.$Utils.post(request).then(response => {
          this.model.params.timeFrameNames = this.$Utils.getDataWithRoot(response.R1, 'Data.DynamicDS.Setting');
        })

        //load time period: params.genders
        var request = {
          RequestClass: 'xBase',
          RequestAction: 'Request',
          TotalRequests: 1,
          R1_RequestTemplate: 'Setting.SearchBase',
          R1_ParentCode: 'xSetting.Project.Parameter.CRM.Customer.Gender'
        };
        this.isMobile = this.$isMobileDevice;
        this.$Utils.post(request).then(response => {
          this.model.params.genders = this.$Utils.getDataWithRoot(response.R1, 'Data.DynamicDS.Setting');
        })

        //load time period: params.provinces
        var request = {
          RequestClass: 'xBase',
          RequestAction: 'Request',
          TotalRequests: 1,
          R1_RequestTemplate: 'Setting.SearchBase',
          R1_ParentCode: 'xSetting.Project.Parameter.CRM.Lead.Province'
        };
        this.isMobile = this.$isMobileDevice;
        this.$Utils.post(request).then(response => {
          this.model.params.provinces = this.$Utils.getDataWithRoot(response.R1, 'Data.DynamicDS.Setting');
        })


      },
      handleUpdateProduct () {
        this.$set(this.model.cart, this.model.cart.findIndex(product => product.Id === this.model.productEditing.Id), this.model.productEditing)
        this.handleCloseEditProductModal()
      },
      handleEditProduct (Id) {
        this.model.productEditing = this.model.cart.filter(product => product.Id === Id)[0]
        this.model.productEditing = JSON.parse(JSON.stringify(this.model.productEditing))
        this.model.showEditProductModal = true
      },
      handleDeleteProduct (Id, row) {
        var cached = this.$Lodash.cloneDeep(this.model.cart);
        this.model.cart = this.model.cart.filter(product => product.Id !== Id);

        var whReq = {
          RequestClass: 'xBase',
          RequestAction: 'Request',
          TotalRequests: 1,
        }
        var sourceData = {};
        var sourceSetting = this.$Lodash.cloneDeep(JSON.parse(this.model.formSetting.warehouse));
        this.$Utils.replacePermission(sourceSetting, sourceData)

        whReq['R1_RequestFields'] ='Id;Code;Priority;UpdateWarehouse;FormSetting;Changed';
        whReq['R1_Code']= 'Warehouse';
        whReq['R1_RequestTemplate']= 'xDocument_Document.Update';
        whReq['R1_RequestDataGroup']= 'DataGroup.warehouse.0fd40';
        whReq['R1_UpdateWarehouse']= true;
        whReq['R1_Id']= row.Id;
        whReq['R1_Priority']= row.Quantity;
        whReq['R1_FormSetting']= JSON.stringify(sourceSetting);//this.model.formSetting.warehouse;

        var changed = [{
          "ColumnCaption": "Số lượng( Tồn sẵn có)",
          "ColumnName": "Priority",
          "OldDisplayValue": "",
          "OldValue": "",
          "NewDisplayValue": row.Quantity + "",
          "NewValue": row.Quantity + ""
        },{
          "ColumnCaption": "Mã hoá đơn",
          "ColumnName": "FriendlyUrl",
          "OldDisplayValue": "",
          "OldValue": "",
          "NewDisplayValue": this.model.orderModel.BillCode,
          "NewValue": ""
        },];
        whReq['R1_Changed']= JSON.stringify(changed);

        this.$Utils.postCheckResult(whReq).then((whRes)=>{
          if(whRes.success){
            this.$message.success("Trả tồn thành công");
            var delReq = {
              RequestClass: 'xBase',
              RequestAction: 'Request',
              TotalRequests: 1,
              R1_RequestTemplate : "xDocument_Document.Delete",
              R1_Id : row.OrderPartId,
            }
            this.$Utils.postCheckResult(delReq).then((delRes)=>{
              if(delRes.success){
                this.$message.success("Xoá thành công");
                  this.$setItemLocalStorage(POS_PREFIX + this.item.name, JSON.stringify(this.model));
                  //this.$hub.$emit('saveToLocalStorage');
              }else {
                this.$message.error("Có lỗi, không xoá được");
              }
            });
          }else{
            this.$message.error("Có lỗi, không trả tồn");
            this.model.cart = cached;
          }
        });
      },
      handleCloseEditProductModal () {
        this.model.productEditing = {}
        this.model.showEditProductModal = false
      },
      computeTotalMoney () {
        this.model.productEditing.Total = parseInt((this.model.productEditing.ProductPrice - (this.model.productEditing.DiscountMoney || 0)) * (100 - (this.model.productEditing.DiscountPercent || 0)) / 100) * (this.model.productEditing.Quantity || 1)
      },
      saveSingleOrderPart(OrderId, product, isUpdate){
        var orderPartRequest = {
          RequestClass: 'xBase',
          RequestAction: 'Request',
          TotalRequests: this.model.cart.length,
        }
        orderPartRequest['R1_RequestFields']= 'Id;Code;CreatedByName;ModifiedByName;Code;Store;StoreName;Name;Birthday;Phone;TimeFrame;TimeFrameName;' +
          'BillCode;OfficialNumber;Author;AuthorName;Source;SourceName;CampaignCode;CampaignCodeName;CustomerCode;ProductCode;Parent;OrderId;ProductType;' +
          'ProductTypeName;ProductPrice;Price;ProductColor;ProductColorName;ProductSize;ProductSizeName;Category;CategoryName;ProductCount;Total;Priority;Status;' +
          'MetaDescription;DeliveryStatus;DeliveryStatusName;PaymentStatus;PaymentStatusName;ProductUnit;ProductShopCode;Barcode;LocationName;DiscountMoney;' +
          'DiscountPercent;Address;GroupId;FormSetting;Changed;';
        orderPartRequest['R1_RequestDataGroup']= 'DataGroup.orderpart.82fjy';
        if(isUpdate){
          orderPartRequest['R1_RequestTemplate']= 'xDocument_Document.Update';
          orderPartRequest['R1_Id']= product.OrderPartId;
        }else{
          orderPartRequest['R1_RequestTemplate']= 'xDocument_Document.Insert';
        }
        orderPartRequest['R1_CreatedBy']= JSON.parse(localStorage.getItem("LoggedOnUser")).UserId;
        orderPartRequest['R1_CreatedByName']= JSON.parse(localStorage.getItem("LoggedOnUser")).Username;
        orderPartRequest['R1_ModifiedBy']= JSON.parse(localStorage.getItem("LoggedOnUser")).UserId;
        orderPartRequest['R1_ModifiedByName']= JSON.parse(localStorage.getItem("LoggedOnUser")).Username;
        orderPartRequest['R1_Code']= 'OrderPart';
        orderPartRequest['R1_GroupId']= this.model.posModel.pos.Promulgator;
        orderPartRequest['R1_Store']= this.model.posModel.pos.Id;
        orderPartRequest['R1_StoreName']= this.model.posModel.pos.Name;
        orderPartRequest['R1_Author']= this.model.posModel.seller.Id;
        orderPartRequest['R1_AuthorName']= this.model.posModel.seller.Name;
        orderPartRequest['R1_ProductCode'] = product.ProductCode;
        orderPartRequest['R1_Parent'] = OrderId;
        orderPartRequest['R1_OrderId'] = OrderId;
        orderPartRequest['R1_ProductType'] = product.Categories;
        orderPartRequest['R1_ProductTypeName'] = product.CategoriesName;
        orderPartRequest['R1_ProductPrice'] = product.TotalPages;
        // orderPartRequest['R1_Price'] = this.model.paymentModel.sum_of_payment;
        orderPartRequest['R1_ProductColor'] = product.ProductColor;
        orderPartRequest['R1_ProductColorName'] = product.ProductColorName;
        orderPartRequest['R1_ProductSize']= product.Size;
        orderPartRequest['R1_ProductSizeName']= product.SizeName;
        orderPartRequest['R1_Category']= this.model.orderModel.Warehouse.Id;
        orderPartRequest['R1_CategoryName']= this.model.orderModel.Warehouse.Name;
        orderPartRequest['R1_LocationName']= this.model.contactModel.Location.Name;
        orderPartRequest['R1_Address']= this.model.contactModel.Address;
        orderPartRequest['R1_DiscountMoney']= product.DiscountMoney;
        orderPartRequest['R1_DiscountPercent']= product.DiscountPercent;
        orderPartRequest['R1_Gender']= this.model.contactModel.Gender.Id;
        orderPartRequest['R1_GenderName']= this.model.contactModel.Gender.Name;

        orderPartRequest['R1_ProductCount'] = product.Quantity;
        orderPartRequest['R1_Total'] = (parseInt(product.TotalPages) - (isNaN(parseInt(product.DiscountMoney))?0:parseInt(product.DiscountMoney)) - (isNaN(parseInt(product.DiscountPercent))?0:(parseInt(product.DiscountPercent)/100*parseInt(product.TotalPages))))* parseInt(product.Quantity);
        orderPartRequest['R1_Priority'] = 0;
        orderPartRequest['R1_Status'] = 'be311afe-985d-4f79-8e89-c895a4ff0694';// đơn hàng bán
        // orderPartRequest['R1_MetaDescription'] = '39636d3b-705b-4b51-91c9-67afda36c62e';// đã xuất bán
        // orderPartRequest['R1_DeliveryStatus'] = '93bfb67d-e659-48a5-9236-f727312cd2e2';// khách đã nhận
        // orderPartRequest['R1_DeliveryStatusName'] = 'Khách đã nhận';// khách đã nhận
        // orderPartRequest['R1_PaymentStatus'] = '9e4461ea-b25a-46e0-bf5f-db5bfabf2ba4';// đã thanh toán tại cửa hàng
        // orderPartRequest['R1_PaymentStatusName'] = 'Đã thanh toán tại cửa hàng';// đã thanh toán tại cửa hàng
        orderPartRequest['R1_ProductUnit'] = product.SourceUrl;// đơn vị tính
        orderPartRequest['R1_ProductShopCode'] = product.MetaDescriptionName;// Mã hàng
        orderPartRequest['R1_Barcode']= product.MetaKeywords;
        orderPartRequest['R1_Name']= this.model.orderModel.Name;
        orderPartRequest['R1_Phone']= this.model.orderModel.Phone;
        orderPartRequest['R1_BillCode']= this.model.orderModel.BillCode;
        orderPartRequest['R1_OfficialNumber']= this.model.contactModel.OfficialNumber;
        orderPartRequest['R1_CampaignCode']= this.model.contactModel.CampaignCode.Id;
        orderPartRequest['R1_CampaignCodeName'] = this.model.contactModel.CampaignCode.Name;





        this.$Utils.post(orderPartRequest).then(response => {
          if(response.success){
            product.OrderPartId = response.R1.Data;
            this.$setItemLocalStorage(POS_PREFIX + this.item.name, JSON.stringify(this.model));
            this.$hub.$emit('saveToLocalStorage');
          }
        });


      },
      handleBarcodeSearchConfirm () {

        if(this.$Utils.equals(this.model.orderModel.Warehouse,{})){
          this.$message({message: 'Phải chọn kho hàng trước',center: true,type: 'error'});
        }else if(this.model.barcode_search_keyword == ''){

        }else {

          this.$refs['contactForm'].validate((valid1) => {
            this.$refs['orderForm'].validate((valid2) => {
              this.$refs['posForm'].validate((valid3) => {
                this.$refs['paymentForm'].validate((valid4) => {
                    if(valid1 && valid2 && valid3 && valid4){
                      var barcodeEntered = this.$Lodash.cloneDeep(this.model.barcode_search_keyword);
                      this.model.barcode_search_keyword = '';
                      var reqCheckBillCode = {
                        RequestClass: "xBase",
                        RequestAction: "Request",
                        TotalRequests: 1,
                        R1_RequestDataGroup: "DataGroup.order.9ejnl",
                        R1_RequestFields: "Id;Name;BillCode;",
                        R1_Code: "Order",
                        R1_RequestTemplate: "xDocument_Document.Search",
                        R1_BillCode: this.model.orderModel.BillCode,
                      }
                      this.$Utils.post(reqCheckBillCode).then(resCheckBillCode => {
                        if(resCheckBillCode.success){
                          var listOrders = this.$Utils.getDataWithRoot(resCheckBillCode.R1, 'Data.DocumentDS.Document');
                          if(listOrders.length >1
                          || (this.model.orderModel.Id == '' && listOrders.length ==1)
                            || (this.model.orderModel.Id != '' && listOrders.length ==1 && listOrders[0].Id != this.model.orderModel.Id)){
                            this.$message.error('Mã hoá đơn đã tồn tại');
                          }else{
                            var request = {
                              RequestClass: "xBase",
                              RequestAction: "Request",
                              TotalRequests: 1,
                              R1_RequestDataGroup: "DataGroup.warehouse.0fd40",
                              R1_RequestFields: "Id;Name;MetaDescription;MetaDescriptionName;Priority;ProductCode;OfficialNumber;ProductColor;Size;Style;ProductColorName;SizeName;MetaKeywords;CodeName;TotalPages;Category;CategoryName;Unit;FullCodeName;ProductShopCode;ProductCode;Status;Categories;CategoriesName",
                              R1_Code: "Warehouse",
                              R1_MetaKeywords: barcodeEntered,
                              R1_Status: this.model.orderModel.Warehouse.Id,
                              R1_RequestTemplate: "xDocument_Document.Search"
                            };
                            this.$Utils.post(request).then(response => {
                              debugger
                              var productLst = this.$Utils.getDataWithRoot(response.R1, 'Data.DocumentDS.Document');
                              if(productLst && productLst.length ==1){
                                if(productLst[0].Priority >0){
                                  //trừ tồn sẵn có
                                  var sourceData = {};
                                  var sourceSetting = this.$Lodash.cloneDeep(JSON.parse(this.model.formSetting.warehouse));
                                  this.$Utils.replacePermission(sourceSetting, sourceData)
                                  var whReq = {
                                    RequestClass: 'xBase',
                                    RequestAction: 'Request',
                                    TotalRequests: 1,
                                    R1_RequestFields : 'Id;Code;TotalAttachments;Priority;UpdateWarehouse;FormSetting;Changed',
                                    R1_Code : 'Warehouse',
                                    R1_RequestTemplate: 'xDocument_Document.Update',
                                    R1_RequestDataGroup : 'DataGroup.warehouse.0fd40',
                                    R1_UpdateWarehouse: true,
                                    R1_Id : productLst[0].Id,
                                    R1_Priority :  -1,
                                    R1_FormSetting : JSON.stringify(sourceSetting) //this.model.formSetting.warehouse,
                                  }

                                  var changed = [{
                                    "ColumnCaption": "Số lượng( Tồn sẵn có)",
                                    "ColumnName": "Priority",
                                    "OldDisplayValue": "",
                                    "OldValue": "",
                                    "NewDisplayValue": -1,
                                    "NewValue": -1,
                                  },
                                    {
                                      "ColumnCaption": "Mã hoá đơn",
                                      "ColumnName": "FriendlyUrl",
                                      "OldDisplayValue": "",
                                      "OldValue": "",
                                      "NewDisplayValue": this.model.orderModel.BillCode,
                                      "NewValue": ""
                                    }];
                                  whReq['R1_Changed']= JSON.stringify(changed);

                                  this.$Utils.postCheckResult(whReq).then((whRes)=>{
                                    if(whRes.R1.success==true){
                                      var existed = false;
                                      this.model.cart.forEach((item)=>{
                                        if(item.MetaKeywords == productLst[0].MetaKeywords){
                                          existed = true;
                                          // if((parseInt(item.Quantity)+1 <=  productLst[0].Priority)){
                                            item.Quantity = parseInt(item.Quantity)+1;
                                            //update orderPart
                                            this.saveSingleOrderPart(this.model.orderModel.Id, item, true);
                                          // }else{
                                          //   this.$message({message: 'Hết hàng', center: true, type: 'warning'});
                                          // }
                                          return false;
                                        }
                                      });
                                      if(!existed){
                                        var x = productLst[0];
                                        x.Quantity = 1;
                                        this.model.cart.push(x);
                                        //if order is new, create one and return Id to model
                                        if(this.model.orderModel.Id ==''){
                                          var orderRequest = {
                                            RequestClass: 'xBase',
                                            RequestAction: 'Request',
                                            TotalRequests: 1,
                                            R1_RequestFields: 'Id;Code;CreatedByName;Phone;ModifiedByName;Code;Store;StoreName;Name;TimeFrame;TimeFrameName;BillCode;OfficialNumber;' +
                                            'Author;AuthorName;Source;SourceName;CampaignCode;CampaignCodeName;CustomerCode;Birthday;MetaDescription;Location;LocationName;TotalComments;TotalDownloads;TotalPages;' +
                                            'TotalRatingPoints;TotalRatings;Status;StatusName;MetaDescription;PaymentStatus;PaymentStatusName;Address;Priority;GroupId;FormSetting;Changed;',
                                            R1_RequestDataGroup: 'DataGroup.order.9ejnl',
                                            R1_RequestTemplate: 'xDocument_Document.Insert',
                                            R1_CreatedBy: JSON.parse(localStorage.getItem("LoggedOnUser")).UserId,
                                            R1_CreatedByName: JSON.parse(localStorage.getItem("LoggedOnUser")).Username,
                                            R1_ModifiedBy: JSON.parse(localStorage.getItem("LoggedOnUser")).UserId,
                                            R1_ModifiedByName: JSON.parse(localStorage.getItem("LoggedOnUser")).Username,
                                            R1_Code: 'Order',
                                            R1_GroupId: this.model.posModel.pos.Promulgator,
                                            R1_Store: this.model.posModel.pos.Id,
                                            R1_StoreName: this.model.posModel.pos.Name,
                                            R1_Status : 'be311afe-985d-4f79-8e89-c895a4ff0694',// đơn hàng bán
                                            R1_StatusName : 'Bán',// đơn hàng bán
                                            R1_Name: this.model.orderModel.Name,
                                            R1_Phone: this.model.orderModel.Phone,
                                            R1_BillCode: this.model.orderModel.BillCode,
                                            R1_CampaignCode: this.model.contactModel.CampaignCode.Id,
                                            R1_CampaignCodeName: this.model.contactModel.CampaignCode.Name,
                                            R1_CustomerCode: this.model.contactModel.CustomerCode,
                                            R1_Author: this.model.posModel.seller.Id,
                                            R1_AuthorName : this.model.posModel.seller.Name,
                                            R1_OfficialNumber : this.model.contactModel.OfficialNumber,
                                            R1_Priority: 1,
                                          }
                                          this.$Utils.post(orderRequest).then((response)=>{
                                            this.model.orderModel.Id = response.R1.Data;
                                            this.saveSingleOrderPart(this.model.orderModel.Id, x);
                                          });
                                        }else{
                                          this.saveSingleOrderPart(this.model.orderModel.Id, x);
                                        }
                                      }
                                    }else{
                                      this.$message({message: 'Xin hãy kiểm tra số lượng tồn trong hệ thống', center: true, type: 'error'});
                                    }
                                  });
                                }else{
                                  this.$message({message: 'Hết hàng', center: true, type: 'warning'});
                                }
                              }else if(productLst && productLst.length ==0){
                                this.$message({message: 'Không có barcode này',type: 'warning', center: true});
                              }else{
                                this.$message({
                                  message: 'Lỗi hệ thống, liên hệ quản trị viên để xử lý',
                                  center: true,
                                  type: 'error'
                                });
                              }
                            });
                          }
                        }
                      })
                    }else{
                      return;
                    }
                })
              })
            })
          })

        }

      },
      format_currency(a) {
        if(a ==undefined)
          return 0;
        if(isNaN(parseInt(a)))
          return '0';
        else {
          a = (''+ a).replaceAll('.','');
          a = parseInt(a);
          return (a + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        }
      },
      onCustomerCashChange(){
        var cash = parseInt((this.model.paymentModel.gaveMoney+'').replaceAll('.',''));
        var total = parseInt((parseInt((this.model.paymentModel.sum_of_payment+'').replaceAll('.',''))+'').replaceAll('.',''));
        if(isNaN(cash) || isNaN(total)){
          this.model.paymentModel.change= '0';
        }else{
          var returnCash = cash - total;
          this.model.paymentModel.change = this.format_currency(returnCash);
        }
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
                  refModule.Description.functions.onFilter = this.model.onFilter;
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
          this.model.formSetting[type] = JSON.stringify(sourceSetting[0].Description);
        });
      },
      calculateOrderCash (productList) {
        var tmp = 0;
        if(productList.length==0){
          this.model.paymentModel.sum_of_payment =0;
          this.onCustomerCashChange();
        }else {
          $.each(productList, (k, v)=>{
            var cash ='';
            if(v.TotalPages ==undefined || isNaN(parseInt(v.TotalPages)))
              cash = 0;
            else
              cash = (parseInt(v.TotalPages) - (isNaN(parseInt(v.DiscountMoney))?0:parseInt(v.DiscountMoney)) - (isNaN(parseInt(v.DiscountPercent))?0:(parseInt(v.DiscountPercent)/100*parseInt(v.TotalPages))))* parseInt(v.Quantity);
            tmp+=cash;
            this.model.paymentModel.sum_of_payment = this.format_currency(tmp);
            this.onCustomerCashChange();
          });
        }
      },
      querySearch(queryString, cb) {
        var request = {
          RequestClass: "xBase",
          RequestAction: "Request",
          TotalRequests: 1,
          R1_RequestDataGroup: "DataGroup.contact.82fhd",
          R1_RequestFields: 'Id;Code;CreatedByName;ModifiedByName;IdentityCode;Name;TimeFrame;TimeFrameName;LeadSource;LeadSourceName;Phone;Birthday;Keyword;;Location;LocationName;Gender;GenderName;Birthday;',
          R1_Code: "Contact",
          R1_RequestTemplate: "xProfile_Profile.Search",
          R1_StartIndex:0,
          R1_EndIndex:20,
          R1_Keyword: this.model.contact_search_keyword
        };
        this.$Utils.post(request).then(response => {
          response = this.$Utils.getDataWithRoot(response.R1, 'Data.ProfileDS.Profile');
          cb(response);
        });

      },
      handleSelect(item) {
        this.model.contactModel.Id=item.Id;
        this.model.orderModel.Name=item.Name;
        this.model.contactModel.CustomerCode=item.IdentityCode;
        this.model.contactModel.Source={Id: item.LeadSource, Name: item.LeadSourceName};
        this.model.orderModel.Phone=item.Phone;
        this.model.contactModel.Birthday=item.Birthday;
        this.model.contactModel.Location={Id: item.Location, Name:item.LocationName};
        this.model.contactModel.Gender={Id: item.Gender, Name:item.GenderName};
        //
        this.model.orderModel.TimeFrame={Id: item.TimeFrame, Name:item.TimeFrameName};


        var tmp={
          Id:item.Id,
          Name:item.Name,
          IdentityCode:item.IdentityCode,
          LeadSource:item.LeadSource,
          LeadSourceName:item.LeadSourceName,
          Phone:item.Phone,
          Birthday:item.Birthday,
          Location: item.Location,
          LocationName: item.LocationName,
          Gender:item.Gender,
          GenderName:item.GenderName,
          TimeFrame: item.TimeFrame,
          TimeFrameName:item.TimeFrameName,
        }
        this.model.cachedContact = this.$Lodash.cloneDeep(tmp);
      },
      save () {
        this.model.orderModel.Created = this.$Utils.formatDateTime(new Date());
        // orderModel.TimeFrame
        var orderDate= new Date(this.model.orderModel.Created).getHours();
        $.each(this.model.params.timeFrameNames, (k,v)=> {
          var tmp = v.Name.split(' - ');
          if(parseInt(tmp[0])< orderDate && parseInt(tmp[1])> orderDate){
            this.model.orderModel.TimeFrame = v;
            return false;
          }
        });

        this.$refs['contactForm'].validate((valid1) => {
          this.$refs['orderForm'].validate((valid2) => {
            this.$refs['posForm'].validate((valid3) => {
              this.$refs['paymentForm'].validate((valid4) => {
                if(this.model.cart.length==0){
                  this.$message.error('Giỏ hàng trống');
                  return false;
                }
                if(this.model.paymentModel.change <0){
                  this.$message.error('Tiền trả lại không đúng');
                  return false;
                }
                if(valid4 && valid3 && valid2 && valid1){
                  //validate existed lead or contact
                  var checkExistedReq = {
                    RequestClass: 'xBase',
                    RequestAction: 'Request',
                    TotalRequests: 2,
                    R1_RequestDataGroup: "DataGroup.lead.9jwnc",
                    R1_RequestFields: "Id;Name;OfficialNumber;",
                    R1_Code: "Lead",
                    R1_RequestTemplate: "xDocument_Document.Search",
                    R1_OfficialNumber: this.model.contactModel.OfficialNumber,

                    R2_RequestDataGroup: "DataGroup.order.9ejnl",
                    R2_RequestFields: "Id;Name;BillCode;",
                    R2_Code: "Order",
                    R2_RequestTemplate: "xDocument_Document.Search",
                    R2_BillCode: this.model.orderModel.BillCode,
                  }
                  if(this.model.contactModel.Id ==''){
                    checkExistedReq.TotalRequests= 3;
                    checkExistedReq.R3_RequestFields= 'Id;Code;IdentityCode;';
                    checkExistedReq.R3_RequestDataGroup= 'DataGroup.contact.82fhd';
                    checkExistedReq.R3_Code= 'Contact';
                    checkExistedReq.R3_RequestTemplate = 'xProfile_Profile.Search';
                    checkExistedReq.R3_IdentityCode = this.model.contactModel.CustomerCode;
                  }

                  this.$Utils.post(checkExistedReq).then(checkExistedRes=>{
                    var msg = ''
                    var leads = this.$Utils.getDataWithRoot(checkExistedRes.R1, 'Data.DocumentDS.Document');
                    var order = this.$Utils.getDataWithRoot(checkExistedRes.R2, 'Data.DocumentDS.Document');
                    if(checkExistedReq.TotalRequests ==3){
                      var contacts = this.$Utils.getDataWithRoot(checkExistedRes.R3, 'Data.ProfileDS.Profile');
                      if(contacts.length>0){
                        msg += 'mã khách hàng,'
                      }
                    }
                    if(leads.length>0){
                      msg += ' mã lượt liên hệ,'
                    }
                    if(order.length>1){
                      msg += ' mã hoá đơn,'
                    }
                    if(msg != ''){
                      msg = msg.substring(0, msg.length-1) + ' đã tồn tại';
                      this.$message.error(msg);
                    }else{
                      // trừ tồn
                      var whReq = {
                        RequestClass: 'xBase',
                        RequestAction: 'Request',
                        TotalRequests: this.model.cart.length,
                      }
                      var sourceData = {};
                       var sourceSetting = this.$Lodash.cloneDeep(JSON.parse(this.model.formSetting.warehouse));
                      this.$Utils.replacePermission(sourceSetting, sourceData)
                      $.each(this.model.cart, (k, v)=>{
                        whReq['R'+(k+1)+'_RequestFields'] ='Id;Code;TotalAttachments;Priority;UpdateWarehouse;FormSetting;Changed';
                        whReq['R'+(k+1)+'_Code']= 'Warehouse';
                        whReq['R'+(k+1)+'_RequestTemplate']= 'xDocument_Document.Update';
                        whReq['R'+(k+1)+'_RequestDataGroup']= 'DataGroup.warehouse.0fd40';
                        whReq['R'+(k+1)+'_UpdateWarehouse']= true;
                        whReq['R'+(k+1)+'_Id']= v.Id;
                        whReq['R'+(k+1)+'_TotalAttachments']= -v.Quantity;

                        whReq['R'+(k+1)+'_FormSetting']= JSON.stringify(sourceSetting);///this.model.formSetting.warehouse;

                        var changed = [{
                          "ColumnCaption": "Số lượng (Tồn thực thế)",
                          "ColumnName": "TotalAttachments",
                          "OldDisplayValue": "",
                          "OldValue": "",
                          "NewDisplayValue": -v.Quantity + "",
                          "NewValue": -v.Quantity + ""
                        },{
                          "ColumnCaption": "Mã hoá đơn",
                          "ColumnName": "FriendlyUrl",
                          "OldDisplayValue": "",
                          "OldValue": "",
                          "NewDisplayValue": this.model.orderModel.BillCode,
                          "NewValue": ""},
                        ];
                        whReq['R'+(k+1)+'_Changed']= JSON.stringify(changed);
                      });
                      this.$Utils.post(whReq).then((whRes)=>{
                      });
                      //save contact
                      var sourceData = {};
                      var sourceSetting = this.$Lodash.cloneDeep(JSON.parse(this.model.formSetting.contact));
                      this.$Utils.replacePermission(sourceSetting, sourceData)
                      var contactRequest = {
                        RequestClass: 'xBase',
                        RequestAction: 'Request',
                        TotalRequests: 1,
                        R1_RequestFields: 'Id;Code;Address;CreatedByName;ModifiedByName;IdentityCode;Name;Gender;GenderName;Phone;LeadSource;LeadSourceName;Location;LocationName;Birthday;FormSetting;Changed;',
                        R1_RequestDataGroup: 'DataGroup.contact.82fhd',
                        R1_ModifiedByName: JSON.parse(localStorage.getItem("LoggedOnUser")).Username,
                        R1_Code: 'Contact',
                        R1_Name: this.model.orderModel.Name,
                        R1_Birthday: this.$Utils.formatDateTime(this.model.contactModel.Birthday),
                        R1_Phone: this.model.orderModel.Phone,
                        R1_Gender: this.model.contactModel.Gender.Id,
                        R1_GenderName: this.model.contactModel.Gender.Name,
                        R1_LeadSource: this.model.contactModel.Source.Id,
                        R1_LeadSourceName: this.model.contactModel.Source.Name,
                        R1_Location: this.model.contactModel.Location.Id,
                        R1_LocationName: this.model.contactModel.Location.Name,
                        R1_Address: this.model.contactModel.Address,
                        R1_IdentityCode: this.model.contactModel.CustomerCode,
                        R1_FormSetting: JSON.stringify(sourceSetting) ////this.model.formSetting.contact,
                      }
                      if(this.model.contactModel.Id == ''){
                        contactRequest.R1_RequestTemplate= 'xProfile_Profile.Insert';
                        contactRequest.R1_CreatedByName = JSON.parse(localStorage.getItem("LoggedOnUser")).Username;
                      }else {
                        contactRequest.R1_RequestTemplate= 'xProfile_Profile.Update';
                        contactRequest.R1_Id= this.model.contactModel.Id;
                      }
                      var contactChanged = [];

                      $.each(this.model.contactFields,(k,v)=>{
                        var tmp = {
                          "ColumnCaption": v.Caption,
                          "ColumnName": k,
                          "OldDisplayValue": this.model.cachedContact[k+'Name']?this.model.cachedContact[k+'Name']: this.model.cachedContact[k],
                          "OldValue": this.model.cachedContact[k],
                          "NewDisplayValue": contactRequest['R1_'+k+'Name']?contactRequest['R1_'+k+'Name']: contactRequest['R1_'+k],
                          "NewValue": contactRequest['R1_'+k],
                        }
                        contactChanged.push(tmp);
                      });
                      contactRequest.R1_Changed=JSON.stringify(contactChanged);
                      var sourceData1 = {};
                      var sourceSetting1 = this.$Lodash.cloneDeep(JSON.parse(this.model.formSetting.lead));
                      this.$Utils.replacePermission(sourceSetting1, sourceData1)

                      var leadRequest = {
                        RequestClass: 'xBase',
                        RequestAction: 'Request',
                        TotalRequests: 1,
                        R1_RequestFields: 'Id;Code;CreatedByName;ModifiedByName;Version;Code;Store;StoreName;Name;TimeFrame;TimeFrameName;BillCode;OfficialNumber;' +
                        'Author;AuthorName;Source;SourceName;CampaignCode;CampaignCodeName;CustomerCode;DocumentForm;GroupId;FormSetting;Changed;',
                        R1_RequestDataGroup: 'DataGroup.lead.9jwnc',
                        R1_RequestTemplate: 'xDocument_Document.Insert',
                        R1_CreatedBy: JSON.parse(localStorage.getItem("LoggedOnUser")).UserId,
                        R1_CreatedByName: JSON.parse(localStorage.getItem("LoggedOnUser")).Username,
                        R1_ModifiedBy: JSON.parse(localStorage.getItem("LoggedOnUser")).UserId,
                        R1_ModifiedByName: JSON.parse(localStorage.getItem("LoggedOnUser")).Username,
                        R1_Code: 'Lead',
                        R1_GroupId: this.model.posModel.pos.Promulgator,
                        R1_Store: this.model.posModel.pos.Id,
                        R1_StoreName: this.model.posModel.pos.Name,
                        R1_Name: this.model.orderModel.Name,
                        R1_Phone: this.model.orderModel.Phone,
                        R1_TimeFrame: this.model.orderModel.TimeFrame.Id,
                        R1_TimeFrameName: this.model.orderModel.TimeFrame.Name,
                        R1_OfficialNumber: this.model.contactModel.OfficialNumber,
                        R1_Author: this.model.posModel.seller.Id,
                        R1_AuthorName: this.model.posModel.seller.Name,
                        R1_Source: this.model.contactModel.Source.Id,
                        R1_SourceName: this.model.contactModel.Source.Name,
                        R1_CampaignCode: this.model.contactModel.CampaignCode.Id,
                        R1_CampaignCodeName: this.model.contactModel.CampaignCode.Name,
                        R1_Gender: this.model.contactModel.Gender.Id,
                        R1_GenderName: this.model.contactModel.Gender.Name,
                        R1_CustomerCode: this.model.contactModel.CustomerCode,
                        R1_FormSetting: JSON.stringify(sourceSetting1) //this.model.formSetting.lead,
                      }

                      var leadChanged = [];
                      $.each(this.model.leadFields, (k,v)=>{
                        var tmp = {
                          "ColumnCaption": v.Caption,
                          "ColumnName": k,
                          "OldDisplayValue": '',
                          "OldValue": '',
                          "NewDisplayValue": leadRequest['R1_'+k+'Name']?leadRequest['R1_'+k+'Name']: leadRequest['R1_'+k],
                          "NewValue": leadRequest['R1_'+k],
                        }
                        leadChanged.push(tmp);
                      });
                      var sourceData2 = {};
                      var sourceSetting2 = this.$Lodash.cloneDeep(JSON.parse(this.model.formSetting.order));
                      this.$Utils.replacePermission(sourceSetting2, sourceData2)

                      leadRequest.R1_Changed=JSON.stringify(leadChanged);
                      var orderChanged = [];
                      var orderRequest = {
                        RequestClass: 'xBase',
                        RequestAction: 'Request',
                        TotalRequests: 1,
                        R1_RequestFields: 'Id;Code;CreatedByName;Phone;ModifiedByName;Code;Store;StoreName;Name;TimeFrame;TimeFrameName;BillCode;OfficialNumber;' +
                        'Author;AuthorName;Source;SourceName;CampaignCode;CampaignCodeName;CustomerCode;Birthday;MetaDescription;Location;LocationName;TotalComments;TotalDownloads;TotalPages;' +
                        'TotalRatingPoints;TotalRatings;Status;StatusName;MetaDescription;PaymentStatus;PaymentStatusName;Address;Priority;DocumentForm;DocumentField;GroupId;FormSetting;Changed;',
                        R1_RequestDataGroup: 'DataGroup.order.9ejnl',
                        R1_RequestTemplate: 'xDocument_Document.Update',
                        R1_CreatedBy: JSON.parse(localStorage.getItem("LoggedOnUser")).UserId,
                        R1_CreatedByName: JSON.parse(localStorage.getItem("LoggedOnUser")).Username,
                        R1_ModifiedBy: JSON.parse(localStorage.getItem("LoggedOnUser")).UserId,
                        R1_ModifiedByName: JSON.parse(localStorage.getItem("LoggedOnUser")).Username,
                        R1_Code: 'Order',
                        R1_Id: this.model.orderModel.Id,
                        R1_Gender: this.model.contactModel.Gender.Id,
                        R1_GenderName: this.model.contactModel.Gender.Name,
                        R1_GroupId: this.model.posModel.pos.Promulgator,
                        R1_Store: this.model.posModel.pos.Id,
                        R1_StoreName: this.model.posModel.pos.Name,
                        R1_Name: this.model.orderModel.Name,
                        R1_Birthday: this.$Utils.formatDateTime(this.model.contactModel.Birthday),
                        R1_Phone: this.model.orderModel.Phone,
                        R1_TimeFrame: this.model.orderModel.TimeFrame.Id,
                        R1_TimeFrameName: this.model.orderModel.TimeFrame.Name,
                        R1_BillCode: this.model.orderModel.BillCode,
                        R1_OfficialNumber: this.model.contactModel.OfficialNumber,
                        R1_Author: this.model.posModel.seller.Id,
                        R1_AuthorName: this.model.posModel.seller.Name,
                        R1_Source: this.model.contactModel.Source.Id,
                        R1_SourceName: this.model.contactModel.Source.Name,
                        R1_CampaignCode: this.model.contactModel.CampaignCode.Id,
                        R1_CampaignCodeName: this.model.contactModel.CampaignCode.Name,
                        R1_CustomerCode: this.model.contactModel.CustomerCode,
                        R1_Address: this.model.contactModel.Address,
                        R1_Location: this.model.contactModel.Location.Id,
                        R1_LocationName: this.model.contactModel.Location.Name,
                        R1_TotalComments: this.model.paymentModel.gaveMoney,
                        R1_TotalDownloads: parseInt(this.model.paymentModel.cash.replaceAll('.','')),
                        R1_TotalPages: parseInt(this.model.paymentModel.customerCard.replaceAll('.','')),
                        R1_TotalRatingPoints: parseInt(this.model.paymentModel.bankMoney.replaceAll('.','')),
                        R1_TotalRatings: this.model.paymentModel.change,
                        R1_Priority: 0,
                        R1_Status : 'be311afe-985d-4f79-8e89-c895a4ff0694',// đơn hàng bán
                        R1_StatusName : 'Bán',// đơn hàng bán
                        R1_MetaDescription :'39636d3b-705b-4b51-91c9-67afda36c62e',// đã xuất bán
                        R1_PaymentStatus: '9e4461ea-b25a-46e0-bf5f-db5bfabf2ba4',// đã thanh toán tại cửa hàng
                        R1_PaymentStatusName :'Đã thanh toán tại cửa hàng',// đã thanh toán tại cửa hàng
                        R1_FormSetting: JSON.stringify(sourceSetting2)//this.model.formSetting.order,
                      }
                      $.each(this.model.orderFields, (k,v)=>{
                        var tmp = {
                          "ColumnCaption": v.Caption,
                          "ColumnName": k,
                          "OldDisplayValue": '',
                          "OldValue": '',
                          "NewDisplayValue": orderRequest['R1_'+k+'Name']?orderRequest['R1_'+k+'Name']: orderRequest['R1_'+k],
                          "NewValue": orderRequest['R1_'+k],
                        }
                        orderChanged.push(tmp);
                      });
                      orderRequest.R1_Changed=JSON.stringify(orderChanged);



                      //save orderPart
                      var sourceData3 = {};
                      var sourceSetting3 = this.$Lodash.cloneDeep(JSON.parse(this.model.formSetting.orderPart));
                      this.$Utils.replacePermission(sourceSetting3, sourceData3)

                      var orderPartRequest = {
                        RequestClass: 'xBase',
                        RequestAction: 'Request',
                        TotalRequests: this.model.cart.length,
                      }
                      $.each(this.model.cart, (k, v)=>{
                        orderPartRequest['R'+(k+1)+'_RequestFields']= 'Id;Code;CreatedByName;ModifiedByName;Code;Store;StoreName;Name;Birthday;Phone;TimeFrame;TimeFrameName;' +
                          'BillCode;OfficialNumber;Author;AuthorName;Source;SourceName;CampaignCode;CampaignCodeName;CustomerCode;ProductCode;Parent;OrderId;ProductType;' +
                          'ProductTypeName;ProductPrice;Price;ProductColor;ProductColorName;ProductSize;ProductSizeName;Category;CategoryName;ProductCount;Total;Priority;Status;' +
                          'MetaDescription;DeliveryStatus;DeliveryStatusName;PaymentStatus;PaymentStatusName;ProductUnit;ProductShopCode;Barcode;LocationName;DiscountMoney;' +
                          'DiscountPercent;Address;Banked;;DocumentForm;DocumentField;GroupId;FormSetting;Changed;';
                        orderPartRequest['R'+(k+1)+'_RequestDataGroup']= 'DataGroup.orderpart.82fjy';
                        orderPartRequest['R'+(k+1)+'_RequestTemplate']= 'xDocument_Document.Update';
                        orderPartRequest['R'+(k+1)+'_CreatedBy']= JSON.parse(localStorage.getItem("LoggedOnUser")).UserId;
                        orderPartRequest['R'+(k+1)+'_CreatedByName']= JSON.parse(localStorage.getItem("LoggedOnUser")).Username;
                        orderPartRequest['R'+(k+1)+'_ModifiedBy']= JSON.parse(localStorage.getItem("LoggedOnUser")).UserId;
                        orderPartRequest['R'+(k+1)+'_ModifiedByName']= JSON.parse(localStorage.getItem("LoggedOnUser")).Username;
                        orderPartRequest['R'+(k+1)+'_Code']= 'OrderPart';
                        orderPartRequest['R'+(k+1)+'_Id']= v.OrderPartId;
                        orderPartRequest['R'+(k+1)+'_GroupId']= this.model.posModel.pos.Promulgator;
                        orderPartRequest['R'+(k+1)+'_Store']= this.model.posModel.pos.Id;
                        orderPartRequest['R'+(k+1)+'_StoreName']= this.model.posModel.pos.Name;
                        orderPartRequest['R'+(k+1)+'_Name']= this.model.orderModel.Name;
                        orderPartRequest['R'+(k+1)+'_Birthday']= this.$Utils.formatDateTime(this.model.contactModel.Birthday);
                        orderPartRequest['R'+(k+1)+'_Phone']= this.model.orderModel.Phone;
                        orderPartRequest['R'+(k+1)+'_TimeFrame']= this.model.orderModel.TimeFrame.Id;
                        orderPartRequest['R'+(k+1)+'_TimeFrameName']= this.model.orderModel.TimeFrame.Name;
                        orderPartRequest['R'+(k+1)+'_BillCode']= this.model.orderModel.BillCode;
                        orderPartRequest['R'+(k+1)+'_OfficialNumber']= this.model.contactModel.OfficialNumber;
                        orderPartRequest['R'+(k+1)+'_Author']= this.model.posModel.seller.Id;
                        orderPartRequest['R'+(k+1)+'_AuthorName']= this.model.posModel.seller.Name;
                        orderPartRequest['R'+(k+1)+'_Source'] = this.model.contactModel.Source.Id;
                        orderPartRequest['R'+(k+1)+'_SourceName']= this.model.contactModel.Source.Name;
                        orderPartRequest['R'+(k+1)+'_CampaignCode']= this.model.contactModel.CampaignCode.Id;
                        orderPartRequest['R'+(k+1)+'_CampaignCodeName'] = this.model.contactModel.CampaignCode.Name;
                        orderPartRequest['R'+(k+1)+'_CustomerCode'] = this.model.contactModel.CustomerCode;
                        orderPartRequest['R'+(k+1)+'_FormSetting'] = JSON.stringify(sourceSetting3); //this.model.formSetting.orderPart;
                        orderPartRequest['R'+(k+1)+'_ProductCode'] = v.ProductCode;
                        orderPartRequest['R'+(k+1)+'_ProductType'] = v.Categories;
                        orderPartRequest['R'+(k+1)+'_ProductTypeName'] = v.CategoriesName;
                        orderPartRequest['R'+(k+1)+'_ProductPrice'] = v.TotalPages;
                        orderPartRequest['R'+(k+1)+'_Price'] = this.model.paymentModel.sum_of_payment;
                        orderPartRequest['R'+(k+1)+'_ProductColor'] = v.ProductColor;
                        orderPartRequest['R'+(k+1)+'_ProductColorName'] = v.ProductColorName;
                        orderPartRequest['R'+(k+1)+'_ProductSize']= v.Size;
                        orderPartRequest['R'+(k+1)+'_ProductSizeName']= v.SizeName;
                        orderPartRequest['R'+(k+1)+'_Category']= this.model.orderModel.Warehouse.Id;
                        orderPartRequest['R'+(k+1)+'_CategoryName']= this.model.orderModel.Warehouse.Name;
                        orderPartRequest['R'+(k+1)+'_LocationName']= this.model.contactModel.Location.Name;
                        orderPartRequest['R'+(k+1)+'_Address']= this.model.contactModel.Address;
                        orderPartRequest['R'+(k+1)+'_DiscountMoney']= v.DiscountMoney;
                        orderPartRequest['R'+(k+1)+'_DiscountPercent']= v.DiscountPercent;
                        orderPartRequest['R'+(k+1)+'_Gender']= this.model.contactModel.Gender.Id;
                        orderPartRequest['R'+(k+1)+'_GenderName']= this.model.contactModel.Gender.Name;

                        orderPartRequest['R'+(k+1)+'_ProductCount'] = v.Quantity;
                        orderPartRequest['R'+(k+1)+'_Banked'] = v.Quantity;
                        orderPartRequest['R'+(k+1)+'_Total'] = (parseInt(v.TotalPages) - (isNaN(parseInt(v.DiscountMoney))?0:parseInt(v.DiscountMoney)) - (isNaN(parseInt(v.DiscountPercent))?0:(parseInt(v.DiscountPercent)/100*parseInt(v.TotalPages))))* parseInt(v.Quantity);
                        orderPartRequest['R'+(k+1)+'_Priority'] = 0;
                        orderPartRequest['R'+(k+1)+'_Status'] = 'be311afe-985d-4f79-8e89-c895a4ff0694';// đơn hàng bán
                        orderPartRequest['R'+(k+1)+'_MetaDescription'] = '39636d3b-705b-4b51-91c9-67afda36c62e';// đã xuất bán
                        orderPartRequest['R'+(k+1)+'_DeliveryStatus'] = '93bfb67d-e659-48a5-9236-f727312cd2e2';// khách đã nhận
                        orderPartRequest['R'+(k+1)+'_DeliveryStatusName'] = 'Khách đã nhận';// khách đã nhận
                        orderPartRequest['R'+(k+1)+'_PaymentStatus'] = '9e4461ea-b25a-46e0-bf5f-db5bfabf2ba4';// đã thanh toán tại cửa hàng
                        orderPartRequest['R'+(k+1)+'_PaymentStatusName'] = 'Đã thanh toán tại cửa hàng';// đã thanh toán tại cửa hàng
                        orderPartRequest['R'+(k+1)+'_ProductUnit'] = v.SourceUrl;// đơn vị tính
                        orderPartRequest['R'+(k+1)+'_ProductShopCode'] = v.MetaDescriptionName;// Mã hàng
                        orderPartRequest['R'+(k+1)+'_Barcode']= v.MetaKeywords;

                        var orderPartChanged =[]


                        $.each(this.orderPartFields, (key,val)=>{
                          var tmp = {
                            "ColumnCaption": val.Caption,
                            "ColumnName": k,
                            "OldDisplayValue": '',
                            "OldValue": '',
                            "NewDisplayValue": (orderPartRequest['R'+(k+1)+'_'+key+'Name']?orderPartRequest['R'+(k+1)+'_'+key+'Name']: orderPartRequest['R'+(k+1)+'_'+key]),
                            "NewValue": orderPartRequest['R'+(k+1)+'_'+key],
                          }
                          orderPartChanged.push(tmp);
                        });
                        orderPartRequest['R'+(k+1)+'_Changed']= JSON.stringify(orderPartChanged);
                      });

                      this.$Utils.post(contactRequest).then((contactResponse)=>{
                        if(contactResponse.success){
                          leadRequest.R1_DocumentForm = contactResponse.R1.Data;
                          orderRequest.R1_DocumentForm = contactResponse.R1.Data;
                          //save lead
                          this.$Utils.post(leadRequest).then((leadResponse)=>{
                            if(leadResponse.success){
                              orderRequest.R1_DocumentField = leadResponse.R1.Data;
                              for(var i =1; i<= orderPartRequest.TotalRequests; i++){
                                orderPartRequest['R'+i+'_DocumentForm'] = contactResponse.R1.Data;
                                orderPartRequest['R'+i+'_DocumentField'] = leadResponse.R1.Data;
                              }
                              this.$Utils.post(orderPartRequest).then((orderPartRes)=>{});
                              //save order
                              this.$Utils.postCheckResult(orderRequest).then((orderResponse)=>{
                                if(orderResponse.success){
                                  this.model.orderModel.MetaDescription = orderRequest.R1_MetaDescription;
                                  this.model.disabled = true;
                                  this.$setItemLocalStorage(POS_PREFIX + this.item.name, JSON.stringify(this.model));
                                  // delete localStorage[this.item.name];
                                  // this.$hub.$emit('saveToLocalStorage');
                                  this.$message.success('Đơn hàng đã lưu')
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }else {
                  console.log('error submit!!');
                  return false;
                }
              });
            });
          });
        });
      },
      getValueFromVariable(key, root){
        var returnVal = '';
        if(key && key.constructor==String){
          var lst = key.split('.');
          var tmp = root;
          $.each(lst, (k,v)=>{
            if(tmp==undefined){
              returnVal = ''
              return false
            }
            tmp=tmp[v];
            returnVal=tmp;
          });
        }
         return returnVal;
      },
      print(){
        var ctrl = this;
        var request = this.$Lodash.cloneDeep(this.$singleRequest);
        request.TotalRequests = 1;
        request.R1_RequestTemplate = "SettingNew.SearchSetting";
        request.R1_Code = "xSetting.Project.Parameter.CRM2.Order.OrderTemplatePrint";
        this.$Utils.post(request).then(response => {
          var response = this.$Utils.getDataWithRoot(
            response.R1,
            "Data.DynamicDS.Setting"
          )[0];


          var htmlTemplate = ctrl.$Utils.decodeHtmlEntities(response.Description);
          var json = JSON.parse(response.Value);

          try{
            if(json.loops){
              // var autoGenVal = 0;
              $.each(json.loops,(k, v)=>{
                // var sum = 0;
                var loop = "";
                var tmp = htmlTemplate + "";
                tmp = tmp.split('<'+k+'>');
                loop = tmp[1].split('</'+k+'>')[0];
                var loopVal ="";


                $.each(ctrl.model.cart, (k1,v1)=> {
                  var loopValTmp = loop+ "";
                  $.each(this.model.fieldMappingPrinter, (k2,v2)=>{
                    if(v2.indexOf('.loopVal')>0)
                      loopValTmp = loopValTmp.replaceAll('{{' + k2 + '}}', (ctrl.getValueFromVariable((v2+'').replaceAll( '.loopVal',''), v1)+'').replaceAll('.00',''));
                  });
                  loopVal +=loopValTmp;
                });

                htmlTemplate = htmlTemplate.replaceAll(loop, loopVal);
              });
            }

            $.each(ctrl.model.fieldMappingPrinter, (k,v)=>{
                htmlTemplate = htmlTemplate.replaceAll('{{'+k+'}}', ctrl.getValueFromVariable(v, ctrl)+'');
            })

            $.each(json.allVariables, (index, val)=>{
              if(htmlTemplate.indexOf('{{'+val+'}}')>-1){
                htmlTemplate = htmlTemplate.replaceAll('{{'+val+'}}', '');
              }
            })
            htmlTemplate = htmlTemplate.replaceAll('undefined', '');
            var mywindow = window.open('', 'PRINT', json.paper);
            mywindow.document.write(htmlTemplate);
            setTimeout(function() {
              // wait until all resources loaded
              mywindow.document.close();
              mywindow.focus();
              mywindow.print();
              mywindow.close();
            }, 250);
          }catch(e){
            console.log(e)
          }
        });
      },
      changeCampaign(Id){
        $.each(this.model.params.campaignCodes, (k,v)=>{
          if(Id == v.Id){
            this.model.contactModel.CampaignCode = v;
            return false;
          }
        })
      }
    },
    created: function () {
      this.loadResources();
      this.getFormSetting('contact', 'Form.contact.0094e');
      this.getFormSetting('order', 'Form.order.0f1d6');
      this.getFormSetting('orderPart', 'Form.hoa-don.0fbh5');
      this.getFormSetting('lead', 'Form.lead.0d8cb');
      this.getFormSetting('warehouse', 'Form.chinh-sua-du-lieu-ton-kho.0c240');
      this.onCustomerCashChange();
      this.calculateOrderCash(this.model.cart);
      this.$hub.$on('closeTab', (targetName)=> {
        if(targetName===this.item.name){
          if(this.model.orderModel.MetaDescription !='' || this.model.orderModel.Id =='') {
            this.$hub.$emit('deleteOrder', {list: undefined,targetName: targetName});
          }else{
            this.$hub.$emit('deleteOrder', {
              list: this.model.cart,
              targetName: targetName,
              formSetting: this.model.formSetting.warehouse,
              orderId: this.model.orderModel.Id
            });
          }
          // this.$setItemLocalStorage(this.item.name, 'undefined');
          delete localStorage[POS_PREFIX + this.item.name]
        }
      });
    },
    watch: {
      'model.orderModel.Warehouse': function (newVal) {
        $.each(this.model.params.poses, (k, val)=>{
          if(val.Category.indexOf(newVal.Id)>-1){
            this.model.posModel.pos= val;
            return false;
          }
        });
      },
      'model.productEditing.DiscountMoney': function () {
        this.computeTotalMoney()
      },
      'model.productEditing.DiscountPercent': function () {
        this.computeTotalMoney()
      },
      /*'model.contact_search_keyword': function (newVal) {
        // console.log(this.format_currency(newVal));
      },
      'model.barcode_search_keyword': function (newVal) {
        // console.log(this.format_currency(newVal));
      },*/
      'model.paymentModel.cash': function (newVal) {
        this.model.paymentModel.cash = this.format_currency(newVal);
        this.model.paymentModel.gaveMoney = parseInt(this.model.paymentModel.cash.replaceAll('.','')) + parseInt(this.model.paymentModel.customerCard.replaceAll('.','')) + parseInt(this.model.paymentModel.bankMoney.replaceAll('.',''));
        this.onCustomerCashChange();
      },
      'model.paymentModel.customerCard': function (newVal) {
        this.model.paymentModel.customerCard = this.format_currency(newVal);
        this.model.paymentModel.gaveMoney = parseInt(this.model.paymentModel.cash.replaceAll('.','')) + parseInt(this.model.paymentModel.customerCard.replaceAll('.','')) + parseInt(this.model.paymentModel.bankMoney.replaceAll('.',''));
        this.onCustomerCashChange();
      },
      'model.paymentModel.bankMoney': function (newVal) {
        this.model.paymentModel.bankMoney = this.format_currency(newVal);
        this.model.paymentModel.gaveMoney = parseInt(this.model.paymentModel.cash.replaceAll('.','')) + parseInt(this.model.paymentModel.customerCard.replaceAll('.','')) + parseInt(this.model.paymentModel.bankMoney.replaceAll('.',''));
        this.onCustomerCashChange();
      },
      'model.cart': {
        handler: function(newVal) {
          this.calculateOrderCash(newVal);
        },
        deep: true
      }
    },
    destroyed: function () {
      //TODO dont off global event
      //this.$hub.$off('closeTab')
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
                    <strong>Giỏ hàng</strong>
                  </div>
                  <div class="col-lg-6 pd0">
                    <div class="row">
                      <div class="col-lg-5">
                          <el-select :disabled="model.disabled" v-model="model.orderModel.Warehouse" value-key="Id" placeholder="Chọn kho hàng (bắt buộc)" filterable>
                            <el-option v-for="item in model.params.warehouses" :key="item.Id" :label="item.Name" :value="item"></el-option>
                          </el-select>
                      </div>
                    <div class="col-lg-7"><el-input :disabled="model.disabled" placeholder="Nhập Barcode và Enter" suffix-icon="el-icon-search" v-model="model.barcode_search_keyword" @keyup.enter.native="handleBarcodeSearchConfirm"></el-input>
                    </div>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                </div>
                <div class="cart__content">
                  <el-table :data="model.cart" empty-text	="Không có dữ liệu" style="width: 100%" border>
                    <el-table-column type="index" width="40" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="MetaKeywords" width="75" label="Barcode"></el-table-column>
                    <el-table-column prop="ProductCode" width="200" label="Mã sản phẩm"></el-table-column>
                    <el-table-column prop="TotalPages" label="Đơn giá">
                      <template slot-scope="scope">
                        <div class="ovf-elipsis">
                          {{format_currency(parseInt(scope.row.TotalPages))+' đ'}}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="Số lượng" prop="Quantity">
                    </el-table-column>
                    <el-table-column label="Chiết khấu tiền">
                      <template slot-scope="scope">
                        <div class="ovf-elipsis">
                          {{format_currency(scope.row.DiscountMoney)+' đ'}}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="Chiết khấu %">
                      <template slot-scope="scope">
                        <div class="ovf-elipsis">
                          {{scope.row.DiscountPercent?(scope.row.DiscountPercent+' %'):'0%'}}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="Total" label="Thành tiền">
                      <template slot-scope="scope">
                        <div class="ovf-elipsis">
                          <a hidden>{{scope.row.Total = (parseInt(scope.row.TotalPages) - (isNaN(parseInt(scope.row.DiscountMoney))?0:parseInt(scope.row.DiscountMoney)) - (isNaN(parseInt(scope.row.DiscountPercent))?0:(parseInt(scope.row.DiscountPercent)/100*parseInt(scope.row.TotalPages))))* parseInt(scope.row.Quantity)}}</a>
                          {{format_currency(scope.row.Total) + ' đ'}}
                          <!--{{format_currency((parseInt(scope.row.TotalPages) - (isNaN(parseInt(scope.row.DiscountMoney))?0:parseInt(scope.row.DiscountMoney)) - (isNaN(parseInt(scope.row.DiscountPercent))?0:(parseInt(scope.row.DiscountPercent)/100*parseInt(scope.row.TotalPages))))* parseInt(scope.row.Quantity))+' đ'}}-->
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="Hành động" fixed="right" v-if="!model.disabled">
                      <template slot-scope="scope">
                        <el-button @click="handleEditProduct(scope.row.Id)">
                          <i class="fa fa-pencil"></i>
                        </el-button>
                        <el-button type="danger" style="margin: 3px 0;" @click="handleDeleteProduct(scope.row.Id,scope.row)">
                          <i class="fa fa-trash"></i>
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="modal__wrapper">
                  <el-dialog
                    title="Chỉnh sửa thông tin sản phẩm"
                    :visible.sync="model.showEditProductModal"
                    :before-close="handleCloseEditProductModal"
                  >
                    <el-form :disabled="model.disabled" :model="model.productEditing" label-width="150px" ref="productEditing" :label-position="$isMobileDevice ? 'top' : 'right'">
                      <el-form-item label="Barcode">
                        <el-input
                          v-model="model.productEditing.TotalPages"
                          disabled
                        ></el-input>
                      </el-form-item>

                      <el-form-item label="Mã hàng">
                        <el-input
                          v-model="model.productEditing.ProductCode"
                          disabled
                        ></el-input>
                      </el-form-item>

                      <el-form-item label="Size">
                        <el-input
                          v-model="model.productEditing.SizeName"
                          disabled
                        ></el-input>
                      </el-form-item>

                      <el-form-item label="Màu sắc">
                        <el-input
                          v-model="model.productEditing.ProductColorName"
                          disabled
                        ></el-input>
                      </el-form-item>

                      <el-form-item label="Kho">
                        <el-input
                          v-model="model.productEditing.CategoryName"
                          disabled
                        ></el-input>
                      </el-form-item>

                      <el-form-item label="Số lượng">
                        <el-input
                          v-model="model.productEditing.Quantity"
                          disabled
                        ></el-input>
                      </el-form-item>

                      <el-form-item label="Đơn giá">
                        <el-input
                          v-model="model.productEditing.TotalPages"
                          disabled
                        ></el-input>
                      </el-form-item>

                      <el-form-item label="Chiết khấu (bằng hình thức số tiền)">
                        <el-input
                          v-model="model.productEditing.DiscountMoney"
                        ></el-input>
                      </el-form-item>

                      <el-form-item label="Chiết khấu (bằng hình thức %)">
                        <el-input
                          v-model="model.productEditing.DiscountPercent"
                        ></el-input>
                      </el-form-item>

                      <!--<el-form-item label="Thành tiền">
                        <el-input
                          v-model="model.productEditing.Total"
                          disabled
                        ></el-input>
                      </el-form-item>-->


                      <el-form-item>
                        <div class="group-button tac">
                          <el-button
                            type="primary"
                            @click="handleUpdateProduct"
                          >
                            Cập nhật
                          </el-button>
                          <el-button @click="handleCloseEditProductModal">Hủy</el-button>
                        </div>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </div>
              </div>
            </el-card>
        </div>
        <div class="step-content__wrapper" style="padding-top: 20px;"></div>
      </div>
      <div class="col-lg-4 pd0">
        <el-card>
          <el-tabs>
            <el-tab-pane label="Đơn hàng">
              <div label="Đơn hàng">
                <div class="Order__ROOT">
                  <div class="contact__header">

                    <div class="col-lg-12 pd0">
                      <el-autocomplete :disabled="model.disabled" auto-complete="on" style="width: 100%" v-model="model.contact_search_keyword"
                                       :fetch-suggestions="querySearch" placeholder="Tìm khách hàng" @select="handleSelect" suffix-icon="el-icon-search">
                        <template slot-scope="props">
                          <span v-if="props.item.Name!==''"><b>Tên:</b> {{ props.item.Name }}</span>
                          <span v-if="props.item.IdentityCode && props.item.IdentityCode!==''">-  <b>Mã khách:</b> {{ props.item.IdentityCode }}</span>
                          <span v-if="props.item.Phone && props.item.Phone!==''">-  <b>SĐT:</b> {{ props.item.Phone }}</span>
                        </template>
                      </el-autocomplete>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                  <div class="contact__content" style="padding: 10px;">

                    <el-form :disabled="model.disabled" label-position="left" label-width="100px" :model="model.orderModel" ref="orderForm" :inline="false" :rules="model.orderRules">
                      <el-form-item label="Tên KH" prop="Name">
                        <el-input placeholder="Nguyễn Văn A" v-model="model.orderModel.Name"></el-input>
                      </el-form-item>
                      <el-form-item label="Điện thoại" prop="Phone">
                        <el-input type="number" placeholder="01234567890" v-model="model.orderModel.Phone"></el-input>
                      </el-form-item>
                      <el-form-item label="Mã hóa đơn" prop="BillCode">
                        <el-input placeholder="Mã hóa đơn" v-model="model.orderModel.BillCode"></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Thông tin">
              <div label="Khách hàng">
                <div class="Contact__ROOT">
                  <div class="contact__content" style="padding: 10px;">
                    <el-form :disabled="model.disabled" label-position="left" label-width="100px" :model="model.contactModel" ref="contactForm" :inline="false" :rules="model.contactRules" >
                      <el-form-item label="Mã KH" prop="CustomerCode">
                        <el-input placeholder="MA.0001" v-model="model.contactModel.CustomerCode"></el-input>
                      </el-form-item>
                      <el-form-item label="Mã liên hệ" prop="OfficialNumber">
                        <el-input placeholder="Mã liên hệ" v-model="model.contactModel.OfficialNumber"></el-input>
                      </el-form-item>
                      <!--<el-form-item label="Chiến dịch" prop="CampaignCode">-->
                        <!--<el-select v-model="model.contactModel.CampaignCode" value-key="Id" filterable >-->
                          <!--<el-option v-for="item in model.params.campaignCodes" :key="item.Id" :label="item.Name" :value="item"></el-option>-->
                        <!--</el-select>-->
                      <!--</el-form-item>-->
                      <el-form-item label="Chiến dịch" prop="CampaignCode">
                        <el-select v-model="model.campaignId" @change="changeCampaign" filterable >
                          <el-option v-for="item in model.params.campaignCodes" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="Giới tính" prop="Gender">
                        <el-select v-model="model.contactModel.Gender" value-key="Id">
                          <el-option v-for="item in model.params.genders" :key="item.Id" :label="item.Name" :value="item"></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="Nguồn KH" prop="Source">
                        <el-select v-model="model.contactModel.Source" value-key="Id" filterable clearable>
                          <el-option v-for="item in model.params.sources" :key="item.Id" :label="item.Name" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="Ngày sinh" prop="Birthday">
                        <el-date-picker v-model="model.contactModel.Birthday" type="date" format="dd/MM/yyyy" placeholder="01/01/1990">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item label="Tỉnh thành" prop="Location" >
                        <el-select v-model="model.contactModel.Location" value-key="Id" placeholder="Hà Nội" filterable clearable>
                          <el-option v-for="item in model.params.provinces" :key="item.Id" :label="item.Name" :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="Địa chỉ" prop="Address" >
                        <el-input type="textarea" :rows="3" v-model="model.contactModel.Address"></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
                <div class="pos-info__wrapper">
                  <div class="block__label">
                    Thông tin cửa hàng
                  </div>
                  <div class="block__wrapper">
                    <el-form :disabled="model.disabled" label-position="left" label-width="110px" ref="posForm" :rules="model.posRules" :model="model.posModel">
                      <el-form-item label="Cửa hàng" prop="pos">
                        <el-select v-model="model.posModel.pos" placeholder="Chọn cửa hàng" value-key="Id" filterable>
                          <el-option
                            v-for="item in model.params.poses"
                            :key="item.Id"
                            :label="item.Name"
                            :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="NV Bán hàng" prop="seller">
                        <el-select v-model="model.posModel.seller" placeholder="Chọn NV bán hàng" value-key="Id" filterable>
                          <el-option
                            v-for="item in model.params.users"
                            :key="item.Id"
                            :label="item.Name"
                            :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
            </el-tab-pane>

          </el-tabs>
          <div class="payment__wrapper">
            <div class="block__label">
              Thông tin thanh toán
            </div>
            <div class="block__wrapper">
              <el-form :disabled="model.disabled" label-position="left" label-width="120px" ref="paymentForm" :rules="model.paymentRules" :model="model.paymentModel">
                <el-form-item>
                  <template>
                    <span slot="label"><b>Tổng:</b></span>
                    <h2>
                      <strong>
                        {{format_currency(model.paymentModel.sum_of_payment)}} đ
                      </strong>
                    </h2>
                  </template>
                </el-form-item>
                <el-form-item>
                  <template>
                    <span slot="label"><b>Tiền khách trả:</b></span>
                    <span> {{format_currency(model.paymentModel.gaveMoney)}} đ</span>
                  </template>
                </el-form-item>
                <el-form-item>
                  <template>
                    <span slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tiền mặt:</span>
                    <el-input placeholder="1000000" v-model="model.paymentModel.cash"></el-input>
                  </template>
                </el-form-item>
                <el-form-item>
                  <template>
                    <span slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hội viên:</span>
                    <el-input placeholder="1000000" v-model="model.paymentModel.customerCard"></el-input>
                  </template>
                </el-form-item>
                <el-form-item>
                  <template>
                    <span slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Quẹt thẻ:</span>
                    <el-input placeholder="1000000" v-model="model.paymentModel.bankMoney"></el-input>
                  </template>
                </el-form-item>
                <el-form-item prop="change">
                  <template>
                    <span slot="label"> <b>Tiền trả lại:</b></span>
                    <span>{{model.paymentModel.change}} đ</span>
                  </template>
                </el-form-item>
                <el-form-item label="" label-width="0px">
                  <br/>
                  <el-button type="danger" class="btn btn-block " v-if="model.orderModel.MetaDescription==''" @click="save">Thanh toán</el-button>
                  <el-button  type="info" class="btn btn-block fa fa-print" v-if="model.orderModel.MetaDescription!=''"  @click="print">In</el-button>
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
