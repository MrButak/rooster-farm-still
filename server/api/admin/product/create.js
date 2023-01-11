import dotenv from "dotenv";
import { createNewProduct } from '~~/services/dbManager';
dotenv.config();


export default defineEventHandler (async event => {
    
	const body = await useBody(event);

    let insertSuccess = await createNewProduct(body.newProductData);
    console.log(insertSuccess)
    
	return{status: '200'};
}); 
