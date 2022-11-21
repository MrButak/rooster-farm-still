import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(createVuestic)
});