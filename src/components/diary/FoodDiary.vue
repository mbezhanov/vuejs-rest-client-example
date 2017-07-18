<template>
    <div>
        <div class="ui active inverted dimmer" v-if="isLoading">
            <div class="ui text loader">Loading...</div>
        </div>
        <div class="meal-wrapper" v-for="(foods, mealName) in meals">
            <h2>{{ ucfirst(mealName) }}</h2>
            <table class="ui small compact orange celled table">
                <thead>
                <tr>
                    <th>Food</th>
                    <th>Amount</th>
                    <th>Calories (kcal)</th>
                    <th>Carbs (g)</th>
                    <th>Fat (g)</th>
                    <th>Protein (g)</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="food in foods">
                    <td>{{ `${food.name} (${food._embedded.manufacturer.name})` }}</td>
                    <td>{{ food.serving_size }}</td>
                    <td>{{ food.calories }}</td>
                    <td>{{ food.carbs }}</td>
                    <td>{{ food.fat }}</td>
                    <td>{{ food.protein }}</td>
                    <td class="center aligned">
                        <a href="#" @click.prevent.stop="onRemoveRequest(food)">
                            <i class="red remove icon"></i>
                        </a>
                    </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <th colspan="2">Total</th>
                    <th>{{ getTotal(mealName, 'calories') }}</th>
                    <th>{{ getTotal(mealName, 'carbs') }}</th>
                    <th>{{ getTotal(mealName, 'fat') }}</th>
                    <th>{{ getTotal(mealName, 'protein') }}</th>
                    <th></th>
                </tr>
                </tfoot>
            </table>
        </div>
        <semantic-ui-modal v-if="shouldShowModal" :basic="true" :closable="false" :active="true">
            <template slot="header" v-if="!shouldShowLoader">
                <i class="book icon"></i>
                <p>Delete Diary Entry</p>
            </template>
            <div class="centered" v-if="!shouldShowLoader">Are you sure you want to delete this entry from the diary?</div>
            <div class="ui large text loader" v-else>Loading</div>
            <template slot="actions" v-if="!shouldShowLoader">
                <div class="ui red basic cancel inverted button" @click="onModalCancelButtonClicked">
                    <i class="remove icon"></i>
                    No
                </div>
                <div class="ui green ok inverted button" @click="onModalSubmitButtonClicked">
                    <i class="checkmark icon"></i>
                    Yes
                </div>
            </template>
        </semantic-ui-modal>
    </div>
</template>

<script>
import upperFirst from 'lodash/upperFirst';
import moment from 'moment';
import { Modal } from 'semantic-ui-vue2';
import { mapGetters } from 'vuex';

export default {
    components: {
        'semantic-ui-modal': Modal
    },
    data() {
        return {
            isLoading: false,
            meals: {
                breakfast: [],
                lunch: [],
                dinner: []
            },
            selectedFood: null,
            shouldShowModal: false,
            shouldShowLoader: false
        };
    },
    computed: {
        ...mapGetters({
            selectedCalendarDate: 'getSelectedCalendarDate'
        })
    },
    watch: {
        selectedCalendarDate(date) {
            const breakfast = [];
            const lunch = [];
            const dinner = [];

            this.isLoading = true;

            this.$http.get(`diary/${date.year()}/${date.format('MM')}/${date.format('DD')}`).then(response => {
                let totalCaloriesConsumed = 0;

                for (let item of response.body._embedded.items) {
                    const food = this.applyQuantityTransformation(item);
                    food.diary_id = item.id;
                    if (item.meal.id === 1) {
                        breakfast.push(food);
                    } else if (item.meal.id === 2) {
                        lunch.push(food);
                    } else if (item.meal.id === 3) {
                        dinner.push(food);
                    }
                    totalCaloriesConsumed += item.food.calories;
                }

                this.$emit('caloriesCountChanged', totalCaloriesConsumed);
                this.isLoading = false;
            });

            this.meals.breakfast = breakfast;
            this.meals.lunch = lunch;
            this.meals.dinner = dinner;
        }
    },
    methods: {
        getTotal(meal, metric) {
            let total = 0;

            for (const item of this.meals[meal]) {
                total += parseInt(item[metric]);
            }

            return total;
        },
        ucfirst(string) {
            return upperFirst(string);
        },
        applyQuantityTransformation(item) {
            item.food.serving_size = `${item.quantity} x ${item.food.serving_size}`;
            item.food.calories *= item.quantity;
            item.food.carbs *= item.quantity;
            item.food.fat *= item.quantity;
            item.food.protein *= item.quantity;

            return item.food;
        },
        onRemoveRequest(food) {
            this.selectedFood = food;
            this.shouldShowModal = true;
        },
        onModalCancelButtonClicked() {
            this.selectedFood = null;
            this.shouldShowModal = false;
        },
        onModalSubmitButtonClicked() {
            this.shouldShowLoader = true;
            this.$http.delete(`diary/${this.selectedFood.diary_id}`).then(() => {
                this.$emit('diaryEntryRemoved');
                this.selectedFood = null;
                this.shouldShowModal = false;
                this.shouldShowLoader = false;
            });
        }
    },
}
</script>

<style scoped>
.meal-wrapper {
    margin-bottom: 14px;
}
.centered {
    text-align: center;
}
.modal .header p {
    text-align: center;
}
.modal .header .icon {
    float: none;
    display: block;
    width: auto;
    height: auto;
    line-height: 1;
    padding: 0;
    font-size: 3em;
    margin: 0 auto .5rem;
    opacity: 1;
    vertical-align: middle;
}
</style>
