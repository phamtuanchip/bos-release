<template>
  <div>
    <div style="margin-bottom: 5px;" class="row">
      <div class="col">
        <el-button icon="fa fa-plus-square-o" @click="addTab"></el-button>
        <el-button icon="fa fa-folder-open-o" @click="openTab"></el-button>
      </div>
      <div class="col">
        <span v-for="color in Object.values(model.colors)"><i class="fa fa-square ml-3" :style="'color:'+ color.color"></i>{{color.text}}&nbsp</span>
      </div>
    </div>
    <el-tabs v-model="model.editableTabsValue" type="border-card" closable  @tab-remove="removeTab">
      <el-tab-pane v-for="(item, index) in model.editableTabs" :key="item.name" :label="item.title" :name="item.name">
        <AuditReceipt :item="item" :colors="model.colors"></AuditReceipt>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
    import AuditReceipt from "./AuditReceipt";
    export default {
      name: "AuditReceipts",
      components: {AuditReceipt},
      data(){
        var model = {
          editableTabsValue: '1',
          editableTabs: [{
            title: 'Phiếu 1',
            name: '1',
          }],
          tabIndex: 1,
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
        var savedReciepts = this.$getItemLocalStorage('AUDIT_RECEIPTS');
        if(savedReciepts && savedReciepts!= 'undefined' && JSON.parse(savedReciepts).editableTabs.length>0){
          model =  JSON.parse(savedReciepts);
        }

        return {
          model: model,
        }
      },
      methods: {
        openTab () {

        },
        addTab(targetName) {
          let newTabName = ++this.model.tabIndex + '';
          this.model.editableTabs.push({
            title: 'Phiếu '+ newTabName,
            name: newTabName,
          });
          this.model.editableTabsValue = newTabName;
        },
        removeTab(targetName) {
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
                delete localStorage['AUDIT_RECEIPTS'];
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
                this.$setItemLocalStorage('AUDIT_RECEIPTS', JSON.stringify(this.model));
              }

            }).catch(() => {
              // this.$message({
              //   type: 'info',
              //   message: 'Delete canceled'
              // });
            });

        },
      },
      created (){
          this.$hub.$on('saveAuditReceipts', ()=>{
            this.$setItemLocalStorage('AUDIT_RECEIPTS', JSON.stringify(this.model));
          })
      },
      destroyed (){
      }
    }
</script>

<style scoped>

</style>
