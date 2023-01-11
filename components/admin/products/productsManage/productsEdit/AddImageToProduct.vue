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
                            <span v-if="imageObj.Key != productPropObj.main_image_name">
                                <va-checkbox
                                    v-model="adminStore.productImagesToAdd"
                                    :array-value="imageObj.Key"
                                />
                                <va-image 
                                    class="w-32"
                                    @click="Object.assign(adminStore.productMainImage, imageObj);"
                                    :src="imageUrl(imageObj.Key)"
                                />
                            </span>
                        </span>

                        <!-- Main image select. For adding the product's main image. -->
                        <span v-else
                            class="flex flex-col justify-center items-center p-1"
                            :style="{'backgroundColor': adminStore.mainImageBGcolor(adminStore.productMainImage, imageObj.Key) }"
                        >
                            <va-image 
                                class="w-32"
                                @click="Object.assign(adminStore.productMainImage, imageObj);"
                                :src="imageUrl(imageObj.Key)"
                            />
                        </span>
                        <p class="w-32 truncate ...">{{ imageObj.Key }}</p>
                </div>
			</div>
		</va-card-content>

		<!-- Multi-image select. For adding images to the product. -->
		<span v-if="!adminStore.addImageToProductObj.addMainImage">
			<span v-if="adminStore.productImagesToAdd.length">
				<p>Add the following images?</p>
				<br />
				<p v-for="imageName in adminStore.productImagesToAdd">{{ imageName }}</p>
				<br />
			</span>
			<va-card-actions>
				<va-button @click="adminStore.productImagesToAdd.length = 0, adminStore.addImageToProductObj.showModal = false" color="warning">Cancel</va-button>
				<span v-if="adminStore.productImagesToAdd.length">
					<va-button @click="handleAddProductImages()" color="success">Confirm</va-button>
				</span>
			</va-card-actions>
		</span>

		<!-- Main image select. For adding the product's main image. -->
		<span v-else>
			<p v-if="adminStore.productMainImage.Key">Set {{ adminStore.productMainImage.Key }} as the main image?</p>
			<va-card-actions>
				<va-button @click="Object.assign(adminStore.productMainImage, reactive({})), adminStore.addImageToProductObj.showModal = false" color="warning">Cancel</va-button>
				<span v-if="adminStore.productMainImage.Key">
					<va-button @click="handleAddMainImageToProduct()" color="success">Confirm</va-button>
				</span>
			</va-card-actions>
		</span>
		
	</template>
</va-modal>

</template>



<script setup>

import { useAdminStore, useProductStore,
        createImageUrlFromString, createImageUrlsFromArray
} from '~~/services/stateStore';
const config = useRuntimeConfig();
const adminStore = useAdminStore();
const productStore = useProductStore();

defineProps({
    productPropObj: Object,
    imageUrl: String,
    handleAddProductImages: Function,
    handleAddMainImageToProduct: Function
});

// Function prepends AWS S3 bucket URL to String
// function imageUrl(imageKey) {
//     // imageKey: 'some-image-name.bmp' 
//     return `${config.public.AWS_S3_BUCKET_BASE_URL}${imageKey}`;
// };


</script>
