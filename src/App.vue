<template>
    <div>
        <app-menu></app-menu>
        <div class="ui grid container">
            <div class="row">
                <div class="column"><!-- this row intentionally left blank --></div>
            </div>
            <div class="row">
                <div class="four wide column">
                    <app-calendar></app-calendar>
                    <app-add-food></app-add-food>
                    <app-calories-counter :totalCaloriesConsumed="totalCaloriesConsumed"></app-calories-counter>
                </div>
                <div class="twelve wide column">
                    <app-food-diary @totalCaloriesCountChange="handleTotalCaloriesCountChange"></app-food-diary>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Menu from './Menu.vue';
import AddFood from './AddFood.vue';
import Calendar from './Calendar.vue';
import CaloriesCounter from './CaloriesCounter.vue';
import FoodDiary from './FoodDiary.vue';

export default {
    components: {
        'app-menu': Menu,
        'app-calendar': Calendar,
        'app-add-food': AddFood,
        'app-calories-counter': CaloriesCounter,
        'app-food-diary': FoodDiary
    },
    data() {
        return {
            totalCaloriesConsumed: 0
        }
    },
    methods: {
        handleTotalCaloriesCountChange(totalCaloriesConsumed) {
            this.totalCaloriesConsumed = totalCaloriesConsumed;
        }
    }
}
</script>
