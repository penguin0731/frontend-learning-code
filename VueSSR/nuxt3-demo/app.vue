<template>
  <div class="app-container">
    <Sidebar />
    <div class="main-container">
      <div>
        <NavHeader />
      </div>
      <PageMain></PageMain>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/Layout/Sidebar";
import NavHeader from "@/Layout/NavHeader";
import PageMain from "@/Layout/PageMain";
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
}

.main-container {
  flex: 1;
}
</style>
