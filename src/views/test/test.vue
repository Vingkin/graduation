<template>
  <el-form style="margin-top: 3%" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
           class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" disabled></el-input>
    </el-form-item>
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="password">
      <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="password">
      <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="updatePassword()">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import loginApi from '../../api/login'
import Store from '../../store'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        newPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.ruleForm.username = Store.getters.name
  },
  methods: {
    resetForm() {
      this.ruleForm.oldPassword = ''
      this.ruleForm.newPassword = ''
      this.ruleForm.checkPassword = ''
    },
    updatePassword() {
      loginApi.updateUser(this.ruleForm.username, this.ruleForm.newPassword, this.ruleForm.oldPassword)
        .then(response => {
          this.$store.dispatch('LogOut')
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: response.message
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
