<script setup lang="ts">
import {
  Checkbox,
  useForwardPropsEmits,
  type CheckboxRootProps,
  type CheckboxRootEmits,
} from '@ark-ui/vue'
import { CheckIcon } from 'lucide-vue-next'

export interface CheckboxProps extends CheckboxRootProps {
  color?: 'cyan' | 'violet' | 'red' | 'yellow' | 'lime'
  label: string
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  color: 'violet',
})

const emits = defineEmits<CheckboxRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Checkbox.Root v-bind="forwarded">
    <Checkbox.Control :class="color">
      <Checkbox.Indicator>
        <CheckIcon :size="16" />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label>{{ label }}</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
</template>

<style scoped>
[data-scope='checkbox'][data-part='root'] {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

[data-scope='checkbox'][data-part='group'] {
  display: flex;
  gap: 24px;
}

[data-scope='checkbox'][data-part='control'] {
  border: 2px solid var(--gray-800);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

[data-scope='checkbox'][data-part='control'][data-state='checked'] {
  &.violet {
    background-color: var(--violet-300);
  }

  &.cyan {
    background-color: var(--cyan-300);
  }

  &.yellow {
    background-color: var(--yellow-300);
  }

  &.red {
    background-color: var(--red-300);
  }

  &.lime {
    background-color: var(--lime-300);
  }
}

[data-scope='checkbox'][data-part='indicator']:not([hidden]) {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
