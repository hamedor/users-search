<template>
  <div class="employee-item">
    <div class="employee-image">
      <img src="/image-placeholder-small.png"/>
    </div>
    <div class="employee-info">
      <span class="employee-name">
        {{ props.username }}
      </span>
      <span class="employee-mail">
        {{ props.email }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Props {
  username: string;
  email: string;
}

const props = defineProps<Props>()

</script>

<style lang="scss" scoped>
.employee-item {
  width: 100%;
  height: 70px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  box-shadow: $box-shadow-primary;
  outline: 1px solid transparent;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    outline: 1px solid $border-secondary;
  }

  &:hover .employee-info {
    background: $background-primary;
  }
}
.employee-image {
  width: 70px;
  overflow: hidden;
}
.employee-info {
  padding: 15px;
  display: flex;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
  flex-direction: column;
  gap: 5px;
  overflow: hidden;
}
.employee-name {
  color: $text-primary;
  font-size: 14px;
  line-height: 1;
  font-weight: 600;
}
.employee-mail {
  color: $text-secondary;
  font-size: 14px;
  white-space: nowrap;        
  overflow: hidden;         
  text-overflow: ellipsis; 
}

</style>
