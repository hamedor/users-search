<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <span class="sidebar-title title-main">
        Поиск сотрудников
      </span>

      <template v-if="isLodaing">
        <Preloader />
      </template>
    </div>

    <InputField class="sidebar-input" placeholder="Введите id или имя" v-model="searchQuery" />

    <span class="sidebar-title title-subtitle">
      Результаты
    </span>

    <EmployeesList />
  </div>
</template>

<script setup lang="ts">
import InputField from "@/shared/ui/InputField.vue";
import EmployeesList from "@/features/search-employees/ui/EmployeesList.vue";
import {computed} from "vue";
import store from "@/store";
import Preloader from "@/shared/ui/Preloader.vue";


const searchQuery = computed({
  get: () => store.state.employees.searchQuery,
  set: (value) => store.dispatch('employees/updateSearchQuery', value),
});
const isLodaing = computed(() => store.state.employees.isLoading);

</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  background: $background-secondary;
  border-radius: 10px;
  padding: 27px 20px;
  text-align: left;
}
.sidebar-header {
  display: flex;
  justify-content: space-between;
}

.sidebar-input {
  margin-bottom: 22px;
  max-width: 240px;
}

.sidebar-title {
  display: block;
  color: $border-primary;
  font-size: 16px;
  font-weight: 600;

}
.title-main {
  margin-bottom: 22px;
}
.title-subtitle {
  margin-bottom: 10px;
}
</style>
