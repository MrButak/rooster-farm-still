<template>

<div v-if="productStore.allProducts.length" class="flex flex-col align-center gap-16 mt-16 px-4">
<!-- TODO: replace the following classes: md6, lg4 to use tailwind -->
    <div v-for="product in productStore.allProducts" class="flex md6 lg4">
        <va-card>
            <va-image
            :src="imageUrl(product.image_names)"
            />
            <va-card-content>
                <h6 class="va-h6">{{ product.name }}</h6>
            </va-card-content>
            <va-card-content>
                <p>{{ product.description }}</p>
            </va-card-content>
            <va-card-content>
                <p><b>${{ product.price }}</b></p>
            </va-card-content>
            <va-card-content align="center">
                <va-button 
                    @click="router.push({ path: `/product/${product.name.replaceAll(' ', '-') }` })">
                    See More
                </va-button>
            </va-card-content>
        </va-card>
    </div>

</div>

</template>


<script setup>

import { useProductStore } from '~~/services/stateStore';
const productStore = useProductStore();

const router = useRouter();
const config = useRuntimeConfig();

// API call to backend - gets all products from DB
(async() => {
    await productStore.getAllProducts();
})();

// Function will prepend AWS S3 bucket URL to a String
function imageUrl(imageNames) {
	
	if(!imageNames.length) {
		return 'https://picsum.photos/1505';
	};
	// Return just the first image
	return `${config.public.AWS_S3_BUCKET_BASE_URL}${imageNames[0]}`;
};

</script>
