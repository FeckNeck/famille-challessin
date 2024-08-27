<script setup lang="ts">
import { useSlots, computed } from 'vue'

defineProps<{
  radius?: 'rsmall' | 'rmedium' | 'rfull'
}>()

const slots = useSlots()

const inputModel = defineModel<string>()

const hasLeftIcon = computed(() => !!slots['left-icon'])
const hasRightIcon = computed(() => !!slots['right-icon'])
</script>

<template>
  <div class="relative">
    <div v-if="hasLeftIcon" class="icon --left">
      <slot name="left-icon" />
    </div>
    <input
      v-bind="$attrs"
      v-model="inputModel"
      class="input"
      :class="[
        radius,
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
  background-color: var(--white);
  border: 2px solid var(--gray-800);
  outline: none;
  width: 100%;

  &:focus {
    box-shadow: var(--shadow-tiny);
  }

  &.rsmall {
    border-radius: var(--rounded-sm);
  }

  &.rmedium {
    border-radius: var(--rounded-md);
  }

  &.rfull {
    border-radius: 9999px;
  }

  &::placeholder {
    color: var(--gray-500);
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
