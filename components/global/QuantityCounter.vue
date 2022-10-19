<template>

<div class="quantity-counter-wrapper">
    <button class="quantity-button" @click="decrementCount">-</button>
    <div class="quantity-number">{{ productQuantity }}</div>
    <button class="quantity-button" @click="incrementCount">+</button>
</div>

</template>



<script setup>

defineProps({

    productQuantity: Number
});

function incrementCount() {


};

function decrementCount() {

};

function handleAddToCart() {

    // If not enough products in stock, return
    if(quantitySelect.value > productData[0].quantity) { return };
    addItemToShoppingCart(productData[0], quantitySelect.value);

    // Reduce the amount in stock
    productData[0].quantity -= quantitySelect.value;

    quantitySelect.value = 1;
};
</script>


<style lang="scss" scoped>

.quantity-counter-wrapper {
    display: flex;
    .quantity-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
    }
    .quantity-number {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        border: 1px solid black;
    }
}

</style>
