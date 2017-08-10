<template>
    <div class="row">
        <div class="eight wide column">
            <h2>Search Database</h2>
            <div class="ui fluid icon input">
                <input type="text" placeholder="Search..." v-model="searchQuery">
                <i class="search icon"></i>
            </div>
            <h2>Matching Foods</h2>
            <div id="selection-list-wrapper">
                <div class="ui middle aligned divided selection list">
                    <div class="item" v-for="food in filteredFoods" :class="{ active: selectedFood !== null && selectedFood.id === food.id }" @click="onFoodItemClick(food)">
                        <div class="content">
                            <a class="header">{{ food.name }}</a>
                            <div class="description">{{ food._embedded.manufacturer.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="eight wide column">
            <h2>Nutrition Facts</h2>
            <app-food-form
                v-if="shouldShowForm"
                :isCreatingNewRecord="isCreatingNewRecord"
                :food="selectedFood"
                @cancelButtonClicked="onCancelButtonClick"
                @newFoodAdded="onNewFoodAdded"
            ></app-food-form>
            <div v-else>
                <p>Please select an item from the list on the left to view its nutritional information.</p>
                <p>You can use the button below to create new food items.</p>
                <button class="ui olive right labeled icon button" @click="onAddButtonClick">
                    <i class="plus icon"></i>
                    Add Food
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import filter from 'lodash/filter';
import { mapGetters } from 'vuex';
import FoodForm from './foods/FoodForm.vue';

export default {
    components: {
        'app-food-form': FoodForm
    },
    data() {
        return {
            isCreatingNewRecord: false,
            searchQuery: '',
            selectedFood: null
        }
    },
    computed: {
        ...mapGetters({
            foods: 'getAvailableFoods'
        }),
        shouldShowForm() {
            return this.selectedFood !== null;
        },
        filteredFoods() {
            return filter(this.foods, (item) => {
                const hasFoodMatch = (item.name.toLowerCase().indexOf(this.searchQuery) !== -1);
                const hasManufacturerMatch = (item._embedded.manufacturer.name.toLowerCase().indexOf(this.searchQuery) !== -1);
                return hasFoodMatch || hasManufacturerMatch;
            });
        }
    },
    methods: {
        onAddButtonClick() {
            this.isCreatingNewRecord = true;
            this.selectedFood = {
                name: '',
                serving_size: '0 gr',
                calories: 0,
                carbs: 0,
                fat: 0,
                protein: 0,
                _embedded: {
                    manufacturer: {
                        id: 0,
                        name: ''
                    }
                }
            };
        },
        onCancelButtonClick() {
            this.isCreatingNewRecord = false;
            this.selectedFood = null;
        },
        onFoodItemClick(food) {
            this.isCreatingNewRecord = false;
            (this.selectedFood === food) ? this.selectedFood = null : this.selectedFood = food;
        },
        onNewFoodAdded() {
            this.selectedFood = {
                name: '',
                serving_size: '0 gr',
                calories: 0,
                carbs: 0,
                fat: 0,
                protein: 0,
                _embedded: {
                    manufacturer: {
                        id: 0,
                        name: ''
                    }
                }
            };
        }
    },
    created() {
        this.$store.dispatch('requestManufacturerList');
    }
}
</script>

<style scoped>
#selection-list-wrapper {
    height: 480px;
}
.ui.selection.list {
    height: 100%;
    overflow: scroll;
}
</style>
