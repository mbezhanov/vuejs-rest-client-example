<template>
    <div>
        <p></p>
        <button class="ui olive fluid right labeled icon button" @click="shouldShowModal = true">
            <i class="plus icon"></i>
            Add Food
        </button>
        <semantic-ui-modal v-if="shouldShowModal" :active="true" @hidden="onModalClose">
            <template slot="header">Add Food</template>
            <form class="ui form" @submit.prevent.stop="handleFormSubmission">
                <div class="field">
                    <label>Meal</label>
                    <semantic-ui-dropdown
                            :selection="true"
                            :fluid="true"
                            text="Meal"
                            :items="meals"
                            v-model="selectedMealId"
                    ></semantic-ui-dropdown>
                </div>
                <div class="field">
                    <label>Food</label>
                    <semantic-ui-dropdown
                            :selection="true"
                            :fluid="true"
                            text="Food"
                            :items="foodDropdownItems"
                            v-model="selectedFoodId"
                    ></semantic-ui-dropdown>
                </div>
                <div class="field">
                    <label>
                        Quantity
                        <template v-if="selectedFoodId">
                            {{ selectedQuantity }} x {{ selectedFoodServingSize}} = {{ totalServingSize }}
                        </template>
                    </label>
                    <input type="text" name="quantity" placeholder="Quantity" v-model.number="selectedQuantity">
                </div>
                <button class="ui button" type="submit">Add</button>
            </form>
        </semantic-ui-modal>
    </div>
</template>

<script>
import find from 'lodash/find';
import map from 'lodash/map';
import split from 'lodash/split';
import { Dropdown, Modal } from 'semantic-ui-vue2';
import { mapGetters } from 'vuex';

export default {
    components: {
        'semantic-ui-dropdown': Dropdown,
        'semantic-ui-modal': Modal
    },
    data() {
        return {
            meals: [
                { name: 'Breakfast', text: 'Breakfast', value: 1 },
                { name: 'Lunch', text: 'Lunch', value: 2 },
                { name: 'Dinner', text: 'Dinner', value: 3 }
            ],
            selectedMealId: null,
            selectedFoodId: null,
            selectedQuantity: 0,
            shouldShowModal: false,
            modalCachedSizes: null
        }
    },
    computed: {
        ...mapGetters({
            foods: 'getAvailableFoods',
            selectedCalendarDate: 'getSelectedCalendarDate'
        }),
        foodDropdownItems() {
            return map(this.foods, food => {
                return {
                    name: `${food.name} (${food._embedded.manufacturer.name})`,
                    text: `${food.name} (${food._embedded.manufacturer.name})`,
                    value: food.id
                }
            });
        },
        selectedFoodServingSize() {
            const food = find(this.foods, food => food.id === this.selectedFoodId);
            return food.serving_size;
        },
        totalServingSize() {
            const [ servingSize, measurement ] = split(this.selectedFoodServingSize, ' ');
            return (this.selectedQuantity * servingSize) + ' ' + measurement;
        }
    },
    methods: {
        handleFormSubmission() {
            this.$http.post('diary', {
                date: this.selectedCalendarDate.format('YYYY-MM-DD'),
                meal_id: this.selectedMealId,
                food_id: this.selectedFoodId,
                quantity: this.selectedQuantity
            }).then(() => {
                this.selectedMealId = null;
                this.selectedFoodId = null;
                this.selectedQuantity = 0;
                this.shouldShowModal = false;
                this.$emit('foodAdded');
            });
        },
        onModalClose() {
            this.selectedMealId = null;
            this.selectedFoodId = null;
            this.selectedQuantity = 0;
            this.shouldShowModal = false;
        },
    },
}
</script>
