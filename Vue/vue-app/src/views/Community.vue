<template>
  <div class="community">
    <ul class="nav">
      <router-link tag="li" to="/community/academic">academic</router-link>
      <router-link tag="li" to="/community/download">download</router-link>
      <router-link tag="li" to="/community/personal">personal</router-link>
    </ul>
    <router-view class="router-view" />
  </div>
</template>


<style scoped>
.nav {
  display: flex;
}

.nav li {
  margin-right: 30px;
  cursor: pointer;
  padding: 10px 20px;
}

.active-exact {
  background-color: #38f;
  color: #fff;
}

.router-view {
  padding-top: 20px;
  padding-left: 20px;
}
</style>