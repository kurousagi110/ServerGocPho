const categoryModel = require('./Model');

const getAllCategories = async () => {
    try {
        return await categoryModel.find();
    } catch (error) {
        console.log('Error in get all categories service: ', error)
    }
    return false;
};

const getCategoryById = async (id) => {
    try {
        return await categoryModel.findById(id);
    } catch (error) {
        console.log('Error in get category by id service: ', error)   
    }
    return false;
};

const addCategory = async (name, image) => {
    try {
        return await categoryModel.create({name : name, images : image});
    } catch (error) {
        console.log('Error in add category service: ', error)
    }
    return false;
};

const updateCategory = async (id, name) => {
    try {
        let category = await categoryModel.findById(id);
        if (category) {
            category.name = name || category.name;
            category.save();
            return true;
        }
    } catch (error) {
        console.log('Error in update category service: ', error)
    }
    return false;
};

const deleteCategory = async (id) => {
    try {
        return await categoryModel.findByIdAndDelete(id);
    } catch (error) {
        console.log('Error in delete category service: ', error)
    }
    return false;
};

const addImage = async (id, image) => {
    try {
        let category = await categoryModel.findById(id);
        if (category) {
            category.images.push( {name : image});
            category.save();
            return true;
        }
    } catch (error) {
        console.log('Error in add image service: ', error)
    }
    return false;
};

const deleteImage = async (id, name) => {
    try {
        let category = await categoryModel.findById(id);
        if (category) {
            for (let i = 0; i < category.images.length; i++) {
                if (category.images[i].name === name) {
                    category.images.splice(i, 1);
                    category.save();
                    return true;
                }
            }
        }
    } catch (error) {
        console.log('Error in delete image service: ', error)
    }
    return false;
};

module.exports = { getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory, addImage, deleteImage};