import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h, ref, type DefineComponent } from 'vue'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      return resolvePageComponent(
        `../pages/${name}.vue`,
        import.meta.glob<DefineComponent>('../pages/**/*.vue')
      )
    },

    setup({ App, props, plugin }) {
      const app = createSSRApp({ render: () => h(App, props) })
        .use(plugin)
        .directive('autoAnimate', {})

      app.config.globalProperties.modelViewerScriptLoaded = ref(false)

      return app
    },
  })
}
