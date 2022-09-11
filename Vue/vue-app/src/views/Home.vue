<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
export default {
  name: 'home',
  beforeRouteEnter (to, from, next) {
    // console.log('beforeRouteEnter');
    next();
  },
  mounted () {
    // 发送请求
    axios.get('/edu/chat/sendMsg', {
      params: {
        appkey: '13926806277_1558879000128',
        msg: 'aaa'
      }
    }).then(res => console.log(res));
  },
  components: {
    HelloWorld
  }
}
</script>


<style lang="less" scoped>
// @import "../assets/styles/variable.less";
div {
  color: @color;
}
</style>
