<template>
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
<span v-if="productPropObj.main_image_name">
	<va-image class="flex md6 lg4" :src="mainImageUrl" />
	<p>{{ productPropObj.main_image_name }}</p>
</span>
<span v-else>
	No main image, try adding one!
</span>

<!-- Image slider -->
<h5 class="va-h5">Images
	<!-- Only show edit icon if the product has a main image -->
	<span v-if="productPropObj.main_image_name">
		<va-icon
			@click="adminStore.addImageToProductObj.showModal = true, adminStore.addImageToProductObj.addMainImage = false"
			name="edit"
			color="info"
		/>
	</span>
</h5>
<!-- Image slider. All product images except the main image -->
<div v-if="imageUrls.length" >
    <va-carousel 
        :items="imageUrls" 
        stateful indicators infinite swipable 
        />
    <div v-for="(imageName, index) in productPropObj.image_names">
        <p class="pt-2">{{ index }}. {{ imageName }}
            <span>
                <va-icon
                    @click="productPropObj.image_names.splice(productPropObj.image_names.findIndex(image_name => image_name == imageName), 1)"
                    name="delete"
                    color="danger"
                />
            </span>
        </p>
    </div>
</div>
<div v-if="!productPropObj.main_image_name">
    <p>Add a main image first</p>
</div>

</template>



<script setup>

import { useAdminStore } from '~~/services/stateStore';

const adminStore = useAdminStore();

defineProps({
    productPropObj: Object,
    mainImageUrl: String,
    imageUrls: Array
})

</script>
