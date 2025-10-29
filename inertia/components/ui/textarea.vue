<script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core'
import { watch } from 'vue'

const { textarea, input } = useTextareaAutosize()

const inputModel = defineModel<string>('input')

watch(
  () => inputModel,
  (newValue) => {
    if (newValue.value !== input.value) {
      input.value = newValue.value!
    }
  },
  { once: true, immediate: true }
)

watch(input, (newValue) => {
  if (newValue !== inputModel.value) {
    inputModel.value = newValue
  }
})
</script>

<template>
  <div class="relative">
    <textarea ref="textarea" v-bind="$attrs" v-model="input" />
    <span v-if="$attrs.maxlength && input">{{ input.length }} / {{ $attrs.maxlength }}</span>
  </div>
</template>

<style scoped lang="scss">
textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;
  resize: none;
  padding: 0.5rem;
  background-color: var(--white);
  border: 2px solid var(--gray-800);
  outline: none;
  width: 100%;
  max-height: 300px;

  &:focus {
    box-shadow: var(--shadow-tiny);
  }

  &::placeholder {
    color: var(--gray-500);
  }
}

textarea::-webkit-scrollbar {
  display: none;
}

span {
  font-size: var(--text-xs);
  color: var(--gray-600);
  position: absolute;
  right: 0;
  bottom: -1rem;
}
</style>
