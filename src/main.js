import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';



const app = createApp(App);
app.use(VueToast);
app.use(store);
app.use(router);
app.mount('#app');
