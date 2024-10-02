<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Link } from '@inertiajs/vue3'
import { LoaderCircle } from 'lucide-vue-next'

defineProps<{
  color?: 'cyan' | 'violet' | 'red' | 'yellow' | 'lime' | 'blank'
  size?: 'small' | 'medium'
  loading?: boolean
}>()

const attrs = useAttrs()

const buttonOrLink = computed(() => {
  return attrs.href ? Link : 'button'
})
</script>

<template>
  <Component
    v-bind="$attrs"
    :is="buttonOrLink"
    class="button"
    :class="[
      color,
      size,
      {
        '--loading': loading,
      },
    ]"
  >
    <LoaderCircle v-if="loading" class="button-spin" />
    <slot />
  </Component>
</template>

<style scoped>
.button {
  --bg-color: transparant;
  background-color: var(--bg-color);
  border-radius: var(--rounded);
  border: 2px solid var(--gray-800);
  box-shadow: var(--shadow-small);
  cursor: pointer;
  display: inline-block;
  font-size: var(--text-base);
  font-weight: bold;
  padding: 0.75rem 1.25rem;
  position: relative;
  transition: background-color 100ms ease-in;

  &:not(.blank):hover {
    --bg-color: var(--white);
  }

  &.blank {
    border: 0 !important;
    box-shadow: none !important;
    padding: 0;
  }

  &.small {
    padding: 0.5rem;
  }

  &.violet {
    --bg-color: var(--violet-300);

    &:hover {
      --bg-color: var(--violet-500);
    }
  }

  &.cyan {
    --bg-color: var(--cyan-300);

    &:hover {
      --bg-color: var(--cyan-500);
    }
  }

  &.yellow {
    --bg-color: var(--yellow-300);

    &:hover {
      --bg-color: var(--yellow-500);
    }
  }

  &.red {
    --bg-color: var(--red-300);

    &:hover {
      --bg-color: var(--red-500);
    }
  }

  &.lime {
    --bg-color: var(--lime-300);

    &:hover {
      --bg-color: var(--lime-500);
    }
  }

  &.--loading {
    pointer-events: none;
    color: transparent;
  }
}

.button-spin {
  animation: spin 1s linear infinite;
  color: var(--gray-800) !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

@keyframes spin {
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
