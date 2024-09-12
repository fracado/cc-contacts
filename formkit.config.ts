import { en } from '@formkit/i18n'
import { defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme.ts'

export default defaultConfig({
  config: {
    locales: { en },
    locale: 'en',
    rootClasses
  }
})
