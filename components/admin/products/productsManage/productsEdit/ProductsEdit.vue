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
<div class="flex w-full items-center gap-2.5">
    <h5 class="va-h5">Main image 
			<span>
				<va-icon
					@click="adminStore.addImageToProductObj.showModal = true, adminStore.addImageToProductObj.addMainImage = true"
        	name="edit"
    		/>
			</span>
		</h5>
</div>
<span v-if="adminStore.productToEdit.image_names.length">
	<va-image class="flex md6 lg4" :src="mainImageUrl" />
	<p>{{ adminStore.productToEdit.image_names[0] }}</p>
</span>
<span v-else>
	No main image, try adding one!
</span>

<!-- Image slider -->
<h5 class="va-h5">Images
	<!-- Only show edit icon if the product has a main image -->
	<span v-if="adminStore.productToEdit.image_names.length">
		<va-icon
			@click="adminStore.addImageToProductObj.showModal = true, adminStore.addImageToProductObj.addMainImage = false"
			name="edit"
		/>
	</span>
</h5>
<!-- All images after index 0 are displayed on the image slider -->
<div v-if="editProductImagesArray.length" >
    <va-carousel 
        :items="editProductImagesArray" 
        stateful indicators infinite swipable 
        />
    <div v-for="(imageName, index) in adminStore.productToEdit.image_names.slice(1)">
        <p class="pt-2">{{ index + 1 }}. {{ imageName }}
					<span>
						<va-icon
							@click="adminStore.productToEdit.image_names.splice(adminStore.productToEdit.image_names.findIndex(image_name => image_name == imageName), 1)"
							name="delete"
							color="danger"
						/>
					</span>
				</p>
    </div>
</div>
<div v-if="!adminStore.productToEdit.image_names.length">
    <p>Add a main image first</p>
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
    <va-button @click="handleSaveProductEdits()">Save</va-button>
</div>

<!-- Confirm cancel edit popup modal -->
<va-modal 
    v-model="adminStore.showCancelEditModal" 
    message="Are you sure you want to cancel? Any unsaved changes will be lost." 
    title="Overview" 
    @ok="adminStore.showEditProductComponent = false"
/>
<!-- TODO: Should .$reset store here too ^^^^ -->


<!-- Add image to product modal -->
<AddImageToProduct />

</template>



<script setup>

import { computed } from 'vue';
import { useAdminStore } from '~~/services/stateStore';

import ProductsEditSpecs from './ProductsEditSpecs.vue';
import ProductsEditInputs from './ProductsEditInputs.vue';
import AddImageToProduct from './AddImageToProduct.vue';
const config = useRuntimeConfig();
const adminStore = useAdminStore();

// Computed will return an everything after index 0 in the image_names Array with the base url prepended
let editProductImagesArray = computed(() => {
    return adminStore.productToEdit.image_names
    .slice(1)
    .map((imgName) => {return config.public.AWS_S3_BUCKET_BASE_URL + imgName});
});

// Computed will return the index 0 of image_names Array with the base_url prepended
let mainImageUrl = computed(() => {
    return config.public.AWS_S3_BUCKET_BASE_URL + adminStore.productToEdit.image_names[0]
});

async function handleSaveProductEdits() {
	// TODO: 
	// 1. compare new data to old and see what has changed
	// 2. send new data to the backend to be updated in the DB
	// 3. update app state
	let updatedProductData = [];
	let originalProduct = 
		productStore.allProducts[
			productStore.allProducts.findIndex(product => product.id == adminStore.productToEdit.id)
		];

	if(originalProduct.name != adminStore.productToEdit.name) {
		updatedProductData.push({name: adminStore.productToEdit.name});
	};
	if(originalProduct.short_description != adminStore.productToEdit.short_description) {
		updatedProductData.push({short_description: adminStore.productToEdit.short_description});
	};
	if(originalProduct.description != adminStore.productToEdit.description) {
		updatedProductData.push({description: adminStore.productToEdit.description});
	};
	if(originalProduct.price_in_cents != adminStore.productToEdit.price_in_cents) {
		updatedProductData.push({price_in_cents: adminStore.productToEdit.price_in_cents});
	};
	if(originalProduct.quantity != adminStore.productToEdit.quantity) {
		updatedProductData.push({quantity: adminStore.productToEdit.quantity});
	};
	// image_name, specifications
// 	name               | character varying(255)      |           |          | 
//  short_description  | text                        |           |          | 
//  description        | text                        |           |          | 
//  price              | numeric                     |           |          | 
//  quantity           | integer                     |           |          | 
//  image_names        | text[]                      |           |          | 
//  specifications     | json                        |           |          | 
//  category           | character varying(255)      |           |          | 
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
