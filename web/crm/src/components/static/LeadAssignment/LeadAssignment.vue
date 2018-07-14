<template>
  <div>
    <div class="page-header mb-2">
      <div class="title-box py-1 px-3">
        <el-radio-group v-model="contactStoredType" @change="contactStoredTypeChanged">
          <el-radio-button label="all">Tất cả</el-radio-button>
          <el-radio-button label="new">Mới</el-radio-button>
          <el-radio-button label="warehouse">Kho</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-col :span="11">
      <CustomizableTable :tblData="notAssignedTableData"></CustomizableTable>
    </el-col>
    <el-col :span="2">
      <div style="text-align: center; height: 50vh; vertical-align: middle">
        <div>
          <el-button icon="el-icon-d-arrow-right"
                     @click="assign"></el-button>
        </div>
        <div>
          <el-button icon="el-icon-d-arrow-left"
                     @click="unAssign"></el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="11">
      <el-col :span="6">
        <el-row v-for="user in users">
          <el-radio v-model="activeTab" :label="user.LoginName">{{user.LoginName + '(0/0)'}}</el-radio><br>
        </el-row>
      </el-col>
      <el-col :span="18">
        <CustomizableTable :tblData="assignedTableData"></CustomizableTable>
      </el-col>
    </el-col>
  </div>
</template>

<script>
  import CustomizableTable from "../CustomizableTable"
    export default {
      name: "LeadAssignment",
      components : {
        CustomizableTable
      },
      methods : {
        contactStoredTypeChanged () {

        },
        assign () {
          this.updateProfileType('assign');
          this.contactLstForEachUser[this.activeTab] = this.contactLstForEachUser[this.activeTab].concat(this.selectedNotAssignedContactSet);
          this.assignedTableData.cellData = this.contactLstForEachUser[this.activeTab];
          this.notAssignedTableData.cellData = this.$Lodash.differenceBy(this.notAssignedTableData.cellData, this.selectedNotAssignedContactSet, 'Id');
        },
        unAssign () {
          this.updateProfileType('unAssign');
          this.notAssignedTableData.cellData = this.notAssignedTableData.cellData.concat(this.selectedAssignedContactSet);
          this.contactLstForEachUser[this.activeTab] = this.$Lodash.differenceBy(this.contactLstForEachUser[this.activeTab], this.selectedAssignedContactSet, 'Id');
          this.assignedTableData.cellData = this.contactLstForEachUser[this.activeTab];
        },
        updateProfileType (direction) {
          if(direction === 'assign'){

          } else if(direction === 'unAssign'){

          }
        },
        // getParams () {
        //   var request = {
        //     RequestClass: 'xBase',
        //     RequestAction: 'Request',
        //     TotalRequests: 1,
        //     R1_RequestTemplate: 'SettingNew.SearchSetting',
        //     R1_IncludedNestedSetParent: false,
        //     R1_ParentCode: 'xSetting.Project.Parameter.TaskSummaryTable.Color'
        //   }
        //   this.$Utils.postCheckResult(request).then((data)=> {
        //     data = this.$Utils.getDataWithRoot(data.R1, 'Data.DynamicDS.Setting');
        //     this.params = data;
        //   });
        // },
        getUsers () {
          var request = {
            RequestAction: "SearchUserWithGroups",
            IncludedGroupManager: "true",
            RequestClass: "BPM",
            RequestDataType: "json",
            ConditionFields: "IncludedGroupManager;GroupId;Status;LoginName;UserId",
            StaticFields: "UserId;Username;LoginName;Description;Status;",
            DynamicFields: "Avatar;Facebook;Email;Skype;Birthday;Biography;WorkProcess;Telephone",
            StructFields: "GroupRoot;GroupRootName;PhoneId;PhoneGroup;Public;RoleRoot;RoleRootName;GroupManage;Notification",
            OrderFields: "LoginName ASC",
            GroupId: "566e6707-458d-4c8c-bd22-9cfe2b1eaebd",//Nhân viên Sale
            Status: 1

          };
          this.$Utils.post(request).then((users) => {
            this.users = this.$Utils.getDataWithRoot(users, 'Data.UserDS.User').filter( user => {
              if(user.LoginName !='admin' && user.LoginName !='superadmin')
                this.contactLstForEachUser[user.LoginName] = [];
              else
                return false
              return true
            });
            this.activeTab = this.users[0].LoginName;
          });
        },
        getContacts () {
          var data = [{"Code":"Contact","Created":"2018-06-26T11:21:15+07:00","FacebookLink":"kh0001","FacebookName":"kh0001","FirstStore":"b4c58577-1858-4e94-b88b-393248ba5bb5","FirstStoreName":"Thái Hà","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"79f6a9c2-3a24-4b05-bf9d-e6baecabaccf","IdentityCode":"kh0001","IncomePerOder":"0","LastOrderDate":"2018-06-26T11:27:11","LeadSourceName":"Online","State":"1"},{"Address":"51 Hoa Đào, P.2. Q. Phú Nhuận,","Assitance":"67baeaed-9b7b-4be8-a2e6-886ab79ea9cb","AssitanceName":"TrangTT","Code":"Contact","Created":"2018-06-26T00:11:21+07:00","FacebookLink":"Miumiu Ha","FacebookName":"Miumiu Ha","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"d96a4215-6021-4eca-9c0f-f19097cf635d","IdentityCode":"S09.1258","IncomePerOder":"0","LastOrderDate":"2018-06-26T00:14:48","LeadSourceName":"Online","Location":"a6a2cdfe-1a38-456e-9ad3-8f5fe0e992bf","LocationName":"Hồ Chí Minh","Name":"Hà Lê Thanh Vy","Phone":"01652451487","State":"1"},{"Address":"58 đường Trường Sơn- p2 quận Tân Bình.","Assitance":"67baeaed-9b7b-4be8-a2e6-886ab79ea9cb","AssitanceName":"TrangTT","Code":"Contact","Created":"2018-06-26T00:05:38+07:00","FacebookLink":"Linh Thuy Nguyen","FacebookName":"Linh Thuy Nguyen","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"2ff4a7a9-15d5-4bc9-97be-8256cf49652a","IdentityCode":"S09.1257","IncomePerOder":"0","LastOrderDate":"2018-06-26T00:09:10","LeadSourceName":"Online","Location":"a6a2cdfe-1a38-456e-9ad3-8f5fe0e992bf","LocationName":"Hồ Chí Minh","Name":"chị linh","Phone":"0966408121","State":"1"},{"Address":"Trường đại học công nghệ thông tin và truyền thông thái nguyên. Tp thái nguyên.","Assitance":"be2d89a1-f120-4c36-ac79-c0858773b118","AssitanceName":"HuongPT","Code":"Contact","Created":"2018-06-25T23:30:21+07:00","FacebookLink":"https://graph.facebook.com/1033934653392563/picture?height=100&width=100","FacebookName":"Phuong Nguyen","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"d2eaff7c-c20d-4d6e-b012-96f7fcce9812","IdentityCode":"S011.0724","IncomePerOder":"0","LastOrderDate":"2018-06-25T23:35:01","LeadSourceName":"Online","Location":"f5da2ed1-00d2-4584-8c20-7e24474fbf4a","LocationName":"Thái Nguyên","Name":"Phuong Nguyen","Phone":"0934805888","State":"1"},{"Address":"tầng 9, số 1 Đại lộ Thăng Long, phường Mễ Trì, quận Năm Từ Liêm, thành phố Hà Nội","Assitance":"502351af-1a1f-4e8c-b48a-076cc84d73ae","AssitanceName":"Thuviec04","Code":"Contact","Created":"2018-06-25T23:26:20+07:00","FacebookLink":"https://www.facebook.com/profile.php?id=100006543874549","FacebookName":"Loan Nguyễn","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"3efc1c10-e321-47b4-b449-b91bf0e79dda","IdentityCode":"S010.0284","IncomePerOder":"0","LastOrderDate":"2018-06-25T23:30:17","LeadSourceName":"Online","Location":"753734e1-2c9a-40fb-a1b6-1c0013cb96e1","LocationName":"Hà Nội","Name":"Nguyễn Loan","Phone":"0969259123","State":"1"},{"Address":"tổ 7 khối 3 thị trấn diễn châu","Assitance":"be2d89a1-f120-4c36-ac79-c0858773b118","AssitanceName":"HuongPT","Code":"Contact","Created":"2018-06-25T23:21:46+07:00","FacebookLink":"https://graph.facebook.com/1915820632022393/picture?height=100&width=100","FacebookName":"Vo Giang","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Hight":"158.00","Id":"88ea8626-a554-43f2-b499-c8ac5f103239","IdentityCode":"S011.0723","IncomePerOder":"0","LastOrderDate":"2018-06-25T23:28:08","LeadSourceName":"Online","Location":"79305100-e50c-40c0-adbd-63cf40d6f8df","LocationName":"Nghệ An","Name":"Vo Giang","Phone":"01676198336","State":"1","Weight":"47.00"},{"Address":"Đ/c: Số 82 ngõ 116 phố nhân hòa HN","Assitance":"502351af-1a1f-4e8c-b48a-076cc84d73ae","AssitanceName":"Thuviec04","Code":"Contact","Created":"2018-06-25T23:21:14+07:00","FacebookLink":"https://www.facebook.com/halinh.bui.393","FacebookName":"Halinh Bui","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"76481265-eb38-4e2d-a637-af651b7582b1","IdentityCode":"S010.0283","IncomePerOder":"0","LastOrderDate":"2018-06-25T23:25:31","LeadSourceName":"Online","Location":"753734e1-2c9a-40fb-a1b6-1c0013cb96e1","LocationName":"Hà Nội","Name":"Chị Linh","Phone":"0915112533","State":"1"},{"Address":"xóm 4. diễn hùng. diễn châu. nghệ an","Assitance":"502351af-1a1f-4e8c-b48a-076cc84d73ae","AssitanceName":"Thuviec04","Code":"Contact","Created":"2018-06-25T23:16:38+07:00","FacebookLink":"https://www.facebook.com/profile.php?id=100004507060944","FacebookName":"Ngan Phan","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"c073c281-b407-4d03-9a3b-17b8cfabaa94","IdentityCode":"S010.0282","IncomePerOder":"0","LastOrderDate":"2018-06-25T23:21:00","LeadSourceName":"Online","Location":"79305100-e50c-40c0-adbd-63cf40d6f8df","LocationName":"Nghệ An","Name":"Phan Thị Kiều Ngân","Phone":"0917781567","State":"1"},{"Address":"Tháp T2, Times Tower, 35 Lê Văn Lương","Assitance":"be2d89a1-f120-4c36-ac79-c0858773b118","AssitanceName":"HuongPT","Code":"Contact","Created":"2018-06-25T23:16:34+07:00","FacebookLink":"https://graph.facebook.com/1300314623321389/picture?height=100&width=100","FacebookName":"Ngoc Doan","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"2349e439-a582-40b5-8149-091d85872163","IdentityCode":"S011.0722","IncomePerOder":"0","LastOrderDate":"2018-06-25T23:20:57","LeadSourceName":"Online","Location":"753734e1-2c9a-40fb-a1b6-1c0013cb96e1","LocationName":"Hà Nội","Name":"Ngoc Doan","Phone":"0972020259","State":"1"},{"Address":"Đ/c: khu 6 thị trấn than uyên huyện than uyên tỉnh lai châu","Assitance":"502351af-1a1f-4e8c-b48a-076cc84d73ae","AssitanceName":"Thuviec04","Code":"Contact","Created":"2018-06-25T23:09:46+07:00","FacebookLink":"https://www.facebook.com/profile.php?id=100007514867452","FacebookName":"Minh Thu","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Hight":"153.00","Id":"92561708-4292-4637-b7a4-059e80d015a8","IdentityCode":"S010.0281","IncomePerOder":"0","LastOrderDate":"2018-06-25T23:16:23","LeadSourceName":"Online","Location":"476be081-4b3d-40ca-9c4c-eb92a4b00d04","LocationName":"Lai Châu","Name":"Vũ Thị Minh Thu","Phone":"01234765666","State":"1","Weight":"46.00"},{"Address":"190 Lê lợi, phường 3, quận Gò vấp HCM","Assitance":"7558a158-4b8b-40d0-a070-1eefd184a7df","AssitanceName":"Thuviec02","Code":"Contact","Created":"2018-06-25T23:04:10+07:00","FacebookLink":"https://www.facebook.com/nanquynh","FacebookName":"Nguyen Vu An Quynh","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Hight":"158.00","Id":"04e29a56-7ce6-431c-9c79-3f4584b740cd","IdentityCode":"S06.1317","IncomePerOder":"0","LastOrderDate":"2018-06-25T23:08:32","LeadSourceName":"Online","Location":"a6a2cdfe-1a38-456e-9ad3-8f5fe0e992bf","LocationName":"Hồ Chí Minh","Name":"Quỳnh","Phone":"0905706086","State":"1","Weight":"56.00"},{"Address":"Đ/c: nhân viên trường THPT Nguyễn Trường Thuý, xóm 5 Thọ Nghiệp, Xuân Trường, Nam Định","Assitance":"efc542a4-b86b-4d19-bd84-52ee7af4a679","AssitanceName":"HangNTT","Code":"Contact","Created":"2018-06-25T22:32:21+07:00","FacebookLink":"https://www.facebook.com/profile.php?id=100008574109331","FacebookName":"Nguyễn Hiền","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Hight":"154.00","Id":"f767e817-6fc3-47e5-b8e1-cee4e3b0c373","IdentityCode":"S08.0759","IncomePerOder":"0","LeadSourceName":"Online","Location":"555076e9-09f0-4023-a0b6-713862b375f2","LocationName":"Nam Định","Name":"Tên KH: Nguyễn Thị Hiền","Phone":"01689341184","State":"1","Weight":"57.00"},{"Address":"Tổ dân phố 4b. Thị trấn đạ tẻh.đạ tẻh lâm đồng","Assitance":"efc542a4-b86b-4d19-bd84-52ee7af4a679","AssitanceName":"HangNTT","Code":"Contact","Created":"2018-06-25T22:31:09+07:00","FacebookLink":"https://www.facebook.com/profile.php?id=100007904747201","FacebookName":"Le Quynh","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"d9a5dfd6-53e9-4c0e-b9e0-53bd8e971796","IdentityCode":"S08.0758","IncomePerOder":"0","LastOrderDate":"2018-06-25T22:33:33","LeadSourceName":"Online","Location":"2997b3cd-4bfd-42bf-8d28-1c160b4acab5","LocationName":"Lâm Đồng","Name":"Le Quynh","Phone":"0932231257","State":"1"},{"Address":"Đ/c: Tổ dân phố 4b. Thị trấn đạ tẻh.đạ tẻh lâm đồng","Assitance":"efc542a4-b86b-4d19-bd84-52ee7af4a679","AssitanceName":"HangNTT","Code":"Contact","Created":"2018-06-25T22:30:29+07:00","FacebookLink":"https://www.facebook.com/profile.php?id=100007904747201","FacebookName":"Le Quynh","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Hight":"160.00","Id":"61fc3319-fdea-4309-9d85-9962a3ef5972","IdentityCode":"S08.0757","IncomePerOder":"0","LeadSourceName":"Online","Location":"2997b3cd-4bfd-42bf-8d28-1c160b4acab5","LocationName":"Lâm Đồng","Name":"Trà thị quỳnh lê","Phone":"0932231257","State":"1","Weight":"54.00"},{"Address":"Đại Lý Sim Thẻ Xuân Khoản - trung tâm Hoàng Tiến - chí linh - Hải Dương","Assitance":"efc542a4-b86b-4d19-bd84-52ee7af4a679","AssitanceName":"HangNTT","Code":"Contact","Created":"2018-06-25T22:28:28+07:00","FacebookLink":"https://www.facebook.com/thuykhoan7919","FacebookName":"Thuỷ Tiên","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"52b1e597-f69c-40bc-8187-36a49b327956","IdentityCode":"S08.0756","IncomePerOder":"0","LastOrderDate":"2018-06-25T22:30:46","LeadSourceName":"Online","Location":"f5afaa79-2bb0-46f9-ab8b-4ac302f0df31","LocationName":"Hải Dương","Name":"Thuỷ Tiên","Phone":"0988764484","State":"1"},{"Address":"Dc 77 đại lộ bình dương, lái thiêu, thuận an, bình dương","Assitance":"be2d89a1-f120-4c36-ac79-c0858773b118","AssitanceName":"HuongPT","Code":"Contact","Created":"2018-06-25T22:24:55+07:00","FacebookLink":"https://graph.facebook.com/10208678433750788/picture?height=100&width=100","FacebookName":"Ngo Thi Dai","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"80f4fc17-36a4-410e-8c98-07c87a86f640","IdentityCode":"S011.0721","IncomePerOder":"0","LastOrderDate":"2018-06-25T22:29:43","LeadSourceName":"Online","Location":"4171f826-5a7c-40bb-bc80-3a3bb02bf437","LocationName":"Bình Dương","Name":"Ngo Thi Dai","Phone":"01696522949","State":"1"},{"Address":"số nhà 66 ấp 4 xã tăng công chí huyện tăng hồng tỉnh đông tháp","Assitance":"efc542a4-b86b-4d19-bd84-52ee7af4a679","AssitanceName":"HangNTT","Code":"Contact","Created":"2018-06-25T22:23:51+07:00","FacebookLink":"không có","FacebookName":"khpoong có","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"fffe2bba-90be-4eb8-92ee-20c62547d88a","IdentityCode":"S08.0755","IncomePerOder":"0","LastOrderDate":"2018-06-25T22:27:03","LeadSourceName":"Vãng lai","Location":"93c22b84-6f4a-4c74-bf96-6a0dfa0ecbd0","LocationName":"Đồng Tháp","Name":"chị láng","Phone":"0919830399","State":"1"},{"Address":"Đ/c: 92 Trần Hưng Đạo (giờ hành chính)","Assitance":"efc542a4-b86b-4d19-bd84-52ee7af4a679","AssitanceName":"HangNTT","Code":"Contact","Created":"2018-06-25T22:21:05+07:00","FacebookLink":"https://www.facebook.com/thanhhuyen.bui.520357","FacebookName":"Thanh Huyền Bùi","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Hight":"155.00","Id":"1711701c-b553-4660-a88b-e0e48ad311d1","IdentityCode":"S08.0754","IncomePerOder":"0","LeadSourceName":"Online","Location":"753734e1-2c9a-40fb-a1b6-1c0013cb96e1","LocationName":"Hà Nội","Name":"BÙI THANH HUYỀN","Phone":"0985805710","State":"1","Weight":"48.00"},{"Address":"ố 8 võ văn kiệt, quận 1, tphcm","Assitance":"be2d89a1-f120-4c36-ac79-c0858773b118","AssitanceName":"HuongPT","Code":"Contact","Created":"2018-06-25T22:20:15+07:00","FacebookLink":"https://graph.facebook.com/973165142787646/picture?height=100&width=100","FacebookName":"Kim Phuong","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"0295f5c3-bb18-48b5-b736-7d2bc47e65b3","IdentityCode":"S011.0720","IncomePerOder":"0","LastOrderDate":"2018-06-25T22:23:47","LeadSourceName":"Online","Location":"a6a2cdfe-1a38-456e-9ad3-8f5fe0e992bf","LocationName":"Hồ Chí Minh","Name":"Kim Phuong","Phone":"0988954627","State":"1"},{"Address":"ố nhà 136 đường đinh tiên hoàng, phường long thủy, thị xã phước long tỉnh bình phước","Assitance":"efc542a4-b86b-4d19-bd84-52ee7af4a679","AssitanceName":"HangNTT","Code":"Contact","Created":"2018-06-25T22:18:14+07:00","FacebookLink":"https://www.facebook.com/profile.php?id=100008352677548","FacebookName":"Minh Trang Nguyen","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"24910467-9100-4b1d-a8db-9391ada076eb","IdentityCode":"S08.0753","IncomePerOder":"0","LastOrderDate":"2018-06-25T22:20:45","LeadSourceName":"Online","Location":"caaf1205-4c7e-412c-8a91-a18f8ce11a58","LocationName":"Bình Phước","Name":"Nguyễn thị minh trang","Phone":"0976605500","State":"1"},{"Address":"Đ/c: KĐT tây bắc_ đường bầu năng 12.số nhà 17 phường hòa minh quân liên chiểu. TP dà nẵng","Assitance":"efc542a4-b86b-4d19-bd84-52ee7af4a679","AssitanceName":"HangNTT","Code":"Contact","Created":"2018-06-25T22:16:10+07:00","FacebookLink":"https://www.facebook.com/yen.ho.75248795","FacebookName":"Kim Yến","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"220c528d-47bd-4ab2-84be-dd20d4bd8130","IdentityCode":"S08.0752","IncomePerOder":"0","LeadSourceName":"Online","Location":"df02a57b-4232-47b5-ba1e-21d6ecba19c3","LocationName":"Đà Nẵng","Name":"Tên KH: Kim Yến","Phone":"0935075739","State":"1"},{"Address":"Cty TNHH S-print. Đường số 3, KCN Long Thành, Đồng Nai","Assitance":"be2d89a1-f120-4c36-ac79-c0858773b118","AssitanceName":"HuongPT","Code":"Contact","Created":"2018-06-25T22:14:54+07:00","FacebookLink":"https://graph.facebook.com/554598814742865/picture?height=100&width=100","FacebookName":"Huynh Ngoc Thanh Nguyet","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"71941656-9e8e-40c6-9f49-5f55cbe40026","IdentityCode":"S011.0719","IncomePerOder":"0","LastOrderDate":"2018-06-25T22:19:13","LeadSourceName":"Online","Location":"eb882221-c70b-4c48-82b0-bec025ab8cfc","LocationName":"Đồng Nai","Name":"Huynh Ngoc Thanh Nguyet","Phone":"0918354033","State":"1"},{"Address":"khoa sản bệnh viện đa khoa Huyện bá thước tỉnh thanh hoá.","Assitance":"efc542a4-b86b-4d19-bd84-52ee7af4a679","AssitanceName":"HangNTT","Code":"Contact","Created":"2018-06-25T22:14:27+07:00","FacebookLink":"https://www.facebook.com/profile.php?id=100004947151654","FacebookName":"Nguyen Van","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"d2b35399-a55f-4c2e-9dc6-f816b325ecec","IdentityCode":"S08.0751","IncomePerOder":"0","LastOrderDate":"2018-06-25T22:17:25","LeadSourceName":"Online","Location":"6bcb1ce9-e591-491d-a0fc-7512138fc016","LocationName":"Thanh Hóa","Name":"Nguyen Van","Phone":"0914224468","State":"1"},{"Address":"K103 nguyễn tát thành,quận Hải Châu, tp Đn","Assitance":"be2d89a1-f120-4c36-ac79-c0858773b118","AssitanceName":"HuongPT","Code":"Contact","Created":"2018-06-25T18:23:45+07:00","FacebookLink":"https://graph.facebook.com/1348648938534894/picture?height=100&width=100","FacebookName":"Phan Phuong","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"9d47f51a-a5e5-4a33-b08f-4db3cfdc2f38","IdentityCode":"S011.0718","IncomePerOder":"0","LastOrderDate":"2018-06-25T18:28:30","LeadSourceName":"Online","Location":"df02a57b-4232-47b5-ba1e-21d6ecba19c3","LocationName":"Đà Nẵng","Name":"Phan Phuong","Phone":"0913428717","State":"1"},{"Code":"Contact","Created":"2018-06-25T18:05:11.7557151+07:00","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"9ec0f474-3624-4fda-b8f7-28f51d13aba3","IdentityCode":"TH.1474","LeadSourceName":"Vãng lai","Location":"753734e1-2c9a-40fb-a1b6-1c0013cb96e1","LocationName":"Hà Nội","Name":"chị hương","Phone":"01645909166","State":"1"},{"Address":"Nương - Kiên Thành - Lục Ngạn - Bắc Giang","Assitance":"7558a158-4b8b-40d0-a070-1eefd184a7df","AssitanceName":"Thuviec02","Code":"Contact","Created":"2018-06-25T18:00:43+07:00","FacebookLink":"https://www.facebook.com/profile.php?id=100004878932763","FacebookName":"Hạnh Nguyễn","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"7682138d-c929-4a5c-beaa-670553c2a67a","IdentityCode":"S06.1316","IncomePerOder":"0","LastOrderDate":"2018-06-25T18:12:37","LeadSourceName":"Online","Location":"0de26bd6-ca53-4de0-8987-6d0ab67ebfef","LocationName":"Bắc Giang","Name":"Hạnh","Phone":"0963808690","State":"1"},{"Address":"thôn đồng mít xã đồng tâm huyện Mỹ Đức Thành phố H N","Assitance":"7558a158-4b8b-40d0-a070-1eefd184a7df","AssitanceName":"Thuviec02","Code":"Contact","Created":"2018-06-25T17:49:35+07:00","FacebookLink":"https://www.facebook.com/hongtam.le.165","FacebookName":"Hoa Muống Biển","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Hight":"162.00","Id":"a579aeb2-3134-462c-8ffc-aaf9e5b1ec6a","IdentityCode":"S06.1315","IncomePerOder":"0","LastOrderDate":"2018-06-25T17:54:34","LeadSourceName":"Online","Location":"753734e1-2c9a-40fb-a1b6-1c0013cb96e1","LocationName":"Hà Nội","Name":"Trần Văn Hậu","Phone":"0988804305","State":"1","Weight":"59.00"},{"Address":"147/6 cmt 8 ninh kiều cần thơ","Assitance":"7558a158-4b8b-40d0-a070-1eefd184a7df","AssitanceName":"Thuviec02","Code":"Contact","Created":"2018-06-25T17:34:23+07:00","FacebookLink":"https://www.facebook.com/thanhthuy.le.5477","FacebookName":"My Thanh","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Hight":"153.00","Id":"a279785f-cb33-42cc-98af-ea957823aea2","IdentityCode":"S06.1314","IncomePerOder":"0","LastOrderDate":"2018-06-25T17:46:57","LeadSourceName":"Online","Location":"973206eb-c841-4e32-a757-b5ad2d2487f3","LocationName":"Cần Thơ","Name":"My Thanh","Phone":"0967385339","State":"1","Weight":"45.00"},{"Code":"Contact","Created":"2018-06-25T17:30:03.1889731+07:00","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"41ff6aea-c407-44c9-8a6b-dcfe944f26f7","IdentityCode":"TH.1473","LeadSourceName":"Vãng lai","Location":"753734e1-2c9a-40fb-a1b6-1c0013cb96e1","LocationName":"Hà Nội","Name":"chị huyền","Phone":"0986436818","State":"1"},{"Address":"382 hùng vương quy Nhơn bình định","Assitance":"67baeaed-9b7b-4be8-a2e6-886ab79ea9cb","AssitanceName":"TrangTT","Code":"Contact","Created":"2018-06-25T17:29:24+07:00","FacebookLink":"https://www.facebook.com/nhung.hong.5055","FacebookName":"HệŢhống Meseňgeř","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"fd989f5a-d21c-4ff7-8de5-3e65abeed2aa","IdentityCode":"S09.1251","IncomePerOder":"0","LastOrderDate":"2018-06-25T17:32:51","LeadSourceName":"Online","Location":"db623c83-1707-44a3-af43-b4b0e9d409a8","LocationName":"Bình Định","Name":"Nguyễn Thị Nhung","Phone":"0974150505","State":"1"},{"Address":"Thôn Trần xá xã yên trung yên phong Bắc ninh","Assitance":"7558a158-4b8b-40d0-a070-1eefd184a7df","AssitanceName":"Thuviec02","Code":"Contact","Created":"2018-06-25T17:24:19+07:00","FacebookLink":"https://www.facebook.com/hanhphuc.nhe.98284","FacebookName":"HanhPhuc Nhe","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Hight":"155.00","Id":"458e56be-2137-47dd-82b2-960920b68e3e","IdentityCode":"S06.1313","IncomePerOder":"0","LastOrderDate":"2018-06-25T17:29:11","LeadSourceName":"Online","Location":"178a18ac-0f15-46f5-8543-6f2057ac715f","LocationName":"Bắc Ninh","Name":"Nguyễn thị thọ","Phone":"01687070154","State":"1","Weight":"49.00"},{"Address":"18 ngô quyền hà nội","Assitance":"7558a158-4b8b-40d0-a070-1eefd184a7df","AssitanceName":"Thuviec02","Code":"Contact","Created":"2018-06-25T17:17:21+07:00","FacebookLink":"https://www.facebook.com/thoa.le.9847867","FacebookName":"Thoa Le","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Hight":"158.00","Id":"2bfac04d-7e81-4156-a8eb-f0c42ff55a3a","IdentityCode":"S06.1312","IncomePerOder":"0","LastOrderDate":"2018-06-25T17:22:29","LeadSourceName":"Online","Location":"753734e1-2c9a-40fb-a1b6-1c0013cb96e1","LocationName":"Hà Nội","Name":"lê thị thoa","Phone":"0915020159","State":"1","Weight":"52.00"},{"Address":"CT1, the Pride, KĐTM An Hưng, La Khê, Hà Đông, Hà Nội","Assitance":"67baeaed-9b7b-4be8-a2e6-886ab79ea9cb","AssitanceName":"TrangTT","Code":"Contact","Created":"2018-06-25T16:53:52+07:00","FacebookLink":"Ánh Nam Ngô","FacebookName":"Ánh Nam Ngô","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"ed097746-97e1-4ae6-b363-9d1e617b76e2","IdentityCode":"S09.1249","IncomePerOder":"0","LastOrderDate":"2018-06-25T17:38:00","LeadSourceName":"Online","Location":"753734e1-2c9a-40fb-a1b6-1c0013cb96e1","LocationName":"Hà Nội","Name":"Ngô Thị Ánh Nam","Phone":"0963922980","State":"1"},{"Code":"Contact","Created":"2018-06-25T16:43:17.6364525+07:00","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"7c38fddf-436b-4efe-8fb3-de41bf10fc22","IdentityCode":"TH.1472","LeadSourceName":"Vãng lai","Name":"chị uyên","Phone":"0983597523","State":"1"},{"Address":"thôn làng giữa xã bảo ái huyện yên bình tỉnh yên bái","Assitance":"43785304-ed3e-4398-b518-d2f30b75549f","AssitanceName":"Thuviec01","Code":"Contact","Created":"2018-06-25T16:36:41+07:00","FacebookLink":"https://www.facebook.com/hoakhongten.sp","FacebookName":"Moon","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"b7e40f88-1b85-49d0-ac56-dcea7fceae07","IdentityCode":"S05.2507","IncomePerOder":"0","LastOrderDate":"2018-06-25T16:40:03","LeadSourceName":"Online","Location":"4367416e-6b47-43a7-ba08-1d2c465873b5","LocationName":"Yên Bái","Name":"hà thị hằng","Phone":"01677065136","State":"1"},{"Address":"Trung tâm Bảo tồn Di tích Cố đô Huế. 23 Tống Duy Tân TP HUẾ","Assitance":"43785304-ed3e-4398-b518-d2f30b75549f","AssitanceName":"Thuviec01","Code":"Contact","Created":"2018-06-25T16:32:59+07:00","FacebookLink":"https://www.facebook.com/linhmai.tran.10","FacebookName":"Trần Linh Mai","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"f5875555-d8b2-4828-9f44-c1629df5c1a4","IdentityCode":"S05.2506","IncomePerOder":"0","LastOrderDate":"2018-06-25T16:35:47","LeadSourceName":"Online","Location":"2a64b04e-8a65-475d-b559-73840e415e28","LocationName":"Thừa Thiên - Huế","Name":"Trần Linh Mai.","Phone":"0914907440","State":"1"},{"Assitance":"720a3b70-13b2-478a-99e2-74ac5ce54256","AssitanceName":"TrangNTH","Code":"Contact","Created":"2018-06-25T15:51:38+07:00","FacebookLink":"https://www.facebook.com/profile.php?id=100006471067987","FacebookName":"Bé Yêu","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Hight":"150.00","Id":"56710575-70a4-45be-8289-dbe14d5fba67","IdentityCode":"S02.3449","IncomePerOder":"0","LeadSourceName":"Online","Location":"9ceaff79-568b-4e09-a7af-1f8cfa835aef","LocationName":"Tuyên Quang","State":"1","Weight":"45.00"},{"Address":"Thôn Cao Khánh Yên Lâm Yên Định Thanh Hóa","Assitance":"7558a158-4b8b-40d0-a070-1eefd184a7df","AssitanceName":"Thuviec02","Code":"Contact","Created":"2018-06-25T15:16:14+07:00","FacebookLink":"https://www.facebook.com/profile.php?id=100008536213243","FacebookName":"Loan Lưu","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Hight":"156.00","Id":"5f0d8964-98c0-4968-8b94-5f7174fc2f50","IdentityCode":"S06.1311","IncomePerOder":"0","LastOrderDate":"2018-06-25T15:23:09","LeadSourceName":"Online","Location":"6bcb1ce9-e591-491d-a0fc-7512138fc016","LocationName":"Thanh Hóa","Name":"Lưu Thi Loan","Phone":"0972601558","State":"1","Weight":"52.00"},{"Address":"số 18, ngõ 30, đường kim đồng, phố phúc long, phường phúc thành, tp Ninh bình","Assitance":"43785304-ed3e-4398-b518-d2f30b75549f","AssitanceName":"Thuviec01","Code":"Contact","Created":"2018-06-25T14:49:44+07:00","FacebookLink":"https://www.facebook.com/minh.nguyet.18488","FacebookName":"Claire Lune Duong","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"060ad737-5e38-41e9-9112-1a1386c1095b","IdentityCode":"S05.2505","IncomePerOder":"0","LastOrderDate":"2018-06-25T14:56:56","LeadSourceName":"Online","Location":"be1f3f3d-91de-4fd2-ad93-e4ea57c6b083","LocationName":"Ninh Bình","Name":"Dương Minh Nguyệt","Phone":"0912933192","State":"1"},{"Address":"ấp gò pháo xã hưng điền b tân hưng long an","Assitance":"43785304-ed3e-4398-b518-d2f30b75549f","AssitanceName":"Thuviec01","Code":"Contact","Created":"2018-06-25T14:44:22+07:00","FacebookLink":"https://www.facebook.com/kimtien.ngo.79","FacebookName":"Kim Tiến","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"b2aee745-f30b-40b9-a670-27be005dba12","IdentityCode":"S05.2504","IncomePerOder":"0","LastOrderDate":"2018-06-25T14:47:54","LeadSourceName":"Online","Location":"619b71b7-041e-4437-a01f-3cd1c0c845fb","LocationName":"Long An","Name":"Ngô thi kim Tiế n","Phone":"01693636392","State":"1"},{"Address":"xóm 4 tk 4 thị trấn hát lót mai sơn sơn la","Assitance":"43785304-ed3e-4398-b518-d2f30b75549f","AssitanceName":"Thuviec01","Code":"Contact","Created":"2018-06-25T14:40:55+07:00","FacebookLink":"https://www.facebook.com/tuyet.si.7","FacebookName":"Tuyet Si","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"6d66c754-b4d2-4b87-af3f-9bdcf2fc3a19","IdentityCode":"S05.2503","IncomePerOder":"0","LastOrderDate":"2018-06-25T14:43:44","LeadSourceName":"Online","Location":"d5262a9e-ad6a-4252-b8c2-7e95ba5d7d91","LocationName":"Sơn La","Name":"Tống thị tuyết","Phone":"01687439111","State":"1"},{"Address":"Điện lực Châu Thành F56 đường số 9 khu thương mại TT Ngã Sáu H. Châu Thành Tỉnh Hậu giang","Assitance":"43785304-ed3e-4398-b518-d2f30b75549f","AssitanceName":"Thuviec01","Code":"Contact","Created":"2018-06-25T14:32:27+07:00","FacebookLink":"https://www.facebook.com/dongdong.le.7","FacebookName":"Dongdong Le","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"47ef3ea0-9523-4626-af79-44a5747d4e84","IdentityCode":"S05.2502","IncomePerOder":"0","LastOrderDate":"2018-06-25T14:34:57","LeadSourceName":"Online","Location":"44525e9e-adc4-41f5-b637-6a768871c6e9","LocationName":"Hậu Giang","Name":"Chị Phụng","Phone":"0983811423","State":"1"},{"Address":"Nhà máy thủy điện Đa Nhim - Lâm Sơn - Ninh Sơn - Ninh Thuận","Assitance":"43785304-ed3e-4398-b518-d2f30b75549f","AssitanceName":"Thuviec01","Code":"Contact","Created":"2018-06-25T14:28:18+07:00","FacebookLink":"https://www.facebook.com/huong.lethu.564","FacebookName":"Huong Lethu","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"94d0868d-7333-4071-847e-d226aed1b20a","IdentityCode":"S05.2501","IncomePerOder":"0","LastOrderDate":"2018-06-25T14:30:54","LeadSourceName":"Online","Location":"22c59948-5179-4b37-90af-3856099cbc4f","LocationName":"Ninh Thuận","Name":"Lê Thu Hương","Phone":"0945137703","State":"1"},{"Address":"SN 16 ngõ 112 Định công thượng , Hoàng mai , Hà Nội","Assitance":"43785304-ed3e-4398-b518-d2f30b75549f","AssitanceName":"Thuviec01","Code":"Contact","Created":"2018-06-25T09:03:24+07:00","FacebookLink":"https://www.facebook.com/quen.quen.549668","FacebookName":"Gumiho Đắng","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"cc4a538c-6c65-42ad-bdc5-22f354399b59","IdentityCode":"S05.2499","IncomePerOder":"0","LastOrderDate":"2018-06-25T09:06:38","LeadSourceName":"Online","Location":"753734e1-2c9a-40fb-a1b6-1c0013cb96e1","LocationName":"Hà Nội","Name":"Lê thị cẩm","Phone":"01692714032","State":"1"},{"Address":"SN 992, tổ 6 thị trấn Việt Quang, huyện Bắc Quang, tỉnh Hà Giang.","Assitance":"720a3b70-13b2-478a-99e2-74ac5ce54256","AssitanceName":"TrangNTH","Code":"Contact","Created":"2018-06-24T23:04:05+07:00","FacebookLink":"https://www.facebook.com/huong.la.58118","FacebookName":"Hương Lã","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Hight":"157.00","Id":"3843732d-2d09-4adc-9f6b-c8d2374992f5","IdentityCode":"S02.3443","IncomePerOder":"0","LastOrderDate":"2018-06-24T23:07:00","LeadSourceName":"Online","Location":"8f1103a1-5ac1-4633-bd71-0958ee3e4631","LocationName":"Hà Giang","Name":"Lã Thị Lan Hương","Phone":"0985979356","State":"1","Weight":"52.00"},{"Address":"đài ptth bắc giang","Assitance":"efc542a4-b86b-4d19-bd84-52ee7af4a679","AssitanceName":"HangNTT","Code":"Contact","Created":"2018-06-24T23:02:17+07:00","FacebookLink":"https://www.facebook.com/profile.php?id=100010096710669","FacebookName":"Đào Huyền","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"8c0774e2-ab93-42de-aabd-e0fcbee4b9c8","IdentityCode":"S08.0734","IncomePerOder":"0","LastOrderDate":"2018-06-24T23:04:30","LeadSourceName":"Online","Location":"0de26bd6-ca53-4de0-8987-6d0ab67ebfef","LocationName":"Bắc Giang","Name":"Đào Huyền","Phone":"0979854913","State":"1"},{"Address":"tiểu khu đồng văn thị trấn đồng lê huyện tuyên hóa tỉnh Quảng binh","Assitance":"720a3b70-13b2-478a-99e2-74ac5ce54256","AssitanceName":"TrangNTH","Code":"Contact","Created":"2018-06-24T22:57:53+07:00","FacebookLink":"https://www.facebook.com/xiu.nguyen.940","FacebookName":"Xiu Nguyen","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Hight":"165.00","Id":"bdcd4841-cbb4-4d0f-be03-5a36c6d385df","IdentityCode":"S02.3442","IncomePerOder":"0","LastOrderDate":"2018-06-24T23:01:48","LeadSourceName":"Online","Location":"2e22df10-1a30-4f08-859a-37635d1ace97","LocationName":"Quảng Bình","Name":"Nguyễn thị hoa","Phone":"0965265149","State":"1","Weight":"54.00"},{"Address":"Duyên Trang,Hồng Thái ,Phú xuyên ,Hà nội","Assitance":"efc542a4-b86b-4d19-bd84-52ee7af4a679","AssitanceName":"HangNTT","Code":"Contact","Created":"2018-06-24T22:57:23+07:00","FacebookLink":"https://www.facebook.com/thituyetnhung.nguyen.587","FacebookName":"Thị Tuyết Nhung Nguyễn","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"5adf478a-713a-4596-a695-ac0921916e75","IdentityCode":"S08.0733","IncomePerOder":"0","LastOrderDate":"2018-06-24T22:59:48","LeadSourceName":"Online","Location":"753734e1-2c9a-40fb-a1b6-1c0013cb96e1","LocationName":"Hà Nội","Name":"Nguyễn thị tuyết Nhung","Phone":"0973991148","State":"1"},{"Address":"212B đường 17 phường Tân Kiểng q7-tphcm.","Assitance":"efc542a4-b86b-4d19-bd84-52ee7af4a679","AssitanceName":"HangNTT","Code":"Contact","Created":"2018-06-24T22:54:40+07:00","FacebookLink":"https://www.facebook.com/profile.php?id=100010482634620","FacebookName":"Đỗ Hải","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"6e2325b2-f03d-4ac9-8fe1-6dc091d26971","IdentityCode":"S08.0732","IncomePerOder":"0","LastOrderDate":"2018-06-24T22:56:59","LeadSourceName":"Online","Location":"a6a2cdfe-1a38-456e-9ad3-8f5fe0e992bf","LocationName":"Hồ Chí Minh","Name":"Đỗ thị Hải","Phone":"01695511992","State":"1"},{"Address":"Bệnh viện đa khoa khu vực Ninh Hoà - Khánh Hoà","Assitance":"720a3b70-13b2-478a-99e2-74ac5ce54256","AssitanceName":"TrangNTH","Code":"Contact","Created":"2018-06-24T22:54:23+07:00","FacebookLink":"https://www.facebook.com/isita.phung","FacebookName":"Isita Phùng","FirstStore":"35edff07-f347-4722-9b79-a2978cb3becc","FirstStoreName":"Online","Gender":"2474a7f4-7129-41e7-b7c9-dac8fa8e4424","GenderName":"Nữ","Id":"bf3f47bf-0cb9-4f96-8ddc-c8c8c2343343","IdentityCode":"S02.3441","IncomePerOder":"0","LastOrderDate":"2018-06-24T22:56:45","LeadSourceName":"Online","Location":"df6fabe5-9ed3-42fc-9e32-56e9b6d9adef","LocationName":"Khánh Hòa","Name":"Phùng Thị MInh Ý","Phone":"0978569192","State":"1"}]

          for(var i = this.startIndex; i<this.endIndex; i++ ){
            this.contactSet.push(data[i])
          }
          this.notAssignedTableData.cellData = this.contactSet;
        },
        colorifyText (row, column) {
          try {
            var returnCols = ""
            var cols = this.colors['TaskSummaryTable.Color.' + column.name];
            if(cols ==undefined)
              return '';
            $.each(cols.children, (k, val) => {
              var arr = val.Code.split('to');
              if(parseInt(arr[0]) <= row[column.name] && row[column.name] <= parseInt(arr[1])){
                returnCols = val.Color;
                return false
              }
            });
            return returnCols;
          }catch (e) {
            return '';
          }

        }
      },
      created () {
        // this.getParams();
        this.contactStoredType = 'all';
        this.getUsers();
        this.getContacts();
        this.$hub.$on('columnClicked', data => {
          if(data[1].clickableType == 'tool'){
            if(data[2].name == 'move'){
              this.updateProfileType([this.notAssignedTableData.cellData[data[0]]]);
              this.contactLstForEachUser[this.activeTab].push(this.notAssignedTableData.cellData[data[0]]);
              this.notAssignedTableData.cellData.splice(data[0], 1);
            }
          }
        })

        this.$hub.$on('rowsSelected', data => {
          if(data.name == 'notAssigned')
            this.selectedNotAssignedContactSet = data.data;
          else if(data.name == 'assigned') {
            this.selectedAssignedContactSet = data.data;
          }
        });
      },
      destroyed () {
        this.$hub.$off('columnClicked');
        this.$hub.$off('rowsSelected');
      },
      watch : {
        activeTab (newVal) {
          this.assignedTableData.cellData = this.contactLstForEachUser[newVal];
          this.selectedAssignedContactSet = [];
        },
        contactStoredType () {
          this.getContacts();
        }
      },
      data () {
        return {
          contactStoredType:'',
          contactSet: [],
          selectedNotAssignedContactSet: [],
          selectedAssignedContactSet: [],
          startIndex : 0,
          endIndex : 50,
          activeTab : "",
          params : {},
          users : {},
          contactLstForEachUser : {
          },
          notAssignedTableData : {
            tblName: 'notAssigned',
            colorifyText: this.colorifyText,
            hasMultiSelect: true,
            stripe: true,
            hasIndex: true,
            border: true,
            fit: false,
            width: "100%",
            cellData: [
            ],
            columns: [
              { label: "Tên", name: "Name", fixed: false, width: 250},
              { label: "Giới tính", name: "GenderName", fixed: false, width: 'auto'},
              { label: "SĐT", name: "Phone", fixed: false, width: 'auto'},
              { label: "Facebook", name: "FacebookName", fixed: false, width: 'auto'},
              { label: "Công cụ", clickableType : 'tool' , icons : [
                  {
                    class: 'icon-arrow-right-circle',
                    isClickable: true,
                    name: 'move'
                  }
                ] ,  fixed: false, width: 'auto'},
            ],
          },
          assignedTableData : {
            tblName: 'assigned',
            hasMultiSelect: true,
            colorifyText: this.colorifyText,
            stripe: true,
            hasIndex: true,
            border: true,
            fit: false,
            width: "100%",
            cellData: [],
            columns: [
              { label: "Tên", name: "Name", fixed: false, width: 250},
              { label: "Giới tính", name: "GenderName", fixed: false, width: 'auto'},
              { label: "SĐT", name: "Phone", fixed: false, width: 'auto'},
              { label: "Facebook", name: "FacebookName", fixed: false, width: 'auto'},
            ],
          },
        }
      }
    }
</script>

<style scoped>

</style>
