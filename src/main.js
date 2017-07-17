import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueResource);

Vue.http.options.root = 'http://app.local:8081/';
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
