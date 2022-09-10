<template>
  <div>测试{{ message }}</div>
</template>

<script>
export default {
  props: {
    message: {
      type: [String, Object],
    },
  },
};
</script>

<style>
</style>