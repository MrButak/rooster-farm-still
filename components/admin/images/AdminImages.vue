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
            :src="imageUrl(imageObj.Key)"
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
            :src="imageUrl(adminStore.viewedImage.Key)" 
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
            @click="adminStore.handleDeleteImages" color="danger">Delete
        </va-button>
        </va-card-actions>
    </template>
</va-modal>

</template>



<script setup>

import { useAdminStore, useProductStore } from '~~/services/stateStore';
const adminStore = useAdminStore();
const productStore = useProductStore();
const config = useRuntimeConfig();

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

function imageUrl(imageKey) {
    // imageKey: 'some-image-name.bmp' 
    return `${config.public.AWS_S3_BUCKET_BASE_URL}${imageKey}`;
};

</script>



<style lang="scss" scoped>



</style>
