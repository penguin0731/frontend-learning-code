<template>
  <div>
      <h2>我是home组件</h2>
      <input type="text" v-model="info">
      <div>{{info}}</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            info: '2020 is comming'
        }
    }
}
</script>

<style>

</style>