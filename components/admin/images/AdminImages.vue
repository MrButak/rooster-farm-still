<template>

<h3 class="va-h3">Images</h3>

<div v-for="imageObj in adminStore.allImageBucketData" class="">
    <div>
        <va-image 
            class="w-32"
            :src="imageUrl(imageObj.Key)"
        />
        <p>{{ imageObj.Key }}</p>
    </div>
    
</div>

</template>



<script setup>

import { useAdminStore } from '~~/services/stateStore';
const adminStore = useAdminStore();

const config = useRuntimeConfig();


function imageUrl(imageKey) {
    // console.log(imageKey)
    return `${config.public.AWS_S3_BUCKET_BASE_URL}${imageKey}`;
}

onMounted(() => {
    getAllImagesFromS3()
})
async function getAllImagesFromS3() {
    let response = await $fetch(`/api/admin/image/get-all`, {

    });
    Object.assign(adminStore.allImageBucketData, response.imageData);
    // console.log(response.imageData);
};

</script>



<style lang="scss" scoped>



</style>
