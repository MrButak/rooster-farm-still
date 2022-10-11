import { selectProductData } from '../../services/dbManager.js';

export default defineEventHandler(async event => {

    const query = getQuery(event);

   let productData = await selectProductData(query.name);
   return productData;
});