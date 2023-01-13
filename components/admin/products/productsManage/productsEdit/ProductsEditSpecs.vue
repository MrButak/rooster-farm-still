<template>
<!--
The v-models on the inputs are dynamically created in the variable specRefArray.
specRefArray is an Array of Objects the same length as the product specification Array (adminStore.productToEdit.specifications).
The original specification value is show as the placeholder and is not updated until the user saves.
New values are saved in specRefArray.
-->
<h5 class="va-h5">Product specifications</h5>
<div class="flex flex-col gap-3">
    <!-- Loop through product specification Objects -->
    <div v-for="(spec, index) in productPropObj.specifications">
        <div class="flex item-center w-full gap-3">
            <p>spec #{{ index + 1 }}</p>
            <va-icon
                @click="deleteSpec(index)"
                name="delete"
                size="small"
            ></va-icon>  
        </div>

        <div class="flex">

            <!-- Object key input -->
            <va-input
                class="mb-4"
                v-model="specRefArray[index].key"
                :placeholder="Object.keys(spec)[0]"
                :rules="[Object.keys(spec)[0].trim().length || `Can't be blank`]"
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
                :rules="[Object.keys(spec)[0].trim().length || `Can't be blank`]"
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
    <div class="flex">
        <va-input
            class="mb-4"
            placeholder="name"
            v-model="newSpecObject.key"
            :rules="[(v) => v.trim().length || `Can't be blank`]"
            >
        </va-input>
        <va-input
            class="mb-4"
            placeholder="value"
            v-model="newSpecObject.value"
            :rules="[(v) => v.trim().length || `Can't be blank`]"
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

const props = defineProps({
    productPropObj: Object
});

let newSpecObject = reactive({key: '', value: ''});

// Build reactive Array to store new key:values of product specifications
let specRefArray = reactive([]);
for(let i = 0; i < props.productPropObj.specifications.length; i++) {
    specRefArray.push({key: '', value: ''});
};

// Function will add another product specification
function addSpec() {
    if(!newSpecObject.key || !newSpecObject.value) { return };

    props.productPropObj.specifications.push(
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
    props.productPropObj.specifications.splice(specIndex, 1);
    
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
    let previousObjectKey = Object.keys(props.productPropObj.specifications[specIndex])[0];
    let previousObjectValue = Object.values(props.productPropObj.specifications[specIndex])[0];

    if(objectPiece == 'key') {
        props.productPropObj.specifications[specIndex] = 
            { [`${specRef}`]: previousObjectValue };

        specRefArray[specIndex].key = '';
    }
    else {
        
        props.productPropObj.specifications[specIndex] = 
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
