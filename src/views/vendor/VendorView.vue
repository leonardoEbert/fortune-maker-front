<template>
  <el-row justify="space-between">
    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
      <el-input v-model="searchTerm" placeholder="Pesquisar" clearable>
        <template #prepend>
          <el-select v-model="searchTarget" placeholder="Selecione" style="width: 115px" clearable>
            <el-option label="Nome" value="name" />
            <el-option label="Descrição" value="description" />
          </el-select>
        </template>
        <template #append>
          <el-button type="primary" :icon="SearchIcon" @click="getVendorsPaginated" />
        </template>
      </el-input>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
      <el-button style="float: right" type="primary" :icon="PlusIcon" @click="openModal">Cadastrar</el-button>
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
            <el-button type="primary" size="small" @click="editVendor(scope.row.id)">Editar</el-button>
            <el-popconfirm title="Tem certeza que deseja excluir essa classificação?" width="300" @confirm="deleteVendor(scope.row.id)">
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
    @close="resetVendorForm"
  >
    <el-divider class="modal-title-divider" />
    <el-form ref="formClassificationRef" :model="formVendor" label-position="top" :rules="rules">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="Nome" prop="name">
            <el-input v-model="formVendor.name" maxlength="50" show-word-limit clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="Classificação principal" prop="parentClassification">
            <el-select v-model="formVendor.classifications" placeholder="Selecione" clearable no-data-text="Sem dados" @change="handleParent">
              <el-option
                v-for="mainClassification in classificationList"
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
            <el-input maxlength="255" show-word-limit v-model="formVendor.description" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="Ativo?" label-width="auto" style="margin-bottom: 0" prop="isActive">
            <el-switch
              v-model="formVendor.isActive"
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
            <el-button type="danger" plain @click="closeModal">Cancelar</el-button>
            <el-button
              type="primary"
              plain
              @click="saveVendor(formVendorRef)"
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

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { Check, Close, Plus, Search } from '@element-plus/icons-vue';
import { VendorService } from '@/service/vendor/vendor.service'
import { Vendor } from '@/model/vendor/vendor.model'
import type { FormInstance } from 'element-plus'
import { VendorClassification } from '@/model/vendor/vendor-classification.model'
import type { SelectOption } from '@/interfaces/select-option.interface'

const vendorService = new VendorService();

const CloseIcon = computed(() => Close);
const CheckIcon = computed(() => Check);
const PlusIcon = computed(() => Plus);
const SearchIcon = computed(() => Search);

const buttonLoading = ref(false);
const searchTerm = ref('');
const searchTarget = ref('');
const centerDialogVisible = ref(false);
const insertMany = ref(false);
const tableData = ref<Vendor[]>([]);
const formVendor = reactive<Vendor>(new Vendor());
const classificationCount = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);
const formVendorRef = ref<FormInstance>();
const classificationList = ref<SelectOption[]>([]);

const rules = {
  name: [
    { required: true, message: 'Por favor informe o nome da classificação', trigger: 'blur' },
  ],
};

const getVendorsPaginated = async () => {
  await vendorService.getVendorsList();
}

const openModal = () => {

}

const editVendor = async (vendorId: string) => {

}

const deleteVendor = async (vendorId: string) => {

}

const handleSizeChange = async (newPageSize: number) => {
  pageSize.value = newPageSize
  await getVendorsPaginated();
}

const handleCurrentChange = async (newPage: number) => {
  currentPage.value = newPage;
  await getVendorsPaginated();
}

const resetVendorForm = () => {
  (formVendorRef.value as FormInstance).resetFields();
}

const clearVendorForm = () => {
  Object.assign(formVendor, new Vendor());
};

const handleParent = (classifications: VendorClassification[]) => {
  formVendor.classifications = classifications;
}

const closeModal = () => {
  centerDialogVisible.value = false;
  formVendor.classifications = undefined;
}

const saveVendor = async (vendorForm: FormInstance | undefined) => {

}

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