<template>
  <input
    class="input"
    type="text"
    :placeholder="props.placeholder"
    :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
interface Props {
  placeholder?: string,
  modelValue?: string,
}

const props = defineProps<Props>()

</script>

<style lang="scss" scoped>
.input {
  height: 46px;
  width: 100%;
  border: 1px solid $border-quaternary;
  border-radius: 8px;
  padding: 0 16px;
  box-sizing: border-box;
  color: $text-secondary;
  font-weight: 500;
  font-size: 14px;
}
</style>