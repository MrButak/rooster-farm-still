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
<ProductsEditSpecs />

<div class="flex justify-between gap-28 w-full">
    <va-button>Cancel</va-button>
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

import { reactive, computed } from 'vue';
import { useAdminStore } from '~~/services/stateStore';

import ProductsEditSpecs from './ProductsEditSpecs.vue';
import ProductsEditInputs from './ProductsEditInputs.vue';
const adminStore = useAdminStore();




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
