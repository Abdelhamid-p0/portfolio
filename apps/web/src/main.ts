import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp } from 'vue'

import App from './App.vue'
import { apolloClient } from './app/providers/apollo'
import router from './app/router'
import { setTheme, theme } from './app/theme'

import './shared/styles/global.css'

setTheme(theme.value)

const app = createApp(App)

app.provide(DefaultApolloClient, apolloClient)
app.use(router)

app.mount('#app')
