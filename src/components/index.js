import ScreenFull from './ScreenFull'
import BreadcrumbsTow from './BreadcrumbsTow'

const components = [ScreenFull, BreadcrumbsTow]
export default {
  install(Vue) {
    components.forEach((com) => Vue.component(com.name, com))
  }
}
