<template>

<h3 class="va-h3">Upload</h3>
<va-file-upload
    v-model="adminStore.uploadedImageArray"
    dropzone
    file-types="jpg,png"
    drop-zone-text="Drop files here"
    upload-button-text="Choose File"
/>
<div v-if="duplicateFileNameArray.length">
    <p class="va-text-danger">Duplicate file name(s). Please remove the following file(s) before proceeding:</p>
    <ul v-for="fileName in duplicateFileNameArray">
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
let duplicateFileNameArray = reactive([]);

function hasDuplicateFileName() {
    
    let duplicates = 
        adminStore.allImageBucketData.filter(imgObj => adminStore.uploadedImageArray.map((imgObj) => imgObj.name).includes(imgObj.Key));
    duplicateFileNameArray.length = 0;
    if(duplicates.length) {
        Object.assign(duplicateFileNameArray, duplicates);
    };
    return duplicates.length;
};

let canUploadImage = computed(() => {
    if(!adminStore.uploadedImageArray.length || hasDuplicateFileName()) {return false};
    return true;
});

watchEffect(() => {
    hasDuplicateFileName(adminStore.uploadedImageArray);
});



async function handleImageUpload() {
    Promise.all(
        adminStore.uploadedImageArray
        .map(
            (image) =>
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
            console.log(response)
        })
        
    });
    
    
};

</script>



<style lang="scss" scoped>



</style>
    