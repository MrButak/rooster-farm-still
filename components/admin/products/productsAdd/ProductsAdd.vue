<template>

<h3 class="va-h3">Add Products</h3>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Product name</h5>   
</div>

<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToAdd.name"
        ref="nameInput"
        placeholder="product name"
        >
    </va-input>
</div>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Price in cents</h5>
</div>
<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToAdd.price_in_cents"
        ref="priceInput"
        placeholder="price in cents"
        >
    </va-input>
</div>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Quantity</h5>
</div>
<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToAdd.quantity"
        ref="quantityInput"
        placeholder="quantity"
        >
    </va-input>
</div>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Short description</h5>
</div>

<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToAdd.short_description"
        type="textarea"
        ref="shortDescriptionInput"
        :autosize="true"
        placeholder="product's short description: this text will appear on the product's main listing"
        >
    </va-input>
</div>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Long description</h5>
</div>

<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToAdd.long_description"
        type="textarea"
        ref="longDescriptionInput"
        :autosize="true"
        placeholder="product's long description: this text will appear on the product's page"
        >
    </va-input>
</div>

</template>

<script setup>

import { useAdminStore } from '~~/services/stateStore';
const adminStore = useAdminStore();

let nameInput = ref(null);
let priceInput = ref(null);
let quantityInput = ref(null);
let shortDescriptionInput = ref(null);
let longDescriptionInput = ref(null);

</script>
