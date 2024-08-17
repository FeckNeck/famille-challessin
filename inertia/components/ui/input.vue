<script setup lang="ts">
import { InputHTMLAttributes, useSlots, computed } from 'vue'

withDefaults(
  defineProps<{
    type: InputHTMLAttributes['type']
    placeholder?: string
  }>(),
  {
    type: 'text',
  }
)

const slots = useSlots()

const inputModel = defineModel<string>('input')

const hasLeftIcon = computed(() => !!slots['left-icon'])
const hasRightIcon = computed(() => !!slots['right-icon'])
</script>

<template>
  <div class="relative">
    <div v-if="hasLeftIcon" class="icon --left">
      <slot name="left-icon" />
    </div>
    <input
      :type="type"
      v-model="inputModel"
      :placeholder="placeholder"
      class="input"
      :class="[
        {
          '--left-icon': hasLeftIcon,
          '--right-icon': hasRightIcon,
        },
      ]"
    />
    <div v-if="hasRightIcon" class="icon --right">
      <slot name="right-icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    outline: none;
    border-color: #333;
  }

  &.--left-icon {
    padding-inline-start: 2.5rem;
  }

  &.--right-icon {
    padding-inline-end: 2.5rem;
  }
}

.icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &.--left {
    left: 0.5rem;
  }

  &.--right {
    right: 0.5rem;
  }
}
</style>
