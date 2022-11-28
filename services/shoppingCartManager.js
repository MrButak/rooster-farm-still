import { 
    useOrderStore,
    // shoppingCartCount 
} from './stateStore';
import { localStorageAvailable, getItemFromLs } from './lsManager';

function getTotalItemCountInShoppingCart() {
    const orderStore = useOrderStore();
    if(!localStorageAvailable()) { return };
    let shoppingCart = getItemFromLs('RVSshoppingCart');

    // If no cart return
    if(!shoppingCart) { return };

    // Sum total items in cart and update regionField
    orderStore.shoppingCartCount = shoppingCart.reduce((accumulator, obj) => {
        return accumulator + obj.quantity
    }, 0)
};

function addItemToShoppingCart(itemToPutInCart, quantitySelected) {

    if(!localStorageAvailable()) { return };

    let shoppingCart = getItemFromLs('RVSshoppingCart');
    
    // No shopping cart yet
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

    // Shopping cart exists

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
        localStorage.setItem('RVSshoppingCart', JSON.stringify(shoppingCart));
        return;
    };
    // Item already in cart so increase quantity
    shoppingCart[itemIndex].quantity += quantitySelected;
    localStorage.setItem('RVSshoppingCart', JSON.stringify(shoppingCart));
};

function reduceQuatityFromShoppingCart(productToReduceInCart) {

    let shoppingCart = getItemFromLs('RVSshoppingCart');
    if(!shoppingCart) { return };

    // Locate item in shopping cart
    let shoppingCartProductIndex = shoppingCart.findIndex(product => product.id == productToReduceInCart.id)
    if(shoppingCartProductIndex == -1) { return };

    // Set item's new quantity
    shoppingCart[shoppingCartProductIndex].quantity = productToReduceInCart.quantity;

    // Set back into LS
    localStorage.setItem('RVSshoppingCart', JSON.stringify(shoppingCart));
};

function removeProductFromShoppingCart(productId) {

    let shoppingCart = getItemFromLs('RVSshoppingCart');
    if(!shoppingCart) { return };

    // Locate item in shopping cart
    let shoppingCartProductIndex = shoppingCart.findIndex(product => product.id == productId)
    if(shoppingCartProductIndex == -1) { return };

    // Remove item from shopping cart
    shoppingCart.splice(shoppingCartProductIndex, 1);

    // Set back into LS
    localStorage.setItem('RVSshoppingCart', JSON.stringify(shoppingCart));
};

function increaseProductQuantityInShoppingCart(product) {

    if(!localStorageAvailable()) { return };

    let shoppingCart = getItemFromLs('RVSshoppingCart');
    if(!shoppingCart) { return };

    let productIndexLs = shoppingCart.findIndex(productLs => productLs.id == product.id);
    shoppingCart[productIndexLs].quantity++;

    // Set back into LS
    localStorage.setItem('RVSshoppingCart', JSON.stringify(shoppingCart));
};

export { addItemToShoppingCart, getTotalItemCountInShoppingCart, reduceQuatityFromShoppingCart, removeProductFromShoppingCart, increaseProductQuantityInShoppingCart }
