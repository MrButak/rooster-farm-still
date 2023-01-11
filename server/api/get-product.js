import { selectProductData } from '../../services/dbManager.js';

export default defineEventHandler(async event => {

  const query = getQuery(event);
  let productData = await selectProductData(query.name);
	// If a column is empty value, the result will be undefined on the frontend, so this will prevent any undefined errors.
	if(!productData.image_names) {productData.image_names = []};
	if(!productData.main_image_name) {productData.main_image_name = ''};
  return productData;
});