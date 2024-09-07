import { Ref } from 'vue'

export * from '~/types'

declare module 'vue' {
  interface ComponentCustomProperties {
    modelViewerScriptLoaded: Ref<boolean>
  }
}
