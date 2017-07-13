<template>
    <div class="row">
        <div class="four wide column">
            <app-calendar></app-calendar>
            <app-add-food @foodAdded="onFoodAdded"></app-add-food>
            <app-calories-counter :totalCaloriesConsumed="totalCaloriesConsumed"></app-calories-counter>
        </div>
        <div class="twelve wide column">
            <app-food-diary
                    @caloriesCountChanged="onCaloriesCountChanged"
                    @diaryEntryRemoved="onDiaryEntryRemoved"
            >
            </app-food-diary>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import AddFood from './diary/AddFood.vue';
import Calendar from './diary/Calendar.vue';
import CaloriesCounter from './diary/CaloriesCounter.vue';
import FoodDiary from './diary/FoodDiary.vue';

export default {
    components: {
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
    computed: {
        ...mapGetters({
            selectedCalendarDate: 'getSelectedCalendarDate'
        })
    },
    methods: {
        onDiaryEntryRemoved() {
            // simulate date change, in order to trigger re-rendering of calendar and diary
            this.$store.commit('setSelectedCalendarDate', moment(this.selectedCalendarDate));
        },
        onFoodAdded() {
            // simulate date change, in order to trigger re-rendering of calendar and diary
            this.$store.commit('setSelectedCalendarDate', moment(this.selectedCalendarDate));
        },
        onCaloriesCountChanged(totalCaloriesConsumed) {
            this.totalCaloriesConsumed = totalCaloriesConsumed;
        }
    },
    activated() {
        // simulate date change, in order to trigger re-rendering of calendar and diary
        this.$store.commit('setSelectedCalendarDate', moment(this.selectedCalendarDate));
    }
}
</script>
