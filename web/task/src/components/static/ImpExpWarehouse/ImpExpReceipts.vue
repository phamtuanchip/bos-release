<template>
  <el-tabs v-model="model.editableTabsValue" type="border-card" editable @edit="handleTabsEdit">
    <el-tab-pane v-for="(item, index) in model.editableTabs" :key="item.name" :label="item.title" :name="item.name">
      <ImpExpReceipt :item="item"></ImpExpReceipt>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
    import ImpExpReceipt from "./ImpExpReceipt";
    export default {
        name: "ImpExpReceipts",
      components: {ImpExpReceipt},
      data(){
        var model = {
          editableTabsValue: '1',
          editableTabs: [{
            title: 'Phiếu 1',
            name: '1',
          }],
          tabIndex: 1
        }
        var savedReciepts = this.$getItemLocalStorage('RECEIPTS');
        if(savedReciepts && savedReciepts!= 'undefined' && JSON.parse(savedReciepts).editableTabs.length>0){
          model =  JSON.parse(savedReciepts);
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
              title: 'Phiếu '+ newTabName,
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
              if(this.model.editableTabs.length ==1){
                let newTabName = ++this.model.tabIndex + '';
                this.model.editableTabs.push({
                  title: 'Phiếu ' + newTabName,
                  name: newTabName,
                });
                this.model.editableTabsValue = newTabName;
                this.model.editableTabs = this.model.editableTabs.filter(tab => tab.name !== targetName);
                delete localStorage[targetName];
                delete localStorage['RECEIPTS'];
              }else{
                let activeName = this.model.editableTabsValue;
                if (activeName === targetName) {
                  this.model.editableTabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                      let nextTab = this.model.editableTabs[index + 1] || this.model.editableTabs[index - 1];
                      if (nextTab) {
                        activeName = nextTab.name;
                      }
                    }
                  });
                }
                this.model.editableTabsValue = activeName;
                this.model.editableTabs = this.model.editableTabs.filter(tab => tab.name !== targetName);
                delete localStorage[targetName];
                this.$setItemLocalStorage('RECEIPTS', JSON.stringify(this.model));
              }

            }).catch(() => {
              // this.$message({
              //   type: 'info',
              //   message: 'Delete canceled'
              // });
            });
          }
        },
      },
      created (){
          this.$hub.$on('saveReceipts', ()=>{
            this.$setItemLocalStorage('RECEIPTS', JSON.stringify(this.model));
          })
      },
      destroyed (){
      }
    }
</script>

<style scoped>

</style>
