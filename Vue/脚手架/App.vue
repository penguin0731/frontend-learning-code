<template>
  <div>
    <calendar />
    <!-- <tree :tree-data="treeData" /> -->
    <!-- <pager 
      :total="total"
      :page-size="pageSize"
      :currentPage="currentPage"
      :panelNumber="panelNumber"
      @change="handlePageChange" /> -->
  </div>
</template>

<script>
import Calendar from "../组件/日历/Calendar";
import Tree from "../组件/树形/Tree";
import pager from '../组件/分页/pager';

export default {
  data() {
    return {
      msg: "hello world",
      treeData: [
        {
          name: "一级 1",
          children: [
            {
              name: "二级 1-1",
              children: [
                {
                  name: "三级 1-1-1",
                  children: [
                    {
                      name: "四级 1-1-1-1"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "一级 2",
          children: [
            {
              name: "二级 2-1",
              children: [
                {
                  name: "三级 2-1-1"
                }
              ]
            },
            {
              name: "二级 2-2",
              children: [
                {
                  name: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          name: "一级 3",
          children: [
            {
              name: "二级 3-1",
              children: [
                {
                  name: "三级 3-1-1"
                }
              ]
            },
            {
              name: "二级 3-2",
              children: [
                {
                  name: "三级 3-1-1"
                }
              ]
            }
          ]
        }
      ],
      currentPage: 5,
      pageSize: 5,
      total: 100,
      panelNumber: 5 //中间展示多少页码
    };
  },
  components: {
    Calendar,
    Tree,
    pager
  },
  methods: {
    handlePageChange(newPage) {
      this.currentPage = newPage;
    }
  }
};
</script>


<style scoped>
    /* 若不希望App里的样式影响到组件，则在style标签里添加scoped */
</style>