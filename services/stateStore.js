import { localStorageAvailable, getItemFromLs } from './lsManager';
import { defineStore } from 'pinia';

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
        },
				// Function is called after: user adds a main image to a product, image name is inserted in the DB products.image_names[0] row
				addMainImageToProduct(imageFileName, productId) {
					this.allProducts[this.allProducts.findIndex(product => product.id == productId)].image_names.unshift(imageFileName);
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

export const useAdminStore = defineStore('adminStore', {
    state: () => ({
        
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
				addImageToProductObj: { // Admin adds an image to a product
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
            let selectedProduct = allProducts[selectedProductIndex];
            // Object.assign is important here, so the original values are not changed during the editing process. Only replaced by this.productToEdit after the user saves.
            Object.assign(this.productToEdit, selectedProduct);
						// Issue: if the product has no images, main_image_name"" and image_names[] will be null, causing errors with later operations
						if(!this.productToEdit.image_names) {
							this.productToEdit.image_names = [];
						}
						
            this.showEditProductComponent = true;
        },
        getAllImagesDisplayedForProduct(imgObj) {
					const productStore = useProductStore();
					let productNames = [];

					if(productStore.allProducts.length) {

						productStore.allProducts.forEach((productObj) => {

							// Make sure there are images associated with the product
							if(productObj.image_names) {

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
        async handleDeleteImages() {
            // If no items to delete, return
            if(!this.imageSelection.length) { return };
            
            // Create an Array of Objects to send to the backend
            let deleteParams = [];
            this.imageSelection.forEach((imageName) => {
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
                            this.allImageBucketData.splice(this.allImageBucketData.findIndex(img => img.Key == imgObj.Key), 1);
                        });
                        this.imageSelection.length = 0;
                        break;
                    case '500':
                        // Error(s)
                        console.log(response.data);
                }
            })
        }
    }
});
