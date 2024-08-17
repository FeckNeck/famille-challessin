<script setup lang="ts">
import { Editable } from '@ark-ui/vue'

defineProps<{
  label?: string
}>()

const inputModel = defineModel<string>('input')

function update(details: Editable.ValueChangeDetails) {
  inputModel.value = details.value
}
</script>

<template>
  <Editable.Root
    :modelValue="inputModel"
    activationMode="dblclick"
    @valueCommit="(details) => update(details)"
  >
    <Editable.Label v-if="label">{{ label }}</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
    <Editable.Context v-slot="{ editing }">
      <Editable.Control v-if="editing">
        <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
        <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
      </Editable.Control>
      <Editable.Control v-else>
        <Editable.EditTrigger>Edit</Editable.EditTrigger>
      </Editable.Control>
    </Editable.Context>
  </Editable.Root>
</template>

<style scoped>
[data-scope='editable'][data-part='root'] {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
}
</style>
