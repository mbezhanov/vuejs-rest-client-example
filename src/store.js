import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
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
    getSelectedCalendarDate: state => state.selectedCalendarDate,
    getManufacturers: state => state.manufacturers,
    getManufacturerById: state => id => {
        return find(state.manufacturers, manufacturer => manufacturer.id === id);
    }
};

const actions = {
    requestFoodList({ commit }) {
        Vue.http.get('foods').then(response => {
            commit('setAvailableFoods', response.body._embedded.items);
        });
    },
    requestManufacturerList({ commit }) {
        Vue.http.get('manufacturers?limit=50').then(response => {
            commit('setManufacturers', response.body._embedded.items);
        });
    },
    updateFoodInformation({ commit }, foodId) {
        Vue.http.get(`foods/${foodId}`).then(response => {
            commit('updateFood', response.body);
        });
    }
};

const mutations = {
    setAvailableFoods(state, foods = []) {
        state.availableFoods = foods;
    },
    setSelectedCalendarDate(state, date = moment()) {
        state.selectedCalendarDate = date;
    },
    setManufacturers(state, manufacturers = []) {
        state.manufacturers = manufacturers;
    },
    updateFood(state, newFood) {
        const index = findIndex(state.availableFoods, oldFood => oldFood.id == newFood.id);
        state.availableFoods.splice(index, 1, newFood);
    }
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
