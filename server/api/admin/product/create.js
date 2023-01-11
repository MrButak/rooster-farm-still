import dotenv from "dotenv";
import { createNewProduct } from '~~/services/dbManager';
dotenv.config();


export default defineEventHandler (async event => {
    
	const body = await useBody(event);
	
	console.log(body.newProductData);

    let insertSuccess = await createNewProduct(body.newProductData);
    console.log(insertSuccess)
    
	return{status: '200'};
}); 
