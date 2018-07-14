import ClassLayout from '@/components/classes/ClassLayout/ClassLayout'
import HomePage from '@/components/classes/HomePage'
import CoursePage from '@/components/classes/CoursePage'
import CategoryPage from '@/components/classes/CategoryPage'
import MyCoursePage from '@/components/classes/MyCoursePage'
import LearnCoursePage from '@/components/classes/LearnCoursePage'
import LoginMobile from '@/views/pages/LoginMobile'
import RegisterMobile from '@/views/pages/RegisterMobile'

export default {
  path: '/class',
  name: 'Class',
  component: ClassLayout,
  children: [
    {
      path: '',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: 'login',
      name: 'LoginMobile',
      component: LoginMobile
    },
    {
      path: 'register',
      name: 'RegisterMobile',
      component: RegisterMobile
    },
    {
      path: 'my-course',
      name: 'MyCourse',
      component: MyCoursePage
    },
    {
      path: 'course/:Id',
      name: 'CoursePage',
      component: CoursePage
    },
    {
      path: 'course/learn/:Id',
      name: 'LearnCoursePage',
      component: LearnCoursePage
    },
    {
      path: 'category/:Id',
      name: 'CategoryPage',
      component: CategoryPage
    }
  ]
}
