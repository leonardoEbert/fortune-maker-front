<script lang="ts">
import { defineComponent } from 'vue'
import { Plus, Search } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'VendorClassificationView',
  computed: {
    Plus() {
      return Plus
    },
    Search() {
      return Search
    }
  },
  data() {
    return {
      searchTerm: '',
      searchTarget: '',
      tableData: [
        {
          name: 'Tom',
          description: 'No. 189, Grove St, Los Angeles',
          isActive: true,
        },
        {
          name: 'Tom',
          description: 'No. 189, Grove St, Los Angeles',
          isActive: false,
        },
        {
          name: 'Tom',
          description: 'No. 189, Grove St, Los Angeles',
          isActive: true,
        },
        {
          name: 'Tom',
          description: 'No. 189, Grove St, Los Angeles',
          isActive: true,
        },
      ]
    }
  },
  methods: {
    performSearch() {
      console.log(this.searchTerm)
      console.log(this.searchTarget)
    },
    editClassification(id: string) {
      console.log(id)
    },
    deleteClassification(id: string) {
      console.log(id)
    }
  }
})
</script>

<template>
  <el-row justify="space-between">
    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
      <el-input
        v-model="searchTerm"
        placeholder="Pesquisar"
      >
        <template #prepend>
          <el-select v-model="searchTarget" placeholder="Selecione" style="width: 115px" clearable>
            <el-option label="Nome" value="name" />
            <el-option label="Descrição" value="description" />
          </el-select>
        </template>
        <template #append>
          <el-button type="primary" :icon="Search" @click="performSearch" />
        </template>
      </el-input>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" >
      <el-button style="float: right" type="primary" :icon="Plus" @click="performSearch">Cadastrar</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-divider />
    <el-col :span="24">
      <el-table ref="tableRef" row-key="date" :data="tableData" stripe>
        <el-table-column
          prop="name"
          label="Nome"
          sortable
          width="180"
          column-key="name"
        />
        <el-table-column prop="description" label="Descrição" />
        <el-table-column prop="isActive" label="Ativo">
          <template #default="scope">
            <el-tag
              :type="scope.row.isActive ? 'success' : 'danger'"
              disable-transitions
            >{{ scope.row.isActive ? 'Sim' : 'Não' }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Ações" align="center" header-align="center">
          <template #default="scope">
            <el-button type="primary" size="small" @click="editClassification(scope.row.id)">
              Editar
            </el-button>
            <el-button type="danger" size="small" @click="deleteClassification(scope.row.id)">Excluir</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>