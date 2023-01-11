<template>

<!-- ******************************************************************** -->
<!-- Specifications -->
<!-- ******************************************************************** -->
<!-- 
The v-models on the inputs are dynamically created in the variable specRefArray.
specRefArray is an Array of Objects the same length as the product specification Array (adminStore.productToEdit.specifications).
The original specification value is show as the placeholder and is not updated until the user saves.
New values are saved in specRefArray.
-->
<h5 class="va-h5">Product specifications</h5>
<div class="flex flex-col gap-3">
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

        <div style="display:flex;">

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
<div class="max-w-0">
    <va-button
        @click="addSpec"
        icon="add"
        :disabled="canAddSpecification"
        >
        specification
    </va-button>
</div>

</template>

<script setup>

import { reactive, computed } from 'vue';
import { useAdminStore } from '~~/services/stateStore';
const adminStore = useAdminStore();

let newSpecObject = reactive({key: '', value: ''});
// Build reactive Array to store new key:values of product specifications
let specRefArray = reactive([]);
for(let i = 0; i < adminStore.productToEdit.specifications.length; i++) {
    specRefArray.push({key: '', value: ''});
};

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