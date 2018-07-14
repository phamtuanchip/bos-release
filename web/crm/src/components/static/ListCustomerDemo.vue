<template>
  <div class='list-customer-demo'>
    <div class="search mgt5 mgb5">
      <el-input
        v-model="keyword"
        prefix-icon="el-icon-search"
        placeholder="Tìm kiếm"
      ></el-input>
    </div>
    <div class="table__wrapper">
      <el-table
        :data="currentPageData"
      >
        <el-table-column
          label='Stt'
          width='50'
          type="index"
          :index='indexMethod'
        >
        </el-table-column>
        <el-table-column
          label='Name'
          prop='Name'
        >
        </el-table-column>
        <el-table-column
          label='Email'
          prop='Email'
        >
        </el-table-column>

        <el-table-column
          label='Phone'
        >
          <template slot-scope='tableItem'>
            <span @click='callToCustomer(tableItem.row.Phone)'>{{tableItem.row.Phone}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label='Hành động'
        >
          <template slot-scope='tableItem'>
            <span><el-button @click='editCustomer(tableItem.row)'>Edit</el-button></span>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        v-if="searchResult.length > 0"
        :totalPage="searchResult.length"
        :currentPage="currentPage"
        :pagesize="pageSize"
        :callback="handleSelectPage"
      />
    </div>
  </div>
</template>

<script>
  import TableWithPagination from '@/components/dynamic/TableWithPagination'
  import Pagination from '@/components/dynamic/Pagination'

  export default {
    name: 'ListCustomerDemo',
    components: {
      TableWithPagination,
      Pagination
    },
    data () {
      return {
        isSearch: false,
        keyword: null,
        customers: [],
        searchResult: [],
        currentPageData: [],
        pageSize: 5,
        currentPage: 1
      }
    },

    created () {},
    mounted () {
      this.searchCustomer()
    },
    methods: {
      handleSelectPage (val) {
        //console.log('val', val)
        this.currentPage = val
        this.updateCurrentPageData()
      },
      editCustomer (customer) {
        alert(JSON.stringify(customer))
      },
      callToCustomer (phone) {
        alert('call : ' + phone)
      },
      searchCustomer () {
        let request = {
          RequestClass: 'xBase',
          RequestAction: 'Request',
          TotalRequests: 2,
          R1_RequestTemplate: 'xProfile_Profile.Search',
          R1_RequestDataGroup: 'DataGroup.khach-hang.0c3b1',
          R1_RequestFields: 'Id;Tool;Phone;Name;Created;Gender;Name;Gender;Title;Contact;Name;Title;Contact;Total;Purchase;Total;Paid;Email;Address;BankName;CompanyName;CustomerTypeName;CustomerType;PatientNetworkTypeNamePatientNetworkTypeMemberNetworkTypeNameMemberNetworkTypeEmailSubscriptionStatusNameEmailSubscriptionStatusCategoryNameCompanyAddressNameCreatedByNameCustomerTypeNameDisplayImageNameDoctorNetworkNameEmailSubscriptionStatusNameGenderNameIndustryNameLocationNameMajorNameMemberNetworkTypeNameModifiedByNameNumberEmployeesNamePatientNetworkTypeNameTitleContactNameTypeOperationNameYearsOfExperienceName',
          R2_RequestTemplate: 'xProfile_Profile.Count',
          R2_RequestDataGroup: 'DataGroup.khach-hang.0c3b1',
          R1_Code: 'Customer',
          R2_Code: 'Customer',
          R1_PlanStartDateStartValue: '2018-01-22T00:00:00',
          R1_PlanStartDateEndValue: '2018-01-28T23:59:59',
          R1_StartIndex: 1,
          R1_EndIndex: 20
        }
        this.$Utils.post(request).then((response) => {
          console.log(response)
          this.customers = this.$Utils.getDataWithRoot(
            response.R1,
            'Data.ProfileDS.Profile'
          )
          this.searchResult = this.customers
        })
      },
      updateCurrentPageData (currentPage = this.currentPage) {
        currentPage = (currentPage < 1) ? 1 : currentPage
        this.currentPageData = this.searchResult.slice((currentPage - 1) * this.pageSize, Math.min(currentPage * this.pageSize, this.searchResult.length))
      },
      indexMethod (index) {
        return index + ((this.currentPage - 1) * this.pageSize) + 1
      }
    },
    watch: {
      keyword: function (newval) {
        this.isSearch = newval || newval.trim()
        newval = this.$Utils.removeVNCharacters(newval)
        if (this.isSearch) {
          this.searchResult = this.customers.filter(ele => {
            let search_data = this.$Utils.removeVNCharacters(Object.values(ele).join('|'))
            console.log('search_data', search_data)
            return search_data.indexOf(newval) > -1
          })
        } else {
          this.searchResult = this.customers
        }
        this.updateCurrentPageData()
      },
      searchResult: function (newVal) {
        this.currentPage = 1
        this.updateCurrentPageData()
      }
    }
  }
</script>

<style scope lang="scss">
  .mgb5 {
    margin-bottom: 5px;
  }
  .mgt5 {
    margin-top: 5px;
  }
</style>
