<template>
    <el-form :inline="!$isMobileDevice">
                    <el-form-item class="mb-0" label="">
                      <el-checkbox @change="onChangeDate" v-model="DateProject"><span >Theo khoảng thời gian</span></el-checkbox>
                    </el-form-item>                   
                    
                    <el-form-item class="mb-0" label="">
                      <el-checkbox @change="onChangeDueDate" v-model="DueDate"><span class="sm-none">Đến hạn</span></el-checkbox>
                    </el-form-item>    
                    <el-form-item class="mb-0" label="">
                      <el-checkbox @change="onChangeOverDue" v-model="OverDue"><span class="sm-none">Quá hạn</span></el-checkbox>
                    </el-form-item> 
                    <el-form-item class="mb-0" label="">
                      <el-select  @change="onChangeWorker" v-model="WorkerProject" filterable  placeholder="Nhân sự thực hiện" multiple
                                collapse-tags no-data-text="Không có dữ liệu">
                        <el-option-group
                          v-for="group in users"
                          :key="group.label"
                          :label="group.label">
                            
                          <el-option
                            v-for="item in group.options"
                            :key="item.UserId"
                            :label="item.Username"
                            :value="item.UserId">
                          </el-option>
                        </el-option-group>
                      </el-select>                        
                   </el-form-item>  

                   <el-form-item class="mb-0" label="">       
                      <el-select class="Status" @change="onChangeActive" v-model="UserActive"  placeholder="Trạng thái" 
                               no-data-text="Không có dữ liệu">
                        <el-option v-for="item in actives"
                                  :key="item.Id"
                                  :label="item.Name"
                                  :value="item.Id">
                        </el-option>
                      </el-select>  
                    </el-form-item>  

                    <el-form-item class="mb-0" label="">       
                      <el-select class="Status" @change="onChangeStatus" v-model="StatusTask" filterable  placeholder="Trạng thái" multiple
                                collapse-tags no-data-text="Không có dữ liệu">
                        <el-option v-for="item in status"
                                  :key="item.Id"
                                  :label="item.Name"
                                  :value="item.Id">
                        </el-option>
                      </el-select>  
                    </el-form-item >  
                     <span v-if="$isMobileDevice">
                       <el-button @click="resetFilter" >Lọc mặc định</el-button>
                       <el-button @click="onCloseFilter" >Đóng</el-button>
                    </span>
                  </el-form>
</template>
<script>
export default {
  props: {
    workers: {
      type: Array,
      default() {
        return [];
      }
    },
    status: {
      type: Object,
      default() {
        return [];
      }
    },
    actives: {
      type: Array,
      default() {
        return [
          { Id: "", Name: "Tất cả" },
          { Id: "1", Name: "Đang hoạt động" },
          { Id: "0", Name: "Không hoạt động" }
        ];
      }
    },
    onChangeOverDue: {
      type: Function
    },
    onResetFilter: {
      type: Function
    },
    onChangeDueDate: {
      type: Function
    },
    onChangeActive: {
      type: Function
    },
    onChangeStatus: {
      type: Function
    },
    onChangeProject: {
      type: Function
    },
    onChangeWorker: {
      type: Function
    },
    onChangeDate: {
      type: Function
    },
    onView: {
      type: Function
    },
    onToday: {
      type: Function
    },
    onPrev: {
      type: Function
    },
    onNext: {
      type: Function
    },
    switchView: {
      type: Function
    },
    onCloseFilter: {
      type: Function
    },

    isShowTask: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      VersionProject: [],
      WorkerProject: [],
      StatusTask: [],
      DateProject: true,
      DueDate: false,
      OverDue: false,
      UserActive: "",
      users: []
    };
  },
  watch: {
    workers: {
      handler: function(after, before) {
        var users = this.$Lodash.filter(after, u => {
          return u.LoginName != "superadmin" && u.LoginName != "admin";
        });
        this.active = this.$Lodash.filter(users, { Status: "1" });
        this.deactive = this.$Lodash.filter(users, { Status: "0" });
        this.users = [
          { label: "HOẠT ĐỘNG", options: this.active },
          { label: "KHÔNG HOẠT ĐỘNG", options: this.deactive }
        ];
      },
      deep: true
    }
  },
  methods: {
    resetFilter() {
      this.DateProject = true;
      this.WorkerProject = "";
      this.StatusTask = "";
      this.DueDate = false;
      this.OverDue = false;
      this.UserActive = "";
      this.onResetFilter(
        this.DateProject,
        this.WorkerProject,
        this.StatusTask,
        this.DueDate,
        this.OverDue,
        this.UserActive
      );
    }
  }
};
</script>
<style>
</style>

