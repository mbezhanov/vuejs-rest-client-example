<template>
    <div>
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
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="food in foods">
                        <td>{{ `${food.name} (${food.manufacturer.name})` }}</td>
                        <td>{{ food.serving_size }}</td>
                        <td>{{ food.calories }}</td>
                        <td>{{ food.carbs }}</td>
                        <td>{{ food.fat }}</td>
                        <td>{{ food.protein }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="2">Total</th>
                        <th>{{ getTotal(mealName, 'calories') }}</th>
                        <th>{{ getTotal(mealName, 'carbs') }}</th>
                        <th>{{ getTotal(mealName, 'fat') }}</th>
                        <th>{{ getTotal(mealName, 'protein') }}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script>
import upperFirst from 'lodash/upperFirst';
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            meals: {
                breakfast: [],
                lunch: [],
                dinner: []
            }
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

            this.$http.get(`diary/${date.year()}/${date.format('MM')}/${date.format('DD')}`).then(response => {
                let totalCaloriesConsumed = 0;

                for (let item of response.body._embedded.items) {
                    const food = item.food;
                    if (item.meal.id === 1) {
                        breakfast.push(food);
                    } else if (item.meal.id === 2) {
                        lunch.push(food);
                    } else if (item.meal.id === 3) {
                        dinner.push(food);
                    }
                    totalCaloriesConsumed += item.food.calories;
                }

                this.$emit('totalCaloriesCountChange', totalCaloriesConsumed);
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
        }
    },
}
</script>

<style scoped>
    .meal-wrapper {
        margin-bottom: 14px;
    }
</style>