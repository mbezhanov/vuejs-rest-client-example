import moment from 'moment';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    availableFoods: [],
    selectedCalendarDate: moment()
};

const getters = {
    getAvailableFoods: state => state.availableFoods,
    getSelectedCalendarDate: state => state.selectedCalendarDate
};

const actions = {
    requestFoodList ({ commit }) {
        Vue.http.get('foods').then(response => {
            console.log(response.body._embedded.items);
            commit('setAvailableFoods', response.body._embedded.items);
        });
    }
};

const mutations = {
    setAvailableFoods (state, foods = []) {
        state.availableFoods = foods;
    },
    setSelectedCalendarDate (state, date = moment()) {
        state.selectedCalendarDate = date;
    }
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
