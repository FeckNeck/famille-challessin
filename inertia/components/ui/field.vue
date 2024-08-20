<script setup lang="ts">
import { Field } from '@ark-ui/vue'
import { defineProps, computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    label?: string
    error?: any
    info?: string
    required?: boolean
  }>(),
  {
    required: false,
  }
)

// const isInvalid = computed(() => !!props.error)
const isInvalid = ref<boolean>(false)
</script>

<template>
  <div>
    <Field.Root :required="required" :invalid="isInvalid">
      <Field.Label v-if="label">{{ label }}</Field.Label>
      <Field.Input asChild>
        <slot />
      </Field.Input>
      <Field.HelperText v-if="info">{{ info }}</Field.HelperText>
      <Field.ErrorText>Error Text</Field.ErrorText>
    </Field.Root>
    <button @click="isInvalid = !isInvalid" type="button">error</button>
    <p>{{ isInvalid }}</p>
  </div>
</template>

<style scoped>
[data-scope='field'][data-part='root'] {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>
