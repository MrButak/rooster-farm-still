<template>

<div class="center-wrapper">
    <div class="inner-wrapper">
        <div class="checkout-nav-button-wrapper">
            <button @click="currentCheckoutStep = 1; router.push('/shopping-cart')">Back to Cart</button>
            <div class="prev-next-button-wrapper">
                <button v-if="currentCheckoutStep !== 1" @click="determineCheckoutStep('prev')">Previous</button>
                <button v-if="currentCheckoutStep !== 3" @click="determineCheckoutStep('next')">Next</button>
            </div>
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

.center-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
}
.inner-wrapper {
    width: 100%;
    max-width: 45rem;
    padding: 10px 20px 20px 10px;
}
.checkout-nav-button-wrapper {
    display: flex;
    justify-content: space-between;
    // padding: 10px 20px 20px 10px;

    button {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: .2rem;
        background-color: #5469d4;
        color: white;
        padding: .5rem .8rem;
        border: none;
        letter-spacing: .1rem;
        font-weight: 600;
    }

    .prev-next-button-wrapper {
        display: flex;
        gap: .6rem;
    }
}

@media (min-width: 1023px) {

}
</style>
