<template>

<!-- update products SET image_names = array_append(image_names,'product-image-5.jpg'); -->


<h3 class="va-h3">Images</h3>
<div class="flex">
    <span class="flex !flex-initial">
        <va-button 
            icon="delete" 
            size="small"
            color="danger" 
            :disabled="!imageSelection.length"
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
        :items="imageListObjArry"
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
            @click="viewedImage = adminStore.allImageBucketData[adminStore.allImageBucketData.findIndex(imgObj => imgObj.Key == value)]; showImageModal = !showImageModal"
            />
    </template>

    <template #header(select)="{ label }">
        {{ label }}
        <!-- TODO: Select all -->
    </template>
    <!-- image_name is value -->
    <template #cell(select)="{ value }">
        <va-checkbox
            v-model="imageSelection"
            :array-value="value"
        />
    </template>

    <template #header(displayed)="{ label }">
        {{ label }}
    </template>
    <template #cell(displayed)="{ value }">
        <va-checkbox
            v-model="imageSelection"
            :array-value="value"
        />
    </template>

    </va-data-table>
</div>

<!-- Thumbnail -->
<div v-if="imageView == 'thumbnail'" class="flex flex-wrap gap-4">
    <div v-for="imageObj in adminStore.allImageBucketData" 
            class="flex flex-col !flex-initial w-32 " 
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

<!-- View image modal -->
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
    await getAllImagesFromS3();
})();

// Image list options
let viewOptions = ref(['list', 'thumbnail'])
let imageView = ref('list');

let showImageModal = ref(false);
let showDeleteImageModal = ref(false);
let viewedImage = {}; // This is assigned when an image is clicked

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

// Function will return an Array of all product names that are displaying the imgObj
function getAllImagesDisplayedForProduct(imgObj) {
    let productNames = [];
    productStore.allProducts.forEach((productObj) => {
        productObj.image_names.forEach((imageName) => {
    
            if(imageName == imgObj.Key && !productNames.includes(imageName)) {
                productNames.push(productObj.name)
            }
        });
    });
    return productNames;
};

// Computed will return an Array of Objects to display on the 'list view' table
let imageListObjArry = computed(() => {
    let imageObjArray = [];
    adminStore.allImageBucketData.forEach((img) => {
        // imageObjArray.push({key: img.Key, lastModified: new Date(img.LastModified).toLocaleString()})
        imageObjArray.push(
            {
                key: img.Key, 
                lastModified: new Date(img.LastModified).toLocaleString(), 
                displayed: getAllImagesDisplayedForProduct(img)
            }
        );
    });
    
    return imageObjArray;
})


// Holds image name(s) when checkbox is checked
let imageSelection = ref([]);

// If a checkbox is checked/unchecked this determines the div's background color
function imagePreviewBgColor(imageName) {
    return imageSelection.value.includes(imageName.Key) ?
        '#D3D3D3' :
        'transparent';
};

function imageUrl(imageKey) {
    // imageKey: 'some-image-name.bmp' 
    return `${config.public.AWS_S3_BUCKET_BASE_URL}${imageKey}`;
};

async function handleDeleteImages() {
    // If no items to delete, return
    if(!imageSelection.value.length) { return };
    
    // Create an Array of Objects to send to the backend
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
                response.data.forEach((imgObj) => {
                    adminStore.allImageBucketData.splice(adminStore.allImageBucketData.findIndex(img => img.Key == imgObj.Key), 1);
                });
                imageSelection.value.length = 0;
                break;
            case '500':
                // Error(s)
                console.log(response.data);
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
