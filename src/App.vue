<template>
    <div class="app-header">
      <Logo/>
      <span class="header-username">
        Пользователь
      </span>
    </div>
  <div class="app-main">
    <Sidebar class="app-sidebar"/>
    <EmployeesPage class="app-content"/>
  </div>

 <Notifications />

 <div class="test-buttons">
  <button @click="triggerError500">Получить ошибку сервера</button>
  <button @click="triggerError400">Получить ошибку клиента</button>
 </div>

</template>

<script setup lang="ts">
import Notifications from "@/features/errors/ui/Notifications.vue";
import Sidebar from "@/pages/employees/ui/Sidebar.vue";
import EmployeesPage from "@/pages/employees/ui/EmployeesPage.vue";
import Logo from "@/shared/ui/Logo.vue";
import store from "@/store";

const triggerError500 = async () => {
  await store.dispatch("employees/triggerError500");
};

const triggerError400 = async () => {
  await store.dispatch("employees/triggerError400");
};

</script>

<style scoped lang="scss">
.app-main {
  display: flex;
  box-shadow: $box-shadow-primary;
  border-radius: 10px;
  min-height: 589px;
  width: 100%;
}
.app-sidebar {
  width: 291px;
  flex-shrink: 0;
  box-sizing: border-box;
}
.app-content {
  flex-grow: 1;
}
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
}

.header-username {
  color: $text-primary;
}

.test-buttons {
  margin-top: 60px;
  display: flex;
  gap: 12px;
  justify-content: center;
}

</style>
