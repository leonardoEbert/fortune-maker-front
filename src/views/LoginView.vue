<script lang="ts">
import { defineComponent } from 'vue'
import { Check, Close } from '@element-plus/icons-vue'
import logoFM from '@/assets/logo.png'
import axiosService from '@/common/axios.service'

export default defineComponent({
  name: 'LoginView',
  computed: {
    Close() {
      return Close
    },
    Check() {
      return Check
    }
  },
  data() {
    return {
      message: 'Hello World!',
      login: {
        email: '',
        password: '',
        remember: false
      },
      logoUrl: logoFM
    }
  },
  methods: {
    async performLogin() {
      const loginData = await axiosService.post('/auth/login', this.login);

      console.log(loginData);
    }
  }
})
</script>

<template>
  <div class="el-container login-main el-row">
    <div class="login-form el-col-6">
      <el-image style="width: 200px; height: 100px" :src="logoUrl" fit="contain" />
      <div class="el-row input-region">
        <div class="el-col-20">
          <el-form :model="login" label-width="auto" label-position="top" size="large">
            <el-form-item label="E-mail" label-width="auto">
              <el-input v-model="login.email" clearable></el-input>
            </el-form-item>
            <el-form-item label="Senha" label-width="auto">
              <el-input v-model="login.password" type="password" clearable></el-input>
            </el-form-item>
            <el-form-item label="Manter logado" label-width="auto">
              <el-switch
                v-model="login.remember"
                inline-prompt
                :active-icon="Check"
                :inactive-icon="Close"
              >
              </el-switch>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-button type="primary" plain size="large" @click="performLogin">Login</el-button>
    </div>
  </div>
</template>

<style scoped>
.login-main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
}
.login-form {
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  background-color: #f0f0f0;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
}
.input-region {
  justify-content: center;
  align-items: center;
}
</style>