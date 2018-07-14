<template>
<div>
<el-collapse accordion v-model="activeNames">
  <el-collapse-item name="1">
    <template slot="title">
      Hướng dẫn sử dụng <i class="header-icon el-icon-info"></i>
    </template>
    <div>Chức năng này để thực hiện việc đưa sản phẩm <strong> mới </strong> vào các kho <strong> [Điểm Bán] </strong> hoặc <strong> [Online] </strong> để thực hiện quy trình tra tồn và bán hàng</div>
    <div>Việc chọn kho tương ứng sẽ khởi tạo thông tin sản phẩm và có số lượng <strong>[Tồn sẵn có] </strong> và <strong> [Tồn thực tế] </strong> bằng <strong>0 </strong>và chạy tự động</div>
    <div>Việc nhập bổ sung sản phẩm vào kho chỉ thực hiện sau khi <strong> [Sản phẩm] </strong> đã được thêm vào phần <strong>quản lý sản phẩm</strong></div>
    <div>Các bước thực hiện:</div>
    <div><strong>Bước 1:</strong> chọn kho cần bổ sung sản phẩm</div>
    <div><strong>Bước 2:</strong> nhấn nút <strong>[Bổ sung vào kho] </strong>hệ thống sẽ chạy tự động và bổ sung những sản phẩm mới vào kho tương ứng</div>
    <div><strong>Bước 3:</strong> kiểm tra kết quả, các trường thông tin bên bảng dưới <strong> [Số lượng sản phẩm], [Số lượng đã có trong kho],  [Số lượng bổ sung] </strong></div>
    <div><strong>Bước 4:</strong> sau khi hoàn tất quá trình, có thể bắt đầu <strong>  nhập xuất, luân chuyển </strong>  từ kho xưởng đến các kho để tiến hành cập nhật số lượng sản phẩm trong kho</div>

    
  </el-collapse-item>
   <el-form >
      <el-form-item label="Chọn kho">
        <el-select v-model="Calculator" clearable  value-key="Id" placeholder="Chọn" @change="handleChage" >
                <el-option
                  v-for="w in comboWarehouses"
                  :key="w.Id"
                  :label="w.Name"
                  :value="w">
                </el-option>
        </el-select>
        <el-button @click="Calculate()" v-if="comboWarehouses.length > 0 && comboProduct.length > 0 && Calculator">Bổ sung vào kho</el-button>
      </el-form-item>
     
      <!-- <el-button @click="excuteUpdate()" v-if="IsExcute">Bổ sung vào kho</el-button> -->
    </el-form>
    <el-table
      :data="ResultTable"
      style="width: 100%">
      <el-table-column
        prop="Date"
        label="Ngày"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Name"
        label="Tên kho"
        width="180">
      </el-table-column>
       <el-table-column
        prop="NumberProduct"
        label="Số lượng sản phẩm">
        <template slot-scope="scope">
            <span v-if="countFinish">{{scope.row.NumberProduct}}</span>
        </template>
      </el-table-column>
       <el-table-column
        prop="NumberInstock"
        label="Số lượng đã có trong kho">
      </el-table-column>
      <el-table-column
        prop="Number"
        label="Số lượng bổ sung">
      </el-table-column>
    </el-table>
</el-collapse>

 </div>   
</template>

<script>
import Vue from "vue";
import utilsLibrary from "@/services/utils";
export default {
  data() {
    return {
      Calculator: undefined,
      IsExcute: false,
      comboWarehouses: [],
      comboProduct: [],
      allWarehouse: [],
      DataSetting: {},
      objSetting: {},
      SumFields: [],
      MinFields: [],
      CountFields: [],
      AverageFields: [],
      ExpressionFields: [],
      calculatorRequest: [],
      rootData: [],
      countFinish: true,
      Index: 0,
      Increased: 100,
      comboCalculator: [],
      ResultTable: [{"Id":'',"Date": '', "Name":'',"NumberProduct":'', "NumberInstock" : '',  "Number":''}],
      activeNames: ['1']
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    handleChage(val){
      var ctrl = this;
      if(val && val != null) {
        ctrl.countFinish = false;        
        ctrl.ResultTable[0].Number = 0;        
        ctrl.ResultTable[0].Id = ctrl.Calculator.Id;        
        ctrl.ResultTable[0].Name = ctrl.Calculator.Name;        
        ctrl.ResultTable[0].NumberProduct = ctrl.comboProduct.length; 
          var requestCount = this.$Lodash.cloneDeep(this.$singleRequest);
          requestCount.R1_RequestTemplate = "xDocument_Document.Count";
          requestCount.R1_RequestDataGroup = "DataGroup.warehouse.0fd40";
          requestCount.R1_RequestFields = "Id;Code;Status";
          requestCount.R1_Status = ctrl.Calculator.Id;
          //requestCount.R1_MetaKeywords = cP.Barcode;
          requestCount.R1_Code = "Warehouse";
           utilsLibrary.post(requestCount).then(dataCount => {
           ctrl.ResultTable[0].NumberInstock = dataCount.R1.Data; 
           ctrl.countFinish = true;        

        });
      } else {
        ctrl.ResultTable[0].Number = '';        
        ctrl.ResultTable[0].Id = '';        
        ctrl.ResultTable[0].Name = '';        
        ctrl.ResultTable[0].NumberProduct = ''; 
        ctrl.ResultTable[0].NumberInstock = ''; 
      }
    },

    excuteUpdate() {
      ctrl.listLogs = { Success: 0, Failed: 0, Message: "", Updated: 0 };
      createUpdateRequest();
    },

    Calculate() {
      var ctrl = this;
      ctrl.ListExcuteRequests = [];
      ctrl.SumFields = {};
      ctrl.CountFields = {};
      ctrl.Index = 0;
      var index = 0;
      ctrl.Increased = 100;
      // array.splice(index, 1);
      var arr = ctrl.$Lodash.cloneDeep(ctrl.allWarehouse);
      var loadStart = utilsLibrary.showLoading('start');
      // $.each(ctrl.comboWarehouses, (kcw, cwH) => {
        //var num = 0;
        //ctrl.NumberInserted = 0 
        ctrl.ResultTable[0].Date = Vue.moment().format('DD/MM/YYYY  hh:mm');        
        $.each(ctrl.comboProduct, (kcP, cP) => {
          // $.each(ctrl.allWarehouse, (key, value) =>{
          //   if(cwH.Id == value.Status && cP.Barcode == value.MetaKeywords) {
          //     arr.splice(key, 1);
          //   }
          // })
          var request = this.$Lodash.cloneDeep(this.$singleRequest);
          request.R1_RequestTemplate = "xDocument_Document.Search";
          request.R1_RequestDataGroup = "DataGroup.warehouse.0fd40";
          request.R1_RequestFields = "Id;Code;Status;MetaKeywords";
          request.R1_Status = ctrl.Calculator.Id;
          request.R1_MetaKeywords = cP.Barcode;
          request.R1_Code = "Warehouse";
         
          utilsLibrary.post(request).then(data => {
            data = utilsLibrary.getDataWithRoot(
              data.R1,
              "Data.DocumentDS.Document"
            );
            if(data.length == 0){
              console.log(data)
              ctrl.Index ++;
              console.log(ctrl.Index)
              var uRequest = this.$Lodash.cloneDeep(this.$singleRequest);
              uRequest.R1_RequestTemplate = "xDocument_Document.Insert";
              uRequest.R1_RequestDataGroup = "DataGroup.warehouse.0fd40";
              uRequest.R1_RequestFields = "Id;MetaKeywords;OfficialNumber;ProductCode;CategoriesName;Categories;StatusName;Status;MetaDescriptionName;MetaDescription;Lead;ProductColorName;ProductColor;SizeName;Size;TotalPages;TotalAttachments;Priority;Id;Code;CategoriesName;ProductColorName;SizeName;StatusName;MetaDescriptionName;MetaTitle;Signer;Title;Source;";
              uRequest.R1_Status = ctrl.Calculator.Id;
              uRequest.R1_StatusName = ctrl.Calculator.Name;
              uRequest.R1_Code = "Warehouse";
              uRequest.R1_MetaKeywords = cP.Barcode
              uRequest.R1_OfficialNumber = cP.OfficialNumber
              uRequest.R1_ProductCode = cP.ProductCode
              uRequest.R1_CategoriesName = cP.CategoryName
              uRequest.R1_Categories = cP.Category
              uRequest.R1_MetaDescriptionName = cP.SubCodeName
              uRequest.R1_MetaDescription = cP.SubCode
              uRequest.R1_Lead = cP.CodeName
              uRequest.R1_ProductColorName = cP.ColorName
              uRequest.R1_ProductColor = cP.Color
              uRequest.R1_SizeName =  cP.SizeName
              uRequest.R1_Size = cP.Size
              uRequest.R1_MetaTitle = cP.Metarial
              uRequest.R1_Signer = cP.Style
              uRequest.R1_Title =  cP.ArmStyle
              uRequest.R1_Source = cP.NeckStyle
              uRequest.R1_TotalPages = cP.Price
              uRequest.R1_TotalAttachments = 0
              uRequest.R1_Priority = 0
              console.log(uRequest)
              utilsLibrary.postCheckResult(uRequest).then(result =>{
                //ctrl.NumberInserted++;
                ctrl.ResultTable[0].Number++ //= ctrl.NumberInserted;     
              // ctrl.$forceUpdate()
               console.log(result)
               // console.log(ctrl.NumberInserted)
              });
            }
            index++;
            if(kcP == ctrl.comboProduct.length - 1){
              utilsLibrary.showLoading('stop', loadStart);
            }
          })
        })
       
         
      // })
      console.log(ctrl.Calculator)
      console.log(ctrl.ResultTable)
      // var request = this.$Lodash.cloneDeep(this.$singleRequest);
      // request.R1_RequestTemplate = "xDocument_Document.Search";
      // request.R1_RequestDataGroup = "DataGroup.warehouses.01dh7";
      // request.R1_RequestFields = "";
      // request.R1_Code = "Warehouses";
      // utilsLibrary.post(request).then(data => {
      //   ctrl.comboWarehouses = utilsLibrary.getDataWithRoot(
      //     data.R1,
      //     "Data.DocumentDS.Document"
      //   );
      //   console.log(ctrl.comboWarehouses)
      // });
      // var Prequest = this.$Lodash.cloneDeep(this.$singleRequest);
      // Prequest.R1_RequestTemplate = "xDocument_Document.Search";
      // Prequest.R1_RequestDataGroup = "DataGroup.product.19jev";
      // Prequest.R1_Code = "Product";
      // Prequest.R1_RequestFields = "Id;Tool;FullCodeName;Name;Barcode;OfficialNumber;ProductCode;CategoryName;Category;Unit;Price;SubCodeName;SubCode;Style;ArmStyle;NeckStyle;Metarial;ColorName;Color;Size;CodeName;Quater;BarcodeQuantity;DesignCode;PrintTime;Id;Code;CategoryName;SubCodeName;ColorName;Size;";
      // utilsLibrary.post(Prequest).then(data => {
      //   ctrl.comboProduct = utilsLibrary.getDataWithRoot(
      //     data.R1,
      //     "Data.DocumentDS.Document"
      //   );
      //   console.log(ctrl.comboProduct)
      // });
    // }
    },

    // createUpdateRequest() {
    //   var isFinished = false;
    //   var request = this.$Lodash.cloneDeep(this.$singleRequest);
    //   request.TotalRequests = 0;
    //   var index = ctrl.Index;
    //   for (var i = 0; i < ctrl.Increased; i++) {
    //     if (index + i < ctrl.ListExcuteRequests.length) {
    //       ctrl.Index = index + i;
    //       request.TotalRequests++;
    //       request = utilsLibrary.updateParamsSingleRequest(
    //         request,
    //         ctrl.ListExcuteRequests[ctrl.Index],
    //         request.TotalRequests
    //       );
    //     } else break;
    //   }
    //   utilsLibrary.post(request).then((result) => {
    //     if (result.success) {
    //       if (result.success == true) {
    //         ctrl.listLogs.Updated = ctrl.listLogs.Updated + ctrl.Increased;
    //       } else {
    //         ctrl.listLogs.Failed = ctrl.listLogs.Failed + ctrl.Increased;
    //       }
    //       if (ctrl.Index == ctrl.ListExcuteRequests.length - 1)
    //         isFinished = true;
    //       else ctrl.Index++;
    //       if (!isFinished) {
    //         ctrl.listLogs.Success = ctrl.listLogs.Success + ctrl.Increased;
    //         createUpdateRequest();
    //       } else {
    //         ctrl.Index = 0;
    //         ctrl.listLogs.Success = ctrl.ListExcuteRequests.length;
    //         utilsLibrary.showMessage("success", "Cập nhật thành công!");
    //       }
    //     }
    //   });
    // },

    init() {
      var ctrl = this;
      ctrl.ListExcuteRequests = [];
      ctrl.SumFields = {};
      ctrl.CountFields = {};
      ctrl.Index = 0;
      ctrl.Increased = 100;
      var request = this.$Lodash.cloneDeep(this.$singleRequest);
      request.R1_RequestTemplate = "xDocument_Document.Search";
      request.R1_RequestDataGroup = "DataGroup.warehouses.01dh7";
      request.R1_RequestFields = "";
      request.R1_Code = "Warehouses";
      utilsLibrary.post(request).then(data => {
        ctrl.comboWarehouses = utilsLibrary.getDataWithRoot(
          data.R1,
          "Data.DocumentDS.Document"
        );
        console.log(ctrl.comboWarehouses)
      });
      var request = this.$Lodash.cloneDeep(this.$singleRequest);
      request.R1_RequestTemplate = "xDocument_Document.Search";
      request.R1_RequestDataGroup = "DataGroup.product.19jev";
      request.R1_Code = "Product";
      request.R1_RequestFields = "Id;Code;FullCodeName;Name;Barcode;OfficialNumber;ProductCode;CategoryName;Category;Unit;Price;SubCodeName;SubCode;Style;ArmStyle;NeckStyle;Metarial;ColorName;Color;Size;CodeName;Quater;BarcodeQuantity;DesignCode;PrintTime;Id;Code;CategoryName;SubCodeName;ColorName;SizeName;";
      console.log(request)
      utilsLibrary.postCheckResult(request).then(data => {
        ctrl.comboProduct = utilsLibrary.getDataWithRoot(
          data.R1,
          "Data.DocumentDS.Document"
        );
        console.log(ctrl.comboProduct)
      });

      // var request = this.$Lodash.cloneDeep(this.$singleRequest);
      // request.R1_RequestTemplate = "xDocument_Document.Search";
      // request.R1_RequestDataGroup = 'DataGroup.warehouse.0fd40';
      // request.R1_RequestFields = 'Id;Tool;MetaKeywords;OfficialNumber;ProductCode;CategoriesName;Categories;StatusName;Status;MetaDescriptionName;MetaDescription;Lead;ProductColorName;ProductColor;SizeName;Size;TotalPages;TotalAttachments;Priority;Id;Code;CategoriesName;ProductColorName;SizeName;StatusName;MetaDescriptionName;';
      // request.R1_Code = 'Warehouse';
      // utilsLibrary.post(request).then(data => {
      //   ctrl.allWarehouse = utilsLibrary.getDataWithRoot(
      //     data.R1,
      //     "Data.DocumentDS.Document"
      //   );
      //   console.log(ctrl.allWarehouse)
      // });
      // R1_RequestFields = Id;Tool;MetaKeywords;OfficialNumber;ProductCode;CategoriesName;Categories;StatusName;Status;MetaDescriptionName;MetaDescription;Lead;ProductColorName;ProductColor;SizeName;Size;TotalPages;TotalAttachments;Priority;Id;Code;CategoriesName;ProductColorName;SizeName;StatusName;MetaDescriptionName;
    // }
    }
  }
};
</script>
