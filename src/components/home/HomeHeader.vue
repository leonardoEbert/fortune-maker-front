<script lang="ts">
import { defineComponent } from 'vue'
import logoFM from '@/assets/logo.png'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

export default defineComponent({
  name: 'HomeHeader',
  data() {
    return {
      logoUrl: logoFM
    }
  },
  methods: {
    handleLogOff() {
      const authStore = useAuthStore()
      authStore.clearToken()
      router.push('/login')
    }
  }
})
</script>

<template>
  <el-row flex align="middle" justify="space-between" class="header-shadow">
    <div class="el-col-22">
      <el-image style="width: 200px; height: 50px" class="mt-2" :src="logoUrl" fit="contain" />
    </div>
    <el-button plain type="primary" @click="handleLogOff">Sair</el-button>
  </el-row>
</template>

<style scoped>
.header-shadow {
  box-shadow: 0 4px 6px -1px rgba(64, 158, 255, 0.6);
  margin: 0 10px;
}
</style>