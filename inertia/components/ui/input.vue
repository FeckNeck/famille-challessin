<script setup lang="ts">
import { Field } from '@ark-ui/vue'
import { LucideIcon } from 'lucide-vue-next'

interface Props {
  label?: string
  error?: string
  info?: string
  placeholder?: string
  type: string
  icon?: LucideIcon
  iconSize?: number
}

withDefaults(defineProps<Props>(), {
  type: 'text',
})

const inputModel = defineModel<string>('input')
</script>

<template>
  <Field.Root :invalid="!!error">
    <Field.Label v-if="label">{{ label }}</Field.Label>
    <Field.Input asChild>
      <slot />
      <input v-model="inputModel" :type="type" :placeholder="placeholder" />
    </Field.Input>
    <Field.HelperText v-if="info">{{ info }}</Field.HelperText>
    <Field.ErrorText v-if="error">{{ error }}</Field.ErrorText>
  </Field.Root>
</template>

<style scoped>
.input {
  position: relative;

  & > svg {
    position: absolute;
    top: 50%;
    left: 0.75rem;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
  }

  & > input {
    padding-inline-start: 2.5rem;
  }
}

[data-scope='field'][data-part='root'] {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

[data-scope='field'][data-part='input'] {
  height: 2.5rem;
  padding-inline: 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  position: relative;

  & > svg {
    position: absolute;
    top: 50%;
    left: 0.75rem;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
