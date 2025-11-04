<script lang="ts">
  import { PageProps } from '@adonisjs/inertia/types';
  import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast';
  import { usePage } from '@inertiajs/vue3';
  import { CircleAlertIcon, TriangleAlertIcon, CircleCheckIcon, InfoIcon, X } from '@lucide/vue';
  import { computed, watch } from 'vue';
  import { type Toasts, ToastTypeText } from '~/types';

  const iconMap = {
    success: CircleCheckIcon,
    error: CircleAlertIcon,
    warning: TriangleAlertIcon,
    info: InfoIcon,
  };
</script>

<script lang="ts" setup>
  const toaster = createToaster({
    overlap: true,
    placement: 'bottom-end',
    gap: 16,
    duration: 2500,
    max: 3,
  });

  const toasts = computed(() => usePage<PageProps>().flash.toast as Toasts);

  watch(toasts, (newToast) => {
    if (!newToast) return;

    toaster.create({
      title: ToastTypeText[newToast.type],
      description: newToast.message,
      type: newToast.type,
    });
  });
</script>

<template>
  <Toaster v-slot="toast" :toaster="toaster">
    <Toast.Root>
      <div class="d-flex items-center g-4">
        <component
          :is="toast.type ? iconMap[toast.type as keyof typeof iconMap] : InfoIcon"
          :size="24" />
        <div>
          <Toast.Title>{{ toast.title }}</Toast.Title>
          <Toast.Description>{{ toast.description }}</Toast.Description>
        </div>
        <Toast.CloseTrigger>
          <X :size="24" />
        </Toast.CloseTrigger>
      </div>
    </Toast.Root>
  </Toaster>
</template>

<style scoped lang="scss">
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes shrink {
    from {
      transform: scaleX(1);
    }
    to {
      transform: scaleX(0);
    }
  }

  [data-scope='toast'][data-part='root'] {
    background: white;
    padding: 8px 12px;
    box-shadow: var(--shadow-small);
    border-radius: var(--rounded);
    border: 2px solid var(--gray-800);
    width: 360px;
    overflow-wrap: anywhere;
    translate: var(--x) var(--y);
    scale: var(--scale);
    z-index: var(--z-index);
    height: var(--height);
    opacity: var(--opacity);

    will-change: translate, opacity, scale;
    transition:
      translate 400ms,
      scale 400ms,
      opacity 400ms,
      height 400ms,
      box-shadow 200ms;
    transition-timing-function: cubic-bezier(0.21, 1.02, 0.73, 1);

    &[data-state='closed'] {
      transition:
        translate 400ms,
        scale 400ms,
        opacity 200ms;
      transition-timing-function: cubic-bezier(0.06, 0.71, 0.55, 1);
    }
  }

  [data-scope='toast'][data-part='close-trigger'] {
    position: absolute;
    right: 8px;
    top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    font-size: 18px;
    padding: 0;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;

    & svg {
      width: 1em;
      height: 1em;
    }
  }

  [data-scope='toast'][data-part='title'] {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: bold;
  }

  [data-scope='toast'][data-part='root'][data-type='error'] {
    background: var(--red-600);
    color: var(--white);
  }

  [data-scope='toast'][data-part='root'][data-type='info'] {
    background: var(--cyan-600);
    color: var(--white);
  }

  [data-scope='toast'][data-part='root'][data-type='warning'] {
    background: var(--yellow-600);
  }

  [data-scope='toast'][data-part='root'][data-type='success'] {
    background: var(--lime-600);
    color: var(--white);
  }

  [data-scope='toast'] .spinner {
    animation: spin 1s linear infinite;
  }

  [data-scope='toast'][data-part='progressbar'] {
    height: 4px;
    background: var(--gray-800);
    width: 100%;
    position: absolute;
    bottom: 0;
    inset-inline: 0;
    animation-name: shrink;
    animation-fill-mode: forwards;
  }

  [data-scope='toast'][data-part='progressbar'][data-type='loading'] {
    animation-name: none;
  }

  @media (max-width: 640px) {
    [data-scope='toast'][data-part='group'] {
      width: 100%;
    }

    [data-scope='toast'][data-part='root'] {
      width: calc(100% - var(--gap) * 2);
    }

    [data-scope='toast'][data-part='root'] {
      font-size: var(--text-sm);
    }
  }
</style>
