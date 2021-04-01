import Vue from 'vue'
import App from './App.vue'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

Vue.config.productionTip = false

Vue.use(VuePlyr, {
  plyr: {}
})

new Vue({
  render: h => h(App),
}).$mount('#app')