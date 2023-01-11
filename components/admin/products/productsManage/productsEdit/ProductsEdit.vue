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
					color="info"
    		/>
			</span>
		</h5>
</div>
<span v-if="adminStore.productToEdit.main_image_name">
	<va-image class="flex md6 lg4" :src="mainImageUrl" />
	<p>{{ adminStore.productToEdit.main_image_name }}</p>
</span>
<span v-else>
	No main image, try adding one!
</span>

<!-- Image slider -->
<h5 class="va-h5">Images
	<!-- Only show edit icon if the product has a main image -->
	<span v-if="adminStore.productToEdit.main_image_name">
		<va-icon
			@click="adminStore.addImageToProductObj.showModal = true, adminStore.addImageToProductObj.addMainImage = false"
			name="edit"
			color="info"
		/>
	</span>
</h5>
<!-- Image slider. All product images except the main image -->
<div v-if="editProductImagesArray.length" >
    <va-carousel 
        :items="editProductImagesArray" 
        stateful indicators infinite swipable 
        />
    <div v-for="(imageName, index) in adminStore.productToEdit.image_names">
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
<div v-if="!adminStore.productToEdit.main_image_name">
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
import { useAdminStore, useProductStore } from '~~/services/stateStore';

import ProductsEditSpecs from './ProductsEditSpecs.vue';
import ProductsEditInputs from './ProductsEditInputs.vue';
import AddImageToProduct from './AddImageToProduct.vue';
const config = useRuntimeConfig();
const adminStore = useAdminStore();
const productStore = useProductStore();

// Computed will return an everything after index 0 in the image_names Array with the base url prepended
let editProductImagesArray = computed(() => {
	// No images
	if(!adminStore.productToEdit.image_names || !adminStore.productToEdit.image_names.length) {
		return [];
	};

	return adminStore.productToEdit.image_names
	.map((imgName) => {return config.public.AWS_S3_BUCKET_BASE_URL + imgName});
});

// Computed will return the index 0 of image_names Array with the base_url prepended
let mainImageUrl = computed(() => {
    return config.public.AWS_S3_BUCKET_BASE_URL + adminStore.productToEdit.main_image_name;
});

// Function will compare product details with the edited version and return an Array[{table_name: new_value(s)}]
function productChangesArray() {

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
	if(originalProduct.main_image_name != adminStore.productToEdit.main_image_name) {
		updatedProductData.push({main_image_name: adminStore.productToEdit.main_image_name});
	};
	
	if(originalProduct.category != adminStore.productToEdit.category) {
		updatedProductData.push({category: adminStore.productToEdit.category});
	};

	// String comparison on Arrays and Objects
	if(JSON.stringify(originalProduct.image_names) != JSON.stringify(adminStore.productToEdit.image_names)) {
		updatedProductData.push( {image_names: JSON.stringify(adminStore.productToEdit.image_names)} );
	};
	if(JSON.stringify(originalProduct.specifications) != JSON.stringify(adminStore.productToEdit.specifications)) {
		updatedProductData.push( {specifications: JSON.stringify(adminStore.productToEdit.specifications)} );
	};

	return updatedProductData;
}

async function handleSaveProductEdits() {
	// TODO: 
	// *DONE* 1. compare new data to old and see what has changed
	// 2. send new data to the backend to be updated in the DB
	// 3. update app state

	
	// Early return if nothing has changed
	if(!productChangesArray().length) { return };

	let response = await $fetch(`/api/admin/product/update`, {
		method: 'POST',
		body: JSON.stringify({
			productData: productChangesArray(),
            productId: adminStore.productToEdit.id
		})
	});

    switch(response.status) {
        case '200':
            // Clear out product to edit
            adminStore.productToEdit = {};
            // Close edit product modal
            adminStore.showEditProductComponent = false;
            // Update products with backend call. Another option would be to replace the Array item in productStore.allProducts to the edited one
            await productStore.getAllProducts();
            // TODO: show success message
            break
        default:
            console.log(response.status, response.error)
            break;
    };
	
};


</script>



<style lang="scss" scoped>

</style>
