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
                    <app-add-food-button></app-add-food-button>
                    <app-calories-counter></app-calories-counter>
                </div>
                <div class="twelve wide column">
                    <app-food-diary></app-food-diary>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Menu from './Menu.vue';
import AddFoodButton from './AddFoodButton.vue';
import Calendar from './Calendar.vue';
import CaloriesCounter from './CaloriesCounter.vue';
import FoodDiary from './FoodDiary.vue';

export default {
    components: {
        'app-menu': Menu,
        'app-calendar': Calendar,
        'app-add-food-button': AddFoodButton,
        'app-calories-counter': CaloriesCounter,
        'app-food-diary': FoodDiary
    },
}
</script>
