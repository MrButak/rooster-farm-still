// Function will validate all product fields. Return an Array of Objects [{field_name, Boolean},...]

// validateProductDetails({'name'::String: 'Product Name'::String,Array[{String:String}],Array[String, ...],Integer}, ...)
// Returns: [{field_name::String: was_valid?::Boolean}, ...]
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

    // Are all input fields valid?
    // return validField.every((bool) => bool);
    return validField
};

export { validateProductDetails };
