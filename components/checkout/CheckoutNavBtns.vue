<template>

<div class="checkout-nav-button-wrapper">
    <button>Back to Cart</button>
    <div class="prev-next-button-wrapper">
        <button>Previous</button>
        <button>Next</button>
    </div>
</div>

</template>



<script setup>



</script>



<style lang="scss" scoped>

.checkout-nav-button-wrapper {
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
