import { localStorageAvailable, getItemFromLs } from './lsManager';
import { defineStore } from 'pinia';

export const useShoppingCartStore = defineStore('shoppingCartStore', {

    state: () => ({

        shoppingCartCountState: 0
    }),
    actions: {

        addItemToShoppingCart(itemToPutInCart, quantitySelected) {
        
            if(!localStorageAvailable()) { return };
        
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
            shoppingCart[shoppingCartProductIndex].quantity = productToReduceInCart.quantity;
        
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
            shoppingCart.splice(shoppingCartProductIndex, 1);
        
            // Set back into LS
            localStorage.setItem('RVSshoppingCart', JSON.stringify(shoppingCart));
        },
    },
    getters: {

        getTotalItemCountInShoppingCart() {

            // If LS not available
            if(!localStorageAvailable()) { return };

            let shoppingCart = getItemFromLs('RVSshoppingCart');
        
            // If no cart
            if(!shoppingCart) { return };
        
            // Sum total items in cart and update State
            this.shoppingCartCountState = shoppingCart.reduce((accumulator, obj) => {
                return accumulator + obj.quantity
            }, 0)
        },
        shoppingCartCount() {
            return this.shoppingCartCountState;
        }
    }
})

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
        // ui helpers
        sidebarShown: false
    })
});
