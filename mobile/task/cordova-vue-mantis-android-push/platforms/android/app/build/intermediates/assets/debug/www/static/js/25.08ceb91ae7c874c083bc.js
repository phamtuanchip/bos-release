webpackJsonp([25],{1014:function(e,t,a){var i=a(1015);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(932)("078f44be",i,!0)},1015:function(e,t,a){t=e.exports=a(931)(!0),t.push([e.i,".timeline-page .red-badge{color:red}.timeline-page .red-badge .el-badge__content{background-color:red;color:#fff}.timeline-page .el-badge__content{background-color:#ececec;color:#000}.timeline-page .hr{margin-top:10px;padding-top:10px;border-top:1px dashed #000}.timeline-page .hr .row{float:right}.timeline-page .chkbx{margin:0}.timeline-page .sidenav{height:100%;width:0;position:fixed;z-index:1;top:50;right:0;background-color:#fff;overflow-x:hidden;padding-top:30px;-webkit-transition:.5s;transition:.5s}.timeline-page .sidenav a{text-decoration:none;font-size:25px;color:#818181;display:block;-webkit-transition:.3s;transition:.3s}.timeline-page .menuTab{padding-left:5px}.timeline-page .sidenav a:hover{color:#f1f1f1}.timeline-page .sidenav .closebtn{position:absolute;top:0;right:10px;font-size:25px;margin-left:50px}.timeline-page #main{-webkit-transition:margin-left .5s;transition:margin-left .5s;padding:20px}.timeline-page #main .el-select{padding-bottom:10px}@media screen and (max-height:450px){.timeline-page .sidenav{padding-top:15px}.timeline-page .sidenav a{font-size:18px}}@media screen and (max-width:768px){.timeline-page .el-date-range-picker{overflow:auto!important;width:100%!important}}.timeline-page .left-scroll{max-height:83vh;overflow-y:scroll}.timeline-page .right-scroll{max-height:54vh;overflow-y:scroll}@media screen and (max-width:1366px){.timeline-page .left-scroll{max-height:79vh;overflow-y:scroll}.timeline-page .right-scroll{max-height:49vh;overflow-y:scroll}}@media screen and (max-width:1366px) and (max-width:375px){.timeline-page .left-scroll{max-height:77vh;overflow-y:scroll}}.timeline-page .pd-right-10{padding-right:10px}.timeline-page .padding-0{padding:0!important}.timeline-page .b-600{font-weight:600}.timeline-page body{font-size:13px}.timeline-page .span-block-border{text-align:center;width:60%;display:inline-block}.timeline-page .span-block-border span{margin:auto}.timeline-page .span-block-border .el-progress-bar__inner,.timeline-page .span-block-border .el-progress-bar__outer{border-radius:0}.timeline-page .el-progress-bar__innerText{color:#0b0e0f}.timeline-page .el-card__body{padding:5px 14px 5px 5px!important}.timeline-page .center-div{margin-left:auto;margin-right:auto;text-align:center;width:auto}.timeline-page .status .el-main{margin-bottom:10px}.timeline-page .rightaligndiv{padding-right:5px}.timeline-page .el-card{margin-bottom:5px;width:100%;overflow:visible}.timeline-page .round-image{border-radius:50%;max-height:50px;display:block;margin:auto}.timeline-page .target-header{font-size:16px}.timeline-page .el-container{color:#333;padding-top:5px}.timeline-page .el-main{padding:0}.timeline-page .el-main .el-container{padding:5px}.timeline-page .el-checkbox__label{margin-right:5px}.timeline-page .el-header{padding-top:5px;height:32px!important;line-height:27px;font-size:16px;background-color:#f0f3f5;border:1px solid #c2cfd6}.timeline-page .el-header .rightaligndiv{text-align:right}@media screen and (max-width:599px){.timeline-page .container-fluid{padding:0 5px!important}.timeline-page .timeline-page .el-header{height:32px!important}}","",{version:3,sources:["/Users/yuukininomae/Sites/vue-crm2/src/components/Timeline.vue"],names:[],mappings:"AASA,0BACI,SAAW,CACd,AACD,6CACM,qBAAsB,AACtB,UAAa,CAClB,AACD,kCACI,yBAA0B,AAC1B,UAAa,CAChB,AACD,mBACI,gBAAiB,AACjB,iBAAkB,AAClB,0BAA6B,CAChC,AACD,wBACM,WAAa,CAClB,AACD,sBACI,QAAY,CACf,AACD,wBACI,YAAa,AAEb,QAAS,AAET,eAAgB,AAEhB,UAAW,AAEX,OAAQ,AAER,QAAS,AACT,sBAAwB,AAExB,kBAAmB,AAEnB,iBAAkB,AAElB,uBAAyB,AACzB,cAAiB,CAEpB,AACD,0BACI,qBAAsB,AACtB,eAAgB,AAChB,cAAe,AACf,cAAe,AACf,uBAAyB,AACzB,cAAiB,CACpB,AACD,wBACI,gBAAkB,CACrB,AACD,gCACI,aAAe,CAClB,AACD,kCACI,kBAAmB,AACnB,MAAO,AACP,WAAY,AACZ,eAAgB,AAChB,gBAAkB,CACrB,AACD,qBACI,mCAAqC,AACrC,2BAA6B,AAC7B,YAAc,CACjB,AACD,gCACM,mBAAqB,CAC1B,AACD,qCACA,wBACM,gBAAkB,CACvB,AACD,0BACM,cAAgB,CACrB,CACA,AACD,oCACA,qCACM,wBAA0B,AAC1B,oBAAuB,CAC5B,CACA,AACD,4BACI,gBAAiB,AACjB,iBAAmB,CACtB,AACD,6BACI,gBAAiB,AACjB,iBAAmB,CACtB,AACD,qCACA,4BACM,gBAAiB,AACjB,iBAAmB,CACxB,AACD,6BACM,gBAAiB,AACjB,iBAAmB,CACxB,CACA,AACD,2DACA,4BACI,gBAAiB,AACjB,iBAAmB,CACtB,CACA,AACD,4BACI,kBAAoB,CACvB,AACD,0BACI,mBAAsB,CACzB,AACD,sBACI,eAAiB,CACpB,AACD,oBACI,cAAgB,CACnB,AACD,kCACI,kBAAmB,AACnB,UAAW,AACX,oBAAsB,CACzB,AACD,uCACM,WAAa,CAClB,AACD,oHAEM,eAAmB,CACxB,AACD,2CACI,aAAe,CAClB,AACD,8BACI,kCAAqC,CACxC,AACD,2BACI,iBAAkB,AAClB,kBAAmB,AACnB,kBAAmB,AACnB,UAAY,CACf,AACD,gCACI,kBAAoB,CACvB,AACD,8BACI,iBAAmB,CACtB,AACD,wBACI,kBAAmB,AACnB,WAAY,AACZ,gBAAkB,CACrB,AACD,4BACI,kBAAmB,AACnB,gBAAiB,AACjB,cAAe,AACf,WAAa,CAChB,AACD,8BACI,cAAgB,CACnB,AACD,6BACI,WAAY,AACZ,eAAiB,CACpB,AACD,wBACI,SAAa,CAChB,AACD,sCACM,WAAa,CAClB,AACD,mCACI,gBAAkB,CACrB,AACD,0BACI,gBAAiB,AACjB,sBAAwB,AACxB,iBAAkB,AAClB,eAAgB,AAChB,yBAA0B,AAC1B,wBAA0B,CAC7B,AACD,yCACM,gBAAkB,CACvB,AACD,oCACA,gCACM,uBAA4B,CACjC,AACD,yCACM,qBAAwB,CAC7B,CACA",file:"Timeline.vue",sourcesContent:["\n.timeline-page {\n  /* The side navigation menu */\n  /* The navigation menu links */\n  /* When you mouse over the navigation links, change their color */\n  /* Position and style the close button (top right corner) */\n  /* Style page content - use this if you want to push the page content to the right when you open the side navigation */\n  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */\n}\n.timeline-page .red-badge {\n    color: red;\n}\n.timeline-page .red-badge .el-badge__content {\n      background-color: red;\n      color: white;\n}\n.timeline-page .el-badge__content {\n    background-color: #ececec;\n    color: black;\n}\n.timeline-page .hr {\n    margin-top: 10px;\n    padding-top: 10px;\n    border-top: 1px dashed black;\n}\n.timeline-page .hr .row {\n      float: right;\n}\n.timeline-page .chkbx {\n    margin: 0px;\n}\n.timeline-page .sidenav {\n    height: 100%;\n    /* 100% Full-height */\n    width: 0;\n    /* 0 width - change this with JavaScript */\n    position: fixed;\n    /* Stay in place */\n    z-index: 1;\n    /* Stay on top */\n    top: 50;\n    /* Stay at the top */\n    right: 0;\n    background-color: white;\n    /* Black*/\n    overflow-x: hidden;\n    /* Disable horizontal scroll */\n    padding-top: 30px;\n    /* Place content 60px from the top */\n    -webkit-transition: 0.5s;\n    transition: 0.5s;\n    /* 0.5 second transition effect to slide in the sidenav */\n}\n.timeline-page .sidenav a {\n    text-decoration: none;\n    font-size: 25px;\n    color: #818181;\n    display: block;\n    -webkit-transition: 0.3s;\n    transition: 0.3s;\n}\n.timeline-page .menuTab {\n    padding-left: 5px;\n}\n.timeline-page .sidenav a:hover {\n    color: #f1f1f1;\n}\n.timeline-page .sidenav .closebtn {\n    position: absolute;\n    top: 0;\n    right: 10px;\n    font-size: 25px;\n    margin-left: 50px;\n}\n.timeline-page #main {\n    -webkit-transition: margin-left 0.5s;\n    transition: margin-left 0.5s;\n    padding: 20px;\n}\n.timeline-page #main .el-select {\n      padding-bottom: 10px;\n}\n@media screen and (max-height: 450px) {\n.timeline-page .sidenav {\n      padding-top: 15px;\n}\n.timeline-page .sidenav a {\n      font-size: 18px;\n}\n}\n@media screen and (max-width: 768px) {\n.timeline-page .el-date-range-picker {\n      overflow: auto !important;\n      width: 100% !important;\n}\n}\n.timeline-page .left-scroll {\n    max-height: 83vh;\n    overflow-y: scroll;\n}\n.timeline-page .right-scroll {\n    max-height: 54vh;\n    overflow-y: scroll;\n}\n@media screen and (max-width: 1366px) {\n.timeline-page .left-scroll {\n      max-height: 79vh;\n      overflow-y: scroll;\n}\n.timeline-page .right-scroll {\n      max-height: 49vh;\n      overflow-y: scroll;\n}\n}\n@media screen and (max-width: 1366px) and (max-width: 375px) {\n.timeline-page .left-scroll {\n    max-height: 77vh;\n    overflow-y: scroll;\n}\n}\n.timeline-page .pd-right-10 {\n    padding-right: 10px;\n}\n.timeline-page .padding-0 {\n    padding: 0 !important;\n}\n.timeline-page .b-600 {\n    font-weight: 600;\n}\n.timeline-page body {\n    font-size: 13px;\n}\n.timeline-page .span-block-border {\n    text-align: center;\n    width: 60%;\n    display: inline-block;\n}\n.timeline-page .span-block-border span {\n      margin: auto;\n}\n.timeline-page .span-block-border .el-progress-bar__outer,\n    .timeline-page .span-block-border .el-progress-bar__inner {\n      border-radius: 0px;\n}\n.timeline-page .el-progress-bar__innerText {\n    color: #0b0e0f;\n}\n.timeline-page .el-card__body {\n    padding: 5px 14px 5px 5px !important;\n}\n.timeline-page .center-div {\n    margin-left: auto;\n    margin-right: auto;\n    text-align: center;\n    width: auto;\n}\n.timeline-page .status .el-main {\n    margin-bottom: 10px;\n}\n.timeline-page .rightaligndiv {\n    padding-right: 5px;\n}\n.timeline-page .el-card {\n    margin-bottom: 5px;\n    width: 100%;\n    overflow: visible;\n}\n.timeline-page .round-image {\n    border-radius: 50%;\n    max-height: 50px;\n    display: block;\n    margin: auto;\n}\n.timeline-page .target-header {\n    font-size: 16px;\n}\n.timeline-page .el-container {\n    color: #333;\n    padding-top: 5px;\n}\n.timeline-page .el-main {\n    padding: 0px;\n}\n.timeline-page .el-main .el-container {\n      padding: 5px;\n}\n.timeline-page .el-checkbox__label {\n    margin-right: 5px;\n}\n.timeline-page .el-header {\n    padding-top: 5px;\n    height: 32px !important;\n    line-height: 27px;\n    font-size: 16px;\n    background-color: #f0f3f5;\n    border: 1px solid #c2cfd6;\n}\n.timeline-page .el-header .rightaligndiv {\n      text-align: right;\n}\n@media screen and (max-width: 599px) {\n.timeline-page .container-fluid {\n      padding: 0px 5px !important;\n}\n.timeline-page .timeline-page .el-header {\n      height: 32px !important;\n}\n}\n"],sourceRoot:""}])},1016:function(e,t,a){"use strict";(function(e){var i=a(104),s=a.n(i),n=a(3),o=a(291),r=a.n(o),l=a(103);n.default.use(r.a),t.a={inject:["statusColors","priorityColors","taskDone","overHours","listStatus","loggedUser","SessionId"],props:["default","sidebar"],data:function(){return{dateVal:null,selectedStatus:"",listStatuscount:[],ListStatus:[],ListTimeStatus:[],Total:0,listTargetDetail:[],timeline:[],startIndex:0,endIndex:20,datenow:new Date,start:"",end:"",datetimeFormat:"DD-MM-YYYY",requestDatetimeFormat:"YYYY-MM-DDThh:mm:ss",ListType:[{Id:"1",Name:"Mục tiêu công ty"},{Id:"2",Name:"Mục tiêu phòng ban"},{Id:"3",Name:"Mục tiêu cá nhân"}],loggedOnUser:JSON.parse(localStorage.getItem("LoggedOnUser")),loadingUp:!1,loadingDown:!1,dataLU:[],dataListUser:[],isSystemAdmin:this.$isSystemAdmin(),isMantisAdmin:this.$isMantisAdmin(),base:"/"===this.$appUri.BaseURL?"":this.$appUri.BaseURL,listAvatar:{},selectedWorker:"",dataPr:[],ListGroup:[],selectedProject:"",deadlineCheckbox:!1,overdateCheckbox:!1}},computed:{dateValString:function(){return null==this.dateVal?this.$rootScope.dateFilter:[n.default.moment(this.dateVal[0]).format("YYYY-MM-DD")+"T00:00:00",n.default.moment(this.dateVal[1]).format("YYYY-MM-DD")+"T23:59:59"]},overDueTask:function(){var e=this,t=this.$isSystemAdmin||this.$isMantisAdmin,a=this.timeline.filter(function(a){return-1==e.taskDone.indexOf(a.Status)&&e.$Utils.formatDateTime(a.Deadline,"DD/MM/YYYY")==e.$Utils.formatDateTime(new Date,"DD/MM/YYYY")&&(t||a.Worker.toUpperCase()==e.loggedOnUser.Id.toUpperCase())}),i=this.timeline.filter(function(a){return-1==e.taskDone.indexOf(a.Status)&&parseFloat(a.overHours+"")<0&&(t||a.Worker.toUpperCase()==e.loggedOnUser.Id.toUpperCase())});return[{Name:"Đến hạn",Count:a.length,Percentage:a.length>0?Math.round(100*a.length/this.timeline.length)>100?100:Math.round(100*a.length/this.timeline.length):0,Color:"Yellow"},{Name:"Quá hạn",Count:i.length,Percentage:i.length>0?Math.round(100*i.length/this.timeline.length)>100?100:Math.round(100*i.length/this.timeline.length):0,Color:"Red"}]}},methods:{beautifyTarget:function(e,t,a){var i=e&&""!=e?e+";":"";return i+=t&&""!=t?t+";":"",i+=a&&""!=a?a+";":"",""==i?"---":i},changeDeadlineCheckBox:function(){!0===this.overdateCheckbox&&(this.overdateCheckbox=!1),this.closeNav(),this.loadTask()},changeOverdateCheckBox:function(){!0===this.deadlineCheckbox&&(this.deadlineCheckbox=!1),this.closeNav(),this.loadTask()},openFilter:function(){document.getElementById("mySidenav").style.width="210px"},closeNav:function(){document.getElementById("mySidenav").style.width="0"},openTaskDetail:function(e){this.$router.push("/dynamic/view/Index="+e)},getDayAgo:function(e){if(void 0!=e){if(this.$Utils.formatDateTime(Date.Now,"DD/MM/YYYY")===this.$Utils.formatDateTime(e,"DD/MM/YYYY")){var t=new Date,a=new Date(e),i=t-a;return Math.round(i/60/60/1e3)>0?Math.round(i/60/60/1e3)+" giờ trước ":Math.round(i/60/1e3)<=0?"Vừa xong":Math.round(i/60/1e3)+" phút trước"}return Math.round(Math.abs((new Date-new Date(e))/864e5))+" ngày trước"}return""},changeProject:function(e){this.selectedProject=e,this.startIndex=0,this.endIndex=20,this.closeNav(),this.loadTask()},searchGroupOfUser:function(){var e=this,t=this.$Lodash.cloneDeep(this.$singleRequest);t.R1_RequestTemplate="tblGroup.Search",t.R1_RequestDataGroup="DataGroup.quan-ly-du-an.053gf",t.R1_RequestFields="GroupId;GroupName;GroupType;",t.R1_GroupType=4,t.R1_GroupId="",this.$isSystemAdmin()||this.$isMantisAdmin()||(t.R1_AssignedUser=this.$getItemLocalStorage(this.$localStorageConstant.SessionId)),this.$Utils.post(t).then(function(t){e.dataPr=e.$Utils.getDataWithRoot(t.R1,"Data.UserDS.Group")})},reload:function(){this.loadingUp=!0,this.startIndex=0,this.endIndex=20,this.loadTask(!1,!0)},loadmore:function(){this.loadingDown=!0,this.startIndex=this.endIndex+1,this.endIndex+=20,this.loadTask(!1,!0)},getDataByStatus:function(e){this.selectedStatus=e,this.closeNav(),this.reload()},loadTask:function(t,a){var i=this,s={RequestClass:"xBase",RequestAction:"Request",TotalRequests:1,R1_RequestTemplate:"AG_Task_Task.Search",R1_RequestDataGroup:"DataGroup.danh-sach-cong-viec.04b66",R1_RequestFields:"TotalDownload;TotalComment;Id;Index;Name;Status;Progress;StatusName;Content;PriorityIdName;PriorityId;PlanStartDate;Deadline;Modified;Manager;Worker;WorkerName;TaskRequest;StatusDisplay;StatusDisplayName;RestTime;RemainingManHour;PlanManHour;TargetsName;TargetsLevel1;TargetsLevel2;TargetsLevel3;TargetsLevel4;CategoriesLevel5;ProjectCategoriesLevel1;ProjectCategoriesLevel2;ChosenOneName;Targets;Subscribe;VersionProject;VersionProjectName",R1_StartIndex:this.startIndex,R1_EndIndex:this.endIndex,R1_AssignedUser:this.$getItemLocalStorage(this.$localStorageConstant.SessionId),R1_RequestOrderFields:"Modified DESC",R1_PlanStartDateStartValue:this.start,R1_PlanStartDateEndValue:this.end};""!==this.selectedStatus&&(s.R1_Status=this.selectedStatus),""!==this.selectedWorker&&(s.R1_Worker=this.selectedWorker),""!==this.selectedProject&&(s.R1_VersionProject=this.selectedProject),this.$route&&t&&this.$route.query&&e.each(this.$route.query,function(e,t){""!==t&&t&&(s["R1_"+e]=t,s["R2_"+e]=t),"VersionProject"===e&&(i.selectedProject=t)}),t||(""!==this.selectedStatus&&(s.R1_Status=this.selectedStatus),""!==this.selectedWorker&&(s.R1_Worker=this.selectedWorker),""!==this.selectedProject&&(s.R1_VersionProject=this.selectedProject),s.R1_PlanStartDateStartValue=this.start,s.R1_PlanStartDateEndValue=this.end),!0===this.deadlineCheckbox&&!1===this.overdateCheckbox&&(s.R1_DeadlineStartValue=this.$Utils.formatDateTime(new Date),s.R1_DeadlineEndValue=this.$Utils.formatDateTime(new Date,"YYYY-MM-DDT23:59:59"),s.R1_Status="db8e700c-78c6-4f35-9477-36e0335888f5;fab4fa55-cf1d-4625-8f65-8b43e832061b;05625d94-3884-4f00-9918-254c1216c6cd;5756c3d9-37a8-4032-bd6c-2a01161b73c7;bbc399a9-a2b4-45ad-b948-32e5623dc021"),!0===this.overdateCheckbox&&!1===this.deadlineCheckbox&&(s.R1_DeadlineStartValue=this.$Utils.formatDateTime(this.start,"YYYY-MM-DDT00:00:00"),s.R1_DeadlineEndValue=this.$Utils.formatDateTime(new Date),s.R1_Status="db8e700c-78c6-4f35-9477-36e0335888f5;fab4fa55-cf1d-4625-8f65-8b43e832061b;05625d94-3884-4f00-9918-254c1216c6cd;5756c3d9-37a8-4032-bd6c-2a01161b73c7;bbc399a9-a2b4-45ad-b948-32e5623dc021"),!0===a?this.$Utils.post(s).then(function(e){e=i.$Utils.getDataWithRoot(e,"R1.Data.TasksDS.Task"),0===i.startIndex?i.timeline=e:i.timeline=i.timeline.concat(e),i.timeline.filter(function(e){i.$Utils.expressionToString(e,"{{Deadline|DateTime:toNows}}");if(e.overHours=i.overHours(e),e.TargetsName){var t=e.TargetsName.split(";");t[0]&&(e.TargetLV1=t[0]),t[1]&&(e.TargetLV2=t[1]),t[2]&&(e.TargetLV3=t[2])}e.dayAgo=i.getDayAgo(e.Modified),isNaN(e.Progress)||void 0===e.Progress?e.Progress=0:e.Progress=Math.round(parseFloat(e.Progress)),e.Progress>100&&(e.Progress=100),e.DeadlineDisplay=i.$Utils.formatDateTime(e.Deadline,"DD/MM/YYYY"),e.PlanStartDateDisplay=i.$Utils.formatDateTime(e.PlanStartDate,"DD/MM/YYYY"),e.isDone=i.taskDone.indexOf(e.Status)>-1,e.TargetsName&&(e.TargetsName=e.TargetsName.replaceAll(";",", ")),e.priorityColor=i.priorityColors[e.PriorityId.toUpperCase()],e.statusColor=i.statusColors[e.Status.toUpperCase()]}),i.loadingUp=!1,i.loadingDown=!1}):this.$Utils.postCheckResult(s).then(function(e){e=i.$Utils.getDataWithRoot(e,"R1.Data.TasksDS.Task"),0===i.startIndex?i.timeline=e:i.timeline=i.timeline.concat(e),i.timeline.filter(function(e){i.$Utils.expressionToString(e,"{{Deadline|DateTime:toNows}}");if(e.overHours=i.overHours(e),e.TargetsName){var t=e.TargetsName.split(";");t[0]&&(e.TargetLV1=t[0]),t[1]&&(e.TargetLV2=t[1]),t[2]&&(e.TargetLV3=t[2])}e.dayAgo=i.getDayAgo(e.Modified),isNaN(e.Progress)||void 0===e.Progress?e.Progress=0:e.Progress=Math.round(parseFloat(e.Progress)),e.Progress>100&&(e.Progress=100),e.DeadlineDisplay=i.$Utils.formatDateTime(e.Deadline,"DD/MM/YYYY"),e.PlanStartDateDisplay=i.$Utils.formatDateTime(e.PlanStartDate,"DD/MM/YYYY"),e.isDone=i.taskDone.indexOf(e.Status)>-1,e.TargetsName&&(e.TargetsName=e.TargetsName.replaceAll(";",", ")),e.priorityColor=i.priorityColors[e.PriorityId.toUpperCase()],e.statusColor=i.statusColors[e.Status.toUpperCase()]}),i.loadingUp=!1,i.loadingDown=!1})},loadStatusData:function(t){var a=this,i=this.$Lodash.cloneDeep(this.$singleRequest),n=s()(this.listStatus);i.TotalRequests=n.length;for(var o=0;o<n.length;o++)i["R"+(o+1)+"_RequestTemplate"]="AG_Task_Task.Count",i["R"+(o+1)+"_RequestDataGroup"]="DataGroup.danh-sach-cong-viec.04b66",i["R"+(o+1)+"_PlanStartDateStartValue"]=this.start,i["R"+(o+1)+"_PlanStartDateEndValue"]=this.end,i["R"+(o+1)+"_Status"]=n[o].Id,i["R"+(o+1)+"_AssignedUser"]=this.SessionId,this.selectedWorker&&(i["R"+(o+1)+"_Worker"]=this.selectedWorker),this.$route&&this.$route.query&&e.each(this.$route.query,function(e,t){""!==t&&t&&(i["R"+(o+1)+"_"+e]=t)}),t||(this.selectedWorker&&(i["R"+(o+1)+"_Worker"]=this.selectedWorker),i["R"+(o+1)+"_PlanStartDateStartValue"]=this.start,i["R"+(o+1)+"_PlanStartDateEndValue"]=this.end);this.$Utils.post(i).then(function(e){a.listStatuscount=[],a.ListStatus=[],a.Total=0;for(var t=0;t<n.length;t++){var i=a.$Utils.getDataWithRoot(e["R"+(t+1)],"Data");i=parseInt(i),a.Total+=i;var s={Name:n[t].Name,Count:i,Id:n[t].Id,Color:n[t].Color};a.listStatuscount.push(s)}a.listStatuscount.forEach(function(e){var t={Name:e.Name,Count:e.Count,Id:e.Id,Color:e.Color,Percentage:e.Count>0?Math.round(100*e.Count/a.Total)>100?100:Math.round(100*e.Count/a.Total):0};a.ListStatus.push(t)})})},searchAvatar:function(){var e=this,t={RequestAction:"SearchUserWithGroups",IncludedGroupManager:"true",RequestClass:"BPM",RequestDataType:"json",ConditionFields:"IncludedGroupManager;Group;Status;LoginName",StaticFields:"UserId;Username;LoginName;Description;Status;",DynamicFields:"Avatar;Facebook;Email;Skype;Birthday;Biography;WorkProcess;Telephone",StructFields:"GroupRoot;GroupRootName;",OrderFields:"LoginName ASC",GroupType:"1"};this.$Utils.post(t).then(function(t){t=e.$Utils.getDataWithRoot(t,"Data.UserDS.User"),e.dataLU=t,t.forEach(function(t){e.$set(e.listAvatar,t.UserId,e.loadAvatar(t.Avatar))})})},loadAvatar:function(e){return void 0==e&&(e="assets/images/avatars/profile.png"),e=e.replace("profile.jpg","profile.png"),"assets/images/avatars/profile.png"===e?this.$appUri.BaseURL+e:this.$appUri.BaseURL+e.replace("/","")+"&Height=50&Width=50"},showTaskDetail:function(e,t){t?(this.$set(e,"activeName",t),this.$hub.$emit("set-modal-data","Chi tiết công việc","60%",!0,"center",l.a,!0,"",e)):this.$hub.$emit("set-modal-data","Chi tiết công việc","60%",!0,"center",l.a,!0,"",e)},subscribe:function(t,a){var i=this,s=t.Subscribe+"";if(t.Subscribe=a?t.Subscribe.split(";").filter(function(e){return e!=i.$Utils.getUserInfo("UserId")}).join(";")+";":(t.Subscribe?t.Subscribe:"")+this.$Utils.getUserInfo("UserId"),a){var n={RequestAction:"SearchLinked",RequestClass:"Addition",ConditionFields:"Parent;Code;Child",StaticFields:"Code;Child;Parent;Name;Created;Description",OrderFields:"Created DESC",Parent:t.Id,Child:this.$Utils.getUserInfo("UserId"),Code:"Subscribe;Email"};this.$Utils.post(n).then(function(t){var a=1==t.TotalCount?[t.Data.DataDS.Linked]:t.Data.DataDS.Linked;if(void 0!=a){var s={RequestClass:"xBase",RequestAction:"Request",TotalRequests:a.length,RequestTemplate:"Permission.Remove"};e.each(a,function(e,t){s["R"+(e+1)+"_Id"]=t.Id,s["R"+(e+1)+"_Parent"]=t.Parent,s["R"+(e+1)+"_Child"]=t.Child,s["R"+(e+1)+"_Code"]=t.Code}),i.$Utils.post(s).then(function(e){})}})}else{var o={RequestClass:"xBase",Parent:t.Id,Child:this.$Utils.getUserInfo("UserId"),Code:"Subscribe",Name:"Subscribe",RequestAction:"LinkUserToObject",ParentTable:"xObject",ChildTable:"tblUser",RequestTemplate:"Permission.Insert"};this.$Utils.post(o).then(function(e){});var r={RequestClass:"xBase",Parent:t.Id,Child:this.$Utils.getUserInfo("UserId"),Code:"Email",Name:"Email",RequestAction:"LinkUserToObject",ParentTable:"xObject",ChildTable:"tblUser",RequestTemplate:"Permission.Insert"};this.$Utils.post(r).then(function(e){})}var l={RequestClass:"xBase",RequestAction:"Request",TotalRequests:1,R1_RequestTemplate:"AG_Task_Task.Update",R1_RequestDataGroup:"DataGroup.danh-sach-cong-viec.04b66",R1_RequestFields:"Id;Subscribe",R1_Id:t.Id,R1_Subscribe:t.Subscribe};this.$Utils.post(l).then(function(e){e.success||(t.Subscribe=s,i.$message.error("Có lỗi")),i.$forceUpdate()})}},created:function(){this.model={}},mounted:function(){var e=this;this.searchAvatar(),this.$rootScope.selectedWorkerId&&this.$rootScope.selectedWorkerId.forEach(function(t){e.selectedWorker+=t+";"}),this.searchGroupOfUser(),this.$rootScope.dateFilter&&this.$rootScope.dateFilter.length>2&&(this.start=n.default.moment(this.$rootScope.dateFilter[0]).format("YYYY-MM-DD")+"T00:00:00",this.end=n.default.moment(this.$rootScope.dateFilter[1]).format("YYYY-MM-DD")+"T23:59:59"),this.$hub.$on("datePicked",function(t){e.start=n.default.moment(t[0]).format("YYYY-MM-DD")+"T00:00:00",e.end=n.default.moment(t[1]).format("YYYY-MM-DD")+"T23:59:59",e.loadStatusData(),e.loadTask()}),this.$hub.$on("workerPicked",function(t){var a="";t.forEach(function(e){a+=e+";"}),e.selectedWorker=a,e.loadStatusData(),e.loadTask()}),this.loadStatusData(!0),this.loadTask(!0),this.model.Project=[this.loggedOnUser.Project.GroupId];var t=this.$Utils.updateParamsSingleRequest(this.$Lodash.cloneDeep(this.$singleRequest),{ParentCode:"xSetting.Project.Parameter.Organization.Target",RequestOrderFields:"LeftIndex ASC",RequestClass:"xBase",RequestAction:"Request",RequestDataGroup:"DataGroup.muc-tieu.091fb",RequestFields:"Plan;Done;Progress;Unit;Assigned;AssignedName;Owner;OwnerName;TargetType;Id;Index;Code;Name;Value;Description;LeftIndex;ParentId;Level;Value;RightIndex;Created;CreatedBy;Modified;ActualStartDate;ActualFinishDate",RequestTemplate:"xDynamicData_Setting.Search",AssignedUser:this.SessionId});this.$Utils.post(t).then(function(t){t=e.$Utils.getDataWithRoot(t,"R1.Data.DynamicDS.Setting");var a=t,i=localStorage.getItem("UserId");a.forEach(function(t,a){t.isOwner=!1,t.isAssigned=!1,t.Owner&&t.Owner.toLowerCase().indexOf(i)>-1&&(t.isOwner=!0),t.Assigned&&t.Assigned.toLowerCase().indexOf(i)>-1&&(t.isAssigned=!0),t.GroupName="",e.$Utils.isEmpty(t.Modified)&&(t.Modified=e.$Utils.formatDateTime(t.Modified,"HH:mm DD-MM-YYYY")),isNaN(t.Progress)||void 0===t.Progress?t.Progress=0:(t.Progress=Math.round(parseFloat(t.Progress)),t.Progress>100&&(t.Progress=100)),e.listTargetDetail.push(t)})})},watch:{}}}).call(t,a(2))},1017:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"timeline-page"},[a("div",{staticClass:"sidenav border-box",attrs:{id:"mySidenav"}},[a("a",{staticClass:"closebtn",attrs:{href:"javascript:void(0)"},on:{click:function(t){e.closeNav()}}},[e._v("×")]),e._v(" "),a("div",{attrs:{id:"main"}},[a("el-select",{attrs:{clearable:"",placeholder:"Dự án"},on:{change:function(t){e.changeProject(e.selectedProject)}},model:{value:e.selectedProject,callback:function(t){e.selectedProject=t},expression:"selectedProject"}},e._l(e.dataPr,function(e){return a("el-option",{key:e.GroupId,attrs:{label:e.GroupName,value:e.GroupId}})})),e._v(" "),a("el-select",{attrs:{placeholder:"Trạng thái",clearable:""},on:{change:function(t){e.getDataByStatus(e.selectedStatus)}},model:{value:e.selectedStatus,callback:function(t){e.selectedStatus=t},expression:"selectedStatus"}},e._l(e.ListStatus,function(e){return a("el-option",{key:e.Id,attrs:{value:e.Id,label:e.Name}})})),e._v(" "),a("div",{staticClass:"row chkbx"},[a("el-checkbox",{on:{change:function(t){e.changeDeadlineCheckBox()}},model:{value:e.deadlineCheckbox,callback:function(t){e.deadlineCheckbox=t},expression:"deadlineCheckbox"}},[e._v("Đến hạn")])],1),e._v(" "),a("div",{staticClass:"row chkbx"},[a("el-checkbox",{on:{change:function(t){e.changeOverdateCheckBox()}},model:{value:e.overdateCheckbox,callback:function(t){e.overdateCheckbox=t},expression:"overdateCheckbox"}},[e._v("Quá hạn")])],1)],1)]),e._v(" "),a("el-row",{class:e.$isMobileDevice?"padding-0":"",attrs:{gutter:20}},[a("el-col",{class:e.$isMobileDevice?"padding-0":"pr-2",attrs:{xs:24,sm:24,md:18,lg:18}},[a("el-container",{class:e.$isMobileDevice?"padding-0":""},[a("el-header",{staticStyle:{padding:"0px 5px"}},[a("el-row",{staticStyle:{width:"100%"}},[a("el-col",{staticClass:"leftaligndiv text-nowrap",attrs:{span:e.$isMobileDevice?18:6}},[a("span",{staticStyle:{"font-size":"14px","padding-left":"5px"}},[a("i",{staticClass:"fa fa-list-alt"}),a("span",[a("b",[e._v(" Thời gian")])])]),e._v(" "),e.$isMobileDevice?a("router-link",{attrs:{to:{path:"/dynamic/view-all-task-page",query:{PlanStartDateStartValue:e.dateValString[0],PlanStartDateEndValue:e.dateValString[1]}}}},[a("i",{staticClass:"fa fa-table"}),a("span",[e._v(" Danh sách")])]):e._e(),e._v(" "),e.$isMobileDevice?a("router-link",{attrs:{to:"/scrumboard"}},[a("i",{staticClass:"fa fa-trello"}),a("span",[e._v("  Bảng")])]):e._e()],1),e._v(" "),a("el-col",{staticClass:"rightaligndiv",attrs:{span:e.$isMobileDevice?6:18}},[a("el-checkbox",{directives:[{name:"show",rawName:"v-show",value:!e.$isMobileDevice,expression:"!$isMobileDevice"}],on:{change:function(t){e.changeDeadlineCheckBox()}},model:{value:e.deadlineCheckbox,callback:function(t){e.deadlineCheckbox=t},expression:"deadlineCheckbox"}},[e._v("Đến\n                hạn\n              ")]),e._v(" "),a("el-checkbox",{directives:[{name:"show",rawName:"v-show",value:!e.$isMobileDevice,expression:"!$isMobileDevice"}],on:{change:function(t){e.changeOverdateCheckBox()}},model:{value:e.overdateCheckbox,callback:function(t){e.overdateCheckbox=t},expression:"overdateCheckbox"}},[e._v("Quá\n                hạn\n              ")]),e._v(" "),a("el-select",{directives:[{name:"show",rawName:"v-show",value:!e.$isMobileDevice,expression:"!$isMobileDevice"}],attrs:{clearable:"",placeholder:"Dự án"},on:{change:function(t){e.changeProject(e.selectedProject)}},model:{value:e.selectedProject,callback:function(t){e.selectedProject=t},expression:"selectedProject"}},e._l(e.dataPr,function(e){return a("el-option",{key:e.GroupId,attrs:{label:e.GroupName,value:e.GroupId}})})),e._v(" "),a("el-select",{directives:[{name:"show",rawName:"v-show",value:!e.$isMobileDevice,expression:"!$isMobileDevice"}],attrs:{placeholder:"Trạng thái",clearable:""},on:{change:function(t){e.getDataByStatus(e.selectedStatus)}},model:{value:e.selectedStatus,callback:function(t){e.selectedStatus=t},expression:"selectedStatus"}},e._l(e.ListStatus,function(e){return a("el-option",{key:e.Id,attrs:{value:e.Id,label:e.Name}})})),e._v(" "),a("i",{directives:[{name:"show",rawName:"v-show",value:e.$isMobileDevice&&(""!==e.selectedStatus||""!==e.selectedProject||e.deadlineCheckbox||e.overdateCheckbox),expression:"$isMobileDevice && (selectedStatus !== '' || selectedProject !== '' || deadlineCheckbox || overdateCheckbox)"}],staticClass:"fa fa-filter fa-lg",staticStyle:{color:"#00aced"},on:{click:function(t){e.openFilter()}}}),e._v(" "),a("i",{directives:[{name:"show",rawName:"v-show",value:e.$isMobileDevice&&""===e.selectedStatus&&""===e.selectedProject&&!e.deadlineCheckbox&&!e.overdateCheckbox,expression:"$isMobileDevice && selectedStatus === '' && selectedProject === '' && !deadlineCheckbox && !overdateCheckbox"}],staticClass:"fa fa-filter fa-lg",on:{click:function(t){e.openFilter()}}})],1)],1)],1),e._v(" "),a("el-main",[a("el-container",{attrs:{direction:"vertical"}},[a("v-infinite-scroll",{staticClass:"left-scroll",attrs:{offset:0},on:{bottom:function(t){e.loadmore()},top:function(t){e.reload()}}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.loadingUp,expression:"loadingUp"}],staticStyle:{"text-align":"center"}},[a("i",{staticClass:"el-icon-loading"}),e._v("  Đang tải...\n              ")]),e._v(" "),e._l(e.timeline,function(t){return a("el-card",{key:t.Id,staticClass:"box-card"},[a("div",{staticClass:"text item"},[a("el-row",{staticStyle:{display:"flex","align-items":"center"}},[a("el-col",{staticClass:"mr-2",attrs:{xs:4,md:3}},[a("div",[a("div",{staticStyle:{"text-align":"center"}},[a("img",{staticClass:"round-image",attrs:{src:e.listAvatar[t.Worker]}})]),e._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("div",{staticStyle:{overflow:"hidden"}},[e._v(e._s(t.WorkerName))]),e._v(" "),a("div",{staticClass:"b-600"},[e._v(e._s(t.dayAgo))])])])]),e._v(" "),a("el-col",{attrs:{xs:20,md:21}},[a("el-row",[a("span",{staticClass:"b-600"},[e._v("Công việc:\n                          "),a("a",{attrs:{href:"javascript:void(0)"},on:{click:function(a){e.showTaskDetail(t)}}},[a("span",{style:"text-decoration:"+(t.isDone?"line-through":"")},[e._v("\n                              "+e._s(t.Index)+" - "+e._s(t.Name)+"\n                            ")])])]),e._v(" "),a("br"),e._v(" "),a("span",[a("span",{staticClass:"b-600"},[e._v("Mục tiêu: ")]),e._v(" "+e._s(t.TargetsName&&""!==t.TargetsName?t.TargetsName:"---"))]),e._v(" "),a("br"),e._v(" "),a("span",[a("span",{staticClass:"b-600"},[e._v("Dự án: ")]),e._v(" "+e._s(t.VersionProjectName&&""!==t.VersionProjectName?t.VersionProjectName:"---"))]),e._v(" "),a("br"),e._v(" "),a("span",[a("span",{staticClass:"b-600"},[e._v("Bắt đầu: ")]),e._v(" "+e._s(t.PlanStartDateDisplay)+" | "),a("span",{staticClass:"b-600"},[e._v("Ước tính: ")]),e._v(" "+e._s(t.PlanManHour)+" | "),a("span",{staticClass:"b-600"},[e._v("Kết thúc:  ")]),e._v(e._s(t.DeadlineDisplay)+" | "),a("span",{staticClass:"b-600"},[e._v("Thực tế: ")]),e._v(" "+e._s(t.RemainingManHour))])]),e._v(" "),a("el-row",[a("el-col",{attrs:{xs:24,md:6}},[a("el-row",{staticStyle:{"text-align":"left"}},[a("el-col",{attrs:{xs:12,md:11}},[a("span",{staticClass:"b-600"},[e._v("Hoàn thành:")])]),e._v(" "),a("el-col",{attrs:{xs:12,md:13}},[a("div",{staticClass:"span-block-border"},[a("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,percentage:t.Progress}})],1)])],1)],1),e._v(" "),a("el-col",{attrs:{xs:24,md:5}},[a("el-row",{staticStyle:{"text-align":"left"}},[a("el-col",{attrs:{xs:12,md:11}},[a("span",{staticClass:"b-600"},[e._v("Ưu tiên: ")])]),e._v(" "),a("el-col",{attrs:{xs:12,md:13}},[a("div",{staticClass:"span-block-border",style:"background-color:"+t.priorityColor},[a("span",[e._v(e._s(t.PriorityIdName))])])])],1)],1),e._v(" "),a("el-col",{attrs:{xs:24,md:7}},[a("el-row",{staticStyle:{"text-align":"left"}},[a("el-col",{attrs:{xs:12,md:11}},[a("span",{staticClass:"b-600"},[e._v("Trạng thái: ")])]),e._v(" "),a("el-col",{attrs:{xs:12,md:13}},[a("div",{staticClass:"span-block-border",style:"background-color:"+t.statusColor},[a("span",[e._v(e._s(t.StatusName))])])])],1)],1),e._v(" "),e.$isMobileDevice?a("el-col",{staticClass:"hr"},[a("div",{staticClass:"row"},[a("div",{class:parseFloat(t.overHours+"")<0?"red-badge col":"col"},[a("el-badge",{staticClass:"item",attrs:{value:t.overHours,max:99}},[a("i",{staticClass:"fa fa-clock-o "})])],1),e._v(" "),a("div",{staticClass:"col"},[a("el-badge",{staticClass:"item",attrs:{value:t.TotalDownload?t.TotalDownload:0,max:99}},[a("i",{staticClass:"fa fa-paperclip "})])],1),e._v(" "),a("div",{staticClass:"col"},[a("el-badge",{staticClass:"item",staticStyle:{cursor:"pointer"},attrs:{value:t.TotalComment?t.TotalComment:0,max:99}},[a("i",{staticClass:"fa fa-comment-o ",on:{click:function(a){e.showTaskDetail(t,!0)}}})])],1),e._v(" "),a("div",{staticClass:"col"},[t.Subscribe&&-1!=t.Subscribe.indexOf(e.$Utils.getUserInfo("UserId"))?a("div",{staticStyle:{color:"red"},on:{click:function(a){e.subscribe(t,!0)}}},[a("i",{staticClass:"fa fa-flag-o "})]):a("div",{on:{click:function(a){e.subscribe(t,!1)}}},[a("i",{staticClass:"fa fa-flag-o "})])])])]):a("el-col",{attrs:{md:6}},[a("el-row",[a("el-col",{attrs:{span:6,offset:8}},[a("div",{class:parseFloat(t.overHours+"")<0?"red-badge":""},[a("el-badge",{staticClass:"item",attrs:{value:t.overHours,max:99}},[a("i",{staticClass:"fa fa-clock-o "})])],1)]),e._v(" "),a("el-col",{attrs:{span:4}},[a("el-badge",{staticClass:"item",attrs:{value:t.TotalDownload?t.TotalDownload:0,max:99}},[a("i",{staticClass:"fa fa-paperclip "})])],1),e._v(" "),a("el-col",{attrs:{span:4}},[a("el-badge",{staticClass:"item",staticStyle:{cursor:"pointer"},attrs:{value:t.TotalComment?t.TotalComment:0,max:99}},[a("i",{staticClass:"fa fa-comment-o ",on:{click:function(a){e.showTaskDetail(t,!0)}}})])],1),e._v(" "),a("el-col",{staticStyle:{cursor:"pointer"},attrs:{span:2}},[t.Subscribe&&-1!=t.Subscribe.indexOf(e.$Utils.getUserInfo("UserId"))?a("div",{staticStyle:{color:"red"},on:{click:function(a){e.subscribe(t,!0)}}},[a("i",{staticClass:"fa fa-flag-o "})]):a("div",{on:{click:function(a){e.subscribe(t,!1)}}},[a("i",{staticClass:"fa fa-flag-o "})])])],1)],1)],1)],1)],1)],1)])}),e._v(" "),a("br"),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.loadingDown,expression:"loadingDown"}],staticStyle:{"text-align":"center"}},[a("i",{staticClass:"el-icon-loading"}),e._v("  Đang tải...\n              ")]),e._v(" "),!e.loadingDown&&e.loadingUp&&0==e.timeline.length?a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"center-div"},[e._v("Không có dữ liệu")])]):e._e()],2)],1)],1)],1)],1),e._v(" "),a("el-col",{staticClass:"hidden-sm-and-down pl-2",attrs:{md:6,lg:6}},[a("el-container",{staticClass:"status",attrs:{direction:"vertical"}},[a("el-row",{staticStyle:{width:"100%"}},[a("el-header",[a("span",[e._v("Công việc theo trạng thái")])]),e._v(" "),a("el-main",[a("el-container",{staticStyle:{"background-color":"#fff"},attrs:{direction:"vertical"}},e._l(e.ListStatus,function(t){return a("el-row",{key:t.Id,staticStyle:{width:"100%"}},[a("el-col",{attrs:{span:6}},[e._v("\n                  "+e._s(t.Name)+"\n                ")]),e._v(" "),a("el-col",{attrs:{span:4}},[e._v("\n                  "+e._s(t.Count)+"\n                ")]),e._v(" "),a("el-col",{attrs:{span:14}},[a("el-progress",{attrs:{percentage:t.Percentage,"text-inside":!0,"stroke-width":18,color:t.Color}})],1)],1)}))],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"}},[a("el-header",[a("span",[e._v("Công việc theo tiến độ")])]),e._v(" "),a("el-main",[a("el-container",{staticStyle:{"background-color":"#fff"},attrs:{direction:"vertical"}},e._l(e.overDueTask,function(t){return a("el-row",{key:t.Id,staticStyle:{width:"100%"}},[a("el-col",{attrs:{span:6}},[e._v("\n                  "+e._s(t.Name)+"\n                ")]),e._v(" "),a("el-col",{attrs:{span:4}},[e._v("\n                  "+e._s(t.Count)+"\n                ")]),e._v(" "),a("el-col",{attrs:{span:14}},[a("el-progress",{attrs:{percentage:t.Percentage,"text-inside":!0,"stroke-width":18,color:t.Color}})],1)],1)}))],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"}},[a("el-header",[a("span",[e._v("Danh mục mục tiêu")])]),e._v(" "),a("el-main",{staticClass:"right-scroll"},e._l(e.listTargetDetail,function(t){return a("el-card",{key:t.Id,staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("a",{staticClass:"target-header",attrs:{href:"#"}},[e._v(e._s(t.Name))]),e._v(" "),a("div",{staticClass:"owner"},[1==t.TargetType?a("div",[a("i",{staticClass:"fa fa-users fa-lg mt-4"}),a("span",[a("b",[e._v(" Phòng:")]),e._v(" "+e._s(t.GroupName)+" "),a("br"),e._v(" "),a("b",[e._v("Loại:")]),e._v(" "+e._s(e.ListType[t.TargetType-1].Name))])]):e._e(),e._v(" "),1!=t.TargetType?a("div",[a("i",{staticClass:"fa fa-user fa-lg mt-4"}),a("span",[a("b",[e._v(" Quản lý:")]),e._v(" "+e._s(t.OwnerName)+" "),a("br"),e._v(" "),a("b",[e._v("Loại:")]),e._v(" "+e._s(e.ListType[t.TargetType-1].Name))])]):e._e()])]),e._v(" "),a("div",{staticClass:"bdCt text item"},[a("el-progress",{staticStyle:{width:"90%",margin:"auto"},attrs:{"text-inside":!0,"stroke-width":18,percentage:t.Progress}})],1)])}))],1)],1)],1)],1)],1)},s=[],n={render:i,staticRenderFns:s};t.a=n},936:function(e,t,a){"use strict";function i(e){a(1014)}Object.defineProperty(t,"__esModule",{value:!0});var s=a(1016),n=a(1017),o=a(0),r=i,l=o(s.a,n.a,!1,r,null,null);t.default=l.exports}});
//# sourceMappingURL=25.08ceb91ae7c874c083bc.js.map