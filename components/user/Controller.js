const userServices = require('./Service');

const registerMail = async (email) => {
    try {
        return await userServices.registerMail(email);
    } catch (error) {
        throw error;
    }
}
const registerPhone = async (phonenumber, password) => {
    try {
        return await userServices.registerPhone(phonenumber, password);
    } catch (error) {
        throw error;
    }
}
const registerUser = async (username, password) => {
    try {
        return await userServices.registerUser(username, password);
    } catch (error) {
        throw error;
    }
}
const loginEmail = async (email) => {
    try {
        return await userServices.loginEmail(email);
    } catch (error) {
        throw error;
    }
}
const loginPhone = async (phonenumber, password) => {
    try {
        return await userServices.loginPhone(phonenumber, password);
    } catch (error) {
        throw error;
    }
}
const loginUser = async (username, password) => {
    try {
        return await userServices.loginUser(username, password);
    } catch (error) {
        throw error;
    }
}
const changePassword = async (_id, oldpassword, newpassword) => {
    try {
        return await userServices.changePassword(_id, oldpassword, newpassword);
    } catch (error) {
        throw error;
    }
}
//profile
const editProfile = async (_id, username, phonenumber, email, country, fullname, birthday) => {
    try {
        return await userServices.editProfile(_id, username, phonenumber, email, country, fullname, birthday);
    } catch (error) {
        throw error;
    }
}
const getProfile = async (_id) => {
    try {
        return await userServices.getProfile(_id);
    } catch (error) {
        throw error;
    }
}

//địa chỉ
const addAddress = async (_id, address) => {
    try {
        return await userServices.addAddress(_id, address);
    } catch (error) {
        throw error;
    }
}
const editAddress = async (_id,oldaddress ,newaddress) => {
    try {
        return await userServices.editAddress(_id, oldaddress, newaddress);
    } catch (error) {
        throw error;
    }
}
const deleteAddress = async (_id, address) => {
    try {
        return await userServices.deleteAddress(_id, address);
    } catch (error) {
        throw error;
    }
}

//danh sách thích sản phẩm
const addFavorite = async (_id,idProduct, name, price, image) => {
    try {
        return await userServices.addFavorite(_id,idProduct, name, price, image);
    } catch (error) {
        throw error;
    }
}
const deleteFavorite = async (_id, name) => {
    try {
        return await userServices.deleteFavorite(_id, name);
    } catch (error) {
        throw error;
    }
}

//giỏ hàng
const addCart = async (_id, name, price, quantity, image) => {
    try {
        return await userServices.addCart(_id, name, price, quantity, image);
    } catch (error) {
        throw error;
    }
}
const deleteCart = async (_id, name) => {
    try {
        return await userServices.deleteCart(_id, name);
    } catch (error) {
        throw error;
    }
}

//set status
const setStatus = async (_id, status) => {
    try {
        return await userServices.setStatus(_id, status);
    } catch (error) {
        throw error;
    }
}
module.exports = {registerMail, registerPhone, registerUser, loginUser, loginEmail, loginPhone, changePassword, editProfile, getProfile,
                    addAddress, editAddress, deleteAddress, addFavorite, deleteFavorite, addCart, deleteCart, setStatus}