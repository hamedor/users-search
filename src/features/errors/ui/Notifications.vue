<template>
  <div class="notifications-container">
    <transition-group name="slide-fade" tag="div">
      <div
        v-for="error in errors"
        :key="error.id"
        class="notification"
        @click="removeError(error.id)"
      >
        {{ error.message }}
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const errors = computed(() => store.getters['error/allErrors']);

const removeError = (id: number) => {
  store.dispatch('error/removeError', id);
};
</script>

<style scoped lang="scss">
.notifications-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.notification {
  background-color: $background-quaternary;
  color: $text-quaternary;
  padding: 15px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  min-width: 260px;
  position: relative;
  box-shadow: $box-shadow-secondary;
  cursor: pointer;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 1s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.slide-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-fade-leave-to {
  transform: translateX(150%);
}
</style>