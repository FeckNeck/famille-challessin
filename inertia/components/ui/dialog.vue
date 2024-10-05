<script setup lang="ts">
import {
  Dialog,
  useForwardPropsEmits,
  type DialogRootEmits,
  type DialogRootProps,
} from '@ark-ui/vue'
import Card from './card.vue'
import { XIcon } from 'lucide-vue-next'

export interface DialogProps extends DialogRootProps {
  position?: 'center' | 'top'
}

const props = withDefaults(defineProps<DialogProps>(), {
  position: 'center',
})

const emits = defineEmits<DialogRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Dialog.Root v-bind="forwarded">
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner :class="position">
        <Dialog.Content>
          <Card class="p-8">
            <Dialog.Title asChild>
              <slot name="title" />
            </Dialog.Title>
            <Dialog.Description asChild>
              <slot name="description" />
            </Dialog.Description>
            <Dialog.CloseTrigger>
              <XIcon :size="16" />
            </Dialog.CloseTrigger>
          </Card>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>

<style scoped>
[data-scope='dialog'][data-part='backdrop'] {
  backdrop-filter: blur(4px);
  height: 100vh;
  left: 0px;
  position: fixed;
  top: 0px;
  width: 100vw;
  z-index: overlay;
}

[data-scope='dialog'][data-part='backdrop'][data-state='open'] {
  animation: fadeIn 0.25s cubic-bezier(0.05, 0.7, 0.1, 1);
}

[data-scope='dialog'][data-part='backdrop'][data-state='closed'] {
  animation: fadeOut 0.2s cubic-bezier(0.3, 0, 0.8, 0.15);
}

[data-scope='dialog'][data-part='positioner'] {
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  left: 0px;
  overflow: auto;
  position: fixed;
  top: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 1000;

  &.center {
    align-items: center;
  }

  &.top {
    align-items: start;
  }
}

[data-scope='dialog'][data-part='content'] {
  width: 100%;
  max-width: 500px;
  max-height: 85vh;
  position: relative;
}

[data-scope='dialog'][data-part='content'][data-state='open'] {
  animation: slideIn 0.4s cubic-bezier(0.05, 0.7, 0.1, 1);
}

[data-scope='dialog'][data-part='content'][data-state='closed'] {
  animation: slideOut 0.4s cubic-bezier(0.3, 0, 0.8, 0.15);
}

[data-scope='dialog'][data-part='title'] {
  margin-bottom: 1.5rem;
}

[data-scope='dialog'][data-part='close-trigger'] {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(64px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(64px);
  }
}
</style>
