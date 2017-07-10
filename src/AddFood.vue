<template>
    <div>
        <p></p>
        <button class="ui olive fluid right labeled icon button" @click="handleButtonClick">
            <i class="plus icon"></i>
            Add Food
        </button>
        <div class="ui modal">
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
                                <input type="hidden" name="gender">
                                <i class="dropdown icon"></i>
                                <div class="default text">Meal</div>
                                <div class="menu">
                                    <div class="item" data-value="1">Breakfast</div>
                                    <div class="item" data-value="2">Lunch</div>
                                    <div class="item" data-value="3">Dinner</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="field">
                            <label>Food</label>
                            <div class="ui selection dropdown">
                                <input type="hidden" name="gender">
                                <i class="dropdown icon"></i>
                                <div class="default text">Food</div>
                                <div class="menu">
                                    <div class="item" v-for="food in foods" :data-value="food.id" @click="setSelectedFood(food)">
                                        {{ `${food.name} (${food.manufacturer.name})` }}
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

export default {
    data() {
        return {
            foods: [],
            selectedQuantity: 0,
            selectedFood: null,
            jQuery: window.jQuery
        }
    },
    computed: {
        totalServingSize() {
            const [ servingSize, measurement ] = split(this.selectedFood.serving_size, ' ');
            return (this.selectedQuantity * servingSize) + ' ' + measurement;
        }
    },
    methods: {
        handleButtonClick() {
            this.jQuery('.ui.modal').modal('show');
        },
        handleFormSubmission() {
            console.log('handle form submission');
        },
        setSelectedFood(food) {
            this.selectedFood = food;
        },
    },
    created() {
        this.$http.get('foods').then(response => {
            this.foods = response.body._embedded.items;
        });
    },
    mounted() {
        this.jQuery('.ui.modal').modal();
        this.jQuery('.ui.dropdown').dropdown();2
    }
}
</script>
