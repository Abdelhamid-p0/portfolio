import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp } from 'vue'

import { apolloClient } from './api/graphql/apollo'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.provide(DefaultApolloClient, apolloClient)
app.use(router)

app.mount('#app')
