<template>

<h3 class="va-h3">Upload</h3>
<va-inner-loading 
    :loading ="fileUploadLoading"
    :size="60"
    >
    <va-file-upload
        v-model="adminStore.uploadedImageArray"
        dropzone
        file-types="jpg,png"
        drop-zone-text="Drop files here"
        upload-button-text="Choose File"  
    />
</va-inner-loading>

<div v-if="duplicateFileArray.length">
    <p class="va-text-danger">Duplicate file name(s). Please remove the following file(s) before proceeding:</p>
    <ul v-for="fileName in duplicateFileArray">
        <li>{{ fileName.Key }}</li>
    </ul>
</div>
<va-button
    class="w-32"
    @click="handleImageUpload"
    :disabled="(!canUploadImage)"
    >Upload
</va-button>

</template>



<script setup>

import { useAdminStore } from '~~/services/stateStore';
import Toast from '~~/components/global/Toast.vue';
const { init, close, closeAll } = useToast();


const adminStore = useAdminStore();

 // Holds all duplicate files. Displayed on DOM
let duplicateFileArray = reactive([]);

let fileUploadLoading = ref(false);

// Function will compare 'all images' vs 'images to be uploaded' and find duplicates.
// Return: Integer >= 0
function hasDuplicateFileName() {
    let duplicates = 
        adminStore.allImageBucketData.filter(imgObj => adminStore.uploadedImageArray.map((imgObj) => imgObj.name).includes(imgObj.Key));
    duplicateFileArray.length = 0;
    if(duplicates.length) {
        Object.assign(duplicateFileArray, duplicates);
    };
    return duplicates.length;
};

// Computed determines whether or not the 'upload image'<button> is disabled
let canUploadImage = computed(() => {
    if(!adminStore.uploadedImageArray.length || hasDuplicateFileName()) {return false};
    return true;
});

// When a file is added to be uploaded, check for duplicates
watchEffect(() => {
    hasDuplicateFileName(adminStore.uploadedImageArray);
});

async function handleImageUpload() {

    fileUploadLoading.value = !fileUploadLoading.value;
    Promise.all(
        adminStore.uploadedImageArray
        .map(
            (image) =>
            // Create an Array of base 64 images from the users image objects
            new Promise((resolve, reject) => {
                const fileReader = new FileReader();

                fileReader.onload = (file) => {
                    resolve(file.target.result.split(',')[1]);
                };

                fileReader.onerror = (error) => reject(error);                  
                fileReader.readAsDataURL(image);
            })
        )
    )
    .then((base64Images) => {
        let response = $fetch(`/api/admin/image/upload`, {
            method: 'POST',
            body: JSON.stringify({
                imageData: base64Images, // Object whos values are the base 64 image data
                imageNameArray: adminStore.uploadedImageArray.map((image) => image.name) // Array of names
            })
        })
        .then((response) => {
            // Stop upload spinner
            fileUploadLoading.value = !fileUploadLoading.value;
            switch(response.status) {

                case '200':
                    // Vuestic toast. Rendered from Component
                    // Deep copy the number of images deleted to show the user on the Toast message
                    let numberOfImagesUploaded = JSON.parse(JSON.stringify(adminStore.uploadedImageArray.length))
                    init({color: 'success', duration: 2000, render: () => h(Toast, 
                        {
                            tPropMessage: `${numberOfImagesUploaded} Image(s) uploaded`,
                            tPropIconName: 'check_circle',
                            tPropIconColor: '#000000'
                        })
                    });
                    adminStore.uploadedImageArray.length = 0;
                    // Add image Objects to State
                    response.data.forEach((imgObj) => {
                        adminStore.allImageBucketData.push(imgObj)
                    });
                    break;
                default:
                    // TODO: handle different response errors
                    init({color: 'danger', duration: 2000, render: () => h(Toast, 
                        {
                            tPropMessage: 'Error uploading image(s)',
                            tPropIconName: 'error',
                            tPropIconColor: '#000000'
                        })
                    });
                    adminStore.uploadedImageArray.length = 0;
                    alert('An error occurred while uploading your images, try again.')
            }
        })
    }); 
};

</script>



<style lang="scss" scoped>



</style>
    