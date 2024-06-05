<script lang="ts">
import { defineComponent } from 'vue'
import { Check, Close, Plus, Search } from '@element-plus/icons-vue'
import { ClassificationService } from '@/service/vendor/classification.service'
import type { FormInstance } from 'element-plus'

const classificationService = new ClassificationService()

export default defineComponent({
  name: 'VendorClassificationView',
  computed: {
    Close() {
      return Close
    },
    Check() {
      return Check
    },
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
      centerDialogVisible: false,
      insertMany: false,
      formClassification: {
        name: '',
        description: '',
        isActive: true,
        parentId: ''
      },
      mainClassificationList: [
        {
          value: 1,
          label: 'Classificação Principal 1'
        },
        {
          value: 2,
          label: 'Classificação Principal 2'
        },
        {
          value: 3,
          label: 'Classificação Principal 3'
        },
      ],
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
      ],
      rules: {
        name: [
          { required: true, message: 'Por favor informe o nome da classificação', trigger: 'blur' },
        ],
      }
    }
  },
  async mounted() {
    await this.loadClassifications()
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
    },
    saveNewClassification(classificationForm: FormInstance | undefined) {
      if (!classificationForm) return
      classificationForm.validate((valid) => {
        if (valid) {
          console.log(this.formClassification)
          if (!this.insertMany) {
            this.centerDialogVisible = false
          }
        }
      })
    },
    async loadClassifications() {
      const classificationList = await classificationService.getClassificationList();
      this.mainClassificationList = classificationList;
    },
    resetClassificationForm() {
      this.$refs.classificationForm.resetFields()
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
      <el-button style="float: right" type="primary" :icon="Plus" @click="centerDialogVisible = true">Cadastrar</el-button>
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
  <el-dialog
    v-model="centerDialogVisible"
    title="Nova classificação"
    width="800"
    align-center
    @close="resetClassificationForm"
  >
    <el-divider class="modal-title-divider"/>
    <el-form ref="classificationForm" :model="formClassification" label-position="top" :rules="rules">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="25" :lg="12" :xl="12">
          <el-form-item label="Nome" prop="name">
            <el-input v-model="formClassification.name" maxlength="50" show-word-limit clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="25" :lg="12" :xl="12">
          <el-form-item label="Classificação principal">
            <el-select
              v-model="formClassification.parentId"
              placeholder="Selecione"
              clearable
              no-data-text="Sem dados"
              multiple
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="mainClassification in mainClassificationList"
                :key="mainClassification.value"
                :label="mainClassification.label"
                :value="mainClassification.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="25" :lg="24" :xl="24">
          <el-form-item label="Descrição">
            <el-input maxlength="255" show-word-limit v-model="formClassification.description" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="25" :lg="24" :xl="24">
          <el-form-item label="Ativo?" label-width="auto" style="margin-bottom: 0">
            <el-switch
              v-model="formClassification.isActive"
              inline-prompt
              :active-icon="Check"
              :inactive-icon="Close"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider class="modal-footer-divider"/>
    <template #footer>
      <div class="dialog-footer">
        <el-row>
          <el-col :span="12">
            <el-form label-position="right">
              <el-form-item label="Inserir vários?" class="insert-many-switch">
                <el-switch
                  v-model="insertMany"
                  inline-prompt
                  :active-icon="Check"
                  :inactive-icon="Close"
                >
                </el-switch>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-button type="danger" plain @click="centerDialogVisible = false">Cancelar</el-button>
            <el-button type="primary" plain @click="saveNewClassification($refs.classificationForm)" :icon="Check">
              Salvar
            </el-button>
          </el-col>
        </el-row>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.modal-title-divider {
  margin-top: 0;
}
.modal-footer-divider {
  margin-bottom: 10px;
  margin-top: 10px;
}
.insert-many-switch {
  margin-bottom: 0;
}
</style>