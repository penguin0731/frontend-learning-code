<template>
  <ul class="academic">
    <!-- 下面设置动态路由的方法不常用 -->
    <!-- :to="`/question/${item.questionId}`" -->
    <!-- 设置动态路由时要用name，不用path，因为不管用 -->
      <router-link 
        tag="li"
        :to="{name: 'question', params: {id: item.questionId}}"
        v-for="item in questionList"
        :key="item.questionId"
        >
            {{ item.title }}
        </router-link>
  </ul>
</template>

<script>
export default {
  // 离开这个路径时执行
  beforeRouteLeave (to, from, next) {
    next(vm => console.log(vm));
  },
  data() {
    return {
      questionList: [
        {
          questionId: 201801,
          title: "到底什么是es6中的class（类）？怎么实现class（类）？"
        },
        {
          questionId: 201802,
          title:
            "什么是es6箭头函数？与普通函数主要区别在哪里？到底该不该使用箭头函数？"
        },
        {
          questionId: 201803,
          title:
            "什么是es6的解构赋值，每次都创建一个对象吗？会加重GC的负担吗？为什么？"
        }
      ]
    }
  }
};
</script>