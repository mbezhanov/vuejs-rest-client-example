<template>
    <div>
        <transition name="fade" mode="out-in" appear>
            <app-login v-if="!isAuthenticated" @loggedIn="onSuccessfulLogin"></app-login>
            <app-dashboard v-else></app-dashboard>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue'

export default {
    components: {
        'app-dashboard': Dashboard,
        'app-login': Login
    },
    computed: {
        ...mapGetters({
            isAuthenticated: 'getIsAuthenticated',
            isLoading: 'getIsLoading'
        })
    },
    methods: {
        onSuccessfulLogin(authToken) {
            localStorage.setItem('authToken', authToken);
            this.$store.commit('setIsAuthenticated', true);
        }
    },
    created() {
        const authToken = localStorage.getItem('authToken');

        if (authToken !== null) {
            this.onSuccessfulLogin(authToken);
        }
    }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .4s !important;
}
.fade-enter, .fade-leave-to {
    opacity: 0 !important;
}
#login {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.modal {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
}
</style>
