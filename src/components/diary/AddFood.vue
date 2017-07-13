<template>
    <div id="add-food">
        <p></p>
        <button class="ui olive fluid right labeled icon button" @click="handleButtonClick">
            <i class="plus icon"></i>
            Add Food
        </button>
        <div id="add-food-form" class="ui modal">
            <i class="close icon"></i>
            <div class="header">
                Add Food
            </div>
            <div class="content">
                <form class="ui form" @submit.prevent.stop="handleFormSubmission">
                    <div class="field">
                        <div class="field">
                            <label>Meal</label>
                            <div class="ui selection dropdown">
                                <i class="dropdown icon"></i>
                                <div class="default text">Meal</div>
                                <div class="menu">
                                    <div class="item" v-for="meal in meals" :data-value="meal.id" @click="setSelectedMeal(meal)">
                                        {{ meal.name }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="field">
                            <label>Food</label>
                            <div class="ui selection dropdown">
                                <i class="dropdown icon"></i>
                                <div class="default text">Food</div>
                                <div class="menu">
                                    <div class="item" v-for="food in foods" :data-value="food.id" @click="setSelectedFood(food)">
                                        {{ `${food.name} (${food._embedded.manufacturer.name})` }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label>
                            Quantity
                            <template v-if="selectedFood">
                                {{ selectedQuantity }} x {{ selectedFood.serving_size }} = {{ totalServingSize }}
                            </template>
                        </label>
                        <input type="text" name="quantity" placeholder="Quantity" v-model.number="selectedQuantity">
                    </div>
                    <button class="ui button" type="submit">Add</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import split from 'lodash/split';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            meals: [
                { id: 1, name: 'Breakfast' },
                { id: 2, name: 'Lunch' },
                { id: 3, name: 'Dinner' }
            ],
            selectedMeal: null,
            selectedFood: null,
            selectedQuantity: 0,
            jQuery: window.jQuery
        }
    },
    computed: {
        ...mapGetters({
            foods: 'getAvailableFoods',
            selectedCalendarDate: 'getSelectedCalendarDate'
        }),
        totalServingSize() {
            const [ servingSize, measurement ] = split(this.selectedFood.serving_size, ' ');
            return (this.selectedQuantity * servingSize) + ' ' + measurement;
        }
    },
    methods: {
        handleButtonClick() {
            this.jQuery('#add-food-form').modal('show');
        },
        handleFormSubmission() {
            this.$http.post('diary', {
                date: this.selectedCalendarDate.format('YYYY-MM-DD'),
                meal_id: this.selectedMeal.id,
                food_id: this.selectedFood.id,
                quantity: this.selectedQuantity
            }).then(() => {
                this.selectedMeal = null;
                this.selectedFood = null;
                this.selectedQuantity = null;
                this.jQuery('#add-food-form').modal('hide');
                this.jQuery('.ui.dropdown').dropdown('clear');
                this.$emit('foodAdded');
            });
        },
        setSelectedMeal(meal) {
            this.selectedMeal = meal;
        },
        setSelectedFood(food) {
            this.selectedFood = food;
        },
    },
}
</script>

<style scoped>
#add-food {
    margin-bottom: 14px;
}
</style>
