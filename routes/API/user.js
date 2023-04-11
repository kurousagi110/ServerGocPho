var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const controllerUser = require('../../components/user/Controller');

// /auth/login : Dang nhap
//http://localhost:3000/user/login-phonenumber
router.post("/login-phonenumber", async (req, res, next) => {
  try {
    const { phonenumber, password } = req.body;
    const user = await controllerUser.loginPhone(phonenumber, password);
    if (user) {
      const token = jwt.sign({ _id: user._id },
        'secret', { expiresIn: '1h' });
      //lưu token vào session
      req.session.token = token;
      return res.status(200).json({ result: true, user: user._id, token:token });
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
    const { email } = req.body;
    const user = await controllerUser.loginEmail(email);
    if (user) {
      const token = jwt.sign({ _id: user._id },
        'secret', { expiresIn: '1h' });
      //lưu token vào session
      req.session.token = token;
      return res.status(200).json({ result: true, user: user._id, token:token });
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
    if (user) {
      const token = jwt.sign({ _id: user._id },
        'secret', { expiresIn: '1h' });
      //lưu token vào session
      req.session.token = token;
      return res.status(200).json({ result: true, user: user._id, token:token });
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
    const { username, password } = req.body;
    const user = await controllerUser.registerUser(username, password);
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
      return res.status(200).json({ result: true, user: user });
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
    const { _id, address } = req.body;
    const user = await controllerUser.deleteAddress(_id, address);
    if (user) {
      return res.status(200).json({ result: true, user: user });
    } else {
      return res.status(400).json({ result: false, user: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, user: null });
  }
});

module.exports = router;