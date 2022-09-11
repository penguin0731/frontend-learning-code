<template>
  <!-- 左侧菜单栏 -->
  <div class="leftMenu">
    <dl class="menu-list">
      <dt>学生管理</dt>
      <router-link tag="dd" to="/stuList">学生列表</router-link>
      <router-link tag="dd" to="/addStu">新增学生</router-link>
    </dl>
  </div>
</template>

<script>
export default {};
</script>