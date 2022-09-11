<template>
  <div class="student-list">
    <div>学生列表：</div>
    <ul>
      <li v-for="item in studentList" :key="item.id">
        {{ item.name }}
        {{ item.age }}
      </li>
    </ul>
    <hr />
    <ul>
      <li v-for="(item, index) in newStudentList" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["studentList"]),
    ...mapGetters(["newStudentList"])
  }
};
</script>

<style scoped>
ul {
  margin-top: 15px;
}
li {
  margin-bottom: 15px;
}
</style>