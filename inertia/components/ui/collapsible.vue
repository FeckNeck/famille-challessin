<script setup lang="ts">
import {
  Collapsible,
  useForwardPropsEmits,
  type CollapsibleRootProps,
  type CollapsibleRootEmits,
} from '@ark-ui/vue'
import { ChevronDownIcon } from 'lucide-vue-next'
// import { ChevronDownIcon } from 'lucide-vue-next'
// import { Accordion, AccordionRootProps, AccordionRootEmits, useForwardPropsEmits } from '@ark-ui/vue'

export interface CollapsibleProps extends CollapsibleRootProps {
  title: string
}

const props = defineProps<CollapsibleProps>()
const emits = defineEmits<CollapsibleRootEmits>()

// props.ti

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <!-- <Accordion.Root collapsible>
    <Accordion.Item :value="title">
      <Accordion.ItemTrigger>
        <h5>{{ title }}</h5>
        <Accordion.ItemIndicator>
          <ChevronDownIcon />
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <slot />
      </Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root> -->
  <Collapsible.Root v-bind="forwarded">
    <Collapsible.Trigger>
      <h5>{{ title }}</h5>
      <ChevronDownIcon />
    </Collapsible.Trigger>
    <Collapsible.Content>
      <slot />
    </Collapsible.Content>
  </Collapsible.Root>
</template>

<style scoped>
[data-scope='collapsible'][data-part='trigger'] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
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
