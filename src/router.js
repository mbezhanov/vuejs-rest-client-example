import Vue from 'vue';
import VueRouter from 'vue-router';
import Diary from './components/Diary.vue';
import Foods from './components/Foods.vue';
import Profile from './components/Profile.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', redirect: '/diary' },
        { path: '/diary', component: Diary },
        { path: '/foods', component: Foods },
        { path: '/profile', component: Profile }
    ]
});
