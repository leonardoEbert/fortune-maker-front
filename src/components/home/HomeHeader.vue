<script lang="ts">
import { defineComponent } from 'vue'
import logoFM from '@/assets/logo.png'

export default defineComponent({
  name: 'HomeHeader',
  data() {
    return {
      logoUrl: logoFM
    }
  },
})
</script>

<template>
  <el-row flex align="middle" justify="center" class="header-shadow">
    <el-image style="width: 200px; height: 50px" class="mt-2" :src="logoUrl" fit="contain" />
  </el-row>
</template>

<style scoped>
.header-shadow {
  box-shadow: 0 4px 6px -1px rgba(64, 158, 255, 0.6);
}
</style>