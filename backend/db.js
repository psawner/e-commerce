const sqlite3 = require('sqlite3');
const sqlite = require('sqlite')
let dbInstance = null;

async function intializeDb() {

    if (dbInstance) {
        return dbInstance;
    }

    try {
        const db = await sqlite.open({
            filename: "./ecommerce_data.db",
            driver: sqlite3.Database
        })

        dbInstance = db;

        console.log("databse is connected to sqlite");

        await db.run(`create table if not exists items(
        id integer primary key autoincrement,
        item_name varchar(50),
        item_price int,
        time timestamp default current_timestamp
        )`)

        await db.run(`create table if not exists users(
            user_id integer primary key autoincrement,
            user_name varchar(50),
            user_email varchar(50),
            time timestamp default current_timestamp
        )`)

        await db.run(`create table if not exists cart(
            product_id integer,
            item_qty integer,
            userid integer,
            foreign key(product_id) references items(id)
            on delete cascade
            on update cascade,
            foreign key(userid) references items(user_id)
            on delete cascade
            on update cascade
        )`)
        
        return db;
    } catch (err) {
        console.error("Database initialization failed:", err.message);
        process.exit(1);
    }
}

module.exports = intializeDb;