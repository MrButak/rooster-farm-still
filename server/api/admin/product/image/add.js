import { deleteImage } from '../../../../../services/dbManager';
import dotenv from "dotenv";
dotenv.config();


export default defineEventHandler (async event => {
    
    const body = await useBody(event);
    
		// TODO: DB Call to prepend to Array products.image_names
		// Return success / failure
		return {status: '200', data: body.imageFileName}
    return {status: '500'};
}); 
