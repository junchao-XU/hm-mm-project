import ScreenFull from './ScreenFull'
import BreadcrumbsTow from './BreadcrumbsTow'
import PageTools from './pageTools'
import Message from './message'
import Dialog from './Dialog'
import Pagination from './Pagination'

const components = [
  ScreenFull,
  BreadcrumbsTow,
  PageTools,
  Message,
  Pagination,
  Dialog
]
export default {
  install(Vue) {
    components.forEach((com) => Vue.component(com.name, com))
  }
}
