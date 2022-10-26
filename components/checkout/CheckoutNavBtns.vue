<template>

<div class="checkout-nav-button-wrapper">
    <button @click="currentCheckoutStep = 1; router.push('/shopping-cart')">Back to Cart</button>
    <div class="prev-next-button-wrapper">
        <button v-if="currentCheckoutStep !== 1" @click="determineCheckoutStep('prev')">Previous</button>
        <button v-if="currentCheckoutStep !== 3" @click="determineCheckoutStep('next')">Next</button>
    </div>
</div>

</template>



<script setup>
import { currentCheckoutStep } from '../../services/stateStore';
const router = useRouter();

function determineCheckoutStep(direction) {
    
    switch(direction) {
        case 'prev':
            currentCheckoutStep.value == 2 ?
                currentCheckoutStep.value = 1 :
                currentCheckoutStep.value = 2;
            return;
        default:
            currentCheckoutStep.value == 1 ?
                currentCheckoutStep.value = 2 :
                currentCheckoutStep.value = 3;
    };
};

</script>



<style lang="scss" scoped>

.checkout-nav-button-wrapper {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;

    button {
        padding: .2rem .3rem;
        letter-spacing: .06rem;
    }
    .prev-next-button-wrapper {
        display: flex;
        gap: .6rem;
    }
}

</style>
