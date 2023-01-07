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
							<!--:style="{'backgroundColor': adminStore.imagePreviewBgColor(imageObj)}"-->
							
							<va-checkbox
								v-if="!adminStore.addImageToProductObj.addMainImage"
								v-model="adminStore.imageSelection"
								:array-value="imageObj.Key"
							/>
							<span 
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

		<p v-if="productMainImage.Key">Set {{ productMainImage.Key }} as the main image?</p>
		<va-card-actions>
			<va-button @click="ok" color="warning">Cancel</va-button>
			<span v-if="productMainImage.Key">
				<va-button @click="handleAddMainImageToProduct()" color="success">Confirm</va-button>
			</span>
		</va-card-actions>

	</template>

</va-modal>

</template>



<script setup>

import { useAdminStore } from '~~/services/stateStore';
const config = useRuntimeConfig();
const adminStore = useAdminStore();

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

async function handleAddMainImageToProduct() {
	let response = await $fetch(`/api/admin/product/image/add`, {
		method: 'POST',
		body: JSON.stringify({
			imageFileName: productMainImage.Key
		})
	});

	console.log(response)
	// TODO: once image is add, prepend it to the products image array in State
};

</script>
