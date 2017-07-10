<template>
    <div>
        <h2>Summary</h2>
        <div class="ui statistics">
            <div class="statistic">
                <div class="value">
                    <i class="olive food icon"></i>
                    <app-animated-number :number="totalCaloriesConsumed"></app-animated-number>
                </div>
                <div class="label">
                    kCal consumed
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AnimatedNumber from './AnimatedNumber.vue';

export default {
    props: {
        totalCaloriesConsumed: {
            type: Number,
            required: true,
            default: 0
        }
    },
    components: {
        'app-animated-number': AnimatedNumber
    }
}
</script>
