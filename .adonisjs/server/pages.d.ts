import '@adonisjs/inertia/types'

import type { VNodeProps, AllowedComponentProps, ComponentInstance } from 'vue'

type ExtractProps<T> = Omit<
  ComponentInstance<T>['$props'],
  keyof VNodeProps | keyof AllowedComponentProps
>

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/forgot_password': ExtractProps<(typeof import('../../inertia/pages/auth/forgot_password.vue'))['default']>
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.vue'))['default']>
    'auth/register': ExtractProps<(typeof import('../../inertia/pages/auth/register.vue'))['default']>
    'auth/reset_password': ExtractProps<(typeof import('../../inertia/pages/auth/reset_password.vue'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.vue'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.vue'))['default']>
    'home/components/filters': ExtractProps<(typeof import('../../inertia/pages/home/components/filters.vue'))['default']>
    'home/components/hero': ExtractProps<(typeof import('../../inertia/pages/home/components/hero.vue'))['default']>
    'home/components/main_section': ExtractProps<(typeof import('../../inertia/pages/home/components/main_section.vue'))['default']>
    'home/components/order': ExtractProps<(typeof import('../../inertia/pages/home/components/order.vue'))['default']>
    'home/components/pagination': ExtractProps<(typeof import('../../inertia/pages/home/components/pagination.vue'))['default']>
    'home/components/wishlist_card': ExtractProps<(typeof import('../../inertia/pages/home/components/wishlist_card.vue'))['default']>
    'home/main': ExtractProps<(typeof import('../../inertia/pages/home/main.vue'))['default']>
    'wishlist/edit/components/category': ExtractProps<(typeof import('../../inertia/pages/wishlist/edit/components/category.vue'))['default']>
    'wishlist/edit/components/create_category': ExtractProps<(typeof import('../../inertia/pages/wishlist/edit/components/create_category.vue'))['default']>
    'wishlist/edit/components/create_gift': ExtractProps<(typeof import('../../inertia/pages/wishlist/edit/components/create_gift.vue'))['default']>
    'wishlist/edit/components/gift': ExtractProps<(typeof import('../../inertia/pages/wishlist/edit/components/gift.vue'))['default']>
    'wishlist/edit/components/hero': ExtractProps<(typeof import('../../inertia/pages/wishlist/edit/components/hero.vue'))['default']>
    'wishlist/edit/main': ExtractProps<(typeof import('../../inertia/pages/wishlist/edit/main.vue'))['default']>
    'wishlist/show/components/gift': ExtractProps<(typeof import('../../inertia/pages/wishlist/show/components/gift.vue'))['default']>
    'wishlist/show/components/hero': ExtractProps<(typeof import('../../inertia/pages/wishlist/show/components/hero.vue'))['default']>
    'wishlist/show/main': ExtractProps<(typeof import('../../inertia/pages/wishlist/show/main.vue'))['default']>
  }
}
