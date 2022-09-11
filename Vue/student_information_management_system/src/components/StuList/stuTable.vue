<template>
  <div>
    <table>
      <thead>
        <tr>
          <td>学号</td>
          <td>姓名</td>
          <td>性别</td>
          <td>年龄</td>
          <td>邮箱</td>
          <td>电话</td>
          <td>地址</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{ item.sNo }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.sex == 0 ? '男' : '女'}}</td>
          <td>{{ countAge(item.birth) }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.address }}</td>
          <td>
            <button class="table-btn edit" @click="edit(item)">编辑</button>
            <button class="table-btn del" @click="del(item.sNo)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  created() {
    this.getList();
  },
  methods: {
    ...mapActions(["getList", "delStu"]),
    ...mapMutations(['setModal', 'setEditStu']),
    countAge(birth) {
      return new Date().getFullYear() - birth;
    },
    edit (item) {
      this.setModal(true);
      this.setEditStu(item);
    },
    del (sNo) {
      this.delStu(sNo).then(res => {
        console.log(res);
        if (res.status == "success") {
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      })
    }
  },
  computed: {
    ...mapState({
      list: state => state.list
    })
  }
};
</script>

<style scoped>
</style>
