<template>
  <div class="sidebar-container">
    <ul>
      <li><NuxtLink to="/dashboard">dashboard</NuxtLink></li>
      <li><NuxtLink to="/about">about</NuxtLink></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-container {
  width: 200px;
  height: 100%;
  background: $sidebar-bg;
  color: $primary-font-color;
}

ul > li > a{
    color: #fff;
}
</style>
