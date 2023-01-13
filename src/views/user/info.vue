<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户: {{ name }}</div>
    <div class="dashboard-text">
      角色:
      <span v-if="roles.includes('admin')">管理员</span>
      <span v-else>成员</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

