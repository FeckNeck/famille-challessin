<script setup lang="ts">
import { Clipboard } from '@ark-ui/vue/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-vue-next'
import Input from './input.vue'

const { label } = defineProps<{
  label: string
}>()

const modelValue = defineModel<string>()
</script>

<template>
  <Clipboard.Root v-model="modelValue">
    <Clipboard.Label>{{ label }}</Clipboard.Label>
    <Clipboard.Control>
      <Clipboard.Input as-child>
        <Input v-model:input="modelValue" />
      </Clipboard.Input>
      <Clipboard.Trigger type="button">
        <Clipboard.Indicator>
          <ClipboardCopyIcon :size="20" />
          <template #copied>
            <CheckIcon :size="20" />
          </template>
        </Clipboard.Indicator>
      </Clipboard.Trigger>
    </Clipboard.Control>
  </Clipboard.Root>
</template>

<style scoped>
[data-scope='clipboard'][data-part='root'] {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

[data-scope='clipboard'][data-part='control'] {
  display: flex;
  gap: 0.5rem;
}

[data-scope='clipboard'][data-part='input'] {
  width: 100%;
}

[data-scope='clipboard'][data-part='input'][data-copied] {
  box-shadow: var(--shadow-tiny);
}

[data-scope='clipboard'][data-part='trigger'] {
  padding-inline: 0.5rem;
  border: 2px solid var(--gray-800);
  background-color: var(--white);
  cursor: pointer;
}

[data-scope='clipboard'][data-part='trigger'][data-copied] {
  box-shadow: var(--shadow-tiny);
}
</style>
