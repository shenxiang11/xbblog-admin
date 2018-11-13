<template>
  <div class="login">
    <img class="logo" src="@/assets/img/logo.png" alt="">
    <el-form ref="form" :rules="formRules" label-position="top" :model="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" class="btn-block" @click="handleLogin">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('login', this.form)
            .catch(err => {
              this.$message.error(err.response.data)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 368px;
  margin: 0 auto;
  padding: 72px 0;
  .logo {
    width: 200px;
    display: block;
    margin: 30px auto;
  }
  .btn-block {
    width: 100%;
    display: block;
    margin: 30px 0;
  }
}
</style>
