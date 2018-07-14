<template>
  <el-tabs v-model="model.editableTabsValue" type="border-card" editable @edit="handleTabsEdit">
    <el-tab-pane v-for="(item, index) in model.editableTabs" :key="item.name" :label="item.title" :name="item.name">
      <POS :item="item"></POS>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
    import POS from "./POS";
    export default {
        name: "POSes",
      components: {POS},
      data(){
          var model = {
            editableTabsValue: '1',
            editableTabs: [{
              title: 'Hoá đơn 1',
              name: '1',
            }],
            tabIndex: 1
          }
          var savedPos = this.$getItemLocalStorage('POS');
          if(savedPos && savedPos!= 'undefined' && JSON.parse(savedPos).editableTabs.length>0){
            model =  JSON.parse(savedPos);
          }

        return {
          model: model,
        }
      },
      methods: {
        handleTabsEdit(targetName, action) {
          if (action === 'add') {
            let newTabName = ++this.model.tabIndex + '';
            this.model.editableTabs.push({
              title: 'Hoá đơn '+ newTabName,
              name: newTabName,
            });
            this.model.editableTabsValue = newTabName;
          }
          if (action === 'remove') {
              this.$confirm('Bạn muốn đóng, dữ liệu chưa lưu có thể bị hủy?', 'Warning', {
                cancelButtonText: 'Không',
                confirmButtonText: 'Có',
                type: 'warning'
              }).then(() => {
              this.$hub.$emit('closeTab', targetName);
              }).catch(() => {
                // this.$message({
                //   type: 'info',
                //   message: 'Delete canceled'
                // });
              });
          }
        },
        returnProductsToWH (data) {
          if(data.list){
            var idsToDel = [];
            idsToDel.push(data.orderId)
            var whReq = {
              RequestClass: 'xBase',
              RequestAction: 'Request',
              TotalRequests: data.list.length,
            }
            data.list.filter((v,k)=>{
              idsToDel.push(data.list[k].OrderPartId)
              whReq['R'+(k+1)+'_RequestFields'] ='Id;Code;Priority;UpdateWarehouse;FormSetting;Changed';
              whReq['R'+(k+1)+'_Code']= 'Warehouse';
              whReq['R'+(k+1)+'_RequestTemplate']= 'xDocument_Document.Update';
              whReq['R'+(k+1)+'_RequestDataGroup']= 'DataGroup.warehouse.0fd40';
              whReq['R'+(k+1)+'_UpdateWarehouse']= true;
              whReq['R'+(k+1)+'_Id']= v.Id;
              whReq['R'+(k+1)+'_Priority']= v.Quantity;
              whReq['R'+(k+1)+'_FormSetting']= data.formSetting;

              var changed = [{
                "ColumnCaption": "Số lượng( Tồn sẵn có)",
                "ColumnName": "Priority",
                "OldDisplayValue": "",
                "OldValue": "",
                "NewDisplayValue": v.Quantity + "",
                "NewValue": v.Quantity + ""
              },{
                "ColumnCaption": "Mã hoá đơn",
                "ColumnName": "FriendlyUrl",
                "OldDisplayValue": "",
                "OldValue": "",
                "NewDisplayValue": data.BillCode,
                "NewValue": ""
              },];
              whReq['R'+(k+1)+'_Changed']= JSON.stringify(changed);
            });
            this.$Utils.postCheckResult(whReq).then((whRes)=>{
              if(whRes.success){
                var delReq = {
                  RequestClass: 'xBase',
                  RequestAction: 'Request',
                  TotalRequests: idsToDel.length,
                }
                $.each(idsToDel, (index,val)=>{
                  delReq['R'+(index+1)+'_RequestTemplate'] = "xDocument_Document.Delete";
                  delReq['R'+(index+1)+'_Id'] = val;
                })
                this.$Utils.postCheckResult(delReq).then((delRes)=>{
                  if(delRes.success){
                    let tabs = this.model.editableTabs;
                    let activeName = this.model.editableTabsValue;
                    if (activeName === data.targetName) {
                      tabs.forEach((tab, index) => {
                        if (tab.name === data.targetName) {
                          let nextTab = tabs[index + 1] || tabs[index - 1];
                          if (nextTab) {
                            activeName = nextTab.name;
                          }
                        }
                      });
                    }
                    this.model.editableTabsValue = activeName;
                    this.model.editableTabs = tabs.filter(tab => tab.name !== data.targetName);
                    this.$setItemLocalStorage("POS", JSON.stringify(this.model));
                    let newTabName = ++this.model.tabIndex + '';
                    this.model.editableTabs.push({
                      title: 'Hoá đơn '+ newTabName,
                      name: newTabName,
                      content: 'New Tab content'
                    });
                    this.model.editableTabsValue = newTabName;
                  }
                });
              }
            });

          }else{

            let tabs = this.model.editableTabs;
            let activeName = this.model.editableTabsValue;
            if (activeName === data.targetName) {
              tabs.forEach((tab, index) => {
                if (tab.name === data.targetName) {
                  let nextTab = tabs[index + 1] || tabs[index - 1];
                  if (nextTab) {
                    activeName = nextTab.name;
                  }
                }
              });
            }
            this.model.editableTabsValue = activeName;
            this.model.editableTabs = tabs.filter(tab => tab.name !== data.targetName);
            this.$setItemLocalStorage("POS", JSON.stringify(this.model));

            if(this.model.editableTabs.length == 0) {
             let newTabName = ++this.model.tabIndex + '';
              this.model.editableTabs.push({
                title: 'Hoá đơn '+ newTabName,
                name: newTabName,
                content: 'New Tab content'
              });
              this.model.editableTabsValue = newTabName;
            }
          }
        }
      },
      created (){
        this.$hub.$on('deleteOrder', (data)=> {
          this.returnProductsToWH(data);
        });

        this.$hub.$on('saveToLocalStorage', ()=> {
          this.$setItemLocalStorage("POS", JSON.stringify(this.model));
        });
      },
      destroyed (){
          this.$hub.$off('deleteOrder');
          this.$hub.$off('saveToLocalStorage');
          this.$hub.$off('closeTab');
      }
    }
</script>

<style scoped>

</style>
