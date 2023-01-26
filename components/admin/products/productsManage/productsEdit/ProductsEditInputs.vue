<template>

<!-- ******************************************************************** -->
<!-- Edit inputs -->
<!-- ******************************************************************** -->
<!--  
Component displays all inputs for editing the product:
    name, price_in_cents, quantity, short description, long description
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
<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToEdit.name"
        :readonly="!canEditNameInput"
        ref="nameInput"
        :rules="[(v) => productNameValidation(v) || `Can't be blank`]"
        >
    </va-input>
</div>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Price in cents
        <span>
            <va-icon
                :name="editPriceIcon.name"
                @click="canEditPriceInput = !canEditPriceInput; priceInput.focus()"
                :color="editPriceIcon.color"
            />
        </span>
    </h5>
</div>
<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToEdit.price_in_cents"
        :readonly="!canEditPriceInput"
        ref="priceInput"
        :rules="[(v) => (/^[0-9]*$/).test(v) && v.length || `Whole numbers only`]"
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
<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToEdit.quantity"
        :readonly="!canEditQuantityInput"
        ref="quantityInput"
        :rules="[(v) => (/^[0-9]*$/).test(v) && v.length || `Whole numbers only`]"
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

<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToEdit.short_description"
        :readonly="!canEditShortDescriptionInput"
        type="textarea"
        ref="shortDescriptionInput"
        :autosize="true"
        :rules="[(v) => v.length && v.length < 3000 || `Must be under 3,000 characters`]"
        >
    </va-input>
</div>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Long description
        <span>
            <va-icon
                :name="editLongDescriptionIcon.name"
                :color="editLongDescriptionIcon.color"
                @click="canEditLongDescriptionInput = !canEditLongDescriptionInput"
            />
        </span>
	</h5>
</div>

<div class="flex w-[95%]">
    <!-- https://code-farmer-i.github.io/vue-markdown-editor/ -->
    <v-md-editor :mode="determineVueMarkdownEditorMode" v-model="adminStore.productToEdit.description" height="400px"></v-md-editor>
</div>

</template>

<script setup>

import { computed } from 'vue';
import { useAdminStore } from '~~/services/stateStore';

const adminStore = useAdminStore();

onMounted(() => {
	// console.log(adminStore.productToEdit)
});

let determineVueMarkdownEditorMode = computed(() => {
    return canEditLongDescriptionInput.value ?
        "editable" : "preview"
});

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
let editLongDescriptionIcon = computed(() => {
    return !canEditLongDescriptionInput.value ?
			{name: 'edit', color: 'info'} : {name: 'done', color: 'danger'};
});

function productNameValidation(str) {
    return !(/[^\w\(A-Za-z0-9)/ \-_?!@#$%^&*(){}+/\\<>,.|[\]]/g).test(str) 
        && str.trim().length > 0;  
};

</script>

<style lang="scss" scoped>


</style>