var express = require('express');
var router = express.Router();
const productController = require('../../components/product/Controller');
const categoryService = require('../../components/category/Controller');
const upload = require('../../components/middle/upload');

//PRODUCT METHOD
//http://localhost:3000/product

//http://localhost:3000/product/get-all-products
router.get('/get-all-products', async function (req, res, next) {
    try {
        const result = await productController.getAllProducts();
        if (result) {
            return res.status(200).json({ result: true, products: result });
        }else{
            return res.status(400).json({ result: false, products: null });
        }
    } catch (error) {
        return res.status(500).json({ result: false, user: null });
    }
});

//http://localhost:3000/product/get-product-by-id
router.get('/get-product-by-id/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const result = await productController.getProductById(id);
        if (result) {
            return res.status(200).json({ result: true, product: result });
        }else{
            return res.status(400).json({ result: false, product: null });
        }
    } catch (error) {
        return res.status(500).json({ result: false, product: null });
    }
});

//http://localhost:3000/product/add-product
router.post('/add-product', async function (req, res, next) {
    try {
        const { name,price,quantity,detail, category} = req.body;
        const result = await productController.addProduct(name,price,quantity,detail,category);
        if (result) {
            return res.status(200).json({ result: true, product: result });
        }else{
            return res.status(400).json({ result: false, product: null });
        }
    } catch (error) {
        return res.status(500).json({ result: false, product: null });
    }
});

//http://localhost:3000/product/add-image
router.post('/add-image', async function (req, res, next) {
    try {
        const { id,images } = req.body;
        const result = await productController.addImage(id,images);
        if (result) {
            return res.status(200).json({ result: true, product: result });
        }else{
            return res.status(400).json({ result: false, product: null });
        }
    } catch (error) {
        return res.status(500).json({ result: false, product: null });
    }
});

//http://localhost:3000/product/update-product
router.put('/update-product/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const { name,price,quantity,detail } = req.body;
        const result = await productController.updateProduct(id,name,price,quantity,detail);
        if (result) {
            return res.status(200).json({ result: true, product: result });
        }else{
            return res.status(400).json({ result: false, product: null });
        }
    } catch (error) {
        return res.status(500).json({ result: false, product: null });
    }
});

//http://localhost:3000/product/delete-product
router.post('/delete-product/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const result = await productController.deleteProduct(id);
        if (result) {
            return res.status(200).json({ result: true, product: result });
        }else{
            return res.status(400).json({ result: false, product: null });
        }
    } catch (error) {
        return res.status(500).json({ result: false, product: null });
    }
});

//upload ảnh lên server
// http://localhost:3000/product/upload-image
router.post('/upload-image', [upload.single('image')], async function (req, res, next) {
    try {
      let { file } = req;
      if (file) {
        let path = `http://localhost:3000/images/${file.filename}`; //để ip của máy
        return res.status(200).json({ result: true, path });
      }
      return res.status(400).json({ result: false });
    } catch (error) {
      console.log('upload image error: ', error);
      return res.status(500).json({ result: false });
    }
  });
  // http://localhost:3000/product/upload-images
  router.post('/upload-images', [upload.array('images', 10)], async function (req, res, next) {
    try {
      let files = req.files;
      if (files && files.length > 0) {
        let paths = files.map((file) => {
          return `http://localhost:3000/images/${file.filename}`;
        });
        return res.status(200).json({ result: true, paths });
      }
      return res.status(400).json({ result: false });
    } catch (error) {
      console.log('upload image error: ', error);
      return res.status(500).json({ result: false });
    }
  });

module.exports = router;