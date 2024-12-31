<template>
  <div class="employees-list">
    <template v-if="!searchQuery">
      <span class="warn">начните поиск</span>
    </template>
    <template v-else-if="isEmployeesListEmpty && !isLoading">
      <span class="warn">ничего не найдено</span>
    </template>
    <template v-else>
      <div class="employees-list-items" v-for="(employee, index) in paginatedEmployees" :key="index">
        <EmployeesListItem
            @click="store.dispatch('employee/setEmployee', employee)"
            :username="employee.username" :email="employee.email"
        />
      </div>
    </template>

  </div>
    <div class="pagination">
      <button class="pagination-button" @click="loadPrevious" :disabled="currentPage === 1 ">
        <
      </button>
      <span :class="{ 'disabled': totalEmployees < 5 }" class="pagination-text"> Страница {{ currentPage }}</span>
      <button class="pagination-button" @click="loadNext" :disabled="!hasMore">
        >
      </button>
    </div>
</template>

<script setup lang="ts">

import { computed } from "vue";
import store from "@/store";
import EmployeesListItem from "@/features/search-employees/ui/EmployeesListItem.vue";

const searchQuery = computed(() => store.getters['employees/isSearchStarted']);
const totalEmployees = computed(() => store.getters['employees/totalEmployees']);

const paginatedEmployees = computed(() => store.getters['employees/paginatedEmployees']);
const currentPage = computed(() => store.getters['employees/currentPage']);
const itemsPerPage = computed(() => store.getters['employees/itemsPerPage']);
const isLoading = computed(() => store.getters['employees/isLoading']);

const isEmployeesListEmpty = computed(() => {
  return searchQuery && totalEmployees.value === 0;
})
const hasMore = computed(() => currentPage.value * itemsPerPage.value < totalEmployees.value);

const loadNext = () => {
  if (hasMore.value) {
    store.dispatch('employees/changePage', currentPage.value + 1);
  }
};

const loadPrevious = () => {
  if (currentPage.value > 1) {
    store.dispatch('employees/changePage', currentPage.value - 1);
  }
};


</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}
.pagination-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;

  border-radius: 10px;
  box-shadow: $box-shadow-primary;

  &:disabled {
    box-shadow: unset;
    color: $text-primary;
    opacity: 0.1;
  }
}

.pagination-text.disabled {
  color: $text-primary;
  opacity: 0.1;
}

.warn {
  font-size: 14px;
  color: $text-secondary;
}

</style>
