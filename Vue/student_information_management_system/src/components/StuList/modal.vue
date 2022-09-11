<template>
  <!-- 遮罩层 -->
  <div class="modal">
    <div class="mask" @click="setModal(false)"></div>
    <div class="modal-content">
      <h3>编辑信息</h3>
      <form id="edit-student-form" action>
        <div>
          <label for="name">姓名</label>
          <input
            type="text"
            id="name"
            name="name"
            :value="editStu.name"
            @input="changeValue('name', $event.target.value)"
          />
        </div>
        <div>
          <label for>性别</label>
          <input
            type="radio"
            id="male"
            name="sex"
            value="0"
            :checked="editStu.sex == 0"
            @change="changeValue('sex', 0)"
          />
          <label for="male" class="radio-label">男</label>
          <input
            type="radio"
            id="female"
            name="sex"
            value="1"
            :checked="editStu.sex == 1"
            @change="changeValue('sex', 1)"
          />
          <label for="female" class="radio-label">女</label>
        </div>
        <div>
          <label for="sNo">学号</label>
          <input
            type="text"
            id="sNo"
            name="sNo"
            :value="editStu.sNo"
            @input="changeValue('sNo', $event.target.value)"
          />
        </div>
        <div>
          <label for="birth">出生年</label>
          <input
            type="text"
            id="birth"
            name="birth"
            :value="editStu.birth"
            @input="changeValue('birth', $event.target.value)"
          />
        </div>
        <div>
          <label for="email">邮箱</label>
          <input
            type="text"
            id="email"
            name="email"
            :value="editStu.email"
            @input="changeValue('email', $event.target.value)"
          />
        </div>
        <div>
          <label for="phone">手机号</label>
          <input
            type="text"
            id="phone"
            name="phone"
            :value="editStu.phone"
            @input="changeValue('phone', $event.target.value)"
          />
        </div>
        <div>
          <label for="address">住址</label>
          <input
            type="text"
            id="address"
            name="address"
            :value="editStu.address"
            @input="changeValue('address', $event.target.value)"
          />
        </div>
        <div>
          <input type="button" class="form-btn" id="edit-student-btn" value="提交" @click="commit" />
          <input type="reset" class="form-btn" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      stu: {},
    };
  },
  methods: {
    ...mapMutations(["setModal"]),
    ...mapActions(["updateStu"]),
    commit() {
      this.updateStu(Object.assign({}, this.editStu, this.stu)).then(res => {
        if (res.status == "success") {
          this.$message.success(res.msg);
        }else {
          this.$message.error(res.msg);
        }
      });
    },
    // 将input的键值对存起来
    changeValue(key, value) {
      this.stu[key] = value;
    }
  },
  computed: {
    ...mapState(["editStu"])
  }
};
</script>

<style scoped>
</style>
