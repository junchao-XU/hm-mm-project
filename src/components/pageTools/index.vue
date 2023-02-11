<template>
  <div class="pagetools">
    <!-- 左侧 -->
    <div class="left">
      <!-- 通过 $slots 可以拿到所有的插槽列表,  `$slot.插槽名`  可以用于判断该插槽是否传值 -->
      <div v-if="$slots.left" class="tips">
        <slot name="left" />
      </div>
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTools'
}
</script>

<style lang="scss" scoped>
.pagetools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tips {
    display: flex;
    line-height: 34px;
    justify-content: space-between;
    // padding: 0px 15px;
    margin-bottom: 15px;
    border-radius: 5px;
  }
}
</style>
