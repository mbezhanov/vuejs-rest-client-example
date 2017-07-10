import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    selectedCalendarDate: ''
};

const getters = {
    getSelectedCalendarDate: state => state.selectedCalendarDate
};

const actions = {
};

const mutations = {
    setSelectedCalendarDate(state, date) {
        state.selectedCalendarDate = date;
    }
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
