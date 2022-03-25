// For connecting to the pgdb

console.log("TRYING TO RUN"); // fixme remove
// todo follow https://www.thisdot.co/blog/connecting-to-postgresql-with-node-js

import { Pool, Client } from "pg";

// const credentials = {
//     user: process.env.PGUSER,
//     host: process.env.PGHOST,
//     database: process.env.PGDATABASE,
//     password: process.env.PGPASSWORD,
//     port: 5432,
// };

// Connect with a connection pool.
async function poolDemo() {
    const pool = new Pool(credentials);
    const now = await pool.query("SELECT NOW()");
    await pool.end();
  
    return now;
  }
  
  // Connect with a client.
  async function clientDemo() {
    const client = new Client(credentials);
    await client.connect();
    const now = await client.query("SELECT NOW()");
    await client.end();
  
    return now;
  }

(async () => {
    // Connect to PostgreSQL
    try {
        const poolResult = await poolDemo();
        console.log("Time with pool: " + poolResult.rows[0]["now"]);

        const clientResult = await clientDemo();
        console.log("Time with client: " + clientResult.rows[0]["now"]);
        // await sequelizeInstance.sync();
        console.log("Connection to postgres complete!\n");
    } catch (e) {
        console.log(e);
        console.log("ERROR: unable to connect to db!");
        process.exit();
    }

    // // fixme testing
    // DiningHalls.findAll()
    //     .then(x => {
    //         console.log(x);
    //         // toTable(x);
    //     }).catch(e => {
    //         console.log('Oops! something went wrong, : ', e);
    //     });
})();