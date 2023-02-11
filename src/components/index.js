import ScreenFull from './ScreenFull'
import BreadcrumbsTow from './BreadcrumbsTow'
import PageTools from './pageTools'
import Message from './message'
const components = [ScreenFull, BreadcrumbsTow, PageTools, Message]
export default {
  install(Vue) {
    components.forEach((com) => Vue.component(com.name, com))
  }
}
