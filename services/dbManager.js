import pgPackage from 'pg';
const { Pool } = pgPackage;
import dotenv from "dotenv";
dotenv.config();

let pool = new Pool({});

if(process.env.APP_ENVIRONMENT == 'development') {
    pool = new Pool({
        connectionString: process.env.HEROKU_POSTGRESQL_GOLD_URL,
        ssl: false
    });
};
if(process.env.APP_ENVIRONMENT == 'production') {

    pool = new Pool({
        connectionString: process.env.HEROKU_POSTGRESQL_GOLD_URL,
        ssl: {
                required: true,
                rejectUnauthorized: false
            }
    });
};

async function dbCall() {
    
    let dbStmt = `SELECT * FROM products`;
    try {
        let res = await pool.query(dbStmt);
	    return res.rows;
    }
    catch(err) {
        console.log(err);
    };
};

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

export { dbCall, selectProductData, storePurchase, updateProductQuantity, storeStripeChargeId }
