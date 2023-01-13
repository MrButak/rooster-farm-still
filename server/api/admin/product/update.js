import dotenv from "dotenv";
import { updateProductDetails } from '~~/services/dbManager';
import { validateProductDetails } from '~~/services/validationManager';
dotenv.config();

export default defineEventHandler (async event => {
    
	const body = await useBody(event);
	
    // Check if the new Product details (form fields) are valid
    let validateFormFieldArray = validateProductDetails(body.productData);
    // Create an Array of Booleans that tell if a field was valid, all must be valid to continue
    if(
        !validateFormFieldArray.map((obj) => {
            for(const key in obj) {
                return obj[key]
            }
        }).every((bool) => bool)
    ) { return {status:'400', error: 'Invalid input'} }; // TODO: Show user error details

    // Iterate through Object's properties, updating the values in the DB
    // TODO: Currently these are updated in the DB one item at a time. Is there a way to do it in one go?
    try {
        for(const key in body.productData) {
            let columnName = key;
            let columnValue = body.productData[key];
            await updateProductDetails(columnName, columnValue, body.productId)
	    };
    }
    catch(err) {
        console.log(err)
        return{status:'500', error: 'An unknown error occurred when updating this product\'s details.'}
    };
	return{status: '200', message: 'Product was successfully updated'};
}); 
