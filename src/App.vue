<template>
    <div>
        <app-menu></app-menu>
        <div class="ui grid container">
            <div class="row">
                <div class="column"><!-- this row intentionally left blank --></div>
            </div>
            <transition name="fade" mode="out-in">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
import Menu from './components/Menu.vue';
import moment from 'moment';

export default {
    components: {
        'app-menu': Menu,
    },
    mounted() {
        this.$store.dispatch('requestFoodList');
        this.$store.commit('setSelectedCalendarDate', moment());
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
.modal {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
}
</style>
