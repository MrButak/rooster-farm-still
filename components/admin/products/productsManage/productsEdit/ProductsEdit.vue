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
<ProductsEditInputs />

<!-- ******************************************************************** -->
<!-- Images -->
<!-- ******************************************************************** -->
<!-- The first image in the Array is the main image -->
<h5 class="va-h5">Main image</h5>
<va-image class="flex md6 lg4" :src="mainImageUrl" />
<p>{{ adminStore.productToEdit.image_names[0] }}</p>

<h5 class="va-h5">Images</h5>
<div v-if="productImagesArray.length" >
    <!-- All images after index 0 are displayed on the image slider -->
    <va-carousel 
        :items="productImagesArray" 
        stateful indicators infinite swipable 
        />
    <div v-for="(imageName, index) in adminStore.productToEdit.image_names.slice(1)">
        <p>{{ index + 1 }}. {{ imageName }}</p>
    </div>
</div>
<div v-else>
    <p>No product images add some!</p>
</div>

<!-- ******************************************************************** -->
<!-- Specifications -->
<!-- ******************************************************************** -->
<ProductsEditSpecs />

<div class="flex justify-between gap-28 w-full">
    <va-button
        color="secondary"
    >
        Cancel
    </va-button>
    <va-button>Save</va-button>
</div>

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

import { computed } from 'vue';
import { useAdminStore } from '~~/services/stateStore';

import ProductsEditSpecs from './ProductsEditSpecs.vue';
import ProductsEditInputs from './ProductsEditInputs.vue';
const config = useRuntimeConfig();
const adminStore = useAdminStore();

// Computed will return an everything after index 0 in the image_names Array with the base url prepended
let productImagesArray = computed(() => {
    return adminStore.productToEdit.image_names
    .slice(1)
    .map((imgName) => {return config.public.AWS_S3_BUCKET_BASE_URL + imgName});
});

// Computed will return the index 0 of image_names Array with the base_url prepended
let mainImageUrl = computed(() => {
    return config.public.AWS_S3_BUCKET_BASE_URL + adminStore.productToEdit.image_names[0]
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
