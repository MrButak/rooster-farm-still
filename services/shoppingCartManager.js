import { localStorageAvailable, getItemFromLs } from './lsManager';



function addItemToShoppingCart(itemToPutInCart, quantitySelected) {

    if(!localStorageAvailable()) { return };

    // Reduce item quantity
    itemToPutInCart.quantity -= quantitySelected;

    // Assign a new object for the product (so the original values will not be changed)
    let product = {}
    Object.assign(product, itemToPutInCart);

    let shoppingCart = getItemFromLs('RSVshoppingCart');
    
    // No shopping cart yet
    if(!shoppingCart) {
        product.quantity = quantitySelected;
        localStorage.setItem('RSVshoppingCart', JSON.stringify([product]));
        return;
    };

    // Shopping cart exists

    // Check to see if item already exists in shopping cart
    let itemIndex = shoppingCart.findIndex(item => item.id == itemToPutInCart.id);

    // Item not yet in cart
    if(itemIndex == -1) {
        shoppingCart.push(product)
        localStorage.setItem('RSVshoppingCart', JSON.stringify(shoppingCart));
        return;
    };
    // Item already in cart
    shoppingCart[itemIndex].quantity += quantitySelected;
    localStorage.setItem('RSVshoppingCart', JSON.stringify(shoppingCart));
};

export { addItemToShoppingCart }