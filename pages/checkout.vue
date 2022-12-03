<template>

<div class="checkout-wrapper-main">

    <CheckoutStepHeader />

    <span v-if="orderStore.currentCheckoutStep == 1">
        <AddressForm />
    </span>

    <span v-if="orderStore.currentCheckoutStep == 2">
        <OrderSummary />
    </span>

    <span v-if="orderStore.currentCheckoutStep == 3">
        <Payment />
    </span>

    <CheckoutNavBtns />
    
</div>

</template>



<script setup>
import { onMounted } from 'vue';
import { useOrderStore } from '../services/stateStore';
import AddressForm from '~~/components/checkout/AddressForm.vue';
import Payment from '~~/components/checkout/Payment.vue';
import OrderSummary from '~~/components/checkout/OrderSummary.vue';

import { useColors } from 'vuestic-ui';
const { applyPreset } = useColors();
nextTick(() => {
    applyPreset(getItemFromLs('vuestic-docs-theme'))
});

// Pinia store
const orderStore = useOrderStore();

</script>



<style lang="scss" scoped>

.checkout-wrapper-main {

    margin-top: 3rem;
};

</style>
    