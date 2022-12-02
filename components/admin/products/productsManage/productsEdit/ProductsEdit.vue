<template>

<div class="d-flex">
    <h3 class="va-h3">Edit Product</h3>        
    <va-spacer class="spacer" />
    <va-icon
        @click="(adminStore.showCancelEditModal = !adminStore.showCancelEditModal)"
        class="mr-2"
        name="cancel"
        size="medium"
    />
</div>

<!-- ******************************************************************** -->
<!-- Edit inputs -->
<!-- ******************************************************************** -->
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

<!-- ******************************************************************** -->
<!-- Images -->
<!-- ******************************************************************** -->
<h5 class="va-h5">Main image</h5>
<va-image class="flex md6 lg4" src="https://picsum.photos/1500" />
<p>{{ adminStore.productToEdit.main_image_url }}</p>

<h5 class="va-h5">Images</h5>
<va-carousel :items="adminStore.productToEdit.image_urls
" stateful indicators infinite swipable />
<div v-for="(url, index) in adminStore.productToEdit.image_urls">
    <p>{{ index + 1 }}. {{ url }}</p>
</div>

<!-- ******************************************************************** -->
<!-- Specifications -->
<!-- ******************************************************************** -->
<!-- 
I am dynamically creating the v-models on the inputs in the variable specRefArray.
specRefArray is an Array of Objects the same length as the product specification Array (adminStore.productToEdit.specifications).
The original specification value is show as the placeholder and is not updated until the user saves.
-->
<h5 class="va-h5">Product specifications</h5>
<div style="display:flex;flex-direction:column;gap:.8rem;">
    <!-- Loop through product specification Objects -->
    <div v-for="(spec, index) in adminStore.productToEdit.specifications">
        <div class="title-and-icon-wrapper">
            <p>spec #{{ index + 1 }}</p>
            <va-icon
                @click="deleteSpec(index)"
                name="delete"
                size="small"
            ></va-icon>  
        </div>

        <div class="spec-wrapper">

            <!-- Object key input -->
            <va-input
                class="mb-4"
                v-model="specRefArray[index].key"
                :placeholder="Object.keys(spec)[0]"
                >
                <template #appendInner>
                    <!-- Save / delete input -->
                    
                    <va-icon
                        :name="specInputDeleteIcon(specRefArray[index].key)"
                        @click="cancelUpdateSpecObject(specRefArray[index].key, index, 'key')"
                    />
                    <va-icon
                        :name="specInputCheckIcon(specRefArray[index].key)"
                        @click="updateSpecObject(specRefArray[index].key, index, 'key')"
                    />

                </template>
                
            </va-input>
            <!-- Object value input -->
            <va-input
                class="mb-4"
                :placeholder="Object.values(spec)[0]"
                v-model="specRefArray[index].value"
                >
                <template #appendInner>
                    <!-- Save / delete input -->
                    <va-icon
                        :name="specInputDeleteIcon(specRefArray[index].value)"
                        @click="cancelUpdateSpecObject(specRefArray[index].value, index, 'value')"
                    />
                    <va-icon
                        :name="specInputCheckIcon(specRefArray[index].value)"
                        @click="updateSpecObject(specRefArray[index].value, index, 'value')"
                    />
                </template>
            </va-input>
        </div>
    </div>
    <!-- New spec input -->
    <p>Add new specification</p>
    <div style="display:flex;">
        <va-input
            class="mb-4"
            placeholder="name"
            v-model="newSpecObject.key"
            >
        </va-input>
        <va-input
            class="mb-4"
            placeholder="value"
            v-model="newSpecObject.value"
            >
        </va-input>
    </div>
</div>
<va-button
    @click="addSpec"
    icon="add"
    :disabled="canAddSpecification"
    >
    add specification
</va-button>



<!-- Confirm cancel edit popup modal -->
<va-modal 
    v-model="adminStore.showCancelEditModal" 
    message="Are you sure you want to cancel? Any unsaved changes will be lost." 
    title="Overview" 
    @ok="adminStore.showEditProductComponent = false"
    />
<!-- TODO: Should .$reset store here too ^^^^ -->
</template>



<script setup>

import { reactive, computed } from 'vue';
import { useAdminStore } from '~~/services/stateStore';
const adminStore = useAdminStore();

let newSpecObject = reactive({key: '', value: ''});

// Function will add another product specification
function addSpec() {
    // Validation
    if(!newSpecObject.key || !newSpecObject.value) { return };
    adminStore.productToEdit.specifications.push(
        { [`${newSpecObject.key}`] : newSpecObject.value }
    );
    specRefArray.push({key: '', value: ''});

    // Clear the new spec data from the inputs
    newSpecObject.key = newSpecObject.value = '';
};

// Computed will determine if the 'add specification' button is disabled
let canAddSpecification = computed(() => {
    return !newSpecObject.key || !newSpecObject.value
});

// Build reactive Array to store new key:values of product specifications
let specRefArray = reactive([]);
for(let i = 0; i < adminStore.productToEdit.specifications.length; i++) {
    specRefArray.push({key: '', value: ''});
};

function deleteSpec(specIndex) {
    // Remove spec from product
    adminStore.productToEdit.specifications.splice(specIndex, 1);
    // Remove empty spec
    specRefArray.splice(specIndex, 1);
};

function specInputCheckIcon(specRef) {
    return specRef == '' ?
    '' :
    'check';
};

function specInputDeleteIcon(specRef) {
    return specRef == '' ?
    '' :
    'close';
};

function updateSpecObject(specRef, specIndex, objectPiece) {
    
    // Updates either the key||value of the product spec object.

    let previousObjectKey = Object.keys(adminStore.productToEdit.specifications[specIndex])[0];
    let previousObjectValue = Object.values(adminStore.productToEdit.specifications[specIndex])[0];

    if(objectPiece == 'key') {
        adminStore.productToEdit.specifications[specIndex] = 
            { [`${specRef}`]: previousObjectValue };

        specRefArray[specIndex].key = '';
    }
    else {
        
        adminStore.productToEdit.specifications[specIndex] = 
            { [`${previousObjectKey}`]: specRef };

        specRefArray[specIndex].value = '';
    };
};

function cancelUpdateSpecObject(specRef, index, objectPiece) {

    if(objectPiece == 'key') {
        specRefArray[index].key = '';
    }
    else {
        specRefArray[index].value = '';
    };
};

// Product data inputs
let canEditNameInput = ref(false);
let nameInput = ref(null);
let editNameIcon = computed(() => {
    return !canEditNameInput.value ?
        'edit' : 'done';
})

let canEditPriceInput = ref(false);
let priceInput = ref(null);
let editPriceIcon = computed(() => {
    return !canEditPriceInput.value ?
        'edit' : 'done';
});

let canEditQuantityInput = ref(false);
let quantityInput = ref(null);
let editQuantityIcon = computed(() => {
    return !canEditQuantityInput.value ?
        'edit' : 'done';
});

let canEditShortDescriptionInput = ref(false);
let shortDescriptionInput = ref(null);
let editShortDescriptionIcon = computed(() => {
    return !canEditShortDescriptionInput.value ?
        'edit' : 'done';
});

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
