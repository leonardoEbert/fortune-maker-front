<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginView',
  data() {
    return {
      message: 'Hello World!'
    }
  },
  methods: {
    buttonClicked() {
      alert('Hello World!');
    }
  }
})
</script>

<template>
  <el-button @click="buttonClicked">{{ message }}</el-button>
</template>

<style scoped>

</style>