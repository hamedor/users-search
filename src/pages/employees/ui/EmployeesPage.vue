<template>
  <div class="employees-page">
    <template v-if="employee">
      <EmployeeDetails />
    </template>
    <template v-else>
      <div class="employee-text-container">
        <span class="employee-text">
          Выберите сотрудника, чтобы посмотреть его профиль
        </span>
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
import EmployeeDetails from "@/features/employee-details/ui/EmployeeDetails.vue";
import {computed} from "vue";
import store from "@/store";

const employee = computed(() => store.state.employee.employee)

</script>

<style lang="scss" scoped>
.employees-page {
  border-left: 1px solid $border-secondary;
  background: $background-secondary

}
.employee-text-container {
  width: 100%;
  height: 100%;
  margin-top: 250px;
  margin-bottom: 308px;
  display: flex;
  justify-content: center;
}
.employee-text {
  font-size: 14px;
  color: $text-secondary;
}
</style>
