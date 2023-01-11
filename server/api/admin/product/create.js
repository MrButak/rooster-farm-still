import dotenv from "dotenv";
import { updateProductDetails } from '~~/services/dbManager';
dotenv.config();


export default defineEventHandler (async event => {
    
	const body = await useBody(event);
	
	console.log(body.newProductData);
    // try {
    //     for(const columnObj of body.productData) {
    //         let column = Object.keys(columnObj)[0];
    //         let value = Object.values(columnObj)[0]
    //         await updateProductDetails(column, value, body.productId)
	//     };
    // }
    // catch(err) {
    //     console.log(err)
    //     return{status:'500', error: 'An unknown error occurred when updating this product\'s details.'}
    // };
	return{status: '200'};
}); 
