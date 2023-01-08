import { addMainImageToProduct} from '../../../../../services/dbManager';
import dotenv from "dotenv";
dotenv.config();


export default defineEventHandler (async event => {
    
    const body = await useBody(event);
	
		// TODO: DB Call to prepend to Array products.image_names
		// Return success / failure
		let insertSuccess = await addMainImageToProduct(body.imageFileName, body.productId);
		return insertSuccess ? 
			{status: '200'} :
    	{status: '500', error: 'Error. Could not add main image to product.'};
}); 
