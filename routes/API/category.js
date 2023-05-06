var express = require('express');
var router = express.Router();
const categoryService = require('../../components/category/Controller');

//CATEGORY METHOD
//http://localhost:3000/category

//http://localhost:3000/category/getAllCategories
router.get('/getAllCategories', async function(req, res, next) {
    try {
        const result = await categoryService.getAllCategories();
        res.json(result);
    } catch (error) {
        console.log('Error in get all categories controller: ', error)
    }
    return false;
});

//http://localhost:3000/category/getCategoryById
router.get('/getCategoryById/:id', async function(req, res, next) {
    try {
        const id =  req.params.id;
        const result = await categoryService.getCategoryById(id);
        res.json(result);
    } catch (error) {
        console.log('Error in get category by id controller: ', error)   
    }
    return false;
});

//http://localhost:3000/category/addCategory
router.post('/addCategory', async function(req, res, next) {
    try {
        const name = req.body.name;
        const result = await categoryService.addCategory(name);
        res.json(result);
    }catch (error) {
        console.log('Error in add category controller: ', error)
    }
});

//http://localhost:3000/category/updateCategory
router.put('/updateCategory', async function(req, res, next) {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const result = await categoryService.updateCategory(id, name);
        res.json(result);
    } catch (error) {
        console.log('Error in update category controller: ', error)
    }
});

//http://localhost:3000/category/deleteCategory
router.delete('/deleteCategory/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        const result = await categoryService.deleteCategory(id);
        res.json(result);
    } catch (error) {
        console.log('Error in delete category controller: ', error)
    }
});

//http://localhost:3000/category/addImage
router.post('/addImage', async function(req, res, next) {
    try {
        const id = req.body.id;
        const image = req.body.image;
        const result = await categoryService.addImage(id, image);
        res.json(result);
    } catch (error) {
        console.log('Error in add image controller: ', error)
    }
});

//http://localhost:3000/category/deleteImage
router.delete('/deleteImage/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        const result = await categoryService.deleteImage(id);
        res.json(result);
    } catch (error) {
        console.log('Error in delete image controller: ', error)
    }
});

module.exports = router;