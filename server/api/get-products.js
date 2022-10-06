import { dbCall } from '../../services/dbManager';

export default defineEventHandler(async event => {

    
   let productsData = await dbCall()
   return productsData;
})