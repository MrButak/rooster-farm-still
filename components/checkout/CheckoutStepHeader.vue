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
import { useOrderStore, useUiStore } from '../../services/stateStore';

// Pinia store
const orderStore = useOrderStore();
const uiStore = useUiStore();

const { presets } = useColors();

let checkoutSteps = reactive({
    1: {
        number: '1',
        text: 'Shipping',
        stepColor: computed(() => orderStore.currentCheckoutStep == 1 ? presets.value.light.primary : presets.value.light.secondary), // presets.value.light.secondary
        circleBackgroundColor: computed(() => uiStore.colorTheme == 'light' ? 'white' : 'black')
    },
    2: {
        number: '2',
        text: 'Summary',
        stepColor: computed(() => orderStore.currentCheckoutStep == 2 ? presets.value.light.primary : presets.value.light.secondary),
        circleBackgroundColor: computed(() => uiStore.colorTheme == 'light' ? 'white' : 'black')
    },
    3: {
        number: '3',
        text: 'Payment',
        stepColor: computed(() => orderStore.currentCheckoutStep == 3 ? presets.value.light.primary : presets.value.light.secondary),
        circleBackgroundColor: computed(() => uiStore.colorTheme == 'light' ? 'white' : 'black')
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
