import { dbCall } from '../../services/dbManager.js';

export default defineEventHandler(async event => {

    
   let productsData = await dbCall()
   return productsData;
})