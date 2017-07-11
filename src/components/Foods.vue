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
                    <div class="item" v-for="food in filteredFoods" @click="onFoodItemClick(food)">
                        <div class="content">
                            <a class="header">{{ food.name }}</a>
                            <div class="description">{{ food.manufacturer.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="eight wide column">
            <h2>Nutrition Facts</h2>
            <div v-if="selectedFood !== null">
                <table class="ui small compact orange celled table">
                    <thead>
                        <tr>
                            <th colspan="2">{{ selectedFood.name }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Manufacturer</strong></td>
                            <td>{{ selectedFood.manufacturer.name }}</td>
                        </tr>
                        <tr>
                            <td><strong>Serving size</strong></td>
                            <td>{{ selectedFood.serving_size }}</td>
                        </tr>
                        <tr>
                            <td><strong>Calories (kcal)</strong></td>
                            <td>{{ selectedFood.calories }}</td>
                        </tr>
                        <tr>
                            <td><strong>Carbs (g)</strong></td>
                            <td>{{ selectedFood.carbs }}</td>
                        </tr>
                        <tr>
                            <td><strong>Fat (g)</strong></td>
                            <td>{{ selectedFood.fat }}</td>
                        </tr>
                        <tr>
                            <td><strong>Protein (g)</strong></td>
                            <td>{{ selectedFood.protein }}</td>
                        </tr>
                    </tbody>
                </table>
                <button class="ui right floated button">
                    Discard
                </button>
                <button class="ui right floated primary button">
                    Save
                </button>
            </div>
            <p v-else>Please select an item from the list on the left.</p>
        </div>
    </div>
</template>

<script>
import filter from 'lodash/filter';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            searchQuery: '',
            selectedFood: null
        }
    },
    computed: {
        ...mapGetters({
            foods: 'getAvailableFoods'
        }),
        filteredFoods() {
            return filter(this.foods, (item) => {
                const hasFoodMatch = (item.name.toLowerCase().indexOf(this.searchQuery) !== -1);
                const hasManufacturerMatch = (item.manufacturer.name.toLowerCase().indexOf(this.searchQuery) !== -1);
                return hasFoodMatch || hasManufacturerMatch;
            });
        }
    },
    methods: {
        onFoodItemClick(food) {
            this.selectedFood = food;
        }
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
