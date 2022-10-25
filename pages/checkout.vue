<template>

<div class="checkout-wrapper-main">

    
    <CheckoutStepHeader />

    <span v-if="currentCheckoutStep == 1">
        <AddressForm />
    </span>

    <span v-if="currentCheckoutStep == 2">
        <Payment />
    </span>

    <CheckoutNavBtns />
</div>

</template>



<script setup>

import { currentCheckoutStep } from '../services/stateStore';
import AddressForm from '~~/components/checkout/AddressForm.vue';
import Payment from '~~/components/checkout/Payment.vue';


</script>



<style lang="scss" scoped>

.checkout-wrapper-main {
    margin: 3rem 0 0 0;
};

</style>
    