<template>
  <el-row justify="space-between">
    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
      <el-input v-model="searchTerm" placeholder="Pesquisar">
        <template #prepend>
          <el-select v-model="searchTarget" placeholder="Selecione" style="width: 115px" clearable>
            <el-option label="Nome" value="name" />
            <el-option label="Descrição" value="description" />
          </el-select>
        </template>
        <template #append>
          <el-button type="primary" :icon="SearchIcon" @click="performSearch" />
        </template>
      </el-input>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
      <el-button style="float: right" type="primary" :icon="PlusIcon" @click="centerDialogVisible = true">Cadastrar</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-divider />
    <el-col :span="24">
      <el-table ref="tableRef" row-key="id" :data="tableData" stripe>
        <el-table-column prop="name" label="Nome" sortable width="180" column-key="name" />
        <el-table-column prop="description" label="Descrição" />
        <el-table-column prop="isActive" label="Ativo">
          <template #default="scope">
            <el-tag :type="scope.row.isActive ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.isActive ? 'Sim' : 'Não' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Ações" align="center" header-align="center">
          <template #default="scope">
            <el-button type="primary" size="small" @click="editClassification(scope.row.id)">Editar</el-button>
            <el-popconfirm title="Tem certeza que deseja excluir essa classificação?" width="300" @confirm="deleteClassification(scope.row.id)">
              <template #reference>
                <el-button type="danger" size="small">Excluir</el-button>
              </template>
            </el-popconfirm>

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
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="resetClassificationForm"
  >
    <el-divider class="modal-title-divider" />
    <el-form ref="formClassificationRef" :model="formClassification" label-position="top" :rules="rules">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="Nome" prop="name">
            <el-input v-model="formClassification.name" maxlength="50" show-word-limit clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="Classificação principal" prop="parentClassification">
            <el-select v-model="formClassification.parentClassification" placeholder="Selecione" clearable no-data-text="Sem dados" @change="handleParent">
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
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="Descrição" prop="description">
            <el-input maxlength="255" show-word-limit v-model="formClassification.description" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="Ativo?" label-width="auto" style="margin-bottom: 0" prop="isActive">
            <el-switch
              v-model="formClassification.isActive"
              inline-prompt
              :active-icon="CheckIcon"
              :inactive-icon="CloseIcon"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider class="modal-footer-divider" />
    <template #footer>
      <div class="dialog-footer">
        <el-row>
          <el-col :span="12">
            <el-form label-position="right">
              <el-form-item label="Inserir vários?" class="insert-many-switch">
                <el-switch
                  v-model="insertMany"
                  inline-prompt
                  :active-icon="CheckIcon"
                  :inactive-icon="CloseIcon"
                />
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-button type="danger" plain @click="centerDialogVisible = false">Cancelar</el-button>
            <el-button
              type="primary"
              plain
              @click="saveClassification(formClassificationRef)"
              :icon="CheckIcon"
              :loading="buttonLoading"
            >
              Salvar
            </el-button>
          </el-col>
        </el-row>
      </div>
    </template>
  </el-dialog>
  <el-divider />
  <el-row :gutter="20" justify="center">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="classificationCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-row>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { Check, Close, Plus, Search } from '@element-plus/icons-vue'
import { ClassificationService } from '@/service/vendor/classification.service'
import { ElNotification, type FormInstance } from 'element-plus'
import { VendorClassification } from '@/model/vendor/vendor-classification.model'
import type { VendorClassificationPaginationParams } from '@/model/vendor/vendor-classification-pagination-params.model'

const classificationService = new ClassificationService();

const CloseIcon = computed(() => Close);
const CheckIcon = computed(() => Check);
const PlusIcon = computed(() => Plus);
const SearchIcon = computed(() => Search);

const buttonLoading = ref(false);
const searchTerm = ref('');
const searchTarget = ref('');
const centerDialogVisible = ref(false);
const insertMany = ref(false);
const formClassification = reactive<VendorClassification>(new VendorClassification());
const mainClassificationList = ref<SelectOption[]>([]);
const classificationCount = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);
const tableData = ref<VendorClassification[]>([]);

interface SelectOption {
  label: string;
  value: string
}

const rules = {
  name: [
    { required: true, message: 'Por favor informe o nome da classificação', trigger: 'blur' },
  ],
};

const performSearch = () => {
  console.log(searchTerm.value);
  console.log(searchTarget.value);
};

const handleParent = (parent: VendorClassification) => {
  formClassification.parentClassification = parent;
}

const editClassification = (id: string) => {
  const classification = tableData.value.find((classification) => classification.id === id);
  if (classification) {
    Object.keys(classification).forEach((key: string) => {
      if (classification[key] && typeof classification[key] === 'object' ) {
        formClassification[key] = classification[key].id;
      } else {
        formClassification[key] = classification[key]
      }
    });
  }

  centerDialogVisible.value = true;
};

const deleteClassification = (id: string) => {
  classificationService.deleteClassification(id)
    .then(() => {
      getClassificationsPaginated();
      ElNotification({
        title: 'Sucesso!',
        message: "A classificação foi excluída!",
        position: 'bottom-right',
        type: 'success',
      });
    })
    .catch(() => {
      ElNotification({
        title: 'Algo deu errado!',
        message: "Ocorreu um problema ao tentar excluir a classificação",
        position: 'bottom-right',
        type: 'error',
      });
    })
};

const saveClassification = (classificationForm: FormInstance | undefined) => {
  if (!classificationForm) return;
  buttonLoading.value = true;
  classificationForm.validate((valid) => {
    if (valid) {
      if (formClassification.id === '') {
        delete formClassification.id
        createClassification()
      } else {
       updateClassification();
      }
    }
  });
};

const createClassification = () => {
  classificationService.createClassification(formClassification)
    .then(() => {
      buttonLoading.value = false;
      clearClassificationForm();
      ElNotification({
        title: 'Sucesso!',
        message: "A classificação foi salva!",
        position: 'bottom-right',
        type: 'success',
      });
      if (!insertMany.value) {
        centerDialogVisible.value = false;
      }
    })
    .catch(() => {
      ElNotification({
        title: 'Algo deu errado!',
        message: "Ocorreu um problema ao tentar criar a classificação",
        position: 'bottom-right',
        type: 'error',
      });
    })
    .finally(() => {
      buttonLoading.value = false;
      loadMainClassifications();
      getClassificationsPaginated();
    });
}

const updateClassification = () => {
  delete formClassification.subClassifications
  classificationService.updateClassification(formClassification)
    .then(() => {
      buttonLoading.value = false;
      clearClassificationForm();
      ElNotification({
        title: 'Sucesso!',
        message: "A classificação foi salva!",
        position: 'bottom-right',
        type: 'success',
      });
      if (!insertMany.value) {
        centerDialogVisible.value = false;
      }
    })
    .catch(() => {
      ElNotification({
        title: 'Algo deu errado!',
        message: "Ocorreu um problema ao tentar editar a classificação",
        position: 'bottom-right',
        type: 'error',
      });
    })
    .finally(() => {
      buttonLoading.value = false;
      loadMainClassifications();
      getClassificationsPaginated();
    });
}

const getClassificationsPaginated = async () => {
  const paginationParams: VendorClassificationPaginationParams = {
    currentPage: currentPage.value,
    pageSize: pageSize.value,
  }
  classificationService.getClassificationsByPage(paginationParams)
    .then((response) => {
      tableData.value = response.data
      classificationCount.value = +response.total
      currentPage.value = +response.page
    })
    .catch(() => {
      ElNotification({
        title: 'Algo deu errado!',
        message: "Ocorreu um problema ao tentar buscar a página de classificações",
        position: 'bottom-right',
        type: 'error',
      });
    })
}

const loadMainClassifications = async () => {
  mainClassificationList.value = await classificationService.getClassificationList();
};

const resetClassificationForm = () => {
  (formClassificationRef.value as FormInstance).resetFields();
};

const clearClassificationForm = () => {
  Object.assign(formClassification, new VendorClassification());
};

const handleSizeChange = async (newPageSize: number) => {
  pageSize.value = newPageSize
  await getClassificationsPaginated();
}
const handleCurrentChange = async (newPage: number) => {
  currentPage.value = newPage;
  await getClassificationsPaginated();
}

onMounted(async () => {
  await loadMainClassifications();
  await getClassificationsPaginated();
});

const formClassificationRef = ref<FormInstance>();
</script>

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
