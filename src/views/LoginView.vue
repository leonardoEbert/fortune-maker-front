<template>
  <div class="el-container login-main el-row">
    <div class="login-form el-col-6">
      <el-image style="width: 200px; height: 100px" :src="logoUrl" fit="contain" />
      <div class="el-row input-region">
        <div class="el-col-20">
          <el-form ref="loginForm" :model="login" label-width="auto" label-position="top" size="large" :rules="rules" @submit="performLogin($refs.loginForm)">
            <el-form-item label="E-mail" label-width="auto" prop="email">
              <el-input type="text" v-model="login.email" clearable></el-input>
            </el-form-item>
            <el-form-item label="Senha" label-width="auto" prop="password">
              <el-input v-model="login.password" type="password" clearable></el-input>
            </el-form-item>
            <el-form-item label="Manter logado" label-width="auto">
              <el-switch
                v-model="login.remember"
                inline-prompt
                :active-icon="CheckIcon"
                :inactive-icon="CloseIcon"
              >
              </el-switch>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-button type="primary" plain size="large" @click="performLogin($refs.loginForm)" :loading="buttonLoading">Login</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Check, Close } from '@element-plus/icons-vue'
import logoFM from '@/assets/logo.png'
import router from '@/router'
import { AuthService } from '@/service/auth/auth.service'
import { ElNotification, type FormInstance } from 'element-plus'

const authService = new AuthService()

// Icons
const CloseIcon = Close
const CheckIcon = Check

// Data
const login = reactive({
  email: '',
  password: '',
  remember: false,
})
const logoUrl = logoFM
const buttonLoading = ref(false)

// Validation rules
const rules = reactive({
  email: [
    { required: true, message: 'Por favor informe o seu e-mail', trigger: 'blur' },
    { type: 'email', message: 'Por favor informe um endereço de e-mail válido', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: 'Por favor informe a senha', trigger: 'blur' }
  ]
})

// Methods
const performLogin = (loginForm: FormInstance | undefined) => {
  if (!loginForm) return
  loginForm.validate((valid) => {
    if (valid) {
      buttonLoading.value = true;
      authService.tryLogin(login)
        .then(() => {
          buttonLoading.value = false
          router.push('/')
        })
        .catch(() => {
          ElNotification({
            title: 'Algo deu errado!',
            message: "Ocorreu um problema ao tentar efetuar o login",
            position: 'bottom-right',
            type: 'error',
          })
        })
        .finally(() => {
          buttonLoading.value = false
        })
    }
  })
}
</script>

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
