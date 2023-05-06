const categoryService = require('./Service');

const getAllCategories = async () => {
    try {
        return await categoryService.getAllCategories();
    } catch (error) {
        console.log('Error in get all categories controller: ', error)
    }
    return false;
};

const getCategoryById = async (id) => {
    try {
        return await categoryService.getCategoryById(id);
    } catch (error) {
        console.log('Error in get category by id controller: ', error)   
    }
    return false;
};

const addCategory = async (name) => {
    try {
        return await categoryService.addCategory(name);
    } catch (error) {
        console.log('Error in add category controller: ', error)
    }
    return false;
};

const updateCategory = async (id, name) => {
    try {
        return await categoryService.updateCategory(id, name);
    } catch (error) {
        console.log('Error in update category controller: ', error)
    }
    return false;
};

const deleteCategory = async (id) => {
    try {
        return await categoryService.deleteCategory(id);
    } catch (error) {
        console.log('Error in delete category controller: ', error)
    }
    return false;
};

const addImage = async (id, image) => {
    try {
        return await categoryService.addImage(id, image);
    } catch (error) {
        console.log('Error in add image controller: ', error)
    }
    return false;
};

const deleteImage = async (id) => {
    try {
        return await categoryService.deleteImage(id);
    } catch (error) {
        console.log('Error in delete image controller: ', error)
    }
    return false;
};
module.exports = {getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory, addImage, deleteImage};