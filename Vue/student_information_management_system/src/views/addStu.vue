<template>
  <!-- 新增学生 -->
  <div id="add-student" class="content">
    <form id="add-student-form" action>
      <div>
        <label for="name">姓名</label>
        <input type="text" id="name" name="name" v-model="user.name"/>
      </div>
      <div>
        <label for>性别</label>
        <input type="radio" id="male" name="sex" value="0" v-model="user.sex" />
        <label for="male" class="radio-label">男</label>
        <input type="radio" id="female" name="sex" value="1" v-model="user.sex" />
        <label for="female" class="radio-label">女</label>
      </div>
      <div>
        <label for="sNo">学号</label>
        <input type="text" id="sNo" name="sNo" v-model="user.sNo" />
      </div>
      <div>
        <label for="birth">出生年</label>
        <input type="text" id="birth" name="birth" v-model="user.birth" />
      </div>
      <div>
        <label for="email">邮箱</label>
        <input type="text" id="email" name="email" v-model="user.email" />
      </div>
      <div>
        <label for="phone">手机号</label>
        <input type="text" id="phone" name="phone" v-model="user.phone" />
      </div>
      <div>
        <label for="address">住址</label>
        <input type="text" id="address" name="address" v-model="user.address" />
      </div>
      <div>
        <input type="button" class="form-btn" id="add-student-btn" value="提交" @click="commit" />
        <input type="button" class="form-btn" value="重置" @click="reset" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        sex: 0,
        sNo: '',
        birth: '',
        email: '',
        address: '',
        phone: ''
      }
    };
  },
  methods: {
    commit () {
      this.$api.addStu(this.user).then(res => {
        if(res.data.status == 'success') {
          this.$router.push('/stuList');
          this.$message({
            message: res.data.msg,
            type: res.data.status
          });
        }else {
          this.$message.error(res.data.msg);
        }
      });
    },
    reset () {
      this.user = {
        name: '',
        sex: 0,
        sNo: '',
        birth: '',
        email: '',
        address: '',
        phone: ''
      }
    }
  }
};
</script>

<style scoped>
</style>
