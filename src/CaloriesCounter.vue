<template>
    <div>
        <h2>Summary</h2>
        <div class="ui statistics">
            <div class="statistic">
                <div class="value">
                    <i class="olive food icon"></i>
                    {{ totalCaloriesConsumed }}
                </div>
                <div class="label">
                    kCal consumed
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        totalCaloriesConsumed: {
            type: Number,
            required: true,
            default: 0
        }
    }
}
</script>
