import pgPackage from 'pg';

import { Sequelize, DataTypes,  Model } from 'sequelize';


const { Pool } = pgPackage;
import dotenv from "dotenv";
dotenv.config();


const sequelize = new Sequelize(process.env.DATABASE_URL);


class Images extends Model {}

Images.init({
  // Model attributes are defined here
id: {
type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
},
file_name: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
}
}, 
{
    timestamps: false,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'images' // We need to choose the model name
});


class Products extends Model {}

Products.init({
// Model attributes are defined here
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
},
name: {
    type: DataTypes.STRING
},
short_description: {
    type: DataTypes.TEXT
},
description: {
    type: DataTypes.TEXT
},
price_in_cents: {
    type: DataTypes.TEXT
},
    quantity: {
type: DataTypes.TEXT
},
main_image_name: {
    type: DataTypes.STRING
},
image_names: {
    type: DataTypes.ARRAY(DataTypes.STRING)
},
specifications: {
    type: DataTypes.JSON
},
category: {
    type: DataTypes.STRING
},
visible: {
    type: DataTypes.BOOLEAN
},
added_on_timestamp: {
    type: DataTypes.DATE
}

}, 
{
    timestamps: false,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'products' // We need to choose the model name
});


let pool = new Pool({});

if(process.env.APP_ENVIRONMENT == 'development') {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: false
    });
};
if(process.env.APP_ENVIRONMENT == 'production') {

    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            required: true,
            rejectUnauthorized: false
        }
    });
};

async function getAllProducts() {
    
    let dbStmt = `SELECT * FROM products`;
    try {
        let res = await pool.query(dbStmt);
	    return res.rows;
    }
    catch(err) {
        console.log(err);
    };
};

// Function will get one product from the DB
async function selectProductData(productName) {
    let dbStmt = `SELECT * FROM products WHERE name ilike ($1)`;
    let dbValues = [productName];
    try {
        let res = await pool.query(dbStmt, dbValues);
	    return res.rows[0];
    }
    catch(err) {
        console.log(err);
    };
};

// Function stores the purchases after a successful payment intent
async function storePurchase(dbValues) {

    let dbStmt = 'INSERT INTO purchases (order_id, product_id, quantity, purchaser_email, purchase_date, subtotal_in_cents, currency, provider, stripe_payment_intent_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
    
    try {
        await pool.query(dbStmt, dbValues);
    }
    catch(err) {
        console.log(err);
    };
};

// Function stores the Stripe ch_ after a successful charge
async function storeStripeChargeId(dbValues) {
    
    let dbStmt = 'UPDATE purchases SET stripe_charge_id = ($1) WHERE stripe_payment_intent_id = ($2)';
    try {
        await pool.query(dbStmt, dbValues);
    }
    catch(err) {
        console.log(err);
    };
};

async function updateProductQuantity(dbValues) {

    let dbStmt = 'UPDATE products SET quantity = quantity - ($1) WHERE id = ($2)';
    try {
        await pool.query(dbStmt, dbValues);
    }
    catch(err) {
        console.log(err);
    };
};

// Function is called after a successful image upload to AWS s3
async function insertImageNames(dbValues) { // dbValues: String
    let dbStmt = 'INSERT INTO images (file_name) VALUES ($1)';
    try {
        await pool.query(dbStmt, [dbValues]);
    }
    catch(err) {
        console.log(err);
    };
};

// Function will delete an image from images table after deleted from AWS s3
async function deleteImage(imageName) { // dbValues: String
	let dbStmt = 'DELETE FROM images WHERE file_name = ($1)';
	try {
		await pool.query(dbStmt, [imageName]);
	}
	catch(err) {
		console.log(err);
	};
};

// Function will delete an image name from all products.image_names Array, called after successful deletion from AWS s3
async function deleteImagesFromProducts(imageName) {
    console.log({imageName})
    // Remove image name from all Arrays 
    const query = `UPDATE "products" SET "image_names" = array_remove("image_names", :imageName)`;
    await sequelize.query(query, {
        replacements: { imageName },
        type: sequelize.QueryTypes.UPDATE
    });

    // Remove image name from products.main_image_name
    await Products.update({ main_image_name: null }, { where: { main_image_name: imageName } });
};

// ** in use?
async function addMainImageToProduct(imageFileName, productId) {
	
	let dbStmt = 'UPDATE products SET image_names = array_prepend(($1), image_names) WHERE id = ($2) Returning *';
	try {
		await pool.query(dbStmt, [imageFileName, productId]);
		return true;
	}
	catch(err) {
		console.log(err);
		return false;
	}
};

async function updateProductDetails(columnName, columnValue, productId) {

	let dbStmt = `UPDATE products SET ${columnName} = ($1) WHERE id = ${productId}`;
	try {
        console.log('success')
        console.log(columnName, columnValue)
		switch(columnName) {
			case 'image_names':
				await pool.query( dbStmt, [JSON.parse(columnValue)] );
				// console.log(q1.rows)
				break;
			default:
				// 'main_image_name', 'specifications', 'quantity', 'price_in_cents':
				await pool.query(dbStmt, [columnValue]);
				// console.log(q2.rows);
				
		};
		return true;
	}
	catch(err) {
		console.log(err);
		return false;
	};
};

async function createNewProduct(productObj) {

    const newProduct = await Products.create({
        name: productObj.name,
        short_description: productObj.short_description,
        description: productObj.description,
        price_in_cents: productObj.price_in_cents,
        quantity: productObj.quantity,
        main_image_name: productObj.main_image_name,
        image_names: productObj.image_names,
        specifications: productObj.specifications,
        // category: productObj.category,
        visible: productObj.visible,
        added_on_timestamp: new Date(Date.now())
    });

    return newProduct;

};

export { getAllProducts, selectProductData, storePurchase, updateProductQuantity, 
    storeStripeChargeId, insertImageNames, deleteImage, deleteImagesFromProducts,
		addMainImageToProduct,
		updateProductDetails, createNewProduct
}

