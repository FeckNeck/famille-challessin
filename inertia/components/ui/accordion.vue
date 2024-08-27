<script setup lang="ts">
import { ChevronDownIcon } from 'lucide-vue-next'
import { Accordion } from '@ark-ui/vue'
import Editable from './editable.vue'

withDefaults(
  defineProps<{
    editable: boolean
    label: string
  }>(),
  {
    editable: false,
  }
)

const titleModel = defineModel<string>({ required: true })
</script>

<template>
  <Accordion.Root collapsible>
    <Accordion.Item :value="titleModel">
      <Accordion.ItemTrigger>
        <Editable v-if="editable" v-model="titleModel" :label="label" />
        <span v-else> {{ titleModel }} </span>
        <Accordion.ItemIndicator>
          <ChevronDownIcon />
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <slot />
      </Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
</template>

<style scoped>
[data-scope][data-part='item-trigger'] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
}

[data-scope][data-part='item-indicator'] {
  transition: transform 200ms ease-in-out;
}

[data-scope][data-part='item-indicator'][data-state='open'] {
  transform: rotate(180deg);
}

@keyframes slideDown {
  from {
    opacity: 0.01;
    height: 0;
  }
  to {
    opacity: 1;
    height: var(--height);
  }
}

@keyframes slideUp {
  from {
    opacity: 1;
    height: var(--height);
  }
  to {
    opacity: 0.01;
    height: 0;
  }
}

[data-scope='accordion'][data-part='item-content'][data-state='open'] {
  animation: slideDown 250ms ease-in-out;
}

[data-scope='accordion'][data-part='item-content'][data-state='closed'] {
  animation: slideUp 200ms ease-in-out;
}
</style>
