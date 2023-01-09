import dotenv from "dotenv";
import { testDynamicColumnNames } from '~~/services/dbManager';
dotenv.config();


export default defineEventHandler (async event => {
    
	const body = await useBody(event);

	
	// let productObjArray = body.productData;
	// let columnNames = productObjArray.map((product) => Object.keys(product)).flat();
	// let columnValues = productObjArray.map((product) => Object.values(product)).flat();
	for(const columnObj of body.productData) {
		await testDynamicColumnNames( Object.keys(columnObj).flat(), Object.values(columnObj).flat() )
	}
	
	

  return {status: '200'};
}); 
