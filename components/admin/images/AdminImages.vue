<template>

<h3 class="va-h3">Images</h3>
<div class="flex">
    <span class="flex !flex-initial">
        <va-button 
            icon="delete" 
            size="small"
            color="danger" 
            :disabled="!adminStore.imageSelection.length"
            @click="showDeleteImageModal = !showDeleteImageModal"
            >
            Delete
        </va-button>
    </span>
    <!-- Image view options -->
    <va-select
        class="flex !flex-initial w-44"
        :options="viewOptions"
        v-model="imageView"
    >
      <template #prependInner>
            <va-icon
                name="list"
            />
      </template>
    </va-select>
</div>

<!-- *****Image views***** -->

<!-- List -->
<div v-if="imageView == 'list'">
    <div class="row">
        <va-input
        class="flex mb-2 md6 xs12"
        placeholder="Filter..."
        v-model="filterInput"
        />
    </div>
    <va-data-table
        :items="adminStore.imageListObjArry"
        :columns="columns"
        :filter="filterInput"
        icon="home"
        striped
    >

    <template #header(view)="{ label }">
        {{ label }}
    </template>
    <!-- image_name is value -->
    <template #cell(view)="{ value }">
        <va-icon 
            size="small" 
            name="visibility" 
            @click="adminStore.viewedImage = adminStore.allImageBucketData[adminStore.allImageBucketData.findIndex(imgObj => imgObj.Key == value)]; showImageModal = !showImageModal"
            />
    </template>

    <template #header(select)="{ label }">
        {{ label }}
        <!-- TODO: Select all -->
    </template>
    <!-- image_name is value -->
    <template #cell(select)="{ value }">
        <va-checkbox
            v-model="adminStore.imageSelection"
            :array-value="value"
        />
    </template>

    <template #header(displayed)="{ label }">
        {{ label }}
    </template>
		
    <template #cell(displayed)="{ value }">
        <va-checkbox
            v-model="adminStore.imageSelection"
            :array-value="value"
        />
    </template>

    </va-data-table>
</div>
<!-- Thumbnail -->
<div v-if="imageView == 'thumbnail'" class="flex flex-wrap gap-4">
    <div v-for="imageObj in adminStore.allImageBucketData" 
            class="flex flex-col !flex-initial w-32 " 
            :style="{'backgroundColor': adminStore.imagePreviewBgColor(imageObj)}"
        >
        
        <va-checkbox
            v-model="adminStore.imageSelection"
            :array-value="imageObj.Key"
        />
        <va-image 
            class="w-32"
            @click="adminStore.viewedImage = imageObj; showImageModal = !showImageModal"
            :src="createImageUrlFromString(imageObj.Key)"
        />
        <p class="w-32 truncate ...">{{ imageObj.Key }}</p>
    </div>
</div>

<!-- No images to show -->
<div v-if="!adminStore.allImageBucketData.length">
    <p>No images, try uploading some!</p>
</div>

<!-- View image modal -->
<va-modal
    :fullscreen="true"
    v-model="showImageModal"
    no-padding
  >
    <template #content="{ ok }">
        <va-image 
            :contain="true"
            :src="createImageUrlFromString(adminStore.viewedImage.Key)" 
        />
        <va-card-title>
            {{ adminStore.viewedImage.Key }}
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
        <va-inner-loading 
            :loading ="deleteImageLoading"
            :size="60"
            >
        <va-card-title>
            Delete {{ adminStore.imageSelection.length }} image(s)?
        </va-card-title>
        <va-card-content v-for="imageName, index in adminStore.imageSelection">
            <p>{{ index + 1 }}) {{ imageName }}</p>
        </va-card-content>
        <va-card-actions>
        <va-button 
            @click="ok" color="info">Cancel
        </va-button>
        <va-button 
            @click="handleDeleteImages()" 
            color="danger"
            :disabled="deleteImageLoading || !adminStore.imageSelection.length"
            >Delete
        </va-button>
        </va-card-actions>
    </va-inner-loading>
    </template>

</va-modal>


</template>



<script setup>

import { useAdminStore, useProductStore, createImageUrlFromString } from '~~/services/stateStore';
import Toast from '~~/components/global/Toast.vue';
const { init, close, closeAll } = useToast();
const adminStore = useAdminStore();
const productStore = useProductStore();
const config = useRuntimeConfig();

// Loading spinner
let deleteImageLoading = ref(false);

(async() => {
    // Load products into memory (if needed)
    if(!productStore.allProducts.length) {
        await productStore.getAllProducts();
    };
    // Load all s3 images into memory
    await adminStore.getAllImagesFromS3();
})();

// Image list options
let viewOptions = ref(['list', 'thumbnail'])
let imageView = ref('list');

let showImageModal = ref(false);
let showDeleteImageModal = ref(false);

// List view
const filterInput = ref('');
const columns = [
    // { key: 'view', name: 'view', label: 'view' },
    { key: 'key', name: 'view', label: 'view' }, // passing the DB id here. When @click
    { key: 'key', name: 'select', label: 'select', sortable: true },
    { key: 'key', name: 'file_name', label: 'name' },
    { key: 'lastModified', name:'last modified', sortable: true },
    { key: 'displayed', label: 'displayed on product(s)', name: 'displayed_on' }
];

// Function prepends AWS S3 bucket URL to String
function imageUrl(imageKey) {
    // imageKey: 'some-image-name.bmp' 
    return `${config.public.AWS_S3_BUCKET_BASE_URL}${imageKey}`;
};


async function handleDeleteImages() {
    // If no items to delete, return
    if(!adminStore.imageSelection.length) { return };

    // Create an Array of Objects to send to the backend
    let deleteParams = [];
    adminStore.imageSelection.forEach((imageName) => {
        deleteParams.push({'Key': imageName});
    });

    // Start loading spinner
    deleteImageLoading.value = !deleteImageLoading.value;

    let response = $fetch(`/api/admin/image/delete`, {
        method: 'POST',
        body: JSON.stringify({
            imageNameArray: deleteParams
        })
    })
    .then((response) => {
        switch(response.status) {
            case '200':
                // Vuestic toast. Rendered from Component
                // Deep copy the number of images deleted to show the user on the Toast message
                let numberOfImagesUploaded = JSON.parse(JSON.stringify(adminStore.imageSelection.length))
                init({color: 'success', duration: 2000, render: () => h(Toast, 
                    {
                        tPropMessage: `${numberOfImagesUploaded} Image(s) deleted`,
                        tPropIconName: 'check_circle',
                        tPropIconColor: '#000000'
                    })
                });
                // Success, now delete from State
                response.data.forEach((imgObj) => {
                    adminStore.allImageBucketData.splice(adminStore.allImageBucketData.findIndex(img => img.Key == imgObj.Key), 1);
                });            
                adminStore.imageSelection.length = 0;
                break;
            case '500':
                // TODO: handle different response errors
                init({color: 'danger', duration: 2000, render: () => h(Toast, 
                    {
                        tPropMessage: 'Error deleting images',
                        tPropIconName: 'error',
                        tPropIconColor: '#000000'
                    })
                });
                // console.log(response.data);
        };
        // Stop loading spinner
        deleteImageLoading.value = !deleteImageLoading.value;
        // Close the modal
        showDeleteImageModal.value = !showDeleteImageModal.value;
    });
};

</script>



<style lang="scss" scoped>



</style>
