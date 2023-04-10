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
const changePassword = async (_id, oldpassword, newpassword, confirmpassword) => {
    try {
        return await userServices.changePassword(_id, oldpassword, newpassword, confirmpassword);
    } catch (error) {
        throw error;
    }
}
const editProfile = async (_id, username, phonenumber, email, country, fullname, birthday) => {
    try {
        return await userServices.editProfile(_id, username, phonenumber, email, country, fullname, birthday);
    } catch (error) {
        throw error;
    }
}

module.exports = {registerMail, registerPhone, registerUser, loginUser, loginEmail, loginPhone, changePassword, editProfile}