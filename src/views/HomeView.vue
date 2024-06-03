<script lang="ts">
import { defineComponent } from 'vue'
import MenuSidebar from '@/components/home/Sidebar.vue'
import HomeHeader from '@/components/home/HomeHeader.vue'

export default defineComponent({
  name: 'HomeView',
  components: { HomeHeader, MenuSidebar },
})
</script>

<template>
  <div class="el-row">
    <el-container class="el-col-24">
      <el-header class="home-header">
        <HomeHeader />
      </el-header>
      <el-container>
        <el-aside>
          <MenuSidebar />
        </el-aside>
        <el-container>
          <el-main>
            <RouterView />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.home-header {
  background-color: #f0f0f0;
  height: auto;
  padding: 0;
}
.el-row {
  min-height: inherit;
}
.el-aside {
  overflow-y: hidden;
  width: auto;
}
</style>