<template>
  <div ref="container" class="recycle-scroller-container" @scroll="setPool">
    <div
      class="recycle-scroller-list"
      :style="{ height: `${totalHeight}px` }"
    >
      <div
        v-for="poolItem in pool"
        :key="poolItem.item[keyField]"
        class="recycle-scroller-item"
        :style="{ transform: `translateY(${poolItem.position}px)` }"
      >
        <slot :item="poolItem.item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
let prev = 5; // 不可视区域上部分渲染的数据量
let next = 5; // 不可视区域下部分渲染的数据量
export default {
  props: {
    // 长列表数据
    list: {
      type: Array,
      default: () => [],
    },
    // 列表项的高度
    itemHeight: {
      type: Number,
      default: 0,
    },
    // 列表项中具有唯一标识的属性
    keyField: {
      type: String,
      default: "id",
    },
  },
  data() {
    return {
      pool: [], // 可视区域的列表数据
    };
  },
  mounted() {
    this.setPool();
  },
  computed: {
    // 长列表的总高度
    totalHeight() {
      return this.list.length * this.itemHeight;
    },
  },
  methods: {
    // 更新可视区域的列表数据
    setPool() {
      let scrollTop = this.$refs.container.scrollTop; // 滚动距离
      let clientHeight = this.$refs.container.clientHeight; // 可视区域的高度
      let startIdx = Math.floor(scrollTop / this.itemHeight); // 起始数据索引
      let endIdx = Math.ceil((scrollTop + clientHeight) / this.itemHeight); // 结束数据索引

      // 为了避免快速滑动造成的白屏，我们可以设置一下不可视区域渲染部分数据
      startIdx -= prev;
      startIdx < 0 && (startIdx = 0);
      endIdx += next;

      // 切割得到可视区域的列表数据
      this.pool = this.list.slice(startIdx, endIdx).map((item, index) => {
        return {
          item, // 列表项数据
          position: this.itemHeight * (startIdx + index), // 列表项的偏移量
        };
      });
    },
  },
};
</script>

<style scoped>
.recycle-scroller-container {
  overflow: auto;
}
.recycle-scroller-list {
  position: relative;
}
.recycle-scroller-item {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
