<template>

<div class="flex justify-center py-8">
    <div class="flex justify-between gap-8 w-full max-w-2xl">
        <va-button class="w-8" @click="orderStore.currentCheckoutStep = 1; router.push('/shopping-cart')">Back to Cart</va-button>
        <div class="flex w-1/4 gap-2">
            <va-button class="w-8" v-if="orderStore.currentCheckoutStep !== 1" @click="determineCheckoutStep('prev')">Previous</va-button>
            <va-button class="w-8" v-if="orderStore.currentCheckoutStep !== 3" @click="determineCheckoutStep('next')">Next</va-button>
        </div>
    </div>
</div>


</template>

<script setup>
import { useOrderStore } from '../../services/stateStore';

// Pinia store
const orderStore = useOrderStore();

const router = useRouter();

function determineCheckoutStep(direction) {
    
    switch(direction) {
        case 'prev':
            orderStore.currentCheckoutStep == 2 ?
            orderStore.currentCheckoutStep = 1 :
            orderStore.currentCheckoutStep = 2;
            return;
        default:
            orderStore.currentCheckoutStep == 1 ?
                orderStore.currentCheckoutStep = 2 :
                orderStore.currentCheckoutStep = 3;
    };
};

</script>


<style lang="scss" scoped>

.checkout-nav-buttons-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 2rem 0 0 0;
};
.checkout-nav-buttons-inner-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 1rem;
    .prev-next-button-wrapper {
        display: flex;
        gap: 1.2rem;
    }
};
@media only screen and (min-width: 640px)  {
    .checkout-nav-buttons-inner-wrapper {
        width: 80%;        
    }
}

@media only screen and (min-width: 1024px)  {
    .checkout-nav-buttons-inner-wrapper {
        width: 50rem;        
    }
}
</style>
