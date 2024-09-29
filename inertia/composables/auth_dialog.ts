import { ref } from 'vue'

export type AuthDialogState = {
  isOpen: boolean
  mode: 'login' | 'register' | 'forgot-password' | null
}

const authDialogState = ref<AuthDialogState>({
  isOpen: false,
  mode: null,
})

export function useAuthDialog() {
  function open(mode: 'login' | 'register') {
    authDialogState.value.isOpen = true
    authDialogState.value.mode = mode
  }

  function close() {
    authDialogState.value.isOpen = false
    authDialogState.value.mode = null
  }

  return {
    authDialogState,
    open,
    close,
  }
}
