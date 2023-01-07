import pgPackage from 'pg';
const { Pool } = pgPackage;
import dotenv from "dotenv";
dotenv.config();

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

// Function will delete an image after deleted from AWS s3
async function deleteImage(imageName) { // dbValues: String
	let dbStmt = 'DELETE FROM images WHERE file_name = ($1)';
	try {
		await pool.query(dbStmt, [imageName]);
	}
	catch(err) {
		console.log(err);
	};
};

// Function will delete an image from all products, called after successful deletion from AWS s3
async function deleteImagesFromProducts(imageName) {

};

async function addMainImageToProduct(imageFileName) {

	let dbStmt = ''
	try {
		let query = await pool.query(dbStmt, [imageFileName]);
		console.log(query)
		return true;
	}
	catch(err) {
		console.log(err);
		return false;
	}
};
export { getAllProducts, selectProductData, storePurchase, updateProductQuantity, 
    storeStripeChargeId, insertImageNames, deleteImage, deleteImagesFromProducts
}
