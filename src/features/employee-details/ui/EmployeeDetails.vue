<template>
  <div class="employee-details">
    <div class="employee-image">
      <img src="/image-placeholder.png">
    </div>
    <div class="content">
      <span class="employee-title">
        {{employee?.name}}
      </span>

      <div class="employee-info">
        <span class="employee-key">
          email:
        </span>
        <span class="employee-text">
          {{employee?.email}}
        </span>
      </div>

      <div class="employee-info">
        <span class="employee-key">
          phone:
        </span>
        <span class="employee-text">
          {{employee?.phone}}
        </span>
      </div>

      <span class="employee-title">
        О себе:
      </span>

      <span class="employee-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
        aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </span>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Employee } from "@/entites/employee/model/employee";
import store from "@/store";
import { computed } from "vue";

const employee = computed<Employee | null>(() => store.state.employee.employee);
</script>

<style lang="scss" scoped>

.employee-details {
  padding: 30px 21px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  gap: 60px;
  text-align: left;
}

.employee-title {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  &:last-of-type {
    margin-bottom: 25px;
  }
}

.employee-image {
  width: 100%;
  height: 286px;
}

.employee-info {
  display: flex;
  margin-bottom: 10px;
  gap: 8px;

  &:last-of-type {
    margin-bottom: 20px;
  }
}


.employee-key {
  color: $text-primary;
  font-weight: 500;
}
.employee-text {
  color: $text-secondary;
}

.content {
  flex: 1 0 50%;
}

</style>
