import dotenv from "dotenv";
import { testDynamicColumnNames } from '~~/services/dbManager';
dotenv.config();


export default defineEventHandler (async event => {
    
	const body = await useBody(event);
	
	// Collect Boolean for every item updated - if any updates fail, send error message to user.
	// TODO: There is a better way to find out if all DB updates were successfull and collect more data about any errors - find and use it
	let inserted  = [];
	for(const columnObj of body.productData) {
		inserted.push( await testDynamicColumnNames( Object.keys(columnObj).flat(), Object.values(columnObj) ) );
	};
	return inserted.includes(false) ?
		{status: '500', error: 'Unknown error updating product details. Please refresh page and try again.'} :
		{status: '200'};
	
}); 
