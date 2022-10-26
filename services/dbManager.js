import pgPackage from 'pg';
const { Pool } = pgPackage;
import dotenv from "dotenv";
dotenv.config();


let pool = new Pool({});

if(process.env.DEV_ENVIRONMENT == 'development') {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: false
    });
};
if(process.env.DEV_ENVIRONMENT == 'production') {

    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
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

function storePurchase(paymentIntent) {

};

function updateMenuItmQty(paymentIntent) {

};

export { dbCall, selectProductData }
