import { deleteImage } from '../../../../services/dbManager';
import dotenv from "dotenv";
dotenv.config();


export default defineEventHandler (async event => {
    
    const body = await useBody(event);

    
		return {status: '200', data: 'Ok, route working'}
    return {status: '500'};
}); 
