<template>
  <!-- 学生列表 -->
  <div id="student-list" class="content">
    <search></search>
    <stu-table></stu-table>
    <page></page>
    <transition>
      <modal v-if="showModal"></modal>
    </transition>
  </div>
</template>

<script>
import search from '../components/StuList/search'
import stuTable from '../components/StuList/stuTable'
import page from '../components/StuList/page'
import modal from '../components/StuList/modal'

export default {
  components: {
    search,
    stuTable,
    page,
    modal
  },
  computed: {
    showModal () {
      return this.$store.state.showModal;
    }
  }
};
</script>

<style scoped>
/* 进入前,离开后 */
.v-enter, .v-leave-to {
  top: -100%;
  height: 0;
  opacity: 0;
}
/* 进入后，离开前 */
.v-enter-to, .v-leave {
  top: 0;
  height: 100%;
  opacity: 1;
}
.v-enter-active, .v-leave-active{
  transition: all .4s;
}
</style>
