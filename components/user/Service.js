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
                user.password = newpassword;
                await user.save();
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
        let user = await productModel.findById(id);
        if (user) {
            user.username = username || user.username;
            user.phonenumber = phonenumber || user.phonenumber;
            user.email = email || user.email;
            user.country = country || user.country;
            user.fullname = fullname || user.fullname;
            user.birthday = birthday || user.birthday;
            await user.save();
            return true;
        }
    } catch (error) {
        console.log('Error in edit profile service: ', error)
    }
    return false;
};
//thêm địa chỉ
const addAddress = async (_id, addresses) => {
    try {
        let user = await productModel.findById(id);
        if (user) {
           user.addresses.push({name: addresses});
           await user.save();
        }
    } catch (error) {
        console.log('Error in add address service: ', error)
    }
    return false;
};
//xóa địa chỉ
const deleteAddress = async (_id, addresses) => {
    try {
        let user = await productModel.findById(_id);
        if (user) {
           user.addresses.deleteOne({name: addresses});
           await user.save();
           return true;
        }
    } catch (error) {
        console.log('Error in delete address service: ', error)
    }
    return false;
}
//sửa địa chỉ
const editAddress = async (_id, oldaddresses ,newaddresses) => {
    try {
        let user = await productModel.findById(_id);
        if (user) {
            if(user.addresses.name == oldaddresses){
                user.addresses.name = newaddresses;
                await user.save();
                return true;
            }
        }
    } catch (error) {
        console.log('Error in edit address service: ', error)
    }
    return false;
}


const searchUser = async (name, age) => {
    try {
        let query = {};
        if (name) {
            //tìm đúng tên
            query.name = name;
            //tìm có chứa
            // query.name = new RegExp(name, 'i');
        }
        if (age) {
            //tìm đúng tuổi
            query.age = age;
            //tìm tuổi lớn hơn
            // query.age = { $gt: age };
            //tìm tuổi nhỏ hơn
            // query.age = { $lt: age };
            //tìm tuổi lớn hơn hoặc bằng
            // query.age = { $gte: age };
            //tìm tuổi nhỏ hơn hoặc bằng
            // query.age = { $lte: age };
            //tìm tuổi lớn hơn và nhỏ hơn/
            // query.age = { $gt: age, $lt: age };
        }
        return await productModel.find(query);
    } catch (error) {
        console.log('Error in search user service: ', error)
    }
    return [];
}

module.exports = { registerMail, registerPhone, registerUser, loginEmail, loginPhone,
                     loginUser, changePassword, editProfile, addAddress, deleteAddress,
                    editAddress}