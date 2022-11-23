<template>

<div class="checkout-step-wrapper">
    <div :style="{'border-color': stepColor}" class="checkout-step">
        <div :style="{'border-color': stepColor, 'background-color': circleBackgroundColor}" class="checkout-step-circle">
            <p :style="{'color': stepColor}">{{ checkoutStepNumber }}</p>
        </div>
    </div>
    <p :style="{'color': stepColor}">{{ checkoutStepText }}</p>
</div>
    
</template>



<script setup>

defineProps({
    checkoutStepNumber: String,
    checkoutStepText: String,
    stepColor: String,
    circleBackgroundColor: String
});

</script>



<style lang="scss" scoped>

.checkout-step-header-wrapper {
    display: flex;
    gap: 2rem;
    width: 100%
}
.checkout-step-wrapper {

    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    .checkout-step {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        border-width: 0 0 .2rem 0;
        border-style: solid;
        
        .checkout-step-circle {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            border-width: .2rem;
            border-style: solid;
        }
    }
    p {
        text-align: center;
    }
}

</style>
    