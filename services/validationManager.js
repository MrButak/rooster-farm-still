// Function will validate all product fields.
// validateProductDetails( 
//     {
//         String: String,
//         String: Array[{String: String}, ...],
//         String: Array[String, ...],
//         String: Boolean
//     }    
// )
// Returns: Array of Objects [{String, Boolean},...]
// Examples:
// >
// validateProductDetails( 
//     {
//         'name': 'Shiny New Thing',
//         'quantity': 10,
//         'specifications': [{'color': 'red'}, {'height': '2 inches'}],
//         'image_names': ['image-1.jpg', 'image-2.jpg']
//         'price_in_cents': 3.55
//     }    
// )
//
// > [{'name': true}, {'quantity': true}, {'specifications': true}, {'image_names': true}, {'price_in_cents': false}]


function validateProductDetails (productObject) {
    let validField = []; // Array of Booleans
    // Iterate over all properties in the Object, validating each
    for(const key of Object.keys(productObject)) {
        switch(key) {
            case 'short_description':
                validField.push(
                    {[key]: productObject[key].length && productObject[key].length < 3000}
                );
                break;
            case 'description':
                validField.push(
                    {[key]: productObject[key].length && productObject[key].length < 10000}
                );
                break;
            case 'name':
                validField.push(
                    {[key]:productObject[key].trim().length > 0 && !(/[^\w\(A-Za-z0-9)/ \-_?!@#$%^&*(){}+/\\<>,.|[\]]/g).test(productObject[key])}
                );
                break;
            case 'price_in_cents':
            case 'quantity':
            case 'id':
                // Whole numbers only and not empty == true
                validField.push(
                    {[key]: productObject[key] && (/^[0-9]*$/).test(productObject[key])}
                );
                break;
            case 'specifications':
                if(!productObject[key].length) { break };
                // Check for valid Objects
                // TODO: Make sure Objects are not nested. Valid: {key: value}, Invalid: { key: value:{prop1key: prop1value} }
                let validSpecObject = [];
                productObject[key].forEach((key) => {
                    validSpecObject.push(key && typeof(key) === 'object' && key.constructor === Object);
                });
                validField.push(
                   {[key]: validSpecObject.every((bool) => bool)}
                );
                break;
            case 'category':
            case 'added_on_timestamp':
            case 'visible':
            case 'main_image_name':
            case 'image_names':
                validField.push(
                    { [key]: true }
                    );
                break;
            default:
                console.log('Unhandled Object.property. Edit product.', {key})
                validField.push({[key]: false});
        };
    };

    return validField;
};


let emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
// US and Canada
let postalCodeRegex = /(^\d{5}([ \-]\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}[ \-]\d{1}[A-Z]{1}\d{1}$)/gm


export { validateProductDetails, emailRegex, postalCodeRegex };
