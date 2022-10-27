<template>

<div class="checkout-step-header-wrapper">
    <span style="width:100%;" v-for="step in checkoutSteps" class="looper">
        <CheckoutStep
            :checkout-step-number="step.number"
            :checkout-step-text="step.text"
            :step-color="step.stepColor"
        />
    </span>
</div>

</template>



<script setup>

import { currentCheckoutStep } from '../../services/stateStore';

let checkoutSteps = reactive({
    1: {
        number: '1',
        text: 'Shipping',
        stepColor: computed(() => currentCheckoutStep.value == 1 ? 'blue' : 'gray')
    },
    2: {
        number: '2',
        text: 'Summary',
        stepColor: computed(() => currentCheckoutStep.value == 2 ? 'blue' : 'gray')
    },
    3: {
        number: '3',
        text: 'Payment',
        stepColor: computed(() => currentCheckoutStep.value == 3 ? 'blue' : 'gray')
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
