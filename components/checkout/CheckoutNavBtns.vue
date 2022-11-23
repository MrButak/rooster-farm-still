<template>

<div class="checkout-nav-buttons-wrapper">
    <div class="checkout-nav-buttons-inner-wrapper">
        <va-button @click="currentCheckoutStep = 1; router.push('/shopping-cart')">Back to Cart</va-button>
        <div class="prev-next-button-wrapper">
            <va-button v-if="currentCheckoutStep !== 1" @click="determineCheckoutStep('prev')">Previous</va-button>
            <va-button v-if="currentCheckoutStep !== 3" @click="determineCheckoutStep('next')">Next</va-button>
        </div>
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
