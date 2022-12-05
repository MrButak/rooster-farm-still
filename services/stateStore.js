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
                        price: itemToPutInCart.price,
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
                    price: itemToPutInCart.price,
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
    })
    
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
        // This will end up getting Object.assign(productToEdit, selectedProductToEdit)
        productToEdit: {},
        showEditProductComponent: false,
        showCancelEditModal: false,

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
            console.log(selectedProduct);
        },
        // When the 'ok' is clicked to confirm the user wants to edit the product. Will assign the product the edit to a var and show the edit Component.
        handleGotoEditProductView(productId, allProducts) {
            let selectedProductIndex = allProducts.findIndex(product => product.id == productId);
            let selectedProduct = allProducts[selectedProductIndex];
            // Object.assign is important here, so the original values are not changed during the editing process. Only replaced by this.productToEdit after the user saves.
            Object.assign(this.productToEdit, selectedProduct);
            this.showEditProductComponent = true;
        }
    }
});
