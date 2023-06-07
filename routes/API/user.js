var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const controllerUser = require('../../components/user/Controller');
const controllerBill = require('../../components/bill/Controller');

// /auth/login : Dang nhap
//http://localhost:3000/user/login-phonenumber
router.post("/login-phonenumber", async (req, res, next) => {
  try {
    const { phonenumber, password } = req.body;
    const user = await controllerUser.loginPhone(phonenumber, password);
    const bill = await controllerBill.getBillByUser(phonenumber);
    if (user) {
      const token = jwt.sign({ _id: user._id },
        'secret', { expiresIn: '1h' });
      //lưu token vào session
      req.session.token = token;
      return res.status(200).json({ result: true, user: user, token:token,bill:bill});
    } else {
      return res.status(400).json({ result: false, user: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, user: null });
  }
});
//http://localhost:3000/user/login-email
router.post("/login-email", async (req, res, next) => {
  try {
    const { email,avatar,fullname } = req.body;
    console.log(email)
    const user = await controllerUser.loginEmail(email, avatar, fullname);
    const bill = await controllerBill.getBillByUser(email);
    if (user) {
      const token = jwt.sign({ _id: user._id },
        'secret', { expiresIn: '1h' });
      //lưu token vào session
      req.session.token = token;
      return res.status(200).json({ result: true, user: user, token:token,bill:bill });
    } else {
      return res.status(400).json({ result: false, user: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, user: null });
  }
});
//http://localhost:3000/user/login-username
router.post("/login-username", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await controllerUser.loginUser(username, password);
    const bill = await controllerBill.getBillByUser(username);
    if (user) {
      const token = jwt.sign({ _id: user._id },
        'secret', { expiresIn: '1h' });
      //lưu token vào session
      req.session.token = token;
      return res.status(200).json({ result: true, user: user, token:token,bill:bill });
    } else {
      return res.status(400).json({ result: false, user: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, user: null });
  }
});

// /auth/register : Dang ky
//http://localhost:3000/user/register-phonenumber
router.post("/register-phonenumber", async (req, res, next) => {
  try {
    const { phonenumber, password } = req.body;
    console.log(phonenumber, password)
    const user = await controllerUser.registerPhone(phonenumber, password);
    if (user) {
      return res.status(200).json({ result: user });
    } else {
      return res.status(400).json({ result: false });
    }
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});
//http://localhost:3000/user/register-email
router.post("/register-email", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await controllerUser.registerMail(email);
    console.log(user,"user ngoai nay ne")
    if (user) {
      return res.status(200).json({ result: true, user: user });
    } else {
      return res.status(400).json({ result: false, user: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, user: null });
  }
});
//http://localhost:3000/user/register-username
router.post("/register-username", async (req, res, next) => {
  try {
    const { username, password, fullname } = req.body;
    const user = await controllerUser.registerUser(username, password, fullname);
    if (user) {
      return res.status(200).json({ result: true, user: user });
    } else {
      return res.status(400).json({ result: false, user: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, user: null });
  }
});

// /auth/logout : dang xuat
//http://localhost:3000/user/logout
router.get('/logout', async (req, res, next) => {
  try {
    res.session.destroy();
    return res.redirect('/login');
  } catch (error) {
    console.log('logout error', error);
    return res.redirect('/login');
  }
});

// /account/change-password : doi mat khau
//nếu đổi pass email mặc định pass là null
//http://localhost:3000/user/change-password
router.post("/change-password", async (req, res, next) => {
  try {
    const {_id, oldpassword, newpassword } = req.body;
    const user = await controllerUser.changePassword(_id, oldpassword, newpassword);
    if (user) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(400).json({ result: false });
    }
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

// /account/profile : lay thong tin hien thi man hinh profile

// /account/edit-profile : doi thong tin profile
//http://localhost:3000/user/edit-profile
router.post("/edit-profile", async (req, res, next) => {
  try {
    const {_id, username, phonenumber, email, country, fullname, birthday } = req.body;
    const user = await controllerUser.editProfile(_id, username, phonenumber, email, country, fullname, birthday);
    if (user) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(400).json({ result: false });
    }
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

//http://localhost:3000/user/get-profile
router.post("/get-profile", async (req, res, next) => {
  try {
    const { _id } = req.body;
    const user = await controllerUser.getProfile(_id);
    if (user) {
      return res.status(200).json({ result: true, user: user });
    } else {
      return res.status(400).json({ result: false, user: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, user: null });
  }
});
//http://localhost:3000/user/add-address
router.post("/add-address", async (req, res, next) => {
  try {
    const { _id, address } = req.body;
    const user = await controllerUser.addAddress(_id, address);
    if (user) {
      return res.status(200).json({ result: true, address: user });
    } else {
      return res.status(400).json({ result: false, user: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, user: null });
  }
});

//http://localhost:3000/user/delete-address
router.post("/delete-address", async (req, res, next) => {
  try {
    const { _id, idAddress } = req.body;
    const user = await controllerUser.deleteAddress(_id, idAddress);
    if (user) {
      return res.status(200).json({ result: true, address: user });
    } else {
      return res.status(400).json({ result: false, address: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, address: null });
  }
});
//http://localhost:3000/user/edit-address
router.post("/edit-address", async (req, res, next) => {
  try {
    const { _id, idAddress, newAddress } = req.body;
    const user = await controllerUser.editAddress(_id, idAddress, newAddress);
    if (user) {
      return res.status(200).json({ result: true, address: user });
    } else {
      return res.status(400).json({ result: false, address: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, address: null });
  }
});
//http://localhost:3000/user/add-favorite
router.post("/add-favorite", async (req, res, next) => {
  try {
    const {_id,idProduct, name, price, image} = req.body;
    const add = await controllerUser.addFavorite(_id,idProduct, name, price, image);
    console.log(add);
      return res.status(200).json({ result: add});
  } catch (error) {
    return res.status(500).json({ result: false, user: null });
  }
});
//http://localhost:3000/user/delete-favorite
router.post("/delete-favorite", async (req, res, next) => {
  try {
    const {_id, name } = req.body;
    const user = await controllerUser.deleteFavorite(_id, name);
    if (user) {
      return res.status(200).json({ result: true, user: user });
    } else {
      return res.status(400).json({ result: false, user: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, user: null });
  }
});
//http://localhost:3000/user/add-cart
router.post("/add-cart", async (req, res, next) => {
  try {
    const {_id, name, price, quantity, image } = req.body;
    const user = await controllerUser.addCart(_id, name, price, quantity, image);
    if (user) {
      return res.status(200).json({ result: true, user: user });
    } else {
      return res.status(400).json({ result: false, user: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, user: null });
  }
});

//http://localhost:3000/user/delete-cart
router.post("/delete-cart", async (req, res, next) => {
  try {
    const {_id, idCart } = req.body;
    const user = await controllerUser.deleteCart(_id, idCart);
    if (user) {
      return res.status(200).json({ result: true, cart: user });
    } else {
      return res.status(400).json({ result: false, cart: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, cart: null });
  }
});

//http://localhost:3000/user/set-status
router.post("/set-status", async (req, res, next) => {
  try {
    const {_id, status } = req.body;
    const user = await controllerUser.setStatus(_id, status);
    if (user) {
      return res.status(200).json({ result: true, user: user });
    } else {
      return res.status(400).json({ result: false, user: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, user: null });
  }
});
//http://localhost:3000/user/set-status-address
router.post("/set-status-address", async (req, res, next) => {
  try {
    const {_id, idAddress } = req.body;
    const user = await controllerUser.setStatusAddress(_id, idAddress);
    console.log(user);
    if (user) {
      return res.status(200).json({ result: true, addresses: user });
    } else {
      return res.status(400).json({ result: false, addresses: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false});
  }
});
//add cart array
//http://localhost:3000/user/add-cart-array
router.post("/add-cart-array", async (req, res, next) => {
  try {
    const {_id, cart } = req.body;
    const user = await controllerUser.addCartArray(_id, cart);
    if (user) {
      return res.status(200).json({ result: true, cart: user });
    } else {
      return res.status(400).json({ result: false, cart: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, cart: null });
  }
});
module.exports = router;