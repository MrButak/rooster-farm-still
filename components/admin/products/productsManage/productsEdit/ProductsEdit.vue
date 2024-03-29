<template>

<div class="d-flex">
    <h3 class="va-h3">Edit Product</h3>        
    <va-spacer class="spacer" />
    <va-icon
        @click="(adminStore.showCancelEditModal = !adminStore.showCancelEditModal)"
        class="mr-2"
        name="cancel"
        size="medium"
    />
</div>

<!-- Edit inputs: name, quantity, descriptions, price -->
<ProductsEditInputs />

<!-- Images: main image and a slider for the product's secondary images -->
<ProductsEditImages 
    :productPropObj="adminStore.productToEdit"
    :mainImageUrl="createImageUrlFromString(adminStore.productToEdit.main_image_name)"
    :imageUrls="createImageUrlsFromArray(adminStore.productToEdit.image_names)"
/>

<!-- Specifications: stored as JSON in the DB -->
<ProductsEditSpecs 
    :productPropObj="adminStore.productToEdit"
/>

<div class="flex justify-between gap-28 w-full">
    <va-button
        color="secondary"
        @click="(adminStore.showCancelEditModal = !adminStore.showCancelEditModal)"
        >
        Cancel
    </va-button>
    <va-button @click="handleSaveProductEdits()">Save</va-button>
</div>

<!-- Confirm cancel edit popup modal -->
<va-modal 
    v-model="adminStore.showCancelEditModal" 
    message="Are you sure you want to cancel? Any unsaved changes will be lost." 
    title="Overview" 
    @ok="adminStore.showEditProductComponent = false"
/>
<!-- TODO: Should .$reset store here too ^^^^ -->


<!-- Add image to product modal -->
<AddImageToProductModal 
    :productPropObj="adminStore.productToEdit"
    :handleAddProductImages="handleAddProductImages"
    :handleAddMainImageToProduct="handleAddMainImageToProduct"
/>

</template>



<script setup>

import { useAdminStore, useProductStore,
        createImageUrlFromString, createImageUrlsFromArray
} from '~~/services/stateStore';
import { validateProductDetails } from '~~/services/validationManager'
import ProductsEditSpecs from './ProductsEditSpecs.vue';
import ProductsEditInputs from './ProductsEditInputs.vue';
import ProductsEditImages from './ProductsEditImages.vue';
import AddImageToProductModal from './AddImageToProductModal.vue';
import Toast from '~~/components/global/Toast.vue';
const { init, close, closeAll } = useToast();
const adminStore = useAdminStore();
const productStore = useProductStore();

// *** Props ***
async function handleAddProductImages() {
	
	// Add unique images to State
	adminStore.productImagesToAdd.forEach((imageName) => {
		
		if(!adminStore.productToEdit.image_names.includes(imageName)) {
			adminStore.productToEdit.image_names.push(toRaw(imageName));
		};
	});
	
	// Reset Component State
	adminStore.productImagesToAdd.length = 0;
	// Close modal
	adminStore.addImageToProductObj.showModal = false;
}
async function handleAddMainImageToProduct() {
	
	// Only update State for the product being edited. The original products data will not be changed yet. Only when the admin saves.
	// If the image was being used for one of the product images, remove it (no duplicate images for a product)
	if(adminStore.productToEdit.image_names && adminStore.productToEdit.image_names.includes(adminStore.productMainImage.Key)) {
		adminStore.productToEdit.image_names.splice(adminStore.productToEdit.image_names.findIndex(imageName => imageName == adminStore.productMainImage.Key), 1)
	};
	adminStore.productToEdit.main_image_name = adminStore.productMainImage.Key;

	// Reset Component State
    Object.assign(adminStore.productMainImage, {})
	// Close modal
	adminStore.addImageToProductObj.showModal = false;
};


// Function will compare product details with the edited version.
// Returns: {field_name: updated_field_value, ...}. This is structured like the orginal product Object
function productChangesObj() {

    let updatedProductObj = {};
	let originalProduct = 
		productStore.allProducts[
			productStore.allProducts.findIndex(product => product.id == adminStore.productToEdit.id)
		];

	if(originalProduct.name != adminStore.productToEdit.name) {
        updatedProductObj.name = adminStore.productToEdit.name;
	};
	if(originalProduct.short_description != adminStore.productToEdit.short_description) {
        updatedProductObj.short_description = adminStore.productToEdit.short_description
	};
	if(originalProduct.description != adminStore.productToEdit.description) {
        updatedProductObj.description = adminStore.productToEdit.description
	};
	if(originalProduct.price_in_cents != adminStore.productToEdit.price_in_cents) {
        updatedProductObj.price_in_cents = adminStore.productToEdit.price_in_cents
	};
	if(originalProduct.quantity != adminStore.productToEdit.quantity) {
        updatedProductObj.quantity = adminStore.productToEdit.quantity
	};
	if(originalProduct.main_image_name != adminStore.productToEdit.main_image_name) {
        updatedProductObj.main_image_name = adminStore.productToEdit.main_image_name
	};
	
	if(originalProduct.category != adminStore.productToEdit.category) {
        updatedProductObj.category = adminStore.productToEdit.category
	};

	// String comparison on Arrays and Objects

    // TODO: Look into Object.is() for Object comparisons. Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	if(JSON.stringify(originalProduct.image_names) != JSON.stringify(adminStore.productToEdit.image_names)) {
        updatedProductObj.image_names = adminStore.productToEdit.image_names
	};
	if(JSON.stringify(originalProduct.specifications) != JSON.stringify(adminStore.productToEdit.specifications)) {
        updatedProductObj.specifications = adminStore.productToEdit.specifications
	};
    return updatedProductObj;
};

async function handleSaveProductEdits() {
	  
    let updatedProductDetails = productChangesObj();
    // No changes
    if(!Object.keys(updatedProductDetails).length) { return };

    // Check if the new Product details (form fields) are valid
    // [{field_name: field_valid?::Boolean},...]
    let validateFormFieldArray = validateProductDetails(updatedProductDetails);
    // Create an Array of Booleans that tell if a field was valid, all must be valid to continue
    if(
        !validateFormFieldArray.map((obj) => {
            for(const key in obj) {
                return obj[key]
            }
        }).every((bool) => bool)
    ) { return }; // TODO: Show user error details
    
    // Update product in the DB
	let response = await $fetch(`/api/admin/product/update`, {
		method: 'POST',
		body: JSON.stringify({
			productData: updatedProductDetails,
            productId: adminStore.productToEdit.id
		})
	});

    switch(response.status) {
        case '200':
            // Vuestic toast. Rendered from Component
            init({color: 'success', duration: 2000, render: () => h(Toast, 
                {
                    tPropMessage: 'Product updated',
                    tPropIconName: 'check_circle',
                    tPropIconColor: '#000000'
                })
            });
            // Clear out product to edit
            adminStore.productToEdit = {};
            // Close edit product modal
            adminStore.showEditProductComponent = false;
            // Update products with backend call. Another option would be to replace the Array item in productStore.allProducts to the edited one
            await productStore.getAllProducts();
            break;
        default:
            init({color: 'danger', duration: 2000, render: () => h(Toast, 
                {
                    tPropMessage: 'Error updating product',
                    tPropIconName: 'error',
                    tPropIconColor: '#000000'
                })
            });
            // console.log(response.status, response.error)
            break;
    };
};

</script>
