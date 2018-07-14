import Vue from 'vue'
import Router from 'vue-router'

// Containers
//import Full from '@/containers/Full'

// Views
//import Dashboard from '@/views/Dashboard'
//import Charts from '@/views/Charts'
//import Widgets from '@/views/Widgets'

// Views - Components
//import Buttons from '@/views/components/Buttons'
//import SocialButtons from '@/views/components/SocialButtons'
//import Cards from '@/views/components/Cards'
//import Forms from '@/views/components/Forms'
//import Modals from '@/views/components/Modals'
//import Switches from '@/views/components/Switches'
//import Tables from '@/views/components/Tables'
// Views - Icons
import FontAwesome from '@/views/icons/FontAwesome'
import SimpleLineIcons from '@/views/icons/SimpleLineIcons'

// Views - Pages
const Test = () => import('@/views/pages/test/TestStorage')
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
// const Login = () => import('@/views/pages/Login')
const LoginMobile = () => import('@/views/pages/LoginMobile')
const RegisterMobile = () => import('@/views/pages/RegisterMobile')
const Register = () => import('@/views/pages/Register')
const ResetPass = () => import('@/views/pages/Resetpass')
const Home = () => import('@/components/Home')
const Target = () => import('@/components/Target')
const MyView = () => import('@/components/MyView')
const TimeLine = () => import('@/components/Timeline')
const Categories = () => import('@/components/Categories')
const Projects = () => import('@/components/Projects')
const Calendar = () => import('@/components/Calendar')
const Scrumboard = () => import('@/components/Scrumboard')
const DailyReport = () => import('@/components/DailyReport')
const DynamicCharts = () => import('@/components/DynamicCharts')
const Documents = () => import('@/components/Documents')
const Setting = () => import('@/components/Setting')
const AdvancedSetting = () => import('@/components/AdvancedSetting')
const WeekTarget = () => import('@/components/static/WeekTarget')
const WeekTask = () => import('@/components/static/WeekTask')
const TargetSetting = () => import('@/components/static/TargetSetting')
const Tasks = () => import('@/components/Tasks')
const DynamicPage = () => import('@/components/dynamic/DynamicPage')
const SettingUsers = () => import('@/components/static/SettingUsers.vue')
const SettingGroupAndProject = () => import('@/components/static/SettingGroupAndProject.vue')
const SettingUI = () => import('@/components/static/SettingUI.vue')
const SettingParam = () => import('@/components/static/SettingParam.vue')
const Expression = () => import('@/components/static/advance/Expression.vue')
const Kpis = () => import('@/components/static/Kpis/Kpis')
const Targets = () => import('@/components/static/Targets/Targets')
const POSes = () => import('@/components/static/POS/POSes')
const ImpExpReceipts = () => import('@/components/static/ImpExpWarehouse/ImpExpReceipts')
const LeadAssignment = () => import('@/components/static/LeadAssignment/LeadAssignment')
const AuditReceipt = () => import('@/components/static/WarehouseAudit/AuditReceipt')



import Login from '@/views/pages/Login'
import Warehouse from '@/components/static/advance/CalcWarehouse.vue'
import DynamicMain from '@/components/dynamic/DynamicMain'
import DataGroup from '@/components/static/advance/DataGroup'
import Calendars from '@/components/static/advance/Calendars'
import UIReports from '@/components/static/advance/Reports'
import UIFilters from '@/components/static/advance/Filters'
import UILists from '@/components/static/advance/Lists'
import UIForms from '@/components/static/advance/Forms'
import UIPages from '@/components/static/advance/Pages'
import Notifications from '@/components/static/advance/Notifications'
import Groups from '@/components/static/Groups'
import Users from '@/components/static/advance/Users'
import Settings from '@/components/static/advance/Settings'
import UIimports from '@/components/static/advance/Imports'
import AllNotifications from '@/components/static/AllNotifications'
import CRMDashboard from '@/components/crm/CRMDashboard'


Vue.use(Router)

import 'element-ui/lib/theme-chalk/index.css'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import { requireAuth } from '@/services/auth.js'

// configure language
locale.use(lang)

export default new Router({
  //mode: 'history',
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({y: 0}),
  //root: '/',
  //mode: 'html5',
  routes: [
    {
      path: '/',
      redirect: '/dynamic/dashboard',
      name: 'Home',
      beforeEnter: requireAuth,
      component: Home,
      children: [
        {
          path: '/warehouse-audit',
          name: 'AuditReceipt',
          beforeEnter: requireAuth,
          component: AuditReceipt,
          children: []
        },
        {
          path: 'leadAssignment',
          name: 'LeadAssignment',
          beforeEnter: requireAuth,
          component: LeadAssignment
        },
        {
          path: 'crm-dashboard',
          name: 'CRM',
          beforeEnter: requireAuth,
          component: CRMDashboard
        },
        {
          path: 'my-view-page',
          name: 'MyView',
          beforeEnter: requireAuth,
          component: MyView
        },
        {
          path: '/task-block-view',
          name: 'Target',
          beforeEnter: requireAuth,
          component: Target,
          children: [{
            path: 'week-target',
            name: 'WeekTarget',
            component: WeekTarget

          }, {
            path: 'week-task',
            name: 'WeekTask',
            beforeEnter: requireAuth,
            component: WeekTask

          },
            {
              path: 'target-setting',
              name: 'TargetSetting',
              beforeEnter: requireAuth,
              component: TargetSetting

            }]
        },
        {
          path: '/dynamic/:url/:value',
          name: 'DynamicMain1',
          beforeEnter: requireAuth,
          component: DynamicMain,
          children: []
        },
        {
          path: '/dynamic/:url',
          name: 'DynamicMain2',
          beforeEnter: requireAuth,
          component: DynamicMain,
          children: []
        },

        {
          path: '/tasks',
          redirect: '/timeline',
          name: 'Tasks',
          beforeEnter: requireAuth,
          component: Tasks,
          children: [{
            path: '/timeline',
            name: 'TimeLine',
            component: TimeLine,
            children: []
          }, {
            path: '/scrumboard',
            name: 'scrumboard',
            beforeEnter: requireAuth,
            component: Scrumboard,
            children: []
          }]
        },

        {
          path: 'category',
          name: 'Categories',
          beforeEnter: requireAuth,
          component: Categories,
          children: []
        },
        /*{
          path: 'department',
          name: 'Department',
          component: Department,
          children: []
        },*/
        {
          path: 'projects',
          name: 'Projects',
          beforeEnter: requireAuth,
          component: Projects,
          children: []
        },
        {
          path: 'calendar',
          name: 'Calendar',
          beforeEnter: requireAuth,
          component: Calendar,
          children: []
        },
        {
          path: 'daily-report',
          name: 'DailyReport',
          beforeEnter: requireAuth,
          component: DailyReport,
          children: []
        },
        {
          path: 'all-notifications',
          name: 'AllNotifications',
          beforeEnter: requireAuth,
          component: AllNotifications,
          children: []
        },

        {
          path: 'dynamic-charts',
          name: 'DynamicCharts',
          beforeEnter: requireAuth,
          component: DynamicCharts,
          children: []
        },
        {
          path: 'knowhow-document',
          name: 'Documents',
          beforeEnter: requireAuth,
          component: Documents,
          children: []
        },
        {
          path: '/config',
          name: 'Setting',
          beforeEnter: requireAuth,
          redirect: '/setting-users',
          component: Setting,
          children: [
            {
              path: '/setting-users',
              name: 'SettingUsers',
              beforeEnter: requireAuth,
              component: SettingUsers,
              children: []
            },
            {
              path: '/setting-group-project',
              name: 'SettingGroupAndProject',
              beforeEnter: requireAuth,
              component: SettingGroupAndProject,
              children: []
            },
            {
              path: '/setting-ui',
              name: 'SettingUI',
              beforeEnter: requireAuth,
              component: SettingUI,
              children: []
            },
            {
              path: '/setting-param',
              name: 'SettingParam',
              beforeEnter: requireAuth,
              component: SettingParam,
              children: []
            }
          ]
        },
        {
          path: '/advanced-setting',
          name: 'AdvancedSetting',
          beforeEnter: requireAuth,
          component: AdvancedSetting,
          children: [{
            path: '/data-groups',
            name: 'DataGroup',
            beforeEnter: requireAuth,
            component: DataGroup,
          },
            {
              path: '/settings/:param',
              name: 'Settings2',
              beforeEnter: requireAuth,
              component: Settings,
            },
            {
              path: '/settings',
              name: 'Settings1',
              beforeEnter: requireAuth,
              component: Settings,
            },
            {
              path: '/lists',
              name: 'UILists',
              beforeEnter: requireAuth,
              component: UILists,
            },
            {
              path: '/forms',
              name: 'UIForms',
              beforeEnter: requireAuth,
              component: UIForms,
            },
            {
              path: '/filters',
              name: 'UIFilters',
              beforeEnter: requireAuth,
              component: UIFilters,
            },
            {
              path: '/reports',
              name: 'UIReports',
              beforeEnter: requireAuth,
              component: UIReports,
            },
            {
              path: '/pages',
              name: 'UIPages',
              beforeEnter: requireAuth,
              component: UIPages,
            },
            {
              path: '/imports',
              name: 'UIimports',
              beforeEnter: requireAuth,
              component: UIimports,
            },
            {
              path: '/users',
              name: 'Users',
              beforeEnter: requireAuth,
              component: Users,
            },
            {
              path: '/groups',
              name: 'Groups',
              beforeEnter: requireAuth,
              component: Groups,
            },
            {
              path: '/notifications',
              name: 'Notifications',
              beforeEnter: requireAuth,
              component: Notifications,
            },
            {
              path: '/calendar/setting',
              name: 'CalendarSetting',
              beforeEnter: requireAuth,
              component: Calendars
            },
            {
              path: '/expression',
              name: 'Expression',
              beforeEnter: requireAuth,
              component: Expression
            },
            {
              path: '/warehouse',
              name: 'Warehouse',
              beforeEnter: requireAuth,
              component: Warehouse
            }
          ]
        },
        {
          path: '/kpi-settings',
          name: 'KPI Settings',
          beforeEnter: requireAuth,
          component: Targets,
          children: []
        },
        {
          path: '/kpis',
          name: 'Kpis',
          beforeEnter: requireAuth,
          component: Kpis,
          children: []
        },
        {
          path: '/poses',
          name: 'POSes',
          beforeEnter: requireAuth,
          component: POSes,
          children: []
        },
        {
          path: '/import-export-warehouse',
          name: 'ImpExpReceipts',
          beforeEnter: requireAuth,
          component: ImpExpReceipts,
          children: []
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/login-mobile',
      name: 'LoginMobile',
      component: LoginMobile
    },
    {
      path: '/register-mobile',
      name: 'RegisterMobile',
      component: RegisterMobile
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'reset-pass',
          name: 'ResetPass',
          component: ResetPass
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})
