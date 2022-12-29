<template>

<div v-if="allProducts.length" class="flex flex-col align-center gap-16 mt-16 px-4">

    <div v-for="product in allProducts" class="flex md6 lg4">
        <va-card>
            <va-image
            :src="imageUrl(product.image_names[0])"
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

const router = useRouter();
const config = useRuntimeConfig();
let allProducts = reactive([]);

(async() => {
    let productsDbData = await $fetch(`/api/get-products`);
    productsDbData.forEach((product) => allProducts.push(product));
})();

function imageUrl(imageName) {
    // imageKey: 'some-image-name.bmp' 
    return `${config.public.AWS_S3_BUCKET_BASE_URL}${imageName}`;
};

</script>
