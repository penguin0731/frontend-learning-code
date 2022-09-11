<template>
  <div>
    <son 
        :name="name" 
        :age="age" 
        :fn="changeAge" 
        @show="showInfo"
    ></son>
    <div
      class="info"
      v-if="show"
      :style="{
                margin: '20px 0',
                padding: '50px 0',
                border: '1px solid red'
            }"
    >
      姓名：lqz
      <br />
      年龄：{{ age }}
      <br />性别：女
      <br />
    </div>
  </div>
</template>

<script>
import Son from "./Son";
export default {
  components: {
    Son
  },
  data() {
    return {
      name: "cxj",
      age: 18,
      show: false
    };
  },
  methods: {
    showInfo() {
      this.show = true;
    },
    changeAge() {
      this.age = 16;
    }
  }
};
</script>