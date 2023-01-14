import { localStorageAvailable, getItemFromLs } from './lsManager';
import { defineStore } from 'pinia';
// import dotenv from "dotenv";
// dotenv.config();

export const useShoppingCartStore = defineStore('shoppingCartStore', {

    state: () => ({
        itemCountInShoppingCart: 0
    }),
    actions: {

        addItemToShoppingCart(itemToPutInCart, quantitySelected) {
        
            if(!localStorageAvailable()) { return };
            
            this.itemCountInShoppingCart += quantitySelected;

            let shoppingCart = getItemFromLs('RVSshoppingCart');
            
            // No shopping cart in LS, create one
            if(!shoppingCart) {
                localStorage.setItem('RVSshoppingCart', JSON.stringify([
                    {
                        id: itemToPutInCart.id,
                        name: itemToPutInCart.name,
                        price_in_cents: itemToPutInCart.price_in_cents,
                        quantity: quantitySelected
                    }
                ]));
                return;
            };
            
            // Shopping cart already exists in LS

            // Check to see if item already exists in shopping cart
            let itemIndex = shoppingCart.findIndex(item => item.id == itemToPutInCart.id);
        
            // Item not yet in cart so add
            if(itemIndex == -1) {
                shoppingCart.push({
                    id: itemToPutInCart.id,
                    name: itemToPutInCart.name,
                    price_in_cents: itemToPutInCart.price_in_cents,
                    quantity: quantitySelected
                })
                // Set the item back into LS with the updated quantity
                localStorage.setItem('RVSshoppingCart', JSON.stringify(shoppingCart));
                return;
            };
            

            // Item already in cart so increase quantity
            shoppingCart[itemIndex].quantity += quantitySelected;
            localStorage.setItem('RVSshoppingCart', JSON.stringify(shoppingCart));
        },
        increaseProductQuantityInShoppingCart(product) {
        
            if(!localStorageAvailable()) { return };
            let shoppingCart = getItemFromLs('RVSshoppingCart');
            if(!shoppingCart) { return };

            this.itemCountInShoppingCart++;
            
            // Locate item in shopping cart and increase quantity
            let productIndexLs = shoppingCart.findIndex(productLs => productLs.id == product.id);
            shoppingCart[productIndexLs].quantity++;
        
            // Set back into LS
            localStorage.setItem('RVSshoppingCart', JSON.stringify(shoppingCart));
        },
        reduceQuatityFromShoppingCart(productToReduceInCart) {
            
            if(!localStorageAvailable()) { return };
            let shoppingCart = getItemFromLs('RVSshoppingCart');
            if(!shoppingCart) { return };
            
            
            // Locate item in shopping cart
            let shoppingCartProductIndex = shoppingCart.findIndex(product => product.id == productToReduceInCart.id)
            if(shoppingCartProductIndex == -1) { return };
        
            // Set item's new quantity
            // TODO: Could I just decrement here?
            shoppingCart[shoppingCartProductIndex].quantity = this.itemCountInShoppingCart =
                productToReduceInCart.quantity;

            // Set back into LS
            localStorage.setItem('RVSshoppingCart', JSON.stringify(shoppingCart));
        },
        removeProductFromShoppingCart(productId) {
            
            if(!localStorageAvailable()) { return };
            let shoppingCart = getItemFromLs('RVSshoppingCart');
            if(!shoppingCart) { return };
        
            // Locate item in shopping cart
            let shoppingCartProductIndex = shoppingCart.findIndex(product => product.id == productId)
            if(shoppingCartProductIndex == -1) { return };
        
            // Remove item from shopping cart
            this.itemCountInShoppingCart  -= shoppingCart[shoppingCartProductIndex].quantity;
            shoppingCart.splice(shoppingCartProductIndex, 1);
        
            // Set back into LS
            localStorage.setItem('RVSshoppingCart', JSON.stringify(shoppingCart));
        },
        calculateTotalItemCountInShoppingCart() {

            // If LS not available
            if(!localStorageAvailable()) { return 0 };

            let shoppingCart = getItemFromLs('RVSshoppingCart');
            
            // If no cart
            if(!shoppingCart) { return 0 };
        
            // Sum total items in cart and update State
            this.itemCountInShoppingCart  = shoppingCart.reduce((accumulator, obj) => {
                return accumulator + obj.quantity
            }, 0)
        }
    },
});

export const useProductStore = defineStore('productStore', {
    state: () => ({
        allProducts: []
    }),
    actions: {
        async getAllProducts() {
			this.allProducts.length = 0;
            let productsDbData = await $fetch(`/api/get-products`);
            productsDbData.forEach((product) => this.allProducts.push(product));
        }
    }
});

export const useOrderStore = defineStore('orderStore', {
    state: () => ({
        userShippingData: {
            addressField1: '',
            addressField2: '',
            cityField: '',
            regionField: '',
            postalField: '',
            countryField: '',
            additionalNote: ''
        },
        currentCheckoutStep: 1,
        // This data is gotten when the user is at OrderSummary.vue. The items in the shopping cart are compared to the items from a DB call. This is to ensure the price was not tampered with in LS
        userProductsToShip: [],
        subTotal: 0
    })
});

export const useUiStore = defineStore('uiStore', {
    state: () => ({
        showFire: false,
        colorTheme: '',
        // Know when 3rd pary scripts have been loaded. I'm having an issue where they are loaded multiple times. I've tried to put them in nuxt.config, but they are still loaded multiple times. So this Boolean will let me know whether to load them or not.
        thirdPartyScriptsLoaded: false
    })
});

export const useToastStore = defineStore('toastStore', {

    
});

export const useAdminStore = defineStore('adminStore', {
    state: () => ({
        // Add product
        productToAdd: {
            name: null,
            price_in_cents: null,
            quantity: null,
            short_description: null,
            description: null,
            main_image_name: null,
            image_names: [], // Array of Strings
            specifications: [], // Array of Objects
            visible: true,
            category: null, // not in use

        },
        showAddProductComponent: false,
        // Edit product
        showConfirmEditModal: false,
        confirmEditModalMessage: '',
        // This will end up getting Object.assign(productToEdit, user selected ProductToEdit)
        productToEdit: {},
        showEditProductComponent: false,
        showCancelEditModal: false,
        // Images
        allImageBucketData: [], // Holds all image data from the DB {}
        uploadedImageArray: [],
        imageSelection: [],// Holds image name(s) when checkbox is checked
        viewedImage: {}, // This is assigned when an image is clicked

        // For both product edit and product add
        productImagesToAdd: [], // Uses as a v-model for multi-select images
        productMainImage: {}, // Holds the image object when admin select the main image for a product
        addImageToProductObj: {
            showModal: false,
            addMainImage: false // main image || product images. When adding a main image to a product, user can only select 1 image. When adding to product images multiple images can be selected.
        },
        // Handles all 'views' and sidebar items
        sidebarShown: false,
        activeRouteName: 'home',
        sidebarItems: [
            {
                name: 'home',
                displayName: 'Home',
                icon: 'home'
            },
            {
                name: 'sales',
                displayName: 'Sales',
                icon: 'paid'
            },
            {
                name: 'products',
                displayName: 'Products',
                icon: 'inventory_2',
                children: [
                    {
                        name: 'productsManage',
                        displayName: 'Manage',
                        icon: 'note_alt'
                    },
                    {
                        name: 'productsAdd',
                        displayName: 'Add',
                        icon: 'add_circle'
                    },
                    {
                        name: 'images',
                        displayName: 'Images',
                        icon: 'image'
                    },
                ],
            }
        ]
    }),
    getters: {
			// Create an Array of objects
			imageListObjArry: (state) => {
				const adminStore = useAdminStore()
				let imageObjArray = [];
				if(state.allImageBucketData.length) {
					state.allImageBucketData.forEach((img) => {
						imageObjArray.push(
							{
                                key: img.Key, // file name: some-img.jpg
                                lastModified: new Date(img.LastModified).toLocaleString(), 
                                displayed: adminStore.getAllImagesDisplayedForProduct(img) // Products that use this image
							}
						);
					})
				};
				return imageObjArray;
			}
    },
    actions: {
        // Sidebar actions
        isRouteActive(route) {
            return this.activeRouteName === route.name
        },
        setRouteActive(route) {
            if (route.children) { return }
            this.activeRouteName = route.name
        },
        // *************************
        // Edit product
        // *************************
        // When the edit product icon is clicked. Show popup modal and display confirm edit message.
        initiateConfirmProductEdit(productId, allProducts) {
            this.showConfirmEditModal = !this.showConfirmEditModal;
            let selectedProductIndex = allProducts.findIndex(product => product.id == productId);
            let selectedProduct = allProducts[selectedProductIndex];
            this.confirmEditModalMessage =
                `Are you sure you want to edit ${selectedProduct.name} ?`
        },
        // When the 'ok' is clicked to confirm the user wants to edit the product. Will assign the product the edit to a var and show the edit Component.
        handleGotoEditProductView(productId, allProducts) {
            let selectedProductIndex = allProducts.findIndex(product => product.id == productId);
            
			// Object.assign only does a shallow copy of the keys and values, meaning if one of the values in the object is another object or an array, then it is the same reference as was on the original object.
            // Object.assign is important here, so the original values are not changed during the editing process. Only replaced by this.productToEdit after the user saves.
			// Work-a-round - JSON.parse(JSON.stringify(Object with nested Array / Objects))
            Object.assign(this.productToEdit, JSON.parse(JSON.stringify(allProducts[selectedProductIndex])));
            this.showEditProductComponent = true;
        },
        getAllImagesDisplayedForProduct(imgObj) {
            const productStore = useProductStore();
            let productNames = [];

            if(productStore.allProducts.length) {

                productStore.allProducts.forEach((productObj) => {

                    // Make sure there are images associated with the product
                    if(productObj.image_names.length) {

                        productObj.image_names.forEach((imageName) => {
                            if(imageName == imgObj.Key && !productNames.includes(imageName)) {
                                    productNames.push(productObj.name)
                            }
                        });

                    };
    
                });
                
            };
            
            return productNames;
        },
        // If an image's checkbox is checked/unchecked this determines the div's background color
        imagePreviewBgColor(imageName) {
            return this.imageSelection.includes(imageName.Key) ?
                '#D3D3D3' :
                'transparent';
        },
        // Function handles API call to Amazon s3 to get all images.
        // getAllImagesFromS3() => backend => s3 API call => backend image data => response
        async getAllImagesFromS3() {
            let response = await $fetch(`/api/admin/image/get-all`, {

            });
            Object.assign(this.allImageBucketData, response.imageData);
        },
        // Admin adds images. Used in component AddImageToProductModal.vue
        mainImageBGcolor(mainImageObjForProduct, imageFileName) {
            
            return !mainImageObjForProduct.Key || mainImageObjForProduct.Key != imageFileName ?
                'transparent' :
                'red';
        }
    }
});

function createImageUrlFromString(fileName) {
    const config = useRuntimeConfig();
    return config.public.AWS_S3_BUCKET_BASE_URL + fileName;
};

function createImageUrlsFromArray(fileNameArray) {
    if(!fileNameArray || !fileNameArray.length) { return [] };
    const config = useRuntimeConfig();
    return fileNameArray.map((fileName) => {return config.public.AWS_S3_BUCKET_BASE_URL + fileName});
};

export { createImageUrlFromString, createImageUrlsFromArray };
