<template>
  <Dialog
    title="预览文章"
    :show-dialog.sync="articleDialog"
    :btn-show="false"
    @close="close"
  >
    <div class="title">
      <h2 v-html="ArticleInfo.title" />
      <div>
        <span>{{ ArticleInfo.createTime }}</span>
        <span>{{ ArticleInfo.username }}</span>
        <span class="el-icon-view" />
        <span>{{ ArticleInfo.visits }}</span>
      </div>
    </div>
    <div class="content">
      <p v-html="ArticleInfo.articleBody" />
    </div>
  </Dialog>
</template>

<script>
export default {
  props: {
    articleDialog: { type: Boolean, default: false }
  },
  data() {
    return {
      ArticleInfo: {} // 内容
    }
  },
  methods: {
    // 关闭弹层
    close() {
      this.$emit('update:articleDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  border-bottom: 1px dashed #ccc;
  padding-bottom: 10px;
  span {
    margin-left: 10px;
    margin-top: 10px;
  }
}
.content {
  padding: 10px;
  background-color: #f5f5f5;
}
</style>
