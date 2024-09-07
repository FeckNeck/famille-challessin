/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.scss'
import { createApp, h, ref } from 'vue'
import type { DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>('../pages/**/*.vue')
    )
  },

  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) })
      .use(autoAnimatePlugin)
      .use(plugin)

    const modelViewerScriptLoaded = ref(false)
    app.config.globalProperties.modelViewerScriptLoaded = modelViewerScriptLoaded

    function loadModelViewerScript() {
      if (modelViewerScriptLoaded.value || !window.matchMedia('(min-width: 768px)').matches) {
        return
      }

      const scriptEl = document.createElement('script')
      scriptEl.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js'
      scriptEl.async = true
      scriptEl.type = 'module'
      scriptEl.onload = () => {
        modelViewerScriptLoaded.value = true
      }

      document.body.appendChild(scriptEl)
    }

    setTimeout(() => {
      window.requestIdleCallback(() => {
        loadModelViewerScript()
      })

      window.addEventListener('resize', () => {
        loadModelViewerScript()
      })
    }, 100)

    app.mount(el)
  },
})
