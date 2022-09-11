<template>
  <div class="personal">
    姓名：
    <input type="text" v-model="name" />
    <button @click="handleClick">确定</button>
  </div>
</template>
<script>
export default {
  // 导航守卫
  // 在离开当前路由时，会询问用户是否离开
  beforeRouteLeave(to, from, next) {
    if (this.name) {
      const flag = window.confirm("确定要离开吗？");
      if (flag) {
        this.name = "";
        next();
      }
    } else {
      next();
    }
  },
  data() {
    return {
      name: ""
    };
  },
  methods: {
    handleClick() {
      this.name = "";
    }
  }
};
</script>

<style scoped>
button {
  margin-left: 10px;
}
</style>