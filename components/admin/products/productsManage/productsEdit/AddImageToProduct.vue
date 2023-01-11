<template>

<va-modal
	v-model="adminStore.addImageToProductObj.showModal"
	fullscreen
	>
	<template #content="{ ok }">
		<va-card-content>
			<!-- Thumbnail -->
			<div class="flex flex-wrap gap-4">
                <p v-if="adminStore.addImageToProductObj.addMainImage">Pick your main image. This is the image which will be displayed on the products main listing.</p>
                <p v-else>Pick your product's images. These will be shown on the image slider when a customer is viewing your product on it's product page.</p>
                <div v-for="imageObj in adminStore.allImageBucketData" 
                            class="flex flex-col !flex-initial w-32 " 
                        >
                        <!-- Multi-image select. For adding images to the product. -->
                        <span v-if="!adminStore.addImageToProductObj.addMainImage"
                            class="flex flex-col justify-center items-center p-1">
                            <!-- Exclude the main image -->
                            <span v-if="imageObj.Key != adminStore.productToEdit.main_image_name">
                                <va-checkbox
                                    v-model="productImagesToAdd"
                                    :array-value="imageObj.Key"
                                />
                                <va-image 
                                    class="w-32"
                                    @click="Object.assign(productMainImage, imageObj);"
                                    :src="imageUrl(imageObj.Key)"
                                />
                            </span>
                        </span>

                        <!-- Main image select. For adding the product's main image. -->
                        <span v-else
                            class="flex flex-col justify-center items-center p-1"
                            :style="{'backgroundColor': mainImageBGcolor(imageObj.Key) }"
                        >
                            <va-image 
                                class="w-32"
                                @click="Object.assign(productMainImage, imageObj);"
                                :src="imageUrl(imageObj.Key)"
                            />
                        </span>
                        <p class="w-32 truncate ...">{{ imageObj.Key }}</p>
                </div>
			</div>
		</va-card-content>

		<!-- Multi-image select. For adding images to the product. -->
		<span v-if="!adminStore.addImageToProductObj.addMainImage">
			<span v-if="productImagesToAdd.length">
				<p>Add the following images?</p>
				<br />
				<p v-for="imageName in productImagesToAdd">{{ imageName }}</p>
				<br />
			</span>
			<va-card-actions>
				<va-button @click="productImagesToAdd.length = 0, adminStore.addImageToProductObj.showModal = false" color="warning">Cancel</va-button>
				<span v-if="productImagesToAdd.length">
					<va-button @click="handleAddProductImages()" color="success">Confirm</va-button>
				</span>
			</va-card-actions>
		</span>

		<!-- Main image select. For adding the product's main image. -->
		<span v-else>
			<p v-if="productMainImage.Key">Set {{ productMainImage.Key }} as the main image?</p>
			<va-card-actions>
				<va-button @click="Object.assign(productMainImage, reactive({})), adminStore.addImageToProductObj.showModal = false" color="warning">Cancel</va-button>
				<span v-if="productMainImage.Key">
					<va-button @click="handleAddMainImageToProduct()" color="success">Confirm</va-button>
				</span>
			</va-card-actions>
		</span>
		
	</template>
</va-modal>

</template>



<script setup>

import { useAdminStore, useProductStore } from '~~/services/stateStore';
const config = useRuntimeConfig();
const adminStore = useAdminStore();
const productStore = useProductStore();

// defineProps({
//     productImagesToAdd: Array,
//     imageUrl: String,
//     mainImageBGcolor: String,
// })
// For holding multi-selected images
let productImagesToAdd = ref([]);

// Function prepends AWS S3 bucket URL to String
function imageUrl(imageKey) {
    // imageKey: 'some-image-name.bmp' 
    return `${config.public.AWS_S3_BUCKET_BASE_URL}${imageKey}`;
};
let productMainImage = reactive({});

// Function determines the images background color when adding a Main image
function mainImageBGcolor(imageFileName) {
	return !productMainImage.Key || productMainImage.Key != imageFileName ?
		'transparent' :
		'red';
};


async function handleAddProductImages() {
	
	// Add unique images to State
	productImagesToAdd.value.forEach((imageName) => {
		
		if(!adminStore.productToEdit.image_names.includes(imageName)) {
			adminStore.productToEdit.image_names.push(toRaw(imageName));
		};
	});
	
	// Reset Component State
	productImagesToAdd.value.length = 0;
	// Close modal
	adminStore.addImageToProductObj.showModal = false;
};

async function handleAddMainImageToProduct() {
	
	// Only update State for the product being edited. The original products data will not be changed yet. Only when the admin saves.

	// If the image was being used for one of the product images, remove it (no duplicate images for a product)
	if(adminStore.productToEdit.image_names && adminStore.productToEdit.image_names.includes(productMainImage.Key)) {
		adminStore.productToEdit.image_names.splice(adminStore.productToEdit.image_names.findIndex(imageName => imageName == productMainImage.Key), 1)
	};
	adminStore.productToEdit.main_image_name = productMainImage.Key;

	// Reset Component State
	Object.assign(productMainImage, {});
	// Close modal
	adminStore.addImageToProductObj.showModal = false;



	// TODO: Show success message

	// let response = await $fetch(`/api/admin/product/image/add`, {
	// 	method: 'POST',
	// 	body: JSON.stringify({
	// 		imageFileName: productMainImage.Key,
	// 		productId: adminStore.productToEdit.id
	// 	})
	// });
	// switch(response.status) {
	// 	case '200':
	// 		// Look for and remove any duplicate image file names for this product
	// 		if(productStore.allProducts[productStore.allProducts.findIndex(product => product.id == adminStore.productToEdit.id)].image_names.includes(productMainImage.Key)) {
	// 			productStore.allProducts[productStore.allProducts.findIndex(product => product.id == adminStore.productToEdit.id)].image_names = productStore.allProducts[productStore.allProducts.findIndex(product => product.id == adminStore.productToEdit.id)].image_names.filter((image_name) => {image_name != productMainImage.Key})
	// 		};
	// 		// Update State with new main image
	// 		productStore.addMainImageToProduct(productMainImage.Key, adminStore.productToEdit.id);
	// 		// Close modal
	// 		adminStore.addImageToProductObj.showModal = false;
	// 		// TODO: Show success message
	// 		break;
	// 	case '500':
	// 		console.log(response.error);
	// 		// TODO: Show error message
	// 		break;
	// 	default:
	// 		console.log('Unhandled response in /admin AddImageToProduct.vue')
	// }
};

</script>
