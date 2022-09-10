<template>
  <div id="app">
      <h1 class="title">hello world</h1>
      <my-home />
  </div>
</template>

<script>
import myHome from './components/home'
export default {
    components: {
        myHome
    }
}
</script>

<style>
    .title{
        color: red;
    }
</style>