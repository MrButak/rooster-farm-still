<template>

<h3 class="va-h3">Upload</h3>
<va-file-upload
    v-model="adminStore.uploadedImageArray"
    dropzone
    file-types="jpg,png"
    drop-zone-text="Drop files here"
    upload-button-text="Choose File"
/>
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
const adminStore = useAdminStore();
 // Holds all duplicate files. Displayed on DOM
let duplicateFileArray = reactive([]);

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
            switch(response.status) {
                case '200':
                    adminStore.uploadedImageArray.length = 0;
										console.log(response.data)
										console.log('Response from image upload after successful upload in s3 bucket and insertion into DB table images')
                    response.data.forEach((imgObj) => {
                        adminStore.allImageBucketData.push(imgObj)
                    });
                    break;
                default:
                    alert('An error occurred while uploading your images, try again.')
            }
        })
    }); 
};

</script>



<style lang="scss" scoped>



</style>
    