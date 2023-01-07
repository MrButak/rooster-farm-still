import { getAllProducts } from '../../services/dbManager.js';

export default defineEventHandler(async event => {

   let productsData = await getAllProducts()
   return productsData;
});








