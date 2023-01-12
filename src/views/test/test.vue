<template>
  <div class="app-container">
    <div class="demo-input-suffix">
  username:
  <p> </p>
  <el-input
    placeholder="请输入用户名"
    v-model="form.input4"
    readonly
    disabled>
  </el-input>
</div>
<p> </p>
<div class="demo-input-suffix">
  原密码:
  <p> </p>
  <el-input
    placeholder="请输入原密码"
    v-model="form.input2"
    type="input">
  </el-input>
</div>
<p> </p>
<div class="demo-input-suffix">
  新密码:
  <p> </p>
  <el-input
    placeholder="请输入新密码"
    v-model="form.input3"
    type="input">
  </el-input>
</div>
<p> </p>
    <el-row>
    <el-button type="text" @click="updateUser">提交</el-button>
    </el-row>
  </div>
</template>

<script>
import loginApi from '../../api/login'

export default {
  data() {
    return {
      form: {
        input4:window.sessionStorage.getItem("username"),
        input2:'',
        input3:''
      }
    }
  },

  methods: {
    updateUser() {
      loginApi.updateUser(this.form.input4,this.form.input3,this.form.input2)
      .then(
        response => {
          if(response.code === 1001){
            this.$alert('修改成功', 'note', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
          }
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
