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

import ProductsEditSpecs from './ProductsEditSpecs.vue';
import ProductsEditInputs from './ProductsEditInputs.vue';
import ProductsEditImages from './ProductsEditImages.vue';
import AddImageToProductModal from './AddImageToProductModal.vue';
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


// Function will compare product details with the edited version and return an Array[{table_name: new_value(s)}]
function productChangesArray() {

	let updatedProductData = [];
	let originalProduct = 
		productStore.allProducts[
			productStore.allProducts.findIndex(product => product.id == adminStore.productToEdit.id)
		];

	if(originalProduct.name != adminStore.productToEdit.name) {
		updatedProductData.push({name: adminStore.productToEdit.name});
	};
	if(originalProduct.short_description != adminStore.productToEdit.short_description) {
		updatedProductData.push({short_description: adminStore.productToEdit.short_description});
	};
	if(originalProduct.description != adminStore.productToEdit.description) {
		updatedProductData.push({description: adminStore.productToEdit.description});
	};
	if(originalProduct.price_in_cents != adminStore.productToEdit.price_in_cents) {
		updatedProductData.push({price_in_cents: adminStore.productToEdit.price_in_cents});
	};
	if(originalProduct.quantity != adminStore.productToEdit.quantity) {
		updatedProductData.push({quantity: adminStore.productToEdit.quantity});
	};
	if(originalProduct.main_image_name != adminStore.productToEdit.main_image_name) {
		updatedProductData.push({main_image_name: adminStore.productToEdit.main_image_name});
	};
	
	if(originalProduct.category != adminStore.productToEdit.category) {
		updatedProductData.push({category: adminStore.productToEdit.category});
	};

	// String comparison on Arrays and Objects

    // TODO: Look into Object.is() for Object comparisons. Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	if(JSON.stringify(originalProduct.image_names) != JSON.stringify(adminStore.productToEdit.image_names)) {
		updatedProductData.push( {image_names: JSON.stringify(adminStore.productToEdit.image_names)} );
	};
	if(JSON.stringify(originalProduct.specifications) != JSON.stringify(adminStore.productToEdit.specifications)) {
		updatedProductData.push( {specifications: JSON.stringify(adminStore.productToEdit.specifications)} );
	};

	return updatedProductData;
}
// Function will validate all inputs from a product edit before sending to the backend
function formFieldsValid() {

    let validField = [];
    // Iterate over every product field
    for(const key of Object.keys(adminStore.productToEdit)) {
        switch(key) {
            case 'short_description':
                validField.push(
                    adminStore.productToEdit[key].length && adminStore.productToEdit[key].length < 3000
                );
                break;
            case 'description':
                validField.push(
                    adminStore.productToEdit[key].length && adminStore.productToEdit[key].length < 10000
                );
                break;
            case 'name':2
                validField.push(
                    adminStore.productToEdit[key].trim().length > 0 && !(/[^\w\(A-Za-z0-9)/ \-_?!@#$%^&*(){}+/\\<>,.|[\]]/g).test(adminStore.productToEdit[key])
                );
                break;
            case 'price_in_cents':
            case 'quantity':
            case 'id':
                // whole numbers only and not empty == true
                validField.push(
                    adminStore.productToEdit[key] && (/^[0-9]*$/).test(adminStore.productToEdit[key])
                );
                break;
            case 'specifications':
                if(!adminStore.productToEdit[key].length) { break };
                // TODO: Make sure Objects are not nested. Valid: {key: value}, Invalid: { key: value:{prop1key: prop1value} }
                // Check for valid Objects
                let validSpecObject = [];
                adminStore.productToEdit[key].forEach((key) => {
                    validSpecObject.push(key && typeof(key) === 'object' && key.constructor === Object);
                });
                validField.push(
                   validSpecObject.every((bool) => bool)
                );
                break;
            case 'category':
            case 'added_on_timestamp':
            case 'visible':
            case 'main_image_name':
            case 'image_names':
                validField.push(true);
                break;
            default:
                console.log('Unhandled Object.property. Edit product.', {key})
                validField.push(false);
        };
    };

    // Are all input fields valid?
    return validField.every((bool) => bool);
};

async function handleSaveProductEdits() {
	
    // Early return if nothing has changed
	if(!productChangesArray().length) { return };

    // TODO: Show user error details
    if(!formFieldsValid()) {return}

    // Update product in the DB
	let response = await $fetch(`/api/admin/product/update`, {
		method: 'POST',
		body: JSON.stringify({
			productData: productChangesArray(),
            productId: adminStore.productToEdit.id
		})
	});

    switch(response.status) {
        case '200':
            // Clear out product to edit
            adminStore.productToEdit = {};
            // Close edit product modal
            adminStore.showEditProductComponent = false;
            // Update products with backend call. Another option would be to replace the Array item in productStore.allProducts to the edited one
            await productStore.getAllProducts();
            // TODO: show success message
            console.log('Update product success')
            break
        default:
            console.log('Unknown error updating product', response.status, response.error)
            break;
    };
	
};


</script>
