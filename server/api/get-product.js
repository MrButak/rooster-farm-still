import { selectProductData } from '../../services/dbManager.js';

export default defineEventHandler(async event => {

    console.log(event.req)
    const query = getQuery(event);

   let productData = await selectProductData(query.name);
   console.log(productData)
   return productData;
});