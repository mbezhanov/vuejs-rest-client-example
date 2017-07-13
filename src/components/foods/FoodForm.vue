<template>
    <div>
        <transition name="fade" mode="out-in" appear>
            <div class="ui positive message" v-if="shouldShowPositiveMessage" key="positive">
                Food {{ this.isCreatingNewRecord ? 'created' : 'updated' }} successfully.
            </div>
            <div class="ui negative message" v-else-if="shouldShowNegativeMessage" key="negative">
                <div class="header">{{ error.type | startCase }}</div>
                <p>{{ error.title }}</p>
            </div>
        </transition>
        <table class="ui small compact orange celled table">
            <thead v-if="!isCreatingNewRecord">
                <tr>
                    <th colspan="2">{{ food.name }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="isCreatingNewRecord">
                    <td class="six wide"><strong>Name</strong></td>
                    <td class="ten wide">
                        <div class="ui fluid input">
                            <input type="text" v-model="food.name">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="six wide"><strong>Manufacturer</strong></td>
                    <td class="ten wide" v-if="!isEditing">{{ food._embedded.manufacturer.name }}</td>
                    <td class="ten wide" v-else>
                        <semantic-ui-dropdown
                            :selection="true"
                            :fluid="true"
                            :value="food._embedded.manufacturer.id"
                            text="Manufacturer"
                            :items="manufacturerDropdownItems"
                            @input="onManufacturerSelected"
                        ></semantic-ui-dropdown>
                    </td>
                </tr>
                <tr>
                    <td class="six wide"><strong>Serving size</strong></td>
                    <td class="ten wide" v-if="!isEditing">{{ food.serving_size }}</td>
                    <td class="ten wide" v-else>
                        <div class="ui fluid input">
                            <input type="text" v-model="food.serving_size">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="six wide"><strong>Calories (kcal)</strong></td>
                    <td class="ten wide" v-if="!isEditing">{{ food.calories }}</td>
                    <td class="ten wide" v-else>
                        <div class="ui fluid input">
                            <input type="text" v-model.number="food.calories">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="six wide"><strong>Carbs (g)</strong></td>
                    <td class="ten wide" v-if="!isEditing">{{ food.carbs }}</td>
                    <td class="ten wide" v-else>
                        <div class="ui fluid input">
                            <input type="text" v-model.number="food.carbs">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="six wide"><strong>Fat (g)</strong></td>
                    <td class="ten wide" v-if="!isEditing">{{ food.fat }}</td>
                    <td class="ten wide" v-else>
                        <div class="ui fluid input">
                            <input type="text" v-model.number="food.fat">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="six wide"><strong>Protein (g)</strong></td>
                    <td class="ten wide" v-if="!isEditing">{{ food.protein }}</td>
                    <td class="ten wide" v-else>
                        <div class="ui fluid input">
                            <input type="text" v-model.number="food.protein">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="ui right floated button" @click="onCancelButtonClick">
            Cancel
        </button>
        <button class="ui right floated primary button" @click="onPrimaryButtonClick">{{ primaryButtonLabel }}</button>
    </div>
</template>

<script>
import map from 'lodash/map';
import lodashStartCase from 'lodash/startCase';
import { Dropdown } from 'semantic-ui-vue2';
import { mapGetters } from 'vuex';

export default {
    components: {
        'semantic-ui-dropdown': Dropdown
    },
    data() {
        return {
            error: null,
            isEditing: false,
            selectedManufacturerId: null,
            shouldShowPositiveMessage: false,
            shouldShowNegativeMessage: false
        }
    },
    props: {
        food: {
            required: true,
            type: Object
        },
        isCreatingNewRecord: {
            required: true,
            type: Boolean
        }
    },
    computed: {
        ...mapGetters({
            manufacturers: 'getManufacturers',
            manufacturer: 'getManufacturerById'
        }),
        primaryButtonLabel() {
            return this.isEditing ? 'Save' : 'Edit';
        },
        manufacturerDropdownItems() {
            return map(this.manufacturers, manufacturer => {
                return {
                    name: manufacturer.name,
                    text: manufacturer.name,
                    value: manufacturer.id
                }
            });
        }
    },
    methods: {
        onPrimaryButtonClick() {

            if (!this.isEditing) {
                this.isEditing = true;
                return;
            }

            const payload = {
                manufacturer_id: this.selectedManufacturerId,
                servingSize: this.food.serving_size,
                calories: this.food.calories,
                carbs: this.food.carbs,
                fat: this.food.fat,
                protein: this.food.protein
            };

            if (this.isCreatingNewRecord) {
                payload.name = this.food.name;
            }

            const successHandler = () => {

            };
            const errorHandler = error => {
                this.error = error.body;
                this.shouldShowNegativeMessage = true;
            };

            if (this.isCreatingNewRecord) {
                this.$http.post('foods', payload).then(() => {
                    this.shouldShowPositiveMessage = true;
                    this.food._embedded.manufacturer = this.manufacturer(this.selectedManufacturerId);
                    this.$store.dispatch('requestFoodList');
                    this.$emit('newFoodAdded');
                }, errorHandler);
            } else if (this.isEditing) {
                this.$http.patch(`foods/${this.food.id}`, payload).then(() => {
                    this.isEditing = false;
                    this.shouldShowPositiveMessage = true;
                    this.food._embedded.manufacturer = this.manufacturer(this.selectedManufacturerId);
                    this.$store.dispatch('updateFoodInformation', this.food.id);
                }, errorHandler);
            }
        },
        onCancelButtonClick() {
            this.resetInitialState();
            this.$emit('cancelButtonClicked');
        },
        onManufacturerSelected(id) {
            this.selectedManufacturerId = id;
        },
        resetInitialState() {
            this.error = null;
            this.isEditing = false;
            this.selectedManufacturerId = null;
            this.shouldShowPositiveMessage = false;
            this.shouldShowNegativeMessage = false;
        }
    },
    filters: {
        startCase(value) {
            return lodashStartCase(value);
        }
    },
    created() {
        if (this.isCreatingNewRecord) {
            this.isEditing = true;
        }
    }
}
</script>
