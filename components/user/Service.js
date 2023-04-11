const productModel = require('./Model');

//tạo acc bằng email
const registerMail = async (email) => {
    try {
        const checkemail = await productModel.findOne({ email: email });
        console.log(checkemail);
        if (!checkemail) {
            await productModel.create({
                email: email,
            });
            return true;
        }
    } catch (error) {
        console.log('Error in register email service: ', error)
    }
    return false;
}
//tao acc bằng số điện thoại
const registerPhone = async (phonenumber, password) => {
    try {
        const checkPhone = await productModel.findOne({ phonenumber: phonenumber });
        console.log(checkPhone);
        if (!checkPhone) {
            await productModel.create({
                phonenumber: phonenumber,
                password: password,
            });
            return true;
        }
    } catch (error) {
        console.log('Error in register phone service: ', error)
    }
    return false;
}
//tao acc bằng username
const registerUser = async (username, password) => {
    try {
        const checkUser = await productModel.findOne({ username: username });
        if (!checkUser) {
            await productModel.create({
                username: username,
                password: password,
            });
            return true;
        }
    } catch (error) {
        console.log('Error in register user service: ', error)
    }
    return false;
}
//login bằng email
const loginEmail = async (email) => {
    try {
        let user = await productModel.findOne({ email: email });
        if (user) {
            return true, user;
        }
    } catch (error) {
        console.log('Error in login email service: ', error)
    }
    return false;
}
//login bằng số điện thoại
const loginPhone = async (phonenumber, password) => {
    try {
        let user = await productModel.findOne({ phonenumber: phonenumber, password: password });
        if (user) {
            return true, user;
        }
    } catch (error) {
        console.log('Error in login phone service: ', error)
    }
    return false;
}
//login bằng username
const loginUser = async (username, password) => {
    try {
        let user = await productModel.findOne({ username: username, password: password });
        if (user) {
            return true, user;
        }
    } catch (error) {
        console.log('Error in login user service: ', error)
    }
    return false;
}
//đổi pass 
const changePassword = async (id, oldpassword, newpassword, confirmpassword) => {
    try {
        let user = await productModel.findOne({ _id: id, password: oldpassword });
        if (user) {
            if (newpassword == confirmpassword) {
                await productModel.updateOne({ _id: id }, { $set: { password: newpassword } });
                return true;
            }
        }
    } catch (error) {
        console.log('Error in change password service: ', error)
    }
    return false;
};
//sửa thông tin cá nhân
const editProfile = async (id, username, phonenumber, email, country, fullname, birthday) => {
    try {
        let user = await productModel.findOne({ _id: id });
        if (user) {
            await productModel.updateOne({ _id: id }, { $set: { username: username, phonenumber: phonenumber, email: email, country: country, fullname: fullname, birthday: birthday } });
            return true;
        }
    } catch (error) {
        console.log('Error in edit profile service: ', error)
    }
    return false;
};


module.exports = { registerMail, registerPhone, registerUser, loginEmail, loginPhone, loginUser, changePassword, editProfile}