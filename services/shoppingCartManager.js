import { shoppingCartCount } from './stateStore';
import { localStorageAvailable, getItemFromLs } from './lsManager';

function getTotalItemsInShoppingCart() {

    if(!localStorageAvailable()) { return };
    let shoppingCart = getItemFromLs('RSVshoppingCart');

    // If no cart return
    if(!shoppingCart) { return };

    // Sum total items in cart and update State
    shoppingCartCount.value = shoppingCart.reduce((accumulator, obj) => {
        return accumulator + obj.quantity
    }, 0)
}

function addItemToShoppingCart(itemToPutInCart, quantitySelected) {

    if(!localStorageAvailable()) { return };

    let shoppingCart = getItemFromLs('RSVshoppingCart');
    
    // No shopping cart yet
    if(!shoppingCart) {
        localStorage.setItem('RSVshoppingCart', JSON.stringify([
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
        localStorage.setItem('RSVshoppingCart', JSON.stringify(shoppingCart));
        return;
    };
    // Item already in cart so increase quantity
    shoppingCart[itemIndex].quantity += quantitySelected;
    localStorage.setItem('RSVshoppingCart', JSON.stringify(shoppingCart));
};

export { addItemToShoppingCart, getTotalItemsInShoppingCart }