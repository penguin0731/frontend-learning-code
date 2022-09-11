<template>
  <div id="app" class="wrapper">
    <system-header></system-header>
    <left-menu></left-menu>
    <div class="rightContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import systemHeader from './components/systemHeader'
import leftMenu from './components/leftMenu'
export default {
  components: {
    systemHeader,
    leftMenu,
  }
}
</script>

<style>
  @import url(./index.css);
</style>
