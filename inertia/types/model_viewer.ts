import { Ref } from 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    modelViewerScriptLoaded: Ref<boolean>
  }
}
