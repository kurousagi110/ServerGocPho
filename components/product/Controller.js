const productService = require('./Service');

const getAllProducts = async () => {
    try {
        return await productService.getAllProducts();
    } catch (error) {
        console.log('Error in get all products controller: ', error)
    }
    return false;
};

const getProductById = async (id) => {
    try {
        return await productService.getProductById(id);
    } catch (error) {
        console.log('Error in get product by id controller: ', error)
    }
    return false;
};

const addProduct = async (name,price,quantity,detail,category) => {
    try {
        return await productService.addProduct(name,price,quantity,detail,category);
    } catch (error) {
        console.log('Error in add product controller: ', error)
    }
    return false;
};

const addImage = async (id, images) => {
    try {
        return await productService.addImage(id, images);
    } catch (error) {
        console.log('Error in add image controller: ', error)
    }
    return false;
};

const updateProduct = async (id,name,price,quantity,detail,category) => {
    try {
        return await productService.updateProduct(id,name,price,quantity,detail,category);
    } catch (error) {
        console.log('Error in update product controller: ', error)
    }
    return false;
};

const deleteProduct = async (id) => {
    try {
        return await productService.deleteProduct(id);
    } catch (error) {
        console.log('Error in delete product controller: ', error)
    }
    return false;
};

module.exports = { getAllProducts, getProductById, addProduct, addImage, updateProduct, deleteProduct};