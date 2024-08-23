<script setup lang="ts">
import { Switch } from '@ark-ui/vue'

withDefaults(
  defineProps<{
    color?: 'cyan' | 'violet' | 'red' | 'yellow' | 'lime'
    label: string
  }>(),
  {
    color: 'cyan',
  }
)

const switchModel = defineModel<boolean>('switch')
</script>

<template>
  <Switch.Root v-model:checked="switchModel">
    <Switch.Control :class="[color]">
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>{{ label }}</Switch.Label>
    <Switch.HiddenInput />
  </Switch.Root>
</template>

<style scoped lang="scss">
[data-scope='switch'][data-part='root'] {
  display: flex;
  align-items: center;
  position: relative;
  width: fit-content;

  --switch-track-width: 2.25rem;
  --switch-track-height: 1rem;
  --switch-track-diff: calc(var(--switch-track-width) - var(--switch-track-height));
  --switch-thumb-x: var(--switch-track-diff);
}

[data-scope='switch'][data-part='control'] {
  display: inline-flex;
  flex-shrink: 0;
  -webkit-box-pack: start;
  justify-content: flex-start;
  box-sizing: content-box;
  border: 2px solid var(--gray-800);
  cursor: pointer;
  border-radius: 9999px;
  padding: 0.125rem;
  width: var(--switch-track-width);
  height: var(--switch-track-height);
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-duration: 150ms;

  // --switch-bg: #cbd5e0;
  --switch-bg: var(--gray-300);
  background: var(--switch-bg);
}

[data-scope='switch'][data-part='control'][data-state='checked'] {
  &.violet {
    --switch-bg: var(--violet-300);
  }

  &.cyan {
    --switch-bg: var(--cyan-300);
  }

  &.yellow {
    --switch-bg: var(--yellow-300);
  }

  &.red {
    --switch-bg: var(--red-300);
  }

  &.lime {
    --switch-bg: var(--lime-300);
  }
}

[data-scope='switch'][data-part='control'][data-focus] {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
}

[data-scope='switch'][data-part='control'][data-disabled] {
  opacity: 0.4;
  cursor: not-allowed;
}

[data-scope='switch'][data-part='thumb'] {
  background: var(--white);
  border: 2px solid var(--gray-800);
  transition-property: transform;
  transition-duration: 200ms;
  border-radius: inherit;
  width: var(--switch-track-height);
  height: var(--switch-track-height);
  position: relative;
}

[data-scope='switch'][data-part='thumb'][data-state='checked'] {
  transform: translateX(var(--switch-thumb-x));
}

[data-scope='switch'][data-part='label'] {
  user-select: none;
  margin-inline-start: 0.5rem;
}
</style>
