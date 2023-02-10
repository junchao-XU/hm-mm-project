<template>
  <section class="app-main">
    <div style="height: 34px;">
      <BreadcrumbsTow class="brd" :name.sync="name" />
    </div>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="name" />
    </transition>
  </section>
</template>

<script>
import BreadcrumbsTow from '@/components/BreadcrumbsTow'
export default {
  name: 'AppMain',
  components: {
    BreadcrumbsTow
  },
  computed: {
    name: {
      get() {
        return this.$route.name
      },
      set(val) {
        console.log(val)
        this.$router.push(`${val}`)
      }
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
.brd{
  position: fixed;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
