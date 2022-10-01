import pgPackage from 'pg';
const { Pool } = pgPackage;

const config = useRuntimeConfig();
// let pool = new Pool({});

// if(config.DEV_ENVIRONMENT == 'development') {
    let pool = new Pool({
        connectionString: config.DB_URL,
        ssl: false
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
