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
                    <h2>Summary</h2>
                    <div class="ui statistics">
                        <div class="statistic">
                            <div class="value">
                                <i class="olive food icon"></i>
                                4265
                            </div>
                            <div class="label">
                                kCal consumed
                            </div>
                        </div>
                    </div>
                </div>
                <div class="twelve wide column">
                    <h2>Breakfast</h2>
                    <table class="ui small compact orange celled table">
                        <thead>
                        <tr>
                            <th>Food</th>
                            <th>Calories (kcal)</th>
                            <th>Carbs (g)</th>
                            <th>Fat (g)</th>
                            <th>Protein (g)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Chicken Steak</td>
                            <td>338</td>
                            <td>28</td>
                            <td>3</td>
                            <td>8</td>
                        </tr>
                        <tr>
                            <td>Chicken Steak</td>
                            <td>338</td>
                            <td>28</td>
                            <td>3</td>
                            <td>8</td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <th>Total</th>
                            <th>338</th>
                            <th>28</th>
                            <th>3</th>
                            <th>8</th>
                        </tr>
                        </tfoot>
                    </table>
                    <h2>Lunch</h2>
                    <table class="ui small compact orange celled table">
                        <thead>
                        <tr>
                            <th>Food</th>
                            <th>Calories (kcal)</th>
                            <th>Carbs (g)</th>
                            <th>Fat (g)</th>
                            <th>Protein (g)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Chicken Steak</td>
                            <td>338</td>
                            <td>28</td>
                            <td>3</td>
                            <td>8</td>
                        </tr>
                        <tr>
                            <td>Chicken Steak</td>
                            <td>338</td>
                            <td>28</td>
                            <td>3</td>
                            <td>8</td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <th>Total</th>
                            <th>338</th>
                            <th>28</th>
                            <th>3</th>
                            <th>8</th>
                        </tr>
                        </tfoot>
                    </table>
                    <h2>Dinner</h2>
                    <table class="ui small compact orange celled table">
                        <thead>
                        <tr>
                            <th>Food</th>
                            <th>Calories (kcal)</th>
                            <th>Carbs (g)</th>
                            <th>Fat (g)</th>
                            <th>Protein (g)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Chicken Steak</td>
                            <td>338</td>
                            <td>28</td>
                            <td>3</td>
                            <td>8</td>
                        </tr>
                        <tr>
                            <td>Chicken Steak</td>
                            <td>338</td>
                            <td>28</td>
                            <td>3</td>
                            <td>8</td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <th>Total</th>
                            <th>338</th>
                            <th>28</th>
                            <th>3</th>
                            <th>8</th>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AddFoodButton from './AddFoodButton.vue';
import Calendar from './Calendar.vue';
import Menu from './Menu.vue';

export default {
    components: {
        'app-menu': Menu,
        'app-calendar': Calendar,
        'app-add-food-button': AddFoodButton
    },
}
</script>
