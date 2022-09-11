<template>
  <div id="app">
    <div class="header">
      <!-- <router-link tag="div" to="/home" class="logo">DuYiEducation</router-link> -->
      <div class="logo" @click="handleClick">DuYiEducation</div>
      <ul class="nav">
        <!-- tag为router-link标签最终渲染的标签 -->
        <router-link tag="li" to="/home">Home</router-link>
        <!-- <router-link :to="{path: '/learn'}">Learn</router-link> -->
        <router-link tag="li" to="/learn">Learn</router-link>
        <router-link tag="li" to="/student">Student</router-link>
        <router-link tag="li" to="/about">About</router-link>
        <router-link tag="li" to="/community">Community</router-link>
      </ul>
    </div>
    <router-view class="view" />
  </div>
</template>

<script>
export default {
  methods: {
    handleClick () {
      // 点击logo也能跳转到主页
      // $router里的push、replace
      // push的功能类似该数组[a, b, c, d, e]
      // 从a页面一直往下走到d页面,再往下走到e页面时,点浏览器上的后退按钮,会返回到d页面
      // this.$router.push('/home');
      // replace的功能则是替换,类似e把数组中的d替换掉,即[a, b, c, e]
      // 点浏览器上的后退按钮时,会直接返回到c页面
      this.$router.replace('/home');
      // 回退一步
      // this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 0 200px;
  background-color: #38f;
  line-height: 70px;
  padding-bottom: 2px;
  color: #fff;
}

.logo {
  cursor: pointer;
}

.nav {
  display: flex;
}

.nav li {
  margin: 0 20px;
  cursor: pointer;
}

.view {
  padding: 50px 200px;
}

.active {
  font-weight: bold;
}
</style>
