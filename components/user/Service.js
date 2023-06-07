const { set } = require('mongoose');
const productModel = require('./Model');

//tạo acc bằng email
const registerMail = async (email) => {
    try {
        console.log(email);
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
const registerUser = async (username, password, fullname) => {
    try {
        const checkUser = await productModel.findOne({ username: username });
        if (!checkUser) {
            await productModel.create({
                username: username,
                password: password,
                fullname: fullname,
            });
            return true;
        }
    } catch (error) {
        console.log('Error in register user service: ', error)
    }
    return false;
}
//login bằng email
const loginEmail = async (email, avatar, fullname) => {
    try {
        let user = await productModel.findOne({ email: email });
        console.log(user);
        if (user) {
            user.avatar = avatar;
            user.fullname = fullname;
            return true, user;
        } else {
            let user1 = await productModel.create({
                email: email,
                avatar: avatar,
                fullname: fullname,
            });
            console.log(user1, "221312313");
            return true, user1;
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
        console.log("@@@@@@@@@@@@", username, password);
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
const changePassword = async (id, oldpassword, newpassword) => {
    try {
        let user = await productModel.findOne({ _id: id, password: oldpassword });
        if (user) {
            user.password = newpassword;
            await user.save();
            return true;
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
//hiện thông tin cá nhân
const getProfile = async (_id) => {
    try {
        let user = await productModel.findById(_id);
        if (user) {
            return user;
        }
    } catch (error) {
        console.log('Error in show profile service: ', error)
    }
    return false;
}

//thêm địa chỉ
const addAddress = async (_id, address) => {
    try {
        console.log("#@!#!@#", _id, address);
        let user = await productModel.findById(_id);
        console.log("user", user);
        if (user.addresses.length == 0) {
            user.addresses.push({ name: address, status: 1 });
            await user.save();
            const result = await productModel.findById(_id);
            return result.addresses;
        } else {
            user.addresses.push({ name: address });
            await user.save();
            const result = await productModel.findById(_id);
            return result.addresses;
        }
    } catch (error) {
        console.log('Error in add address service: ', error)
    }
    return false;
};
//xóa địa chỉ
const deleteAddress = async (_id, idAddress) => {
    try {
        let user = await productModel.findById(_id);
        if (user) {
            if (user.addresses.length > 1) {
                for (let i = 0; i < user.addresses.length; i++) {
                    if (user.addresses[i]._id == idAddress) {
                        if (user.addresses[i].status === 1) {
                            return 2;
                        } else {
                            user.addresses.splice(i, 1);
                            await user.save();
                            const abc = await productModel.findById(_id);
                            return abc;
                        }
                    }
                }
            }
            return 1;
        }
        return false;
    } catch (error) {
        console.log('Error in delete address service: ', error)
    }
    return false;
}
//sửa địa chỉ
const editAddress = async (_id, idAddress, newAddress) => {
    try {
        let user = await productModel.findById(_id);
        console.log("user", user.addresses);
        if (user) {
            for (let i = 0; i < user.addresses.length; i++) {
                if (user.addresses[i]._id == idAddress) {
                    console.log("user", user.addresses[i]._id);
                    user.addresses[i].name = newAddress || user.addresses[i].name;
                    await user.save();
                    const address = await productModel.findById(_id);
                    return address.addresses[i];
                }
            }
        }
        return false;
    } catch (error) {
        console.log('Error in edit address service: ', error)
    }
    return false;
}
//thêm sản phẩm yêu thích
const addFavorite = async (_id, idProduct, name, price, image) => {
    try {
        let user = await productModel.findById(_id);
        if (user) {
            for (let i = 0; i < user.favorites.length; i++) {
                if (user.favorites[i].name == name) {
                    user.favorites.splice(i, 1);
                    await user.save();
                    return 1;
                }
            }
            user.favorites.push({ idProduct: idProduct, name: name, price: price, image: image });
            await user.save();
            return 0;
        }
    } catch (error) {
        console.log('Error in add favorite service: ', error)
    }
    return false;
}
//xóa sản phẩm yêu thích
const deleteFavorite = async (_id, name) => {
    try {
        let user = await productModel.findById(_id);
        if (user) {
            for (let i = 0; i < user.favorites.length; i++) {
                if (user.favorites[i].name == name) {
                    user.favorites.splice(i, 1);
                    await user.save();
                    return true;
                }
            }
        }
    } catch (error) {
        console.log('Error in delete favorite service: ', error)
    }
    return false;
}
//thêm sản phẩm vào giỏ hàng
const addCart = async (_id, name, price, quantity, image) => {
    try {
        let user = await productModel.findById(_id);
        console.log("user", user);
        console.log("user cart", user.carts);
        for (let i = 0; i < user.carts.length; i++) {
            if (user.carts[i].name == name) {
                user.carts[i].quantity += quantity;
                await user.save();
                const result = await productModel.findById(_id);
                if (result.carts[i].quantity < 1) {
                    result.carts.splice(i, 1);
                    await result.save();
                    return result.carts;
                }
                return result.carts;
            }

        }
        user.carts.push({
            name: name,
            price: price,
            quantity: quantity,
            image: image
        });
        await user.save();
        const result = await productModel.findById(_id);
        return result.carts;
    } catch (error) {
        console.log('Error in add cart service: ', error)
    }
    return false;
}
//xóa sản phẩm trong giỏ hàng
const deleteCart = async (_id, idCart) => {
    try {
        let user = await productModel.findById(_id);
        if (user) {
            for (let i = 0; i < user.carts.length; i++) {
                if (user.carts[i]._id == idCart) {
                    user.carts.splice(i, 1);
                    await user.save();
                    const resul = await productModel.findById(_id);
                    return resul.carts;
                }
            }
        }
    } catch (error) {
        console.log('Error in delete cart service: ', error)
    }
    return false;
}
//set status để xóa tài khoản
const setStatus = async (_id, status) => {
    try {
        let user = await productModel.findById(_id);
        if (user) {
            user.status = status;
            await user.save();
            return true;
        }
    } catch (error) {
        console.log('Error in set status service: ', error)
    }
    return false;
};

//set status address mặc định
const setStatusAddress = async (_id, idAddress) => {
    try {
        let user = await productModel.findById(_id);
        if (user) {
            for (let i = 0; i < user.addresses.length; i++) {
                if (user.addresses[i]._id == idAddress) {
                    user.addresses[i].status = 1;
                    await user.save();
                } else {
                    user.addresses[i].status = 0;
                    await user.save();
                }
            }
            const addresses = await productModel.findById(_id);
            return addresses.addresses;
        }
    } catch (error) {
        console.log('Error in set status address service: ', error)
    }
    return false;
};

//tìm kiếm
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

//add cart theo mảng sản phẩm
const addCartArray = async (_id, carts) => {
    try {
        let user = await productModel.findById(_id);
        if (user) {
            user.carts.splice(0, user.carts.length);
            user.carts = carts;
            await user.save();
            const result = await productModel.findById(_id);
            return result.carts;
        }
    } catch (error) {
        console.log('Error in add cart array service: ', error)
    }
    return false;
};

module.exports = {
    registerMail, registerPhone, registerUser, loginEmail, loginPhone,
    loginUser, changePassword, editProfile, addAddress, deleteAddress,
    editAddress, getProfile, addFavorite, deleteFavorite, addCart, deleteCart, setStatus,
    setStatusAddress, addCartArray,
}