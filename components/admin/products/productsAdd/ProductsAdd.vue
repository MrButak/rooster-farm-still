<template>

<h3 class="va-h3">Add Products</h3>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Product name</h5>   
</div>

<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToAdd.name"
        ref="nameInput"
        placeholder="product name"
        >
    </va-input>
</div>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Price in cents</h5>
</div>
<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToAdd.price_in_cents"
        ref="priceInput"
        placeholder="price in cents"
        >
    </va-input>
</div>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Quantity</h5>
</div>
<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToAdd.quantity"
        ref="quantityInput"
        placeholder="quantity"
        >
    </va-input>
</div>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Short description</h5>
</div>

<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToAdd.short_description"
        type="textarea"
        ref="shortDescriptionInput"
        :autosize="true"
        placeholder="product's short description: this text will appear on the product's main listing"
        >
    </va-input>
</div>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Long description</h5>
</div>

<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToAdd.long_description"
        type="textarea"
        ref="longDescriptionInput"
        :autosize="true"
        placeholder="product's long description: this text will appear on the product's page"
        >
    </va-input>
</div>

<ProductsEditImages 
    :productPropObj="adminStore.productToAdd"
    :mainImageUrl="createImageUrlFromString(adminStore.productToAdd.main_image_name)"
    :imageUrls="createImageUrlsFromArray(adminStore.productToAdd.image_names)"
/>

<!-- Add image to product modal -->
<AddImageToProductModal
    :productPropObj="adminStore.productToEdit"
    :handleAddProductImages="handleAddProductImages"
    :handleAddMainImageToProduct="handleAddMainImageToProduct"
/>

</template>

<script setup>

import { useAdminStore,
        createImageUrlFromString, createImageUrlsFromArray 
} from '~~/services/stateStore';
import AddImageToProductModal from '~~/components/admin/products/productsManage/productsEdit/AddImageToProductModal.vue';
import ProductsEditImages from '~~/components/admin/products/productsManage/productsEdit/ProductsEditImages.vue';
const adminStore = useAdminStore();

let nameInput = ref(null);
let priceInput = ref(null);
let quantityInput = ref(null);
let shortDescriptionInput = ref(null);
let longDescriptionInput = ref(null);

function handleAddProductImages() {
    // Add unique images to State
	adminStore.productImagesToAdd.forEach((imageName) => {
		
		if(!adminStore.productToAdd.image_names.includes(imageName)) {
			adminStore.productToAdd.image_names.push(toRaw(imageName));
		};
	});
	// Reset Component State
	adminStore.productImagesToAdd.length = 0;
	// Close modal
	adminStore.addImageToProductObj.showModal = false;
};
function handleAddMainImageToProduct() {

	// If the image was being used for one of the product images, remove it (no duplicate images for a product)
	if(adminStore.productToAdd.image_names && adminStore.productToAdd.image_names.includes(adminStore.productMainImage.Key)) {
		adminStore.productToAdd.image_names.splice(adminStore.productToAdd.image_names.findIndex(imageName => imageName == adminStore.productMainImage.Key), 1)
	};
	adminStore.productToAdd.main_image_name = adminStore.productMainImage.Key;

	// Reset Component State
    Object.assign(adminStore.productMainImage, {})
	// Close modal
	adminStore.addImageToProductObj.showModal = false;
};

</script>
