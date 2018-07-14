import utils from '@/services/utils'

export const requestSetting = (parentCode, includeParentNode = false, level) => {
  return new Promise((resolve, reject) => {
    if (!parentCode) return
    let request = {
      RequestClass: 'xBase',
      RequestAction: 'Request',
      TotalRequests: 1,
      R1_RequestTemplate: 'SettingNew.SearchSetting',
      R1_IncludedNestedSetParent: includeParentNode,
      R1_ParentCode: parentCode
    }
    if (level) {
      request.R1_Level = level
    }
    utils.post(request)
      .then(data => {
        if (data.success) {
          data = data.R1.Data.DynamicDS.Setting || []
          if (!data.length && data.length !== 0) {
            data = [data]
          }
          resolve(data)
        } else {
          reject(data)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const request = (Code, requestTemplate) => {
  return new Promise((resolve, reject) => {
    let request = {
      RequestClass: 'xBase',
      RequestAction: 'Request',
      TotalRequests: 1,
      R1_RequestTemplate: requestTemplate,
      R1_Code: Code
    }
    utils.post(request)
      .then(data => {
        if (data.success) {
          data = data.R1.Data.DynamicDS.Setting || {}
          resolve(data)
        } else {
          reject(data)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const requestGetUser = () => {
  return new Promise((resolve, reject) => {
    let request = {
      RequestAction: 'SearchUserWithGroups',
      IncludedGroupManager: 'true',
      RequestClass: 'BPM',
      RequestDataType: 'json',
      ConditionFields: 'IncludedGroupManager;Group;Status',
      StaticFields: 'UserId;Username;LoginName;Description;Status;',
      OrderFields: 'LoginName ASC',
      Status: 1
    }
    utils.post(request)
      .then(data => {
        let listUser = data.Data.UserDS.User
        if (!listUser.length) {
          listUser = [listUser]
        }
        let listUserWithoutSuperAdmin = listUser.filter(user => user.LoginName !== 'superadmin')
        resolve(listUserWithoutSuperAdmin)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/*========= target api ====== */
export const createTarget = (target) => {
  return new Promise((resolve, reject) => {
    let request = {
      RequestClass: 'xBase',
      RequestAction: 'Request',
      R1_RequestDataGroup: 'DataGroup.kpisetting.03462',
      R1_RequestTemplate: 'AG_Task_Task.Insert',
      R1_RequestFields: `Id;Code;${Object.keys(target).join(';')};TypeName`,
      R1_Code: 'KPISetting',
      TotalRequests:1
    }
    for (var k in target) {
      request[`R1_${k}`] = target[k]
    }

    utils.post(request)
      .then(data => {
        if (data && data.R1 && data.R1.success === true) {
          resolve(data.R1.Data)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const updateTarget = (target) => {
  return new Promise((resolve, reject) => {
    let request = {
      RequestClass: 'xBase',
      RequestAction: 'Request',
      R1_RequestDataGroup: 'DataGroup.kpisetting.03462',
      R1_RequestTemplate: 'AG_Task_Task.Update',
      R1_RequestFields: `Id;Code;${Object.keys(target).join(';')};TypeName`,
      R1_Code: 'KPISetting',
      TotalRequests:1
    }
    for (var k in target) {
      request[`R1_${k}`] = target[k]
    }

    utils.post(request)
      .then(data => {
        if (data && data.R1 && data.R1.success === true) {
          resolve(data.R1.Data)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const getTarget = () => {
  return new Promise((resolve, reject) => {
    let request = {
      RequestClass: 'xBase',
      RequestAction: 'Request',
      R1_RequestDataGroup: 'DataGroup.kpisetting.03462',
      R1_RequestTemplate: 'AG_Task_Task.Search',
      R1_Code: 'KPISetting',
      R1_RequestFields: 'Code;Id;Type;Description;ManagerName;Categories;TypeName',
      TotalRequests: 1
    }

    utils.post(request)
      .then(data => {
        console.log('data', data)
        if (data.success) {
          data = data.R1.Data.TasksDS.Task || []
          if (!data.length && data.length !== 0) {
            data = [data]
          }
          resolve(data)
        } else {
          reject(data)
        }
      })
      .catch(err => {
        console.log('err', err)
        reject(err)
      })
  })
}

export const deleteTarget = (id) => {
  return new Promise((resolve, reject) => {
    let request = {
      RequestClass: 'xBase',
      RequestAction: 'Request',
      R1_RequestDataGroup: 'DataGroup.kpisetting.03462',
      R1_RequestTemplate: 'AG_Task_Task.Delete',
      R1_Id: id,
      TotalRequests: 1
    }

    utils.post(request)
      .then(data => {
        if (data.success && data.R1.success) {
          resolve()
        } else {
          reject(data)
        }
      })
      .catch(err => {
        console.log('err', err)
        reject(err)
      })
  })
}

export const requestBookProduct = () => {
  return new Promise((resolve, reject) => {
    let request = {
      RequestClass: 'xBase',
      RequestAction: 'Request',
      TotalRequests: 1,
      R1_Priority: -1,
      R1_RequestTemplate: 'xDocument_Document.Update',
      R1_UpdateWarehouse: true,
      R1_Id: '6dbe4f9f-cc50-4c0c-bb54-4fa42b7dcf55',
      R1_RequestDataGroup: 'DataGroup.warehouse.0fd40',
      R1_RequestFields: 'Id;Code;MetaKeywords;Status;Priority;MetaKeywords;Status;Priority;;UpdateWarehouse;',
      SessionId: '62491a0d-e897-418e-8170-4feb8031a357'
    }
    utils.post(request)
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const requestSellProduct = () => {
  return new Promise((resolve, reject) => {
    let request = {
      RequestClass: 'xBase',
      RequestAction: 'Request',
      R1_Code: 'Warehouse',
      TotalRequests: 1,
      R1_TotalAttachments: -1,
      R1_DataSource: 'Data.DocumentDS.Document',
      R1_RequestTemplate: 'xDocument_Document.Update',
      R1_UpdateWarehouse: true,
      R1_Id: '6dbe4f9f-cc50-4c0c-bb54-4fa42b7dcf55',
      R1_RequestDataGroup: 'DataGroup.warehouse.0fd40',
      R1_RequestFields: 'Id;Code;MetaKeywords;Status;TotalAttachments;UpdateWarehouse',
    }
    utils.post(request)
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const requestExportTransferProduct = () => {
  return new Promise((resolve, reject) => {
    let request = {
      RequestClass: 'xBase',
      RequestAction: 'Request',
      R1_Code: 'Warehouse',
      TotalRequests: 1,
      R1_Priority: -1,
      R1_TotalAttachments: -1,
      R1_DataSource: 'Data.DocumentDS.Document',
      R1_RequestTemplate: 'xDocument_Document.Update',
      R1_UpdateWarehouse: true,
      R1_Id: '6dbe4f9f-cc50-4c0c-bb54-4fa42b7dcf55',
      R1_RequestDataGroup: 'DataGroup.warehouse.0fd40',
      R1_RequestFields: 'Id;Code;MetaKeywords;Status;TotalAttachments;Priority;UpdateWarehouse;'
    }
    utils.post(request)
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const requestImportTransferProduct = () => {
  return new Promise((resolve, reject) => {
    let request = {
      RequestClass: 'xBase',
      RequestAction: 'Request',
      R1_Code: 'Warehouse',
      TotalRequests: 1,
      R1_Priority: 1,
      R1_TotalAttachments: 1,
      R1_DataSource: 'Data.DocumentDS.Document',
      R1_RequestTemplate: 'xDocument_Document.Update',
      R1_UpdateWarehouse: true,
      R1_Id: '6dbe4f9f-cc50-4c0c-bb54-4fa42b7dcf55',
      R1_RequestDataGroup: 'DataGroup.warehouse.0fd40',
      R1_RequestFields: 'Id;Code;MetaKeywords;Status;TotalAttachments;Priority;UpdateWarehouse;'
    }
    utils.post(request)
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const User = {
  setPassword (loginName, password) {
    return new Promise((resolve, reject) => {
      let request = {
        RequestClass: "BPM",
        RequestAction: "SetPassword",
        Account: loginName,
        Password: password
      }
      utils.post(request, true)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          console.log('err', err)
        })
    })
  },
  insertUserToGroup (userId, groupId) {
    return new Promise((resolve, reject) => {
      let request = {
        RequestAction: "InsertUserGroup",
        RequestClass: "BPM",
        UserId: userId,
        GroupId: groupId
      }
      utils.post(request, true)
        .then(data => {
          resolve(data)
        })
    })
  },
  signUp (loginName, userName, password, email) {
    return new Promise((resolve, reject) => {
      let request = {
        RequestClass: "BPM",
        RequestAction: "InsertUser",
        StructFields: "GroupRoot;GroupRootName;PhoneId;PhoneGroup;Public;RoleRoot;RoleRootName;Notification",
        StaticFields: "UserId;Username;LoginName;Description;Status;",
        DynamicFields: "Facebook;Email;Skype;Birthday;Biography;WorkProcess;Telephone;Avatar",
        Description: JSON.stringify({"GroupLevel1":[],"GroupLevel2":[]}),
        RoleRootColumnType: 1,
        LoginName: loginName,
        Username: userName,
        Email: email,
        Notification: JSON.stringify({"DataGroup.activities.0c91d":{"ActivitiesUpdate":true,"ActivitiesInsert":true,"Activities":true},"DataGroup.contact.82fhd":{"ContactUpdate":true,"ContactInsert":true,"Contact":true},"DataGroup.danh-sach-cong-viec.04b66":{"TaskComment":true,"TaskUpdated":true,"TaskInsert":true,"TaskReply":true,"Task":true},"DataGroup.lead.9jwnc":{"LeadUpdate":true,"LeadInsert":true,"Lead":true},"DataGroup.order.9ejnl":{"OrderUpdate":true,"OrderInsert":true,"Order":true},"DataGroup.product.19jev":{"ProductUpdate":true,"ProductInsert":true,"Product":true},"DataGroup.tai-lieu-dung-chung.0cb59":{"DocumentUpdate":true,"DocumentInsert":true,"Document":true}}),
        NotificationColumnType: 0,
        GroupRootColumnType: 1,
        GroupRootNameColumnType: 1
      }

      let userId

      utils.post(request, true)
        .then(data => {
          if (data.success === true) {
            userId = data.Data
            return this.insertUserToGroup(userId, 'a94bae42-4953-f536-26fb-e5503be76321')
          }
        })
        .then(() => {
          return this.setPassword(loginName, password)
        })
        .then(() => {
          resolve(userId)
        })
        .catch(err => {
          console.log('err', err)
        })
    })
  },
  signIn (loginName, password, base, device) {
    return new Promise((resolve, reject) => {
      let request = {
        RequestClass: "BPM",
        RequestAction: "SignIn",
        HostURL: base,
        DeviceType: device,
        Account: loginName,
        Password: password
      }
      utils.post(request)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          console.log('err', err)
        })
    })
  }
}

export const Course = {
  getCoursesInCategory (categoryId) {
    return new Promise((resolve, reject) => {
      let request = {
        RequestClass: 'xBase',
        RequestAction: 'Request',
        TotalRequests: 1,
        R1_RequestTemplate: 'xDocument_Document.Search',
        R1_RequestDataGroup: 'DataGroup.course.0a516',
        R1_RequestFields: 'Id;Code;Category;Name;Description;TotalPages;TotalComments;FriendlyUrl;SourceUrl',
        R1_Code: 'Course',
        R1_StartIndex: 1,
        R1_EndIndex: 50,
        R1_Category: categoryId
      }

      utils.post(request)
        .then(data => {
          if (data.success) {
            data = data.R1.Data.DocumentDS.Document || []
            if (!data.length && data.length !== 0) {
              data = [data]
            }
            resolve(data)
          } else {
            reject(data)
          }
        })
        .catch(err => {
          console.log('err', err)
          reject(err)
        })
    })
  },
  getCourse (courseId) {
    return new Promise((resolve, reject) => {
      let request = {
        RequestClass: 'xBase',
        RequestAction: 'Request',
        TotalRequests: 1,
        R1_RequestTemplate: 'xDocument_Document.Search',
        R1_RequestDataGroup: 'DataGroup.course.0a516',
        R1_RequestFields: 'Id;Code;Category;Name;Description;TotalPages;TotalComments;FriendlyUrl;SourceUrl',
        R1_Code: 'Course',
        R1_Id: courseId
      }

      utils.post(request)
        .then(data => {
          if (data.success) {
            data = data.R1.Data.DocumentDS.Document
            resolve(data)
          } else {
            reject(data)
          }
        })
        .catch(err => {
          console.log('err', err)
          reject(err)
        })
    })
  },
  getLessonInCourse (courseId) {
    return new Promise((resolve, reject) => {
      let request = {
        RequestClass: 'xBase',
        RequestAction: 'Request',
        TotalRequests: 1,
        R1_RequestTemplate: 'xDocument_Document.Search',
        R1_RequestDataGroup: 'DataGroup.tai-lieu-dung-chung.0cb59',
        R1_RequestFields: 'Id;Tool;Name;PublishedDate;Created;CreatedByName;CreatedBy;CategoryName;Category;TypeName;Type;ProjectName;Project;FunctionName;Function;Id;CreatedByName;ModifiedByName;Code;FileTypeName;ProjectName;TypeName;FunctionName;CategoryName;Description;',
        R1_Code: 'Document',
        R1_StartIndex: 1,
        R1_EndIndex: 50,
        R1_Category: courseId
      }

      utils.post(request)
        .then(data => {
          if (data.success) {
            data = data.R1.Data.DocumentDS.Document || []
            if (!data.length && data.length !== 0) {
              data = [data]
            }
            resolve(data)
          } else {
            reject(data)
          }
        })
        .catch(err => {
          console.log('err', err)
          reject(err)
        })
    })
  }
}

export default {
  requestSetting,
  requestGetUser,
  requestBookProduct,
  requestSellProduct,
  requestImportTransferProduct,
  requestExportTransferProduct,
  request,
  createTarget,
  getTarget,
  deleteTarget,
  updateTarget,
  User,
  Course
}
