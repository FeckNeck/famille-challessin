<script setup lang="ts">
import { Select } from '@ark-ui/vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { useAttrs } from 'vue'

interface SelectItem {
  label: string
  value: string
}

withDefaults(
  defineProps<{
    color?: 'cyan' | 'violet' | 'red' | 'yellow' | 'lime'
    items: SelectItem[]
    placeholder?: string
  }>(),
  {
    color: 'cyan',
  }
)

const selectModel = defineModel<string[]>()

const attributs = useAttrs()
console.log('attributs:', attributs)
</script>

<template>
  <Select.Root :items="items" v-model="selectModel">
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText :placeholder="placeholder" />
        <Select.Indicator>
          <ChevronsUpDown :size="16" />
        </Select.Indicator>
      </Select.Trigger>
    </Select.Control>
    <Select.Positioner style="width: 100%">
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
  </Select.Root>
</template>

<style scoped>
[data-scope='select'][data-part='root'] {
  width: 100%;
  position: relative;
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
