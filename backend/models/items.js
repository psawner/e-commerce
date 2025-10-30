const getdb = require('../db');

async function insertItems(item_name,item_price){
    const db = await getdb();
    const sql = `insert into items (item_name,item_price) values (?,?)`;
    const result = await db.run(sql,[item_name,item_price]);
    return {id: result.lastID,item_name,item_price};
}

async function getItems(){
    const db = await getdb();
    const sql = `select id,item_name,item_price from items`;
    const result = await db.all(sql);
    return result;
}

async function createCart(product_id,item_qty){
    const db = await getdb();
    const sql = `insert into cart (product_id,item_qty) values (?,?)`;
    const result = await db.run(sql,[product_id,item_qty]);
    return {product_id,item_qty};
}

async function getCart(){
    const db = await getdb();
    const sql = `select cart.product_id,items.item_name,items.item_price,cart.item_qty
    from cart 
    join items on cart.product_id = items.id`;
    const sql1 = `select sum(items.item_price*cart.item_qty) as total_price from cart 
    join items on cart.product_id = items.id`;
    const result = await db.all(sql);
    const result1 = await db.all(sql1);
    return {result,result1};
}

async function removeCartItem(product_id){
    const db = await getdb();
    const sql = `delete from cart where product_id=?`;
    const result = await db.run(sql,[product_id]);
    return result;

}


async function checkout(user_name,user_email){
    const db = await getdb();
    const sql = `insert into users (user_name,user_email) values (?,?)`;
    const result = await db.run(sql,[user_name,user_email]);
    const userID = result.lastID;


    const updatesql = 'update cart set userid = ? where userid is null';
    const result1 = await db.run(updatesql,[userID]);

    const totalsql = `select sum(items.item_price*cart.item_qty) as total_price from cart
    join items on cart.product_id = items.id where userid = ?`;
    const result2 = await db.get(totalsql,[userID]);

    await db.run('delete from cart where userid = ?', [userID]);

    return {
        total: result2.total_price || 0,
        timestamp: new Date().toISOString()
    }
}


module.exports = {
    insertItems,
    getItems,
    createCart,
    getCart,
    removeCartItem,
    checkout
}