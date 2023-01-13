import dotenv from "dotenv";
import { createNewProduct } from '~~/services/dbManager';
import { validateProductDetails } from '~~/services/validationManager';
dotenv.config();


export default defineEventHandler (async event => {
    
	const body = await useBody(event);
    console.log(body.newProductData)
    // Check if the new Product details (form fields) are valid
    let validateFormFieldArray = validateProductDetails(body.newProductData);
    // Create an Array of Booleans that tell if a field was valid, all must be valid to continue
    if(
        !validateFormFieldArray.map((obj) => {
            for(const key in obj) {
                return obj[key]
            }
        }).every((bool) => bool)
    ) { return {status:'400', error: 'Invalid input'} };
    
    let insertSuccess = await createNewProduct(body.newProductData);
    return insertSuccess ?
        {status: '200'} : {status: '500', error: 'Unknown error when adding new product'}
}); 
