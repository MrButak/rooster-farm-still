import { getAllProducts } from '../../services/dbManager.js';

export default defineEventHandler(async event => {

	let productsData = await getAllProducts();
	// If a column is empty value, the result will be undefined on the frontend, so this will prevent any undefined errors.
	productsData = productsData.map((product) => {
	if(!product.image_names) {product.image_names = []};
	if(!product.main_image_name) {product.main_image_name = ''};
	return product;
	});
	return productsData;
});








