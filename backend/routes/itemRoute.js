const express = require('express');
const router = express.Router();
const items = require('../models/items')


router.post('/elements',async(req,res)=>{
    const {item_name,item_price} = req.body;
    try{
        const data = await items.insertItems(item_name,item_price);
        return res.status(201).json({message: "successfully created",data});
    }catch(err){
        console.error(err);
        res.status(500).send("internal server error");
    }
})

router.get('/products',async(req,res)=>{
    try{
        const data = await items.getItems();
        return res.status(200).json(data);
    }catch(err){
        console.error(err);
        res.status(500).send("internal server error");
    }
})

router.post('/cart',async(req,res)=>{
    const {product_id,item_qty} = req.body;
    try{
        const data = await items.createCart(product_id,item_qty);
        return res.status(201).json({message: "successfully created"});
    }catch(err){
        console.error(err);
        res.status(500).send("internal server error");
    }
})

router.get('/cart',async(req,res)=>{
    try{
        const data = await items.getCart();
        return res.status(200).json(data);
    }catch(err){
        console.error(err);
        res.status(500).send("internal server error");
    }
})

router.delete('/cart/:product_id',async(req,res)=>{
    try{
        const itemId = req.params.product_id;
        const data = await items.removeCartItem(itemId);
        return res.status(200).json({message: `${itemId} item removed successfully`});
    }catch(err){
        console.error(err);
        res.status(500).send("internal server error");
    }
})


router.post('/checkout',async(req,res)=>{
    try{
        const {user_name,user_email} = req.body;
        const data = await items.checkout(user_name,user_email);
        return res.status(200).json({message: "user bought product",data});

    }catch(err){
        console.error(err);
        res.status(500).send("internal server error");
    }
})

module.exports = router;