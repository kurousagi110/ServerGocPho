var express = require('express');
var router = express.Router();
const categoryController = require('../../components/category/Controller');
const upload = require('../../components/middle/upload');

//CATEGORY METHOD
//http://localhost:3000/category

//http://localhost:3000/category/get-all-categories
router.get('/get-all-categories', async function(req, res, next) {
    try {
        const result = await categoryController.getAllCategories();
        res.json(result);
    } catch (error) {
        console.log('Error in get all categories controller: ', error)
    }
    return false;
});

//http://localhost:3000/category/get-category-by-id
router.get('/get-category-by-id/:id', async function(req, res, next) {
    try {
        const id =  req.params.id;
        const result = await categoryController.getCategoryById(id);
        res.json(result);
    } catch (error) {
        console.log('Error in get category by id controller: ', error)   
    }
    return false;
});

//http://localhost:3000/category/add-category
router.post('/add-category', async function(req, res, next) {
    try {
        const name = req.body.name;
        const result = await categoryController.addCategory(name);
        res.json(result);
    }catch (error) {
        console.log('Error in add category controller: ', error)
    }
});

//http://localhost:3000/category/update-category
router.post('/update-category', async function(req, res, next) {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const result = await categoryController.updateCategory(id, name);
        res.json(result);
    } catch (error) {
        console.log('Error in update category controller: ', error)
    }
});

//http://localhost:3000/category/delete-category/:id
router.post('/delete-category/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        const result = await categoryController.deleteCategory(id);
        res.json(result);
    } catch (error) {
        console.log('Error in delete category controller: ', error)
    }
});

//http://localhost:3000/category/add-image
router.post('/add-image', async function(req, res, next) {
    try {
        const id = req.body.id;
        const image = req.body.image;
        const result = await categoryController.addImage(id, image);
        res.json(result);
    } catch (error) {
        console.log('Error in add image controller: ', error)
    }
});

//http://localhost:3000/category/delete-image
router.post('/delete-image/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const result = await categoryController.deleteImage(id ,name);
        res.json(result);
    } catch (error) {
        console.log('Error in delete image controller: ', error)
    }
});

//upload ảnh lên server
// http://localhost:3000/category/upload-image
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
  // http://localhost:3000/category/upload-images
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