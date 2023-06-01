const productModel = require('./Model');

const getAllProducts = async () => {
    try {
        return await productModel.find();
    } catch (error) {
        console.log('Error in get all products service: ', error)
    }
    return false;
};
const getProductById = async (id) => {
    try {
        return await productModel.findById(id);
    } catch (error) {
        console.log('Error in get product by id service: ', error)
    }
    return false;
};
const addProduct = async (name, price, quantity, detail, category) => {
    try {
        return await productModel.create({ name, price, quantity, detail, category});
    } catch (error) {
        console.log('Error in add product service: ', error)
    }
    return false;
};
const addImage = async (_id, image) => {
    try {
        const product = await productModel.findOne({_id : _id});
        if (product) {
            product.images.push( {name : image});
            product.save();
            return true;
        }
    } catch (error) {
        console.log('Error in add image service: ', error)
    }
    return false;
};
const updateProduct = async (id, name, price, quantity, detail, category) => {
    try {
        let product = await productModel.findById(id);
        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.quantity = quantity || product.quantity;
            product.detail = detail || product.detail;
            product.category = category || product.category;
            product.save();
            return true;
        }
    } catch (error) {
        console.log('Error in update product service: ', error)
    }
    return false;
};
const deleteProduct = async (id) => {
    try {
        return await productModel.findByIdAndDelete(id);
    } catch (error) {
        console.log('Error in delete product service: ', error)
    }
    return false;
};
const deleteImage = async (id) => {
    try {
        let product = await productModel.findById(id);
        if (product) {
            product.image = "";
            product.save();
            return true;
        }
    } catch (error) {
        console.log('Error in delete image service: ', error)
    }
    return false;
};
const updateStatus = async (id, status) => {
    try {
        let product = await productModel.findById(id);
        if (product) {
            product.status = status;
            product.save();
            return true;
        }
    } catch (error) {
        console.log('Error in update status service: ', error)
    }
    return false;
};
module.exports = { getAllProducts, getProductById, addProduct, addImage, updateProduct, deleteProduct, deleteImage, updateStatus }