<script setup lang="ts">
import { Select, SelectRootProps, SelectRootEmits, useForwardPropsEmits } from '@ark-ui/vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'

interface SelectItem {
  label: string
  value: string
}

const props = withDefaults(defineProps<SelectRootProps<SelectItem>>(), {
  positioning: { sameWidth: true },
})

const emit = defineEmits<SelectRootEmits<string>>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <Select.Root v-bind="forwarded">
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText :placeholder="placeholder" />
        <Select.Indicator>
          <ChevronsUpDown :size="16" />
        </Select.Indicator>
      </Select.Trigger>
    </Select.Control>
    <Teleport to="body">
      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup>
            <Select.Item v-for="item in items" :key="item.value" :item="item.value">
              <Select.ItemText>{{ item.label }}</Select.ItemText>
              <Select.ItemIndicator>
                <Check :size="16" />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Teleport>
  </Select.Root>
</template>

<style scoped>
[data-scope='select'][data-part='root'] {
  width: 100%;
}

[data-scope='select'][data-part='trigger'] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  width: 100%;
  background-color: var(--white);
  border: 2px solid var(--gray-800);
}

[data-scope='select'][data-part='content'] {
  background-color: var(--white);
  border: 2px solid var(--gray-800);
  box-shadow: var(--shadow-tiny);
  width: 100%;
  z-index: 1000;
}

[data-scope='select'][data-part='content'][data-state='open'] {
  animation: fadeIn 0.25s ease-out;
}

[data-scope='select'][data-part='content'][data-state='closed'] {
  animation: fadeOut 0.2s ease-in;
}

[data-scope='select'][data-part='item'] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 0.5rem;
  height: 2.5rem;
  transition: background-color 200ms ease-in-out;
}

[data-scope='select'][data-part='item'][data-highlighted] {
  background-color: var(--cyan-200);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
