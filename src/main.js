import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';
import router from './router';
import store from './store';
import '../node_modules/semantic-ui-css/semantic.min.css';

Vue.use(VueResource);

Vue.http.options.root = process.env.API_URL;
Vue.http.interceptors.push((request, next) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken !== null) {
        request.headers.set('Authorization', 'Bearer ' + authToken);
    }
    next();
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
