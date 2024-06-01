<script lang="ts">
import { defineComponent } from 'vue'
import { Document, Location, Menu as IconMenu, Setting } from '@element-plus/icons-vue'
import logoFM from '@/assets/favicon-32x32.png'

export default defineComponent({
  name: 'MenuSidebar',
  components: { Setting, Document, Location, IconMenu },
  data() {
    return {
      isCollapse: false,
      logoUrl: logoFM,
    }
  },
})
</script>

<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical"
    :collapse="isCollapse"
  >
    <el-row justify="center">
      <el-button link @click="isCollapse = !isCollapse">
        <el-image :src="logoUrl" class="collapse-toggle"></el-image>
      </el-button>
    </el-row>
    <el-divider border-style="solid" direction="horizontal" class="collapse-toggle-divider" />
    <span style="overflow-y: scroll">
      <el-sub-menu index="1" class="">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </span>
    <el-row class="fixed-bottom-item">
      <el-divider border-style="solid" direction="horizontal" class="collapse-toggle-divider" />
      <el-menu-item index="999" class="config-menu-item">
        <el-icon><setting /></el-icon>
        <template #title>Configurações</template>
      </el-menu-item>
    </el-row>
  </el-menu>
</template>

<style scoped>
.el-menu-vertical {
  min-height: 100%;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
.collapse-toggle {
  margin-top: 10px;
}
.collapse-toggle-divider {
  background-color: var(--el-color-primary);
  margin-bottom: 0;
  margin-top: 10px;
}
.fixed-bottom-item {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.config-menu-item {
  justify-content: center;
  width: 100%;
}
</style>