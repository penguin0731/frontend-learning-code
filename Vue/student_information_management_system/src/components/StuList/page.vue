<template>
  <!-- 分页效果 -->
  <div class="page">
    <!-- <el-pagination background layout="prev, pager, next" :total="count"></el-pagination> -->
    <ul class="turnPage">
      <li @click="turnPage(-1)">上一页</li>

      <template v-if="totalPage <= 7">
        <li
          v-for="i in totalPage"
          :key="i"
          :class="{'now-page': i == nowPage}"
          @click="turnPage(i)"
        >{{ i }}</li>
      </template>

      <template v-else>
        <template v-if="nowPage < 5">
          <li
            v-for="i in 6"
            :key="i"
            :class="{'now-page': i == nowPage}"
            @click="turnPage(i)"
          >{{ i }}</li>
        </template>
        <template v-if="nowPage >= 5">
          <li @click="turnPage(1)">1</li>
          <li>...</li>
        </template>
        <template v-if="nowPage >= 5 && nowPage <= totalPage - 4">
          <li v-for="i in 5" :key="i" :class="{'now-page': nowPage - 3 + i == nowPage}" @click="turnPage(nowPage - 3 + i)">{{ nowPage - 3 + i }}</li>
        </template>
        <template v-if="nowPage <= totalPage - 4">
          <li>...</li>
          <li @click="turnPage(totalPage)">{{ totalPage }}</li>
        </template>
        <template v-if="nowPage > totalPage - 4">
          <li
            v-for="i in 6"
            :key="i"
            :class="{'now-page': totalPage - 6 + i == nowPage}"
            @click="turnPage(totalPage - 6 + i)"
          >{{ totalPage - 6 + i }}</li>
        </template>
      </template>

      <li @click="turnPage(0)">下一页</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    turnPage(n) {
      this.$store.dispatch('turnPage', n)
    }
  },
  computed: {
    ...mapState(["nowPage", "totalPage"])
  }
};
</script>

<style scoped>
.turnPage li {
  display: inline-block;
  padding: 0 5px;
  cursor: pointer;
  font-weight: bolder;
  user-select: none;
}
.now-page {
  color: red;
}
</style>
