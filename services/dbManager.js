import pgPackage from 'pg';
const { Pool } = pgPackage;
import dotenv from "dotenv";
dotenv.config();
const config = useRuntimeConfig();
// let pool = new Pool({});

// if(config.DEV_ENVIRONMENT == 'development') {
    let pool = new Pool({
        connectionString: 'postgres://yrkrpjoxpkchux:9c49f1cb41dd7fa15866697ec18d572eca940410f6db76c1e6b3848be83a0a24@ec2-34-200-35-222.compute-1.amazonaws.com:5432/deegcqc24qnodq',
        // ssl: false
        ssl: {
                required: true,
                rejectUnauthorized: false
            }
    });
// }
// else {
//     pool = new Pool({
//         connectionString: config.DB_URL,
//         ssl: {
//             required: true,
//             rejectUnauthorized: false
//         }
//     });
// }


async function dbCall() {
    
    let dbStmt = `SELECT * FROM products`;
    try {
        let res = await pool.query(dbStmt);
	    return res.rows[0];
    }
    catch(err) {
        console.log(err);
    };
};

export { dbCall }
