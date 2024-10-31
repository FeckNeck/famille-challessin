<script setup lang="ts">
import {
  Collapsible,
  useForwardPropsEmits,
  type CollapsibleRootProps,
  type CollapsibleRootEmits,
} from '@ark-ui/vue'
import { ChevronDownIcon } from 'lucide-vue-next'

const props = defineProps<CollapsibleRootProps>()
const emits = defineEmits<CollapsibleRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Collapsible.Root v-bind="forwarded">
    <div class="d-flex items-center justify-between pl-4">
      <slot name="title" />
      <Collapsible.Trigger>
        <ChevronDownIcon />
      </Collapsible.Trigger>
    </div>
    <Collapsible.Content>
      <slot name="content" />
    </Collapsible.Content>
  </Collapsible.Root>
</template>

<style scoped>
[data-scope='collapsible'][data-part='trigger'] {
  flex-grow: 1;
  display: flex;
  justify-content: end;
  align-items: center;
  background: none;
  padding: 1.5rem;
  border: none;
  cursor: pointer;
}

[data-scope='collapsible'][data-part='trigger'] {
  & > svg {
    transition: transform 200ms ease-in-out;
  }
}

[data-scope='collapsible'][data-part='trigger'][data-state='open'] {
  & > svg {
    transform: rotate(180deg);
  }
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

[data-scope='collapsible'][data-part='content'][data-state='open'] {
  animation: slideDown 250ms ease-in-out;
}

[data-scope='collapsible'][data-part='content'][data-state='closed'] {
  animation: slideUp 200ms ease-in-out;
}
</style>
