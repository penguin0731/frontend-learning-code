<template>
  <div class="search">
    <input type="text" id="search-inp" v-model="keyword" />
    <button id="search-btn" @click="search">搜索</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    search() {
      this.$store.dispatch("searchValue", this.keyword).then(res => {
        if (res) {
          if (res.status == "success") {
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
