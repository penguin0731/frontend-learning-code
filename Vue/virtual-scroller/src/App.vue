<template>
  <div id="app">
    <RecycleScroller class="scroll" :list="list" :itemHeight="52" v-slot="{ item }">
      <list-item :item="item" />
    </RecycleScroller>
  </div>
</template>

<script>
import ListItem from "./components/ListItem.vue";
import RecycleScroller from "./components/RecycleScroller.vue";

let list = [];
for (let i = 1; i <= 100000; i++) {
  list.push({
    id: i,
    content: `this is item${i}!`,
  });
}

export default {
  name: "App",
  components: {
    RecycleScroller,
    ListItem,
  },
  data() {
    return {
      list,
    };
  },
};
</script>

<style>
.scroll {
  margin: 30px auto 0;
  width: 500px;
  height: 520px;
}
</style>
