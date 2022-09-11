<template>
  <div class="pager">
    <!-- <span class="pager-item" @click="changePage(1)" :class="{disabled: currentPage === 1}">首页</span> -->
    <span
      class="pager-item"
      @click="changePage(currentPage - 1)"
      :class="{disabled: currentPage === 1}"
    >上一页</span>
    <span 
        class="pager-item" 
        @click="changePage(1)" 
        :class="{active: currentPage === 1}"
    >1</span>
    <span v-if="currentPage - 2 > 2">...</span>
    <span
      class="pager-item"
      @click="changePage(item)"
      :class="{active: item === currentPage}"
      v-for="item in numbers"
      :key="item"
    >{{item}}</span>
    <span v-if="currentPage + 3 < pageNumber">...</span>
    <span
      class="pager-item"
      @click="changePage(pageNumber)"
      :class="{active: currentPage === pageNumber}"
      v-if="currentPage + 3 <= pageNumber"
    >{{pageNumber}}</span>
    <span
      class="pager-item"
      @click="changePage(currentPage + 1)"
      :class="{disabled: currentPage === pageNumber}"
    >下一页</span>
    <!-- <span
      class="pager-item"
      @click="changePage(pageNumber)"
      :class="{disabled: currentPage === pageNumber}"
    >尾页</span>-->
    <i>共{{total}}条</i>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      //数字类型，必填，数据的总数
      type: Number,
      required: true
    },
    currentPage: {
      //数字类型，选填，当前页默认为1
      type: Number,
      default: 1
    },
    pageSize: {
      //数字类型，必填，每页展示几条数据
      type: Number,
      required: true
    },
    panelNumber: {
      //数字类型，选填，中间默认展示5个页码
      type: Number,
      default: 5
    }
  },
  computed: {
    pageNumber() {
      //总页数
      return Math.ceil(this.total / this.pageSize);
    },
    numbers() {
      // 用于得到一组数字的数组
      // 最小页码数字
      let min = this.currentPage - Math.floor(this.panelNumber / 2);
      if (min <= 1) {
        min = 2;
      }
      // 最大页码数字
      let max = min + this.panelNumber - 1;
      if (max >= this.pageNumber) {
        max = this.pageNumber;
        min = max - 5;
      }
      console.log(min, max);
      const arr = [];
      for (let i = min; i <= max; i++) {
        arr.push(i);
      }
      return arr;
    }
  },
  methods: {
    changePage(newPage) {
      if (newPage < 1) {
        newPage = 1;
      } else if (newPage > this.pageNumber) {
        newPage = this.pageNumber;
      }
      //   this.currentPage = newPage; //不可以直接修改数据
      // 应该改变页码，但由于该数据是父组件传递过来，子组件无法修改
      // 因此只能通过$emit触发input事件
      this.$emit("change", newPage);
    }
  }
};
</script>

<style>
.pager {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.disabled {
  color: #ddd;
}
.active {
  color: red;
}
.pager-item {
  min-width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
  margin: 0 5px;
  display: inline-block;
  border: 1px solid black;
  padding: 5px;
}
</style>