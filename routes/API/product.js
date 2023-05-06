var express = require('express');
var router = express.Router();
const productService = require('../../components/product/Controller');
const categoryService = require('../../components/category/Controller');

//PRODUCT METHOD
//http://localhost:3000/product

//http://localhost:3000/product/getAllProducts
router.get('/getAllProducts', async function (req, res, next) {
    try {
        const result = await productService.getAllProducts();
        if (result) {
            return res.status(200).json({ result: true, products: result });
        }else{
            return res.status(400).json({ result: false, products: null });
        }
    } catch (error) {
        return res.status(500).json({ result: false, user: null });
    }
});

//http://localhost:3000/product/getProductById
router.get('/getProductById/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const result = await productService.getProductById(id);
        if (result) {
            return res.status(200).json({ result: true, product: result });
        }else{
            return res.status(400).json({ result: false, product: null });
        }
    } catch (error) {
        return res.status(500).json({ result: false, product: null });
    }
});

//http://localhost:3000/product/addProduct
router.post('/addProduct', async function (req, res, next) {
    try {
        const { name,price,quantity,detail } = req.body;
        const result = await productService.addProduct(name,price,quantity,detail);
        if (result) {
            return res.status(200).json({ result: true, product: result });
        }else{
            return res.status(400).json({ result: false, product: null });
        }
    } catch (error) {
        return res.status(500).json({ result: false, product: null });
    }
});

//http://localhost:3000/product/addImage
router.post('/addImage', async function (req, res, next) {
    try {
        const { id,images } = req.body;
        const result = await productService.addImage(id,images);
        if (result) {
            return res.status(200).json({ result: true, product: result });
        }else{
            return res.status(400).json({ result: false, product: null });
        }
    } catch (error) {
        return res.status(500).json({ result: false, product: null });
    }
});

//http://localhost:3000/product/updateProduct
router.put('/updateProduct/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const { name,price,quantity,detail } = req.body;
        const result = await productService.updateProduct(id,name,price,quantity,detail);
        if (result) {
            return res.status(200).json({ result: true, product: result });
        }else{
            return res.status(400).json({ result: false, product: null });
        }
    } catch (error) {
        return res.status(500).json({ result: false, product: null });
    }
});

//http://localhost:3000/product/deleteProduct
router.delete('/deleteProduct/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const result = await productService.deleteProduct(id);
        if (result) {
            return res.status(200).json({ result: true, product: result });
        }else{
            return res.status(400).json({ result: false, product: null });
        }
    } catch (error) {
        return res.status(500).json({ result: false, product: null });
    }
});



module.exports = router;