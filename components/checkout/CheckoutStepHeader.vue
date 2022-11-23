<template>

<div class="checkout-step-header-wrapper">
    <span style="width:100%;" v-for="step in checkoutSteps" class="looper">
        <CheckoutStep
            :checkout-step-number="step.number"
            :checkout-step-text="step.text"
            :step-color="step.stepColor"
            :circle-background-color="step.circleBackgroundColor"
        />
    </span>
</div>

</template>



<script setup>

import { useColors } from 'vuestic-ui';
import { currentCheckoutStep, colorTheme } from '../../services/stateStore';
const { presets } = useColors();
console.log(presets.value.light)
let checkoutSteps = reactive({
    1: {
        number: '1',
        text: 'Shipping',
        stepColor: computed(() => currentCheckoutStep.value == 1 ? presets.value.light.primary : presets.value.light.secondary), // presets.value.light.secondary
        circleBackgroundColor: computed(() => colorTheme.value == 'light' ? 'white' : 'black')
    },
    2: {
        number: '2',
        text: 'Summary',
        stepColor: computed(() => currentCheckoutStep.value == 2 ? presets.value.light.primary : presets.value.light.secondary),
        circleBackgroundColor: computed(() => colorTheme.value == 'light' ? 'white' : 'black')
    },
    3: {
        number: '3',
        text: 'Payment',
        stepColor: computed(() => currentCheckoutStep.value == 3 ? presets.value.light.primary : presets.value.light.secondary),
        circleBackgroundColor: computed(() => colorTheme.value == 'light' ? 'white' : 'black')
    },
});

</script>



<style lang="scss" scoped>

.checkout-step-header-wrapper {
    display: flex;
    width: 100%;
    padding: 0 0 3.4rem 0
}




</style>
