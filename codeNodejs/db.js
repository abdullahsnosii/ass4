const mysql2 = require('mysql2/promise');
let db = mysql2.createPool({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "",
    database: "small retailstore",

    waitForConnections: true,
    connectionLimit: 4,
    queueLimit: 0
})

async function bootstrap(app , port =3000) {
    try {
        const [data, fields] = await db.query(`SELECT 1+1 AS RESULT`)
        console.log(`db connected`);
        app.listen(port, () => { console.log(`Server is running on port ${port}`); });

    } catch (error) {
        console.log(`fail to connect with dd`)
    }
}


module.exports ={db,bootstrap}

