<template>

<!-- ******************************************************************** -->
<!-- Edit inputs -->
<!-- ******************************************************************** -->
<!--  
Component displays all inputs for editing the product:
    name, price, quantity, short description, long description
-->
<div class="title-and-icon-wrapper">
    <h5 class="va-h5">Product name</h5>
    <va-icon
        :name="editNameIcon"
        @click="canEditNameInput = !canEditNameInput; nameInput.focus()"
    />
</div>
<div class="input-wrapper">
    <va-input
        class="mb-4"
        v-model="adminStore.productToEdit.name"
        :readonly="!canEditNameInput"
        ref="nameInput"
        >
    </va-input>
</div>

<div class="title-and-icon-wrapper">
    <h5 class="va-h5">Price</h5>
    <va-icon
        :name="editPriceIcon"
        @click="canEditPriceInput = !canEditPriceInput; priceInput.focus()"
    />
</div>
<div class="input-wrapper">
    <va-input
        class="mb-4"
        v-model="adminStore.productToEdit.price"
        :readonly="!canEditPriceInput"
        ref="priceInput"
        >
    </va-input>
</div>

<div class="title-and-icon-wrapper">
    <h5 class="va-h5">Quantity</h5>
    <va-icon
        :name="editQuantityIcon"
        @click="canEditQuantityInput = !canEditQuantityInput; quantityInput.focus()"
    />
</div>
<div class="input-wrapper">
    <va-input
        class="mb-4"
        v-model="adminStore.productToEdit.quantity"
        :readonly="!canEditQuantityInput"
        ref="quantityInput"
        >
    </va-input>
</div>

<div class="title-and-icon-wrapper">
    <h5 class="va-h5">Short description</h5>
    <va-icon
        :name="editShortDescriptionIcon"
        @click="canEditShortDescriptionInput = !canEditShortDescriptionInput; shortDescriptionInput.focus()"
    />
</div>
<div class="input-wrapper">
    <va-input
        class="mb-4"
        v-model="adminStore.productToEdit.short_description"
        :readonly="!canEditShortDescriptionInput"
        type="textarea"
        ref="shortDescriptionInput"
        :autosize="true"
        >
    </va-input>
</div>

<div class="title-and-icon-wrapper">
    <h5 class="va-h5">Long description</h5>
    <va-icon
        :name="editLongDescriptionIcon"
        @click="canEditLongDescriptionInput = !canEditLongDescriptionInput; longDescriptionInput.focus()"
    />
</div>
<div class="input-wrapper">
    <va-input
        class="mb-4"
        v-model="adminStore.productToEdit.description"
        :readonly="!canEditLongDescriptionInput"
        type="textarea"
        ref="longDescriptionInput"
        :autosize="true"
        >
    </va-input>
</div>

</template>

<script setup>

import { computed } from 'vue';
import { useAdminStore } from '~~/services/stateStore';

const adminStore = useAdminStore();


// Product name
let canEditNameInput = ref(false);
let nameInput = ref(null);
let editNameIcon = computed(() => {
    return !canEditNameInput.value ?
        'edit' : 'done';
})
// Product price
let canEditPriceInput = ref(false);
let priceInput = ref(null);
let editPriceIcon = computed(() => {
    return !canEditPriceInput.value ?
        'edit' : 'done';
});
// Product qantity
let canEditQuantityInput = ref(false);
let quantityInput = ref(null);
let editQuantityIcon = computed(() => {
    return !canEditQuantityInput.value ?
        'edit' : 'done';
});
// Product short description
let canEditShortDescriptionInput = ref(false);
let shortDescriptionInput = ref(null);
let editShortDescriptionIcon = computed(() => {
    return !canEditShortDescriptionInput.value ?
        'edit' : 'done';
});
// Product long description
let canEditLongDescriptionInput = ref(false);
let longDescriptionInput = ref(null);
let editLongDescriptionIcon = computed(() => {
    return !canEditLongDescriptionInput.value ?
        'edit' : 'done';
});

</script>

<style lang="scss" scoped>

.title-and-icon-wrapper {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.6rem;
}
.input-wrapper {
    display: flex;
    width: 95%;
    
}
.spec-wrapper {
    display: flex;
}

</style>