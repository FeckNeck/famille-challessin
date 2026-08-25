export const ToastType = {
  SUCCESS: 'success',
  INFO: 'info',
  ERROR: 'error',
  WARNING: 'warning',
} as const;

export type IToastType = (typeof ToastType)[keyof typeof ToastType];
