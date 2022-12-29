<template>

<h3 class="va-h3">Images</h3>
<va-button 
    icon="delete" 
    color="danger" 
    class="w-32"
    :disabled="!imageSelection.length"
    @click="showDeleteImageModal = !showDeleteImageModal"
    >
    Delete
</va-button>
<div class="flex gap-4">
    <div v-for="imageObj in adminStore.allImageBucketData" 
            class="w-32" 
            :style="{'backgroundColor': imagePreviewBgColor(imageObj)}"
        >
        <va-checkbox
            v-model="imageSelection"
            :array-value="imageObj.Key"
        />
        <va-image 
            class="w-32"
            @click="viewedImage = imageObj; showImageModal = !showImageModal"
            :src="imageUrl(imageObj.Key)"
        />
        <p class="w-32 truncate ...">{{ imageObj.Key }}</p>
    </div>
</div>

<!-- No images to show -->
<div v-if="!adminStore.allImageBucketData.length">
    <p>No images, try uploading some!</p>
</div>

<!-- Image modal -->
<va-modal
    :fullscreen="true"
    v-model="showImageModal"
    no-padding
  >
    <template #content="{ ok }">
        <va-image 
            :contain="true"
            :src="imageUrl(viewedImage.Key)" 
        />
        <va-card-title>
            {{ viewedImage.Key }}
        </va-card-title>
        
        <va-card-actions>
        <va-button 
            @click="ok" color="warning">Ok
        </va-button>
        </va-card-actions>
    </template>
</va-modal>

<!-- delete image modal -->
<va-modal
    :fullscreen="true"
    v-model="showDeleteImageModal"
    no-padding
  >
    <template #content="{ ok }">
        <va-card-title>
            Delete {{ imageSelection.length }} image(s)?
        </va-card-title>
        <va-card-content v-for="imageName, index in imageSelection">
            <p>{{ index + 1 }}) {{ imageName }}</p>
        </va-card-content>
        <va-card-actions>
        <va-button 
            @click="ok" color="info">Cancel
        </va-button>
        <va-button 
            @click="handleDeleteImages" color="danger">Delete
        </va-button>
        </va-card-actions>
    </template>
</va-modal>

</template>



<script setup>

import { useAdminStore } from '~~/services/stateStore';
const adminStore = useAdminStore();
const config = useRuntimeConfig();

let showImageModal = ref(false);
let showDeleteImageModal = ref(false);
let viewedImage = {}; // This is assigned when an image is clicked

// Holds image name when checkbox is checked
let imageSelection = ref([]);

function imagePreviewBgColor(imageName) {

    return imageSelection.value.includes(imageName.Key) ?
        '#D3D3D3' :
        'transparent';
};

function imageUrl(imageKey) {
    // imageKey == some-image-name.bmp 
    return `${config.public.AWS_S3_BUCKET_BASE_URL}${imageKey}`;
};

onMounted(() => {
    (async() => {
        await getAllImagesFromS3();
    })();
});

async function handleDeleteImages() {
    // If no items to delete, return
    if(!imageSelection.value.length) { return };
    
    // Create an Array of Objects
    let deleteParams = [];
    imageSelection.value.forEach((imageName) => {
        deleteParams.push({'Key': imageName});
    });

    let response = $fetch(`/api/admin/image/delete`, {
        method: 'POST',
        body: JSON.stringify({
            imageNameArray: deleteParams
        })
    })
    .then((response) => {
        switch(response.status) {
            case '200':
                // Success, now delete from State
                // TODO: remove image objects from
                Object.assign(
                    adminStore.allImageBucketData, 
                    adminStore.allImageBucketData.filter((imageObj) => {
                        response.data.map((resObj) => { resObj.Key}).includes(imageObj.Key)
                    })
                )
                console.log(response);
                break;
            case '500':
                // Error(s)
                console.log(response.data)
        }
    })
};

// Function handles API call to Amazon s3 to get all images.
// getAllImagesFromS3() => backend => s3 API call => backend image data => response
async function getAllImagesFromS3() {
    let response = await $fetch(`/api/admin/image/get-all`, {

    });
    Object.assign(adminStore.allImageBucketData, response.imageData);
};

</script>



<style lang="scss" scoped>



</style>
