<template>

<!-- ******************************************************************** -->
<!-- Edit inputs -->
<!-- ******************************************************************** -->
<!--  
Component displays all inputs for editing the product:
    name, price, quantity, short description, long description
-->
<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Product name
			<span>
				<va-icon
					@click="canEditNameInput = !canEditNameInput; nameInput.focus()"
					:name="editNameIcon.name"
					:color="editNameIcon.color"
				/>
			</span>
		</h5>   
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

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Price
			<span>
				<va-icon
						:name="editPriceIcon.name"
						@click="canEditPriceInput = !canEditPriceInput; priceInput.focus()"
						:color="editPriceIcon.color"
				/>
			</span>
		</h5>
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

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Quantity
			<span>
				<va-icon
					@click="canEditQuantityInput = !canEditQuantityInput; quantityInput.focus()"
					:name="editQuantityIcon.name"
					:color="editQuantityIcon.color"
				/>
			</span>
		</h5>
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

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Short description
			<span>
				<va-icon
						:name="editShortDescriptionIcon.name"
						:color="editShortDescriptionIcon.color"
						@click="canEditShortDescriptionInput = !canEditShortDescriptionInput; shortDescriptionInput.focus()"
				/>
			</span>
		</h5>
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

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Long description
			<span>
				<va-icon
						:name="editLongDescriptionIcon.name"
						:color="editLongDescriptionIcon.color"
						@click="canEditLongDescriptionInput = !canEditLongDescriptionInput; longDescriptionInput.focus()"
				/>
			</span>
		</h5>
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
			{name: 'edit', color: 'info'} : {name: 'done', color: 'danger'};
})
// Product price
let canEditPriceInput = ref(false);
let priceInput = ref(null);
let editPriceIcon = computed(() => {
    return !canEditPriceInput.value ?
      {name: 'edit', color: 'info'} : {name: 'done', color: 'danger'};
});
// Product qantity
let canEditQuantityInput = ref(false);
let quantityInput = ref(null);
let editQuantityIcon = computed(() => {
    return !canEditQuantityInput.value ?
			{name: 'edit', color: 'info'} : {name: 'done', color: 'danger'};
});
// Product short description
let canEditShortDescriptionInput = ref(false);
let shortDescriptionInput = ref(null);
let editShortDescriptionIcon = computed(() => {
    return !canEditShortDescriptionInput.value ?
			{name: 'edit', color: 'info'} : {name: 'done', color: 'danger'};
});
// Product long description
let canEditLongDescriptionInput = ref(false);
let longDescriptionInput = ref(null);
let editLongDescriptionIcon = computed(() => {
    return !canEditLongDescriptionInput.value ?
			{name: 'edit', color: 'info'} : {name: 'done', color: 'danger'};
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