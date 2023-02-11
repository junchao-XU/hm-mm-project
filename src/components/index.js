import ScreenFull from './ScreenFull'
import BreadcrumbsTow from './BreadcrumbsTow'
import Pagination from './Pagination'
import Dialog from './Dialog'

const components = [ScreenFull, BreadcrumbsTow, Pagination, Dialog]
export default {
  install(Vue) {
    components.forEach((com) => Vue.component(com.name, com))
  }
}
