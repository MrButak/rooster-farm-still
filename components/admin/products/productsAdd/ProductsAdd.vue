<template>

<span v-if="!adminStore.showAddProductComponent">
    <va-button
        @click="adminStore.showAddProductComponent = !adminStore.showAddProductComponent"
        >Add Product
    </va-button>
</span>

<span v-else>
<div class="d-flex">
    <h3 class="va-h3">Add Product</h3>        
    <va-spacer class="spacer" />
    <va-icon
        @click="showConfirmExitCreateProductModal = !showConfirmExitCreateProductModal"
        class="mr-2"
        name="cancel"
        size="medium"
    />
</div>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Product name</h5>   
</div>

<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToAdd.name"
        ref="nameInput"
        placeholder="product name"
        >
    </va-input>
</div>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Price in cents</h5>
</div>
<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToAdd.price_in_cents"
        ref="priceInput"
        placeholder="price in cents"
        >
    </va-input>
</div>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Quantity</h5>
</div>
<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToAdd.quantity"
        ref="quantityInput"
        placeholder="quantity"
        >
    </va-input>
</div>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Short description</h5>
</div>

<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToAdd.short_description"
        type="textarea"
        ref="shortDescriptionInput"
        :autosize="true"
        placeholder="product's short description: this text will appear on the product's main listing"
        >
    </va-input>
</div>

<div class="flex items-center gap-2.5 w-full">
    <h5 class="va-h5">Detailed description</h5>
</div>

<div class="flex w-[95%]">
    <va-input
        class="mb-4"
        v-model="adminStore.productToAdd.description"
        type="textarea"
        ref="longDescriptionInput"
        :autosize="true"
        placeholder="product's detailed description: this text will appear on the product's page"
        >
    </va-input>
</div>

<ProductsEditImages 
    :productPropObj="adminStore.productToAdd"
    :mainImageUrl="createImageUrlFromString(adminStore.productToAdd.main_image_name)"
    :imageUrls="createImageUrlsFromArray(adminStore.productToAdd.image_names)"
/>

<ProductsEditSpecs 
    :productPropObj="adminStore.productToAdd"
/>

<!-- Add image to product modal -->
<AddImageToProductModal
    :productPropObj="adminStore.productToEdit"
    :handleAddProductImages="handleAddProductImages"
    :handleAddMainImageToProduct="handleAddMainImageToProduct"
/>

<div class="flex justify-between gap-28 w-full">
    <va-button
        @click="showConfirmExitCreateProductModal = !showConfirmExitCreateProductModal"
        color="secondary"
    >
        Cancel
    </va-button>
    <va-button @click="handleCreateNewProduct()">Create Product</va-button>
</div>

<va-modal 
    v-model="showConfirmExitCreateProductModal" 
    message="Leave? Your new product is not saved. All progress will be lost." 
    title="Overview"
    @ok="handleCloseAddProductComponent()"
    />
</span>
</template>

<script setup>

import { useAdminStore,
        createImageUrlFromString, createImageUrlsFromArray 
} from '~~/services/stateStore';
import AddImageToProductModal from '~~/components/admin/products/productsManage/productsEdit/AddImageToProductModal.vue';
import ProductsEditImages from '~~/components/admin/products/productsManage/productsEdit/ProductsEditImages.vue';
import ProductsEditSpecs from '~~/components/admin/products/productsManage/productsEdit/ProductsEditSpecs.vue';
const adminStore = useAdminStore();

// Confirm exit modal
let showConfirmExitCreateProductModal = ref(false);

let nameInput = ref(null);
let priceInput = ref(null);
let quantityInput = ref(null);
let shortDescriptionInput = ref(null);
let longDescriptionInput = ref(null);

function handleCloseAddProductComponent() {
    // Clear State
    Object.assign(adminStore.productToAdd, {
        name: '',
        price_in_cents: null,
        quantity: null,
        short_description: '',
        description: '',
        main_image_name: '',
        image_names: [], // Array of Strings
        specifications: [], // Array of Objects
        visible: true,
        category: null, // not in use
    }); 
    // Close this Component
    adminStore.showAddProductComponent = !adminStore.showAddProductComponent
};

function handleAddProductImages() {
    // Add unique images to State
	adminStore.productImagesToAdd.forEach((imageName) => {
		
		if(!adminStore.productToAdd.image_names.includes(imageName)) {
			adminStore.productToAdd.image_names.push(toRaw(imageName));
		};
	});
	// Reset Component State
	adminStore.productImagesToAdd.length = 0;
	// Close modal
	adminStore.addImageToProductObj.showModal = false;
};
function handleAddMainImageToProduct() {

	// If the image was being used for one of the product images, remove it (no duplicate images for a product)
	if(adminStore.productToAdd.image_names && adminStore.productToAdd.image_names.includes(adminStore.productMainImage.Key)) {
		adminStore.productToAdd.image_names.splice(adminStore.productToAdd.image_names.findIndex(imageName => imageName == adminStore.productMainImage.Key), 1)
	};
	adminStore.productToAdd.main_image_name = adminStore.productMainImage.Key;

	// Reset Component State
    Object.assign(adminStore.productMainImage, {})
	// Close modal
	adminStore.addImageToProductObj.showModal = false;
};

async function handleCreateNewProduct() {
    
    // TODO: Validation

    let response = await $fetch(`/api/admin/product/create`, {
        method: 'POST',
        body: JSON.stringify({
            newProductData: adminStore.productToAdd
        })
    });

    switch(response.status) {
        case '200':
            console.log('success');
            handleCloseAddProductComponent();
            // TODO: Show success message
            break;
        default:
            console.log(response.status, response.error);
    };

    console.log(response)
};


</script>
