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
    data() {
        return {
            jQuery: window.jQuery
        }
    },
    mounted() {
        this.$store.commit('setSelectedCalendarDate', moment());
        this.jQuery('.ui.modal').modal();
        this.jQuery('.ui.dropdown').dropdown();
    }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
