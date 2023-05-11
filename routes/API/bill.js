var express = require('express');
var router = express.Router();
const billService = require('../../components/bill/Controller');
const upload = require('../../components/middle/upload');

// ORDER

//http://localhost:3000/bill/add
router.post('/add', async function (req, res, next) {
  const { name, img, price, quantity, address, payment } = req.body;
  try {
    const bill = await billService.addBill(name, img, price, quantity, address, payment);
    return res.status(200).json({ message: 'success' }, bill);
  } catch (error) {
    return res.status(200).json({ message: 'fail' }, {bill: null});
  }
});
//http://localhost:3000/bill/get-all
router.get('/get-all', async function (req, res, next) {
  try {
    const bill = await billService.getAllBill();
    return res.status(200).json({ message: 'success' }, bill);
  } catch (error) {
    return res.status(200).json({ message: 'fail' }, {bill: null});
  }
});
//http://localhost:3000/bill/get-by-id/:id
router.get('/get-by-id/:id', async function (req, res, next) {
  const { id } = req.params;
  try {
    const bill = await billService.getBillById(id);
    return res.status(200).json({ message: 'success' }, bill);
  } catch (error) {
    return res.status(200).json({ message: 'fail' }, {bill: null});
  }
});
//http://localhost:3000/bill/delete/:id
router.post('/delete/:id', async function (req, res, next) {
  const { id } = req.params;
  try {
    const bill = await billService.deleteBill(id);
    return res.status(200).json({ message: 'success' }, bill);
  } catch (error) {
    return res.status(200).json({ message: 'fail' }, {bill: null});
  }
});
//http://localhost:3000/bill/update-status/:id
router.post('/update-status/:id', async function (req, res, next) {
  const { id } = req.params;
  const { number, name } = req.body;
  try {
    const bill = await billService.updateBillStatus(id, number, name);
    return res.status(200).json({ message: 'success' }, bill);
  } catch (error) {
    return res.status(200).json({ message: 'fail' }, {bill: null});
  }
});
//http://localhost:3000/bill/update-detail/:id
router.post('/update-detail/:id', async function (req, res, next) {
  const { id } = req.params;
  const { name, img, price, quantity } = req.body;
  try {
    const bill = await billService.updateBillDetail(id, name, img, price, quantity);
    return res.status(200).json({ message: 'success' }, bill);
  } catch (error) {
    return res.status(200).json({ message: 'fail' }, {bill: null});
  }
});
//http://localhost:3000/bill/update-address/:id
router.post('/update-address/:id', async function (req, res, next) {
  const { id } = req.params;
  const { address } = req.body;
  try {
    const bill = await billService.updateBillAddress(id, address);
    return res.status(200).json({ message: 'success' }, bill);
  } catch (error) {
    return res.status(200).json({ message: 'fail' }, {bill: null});
  }
});

// add more BILL DETAIL
///ssss
//http://localhost:3000/bill/add-detail/:id
router.post('/add-detail/:id', async function (req, res, next) {
  const { id } = req.params;
  const { name, img, price, quantity } = req.body;
  try {
    const bill = await billService.addMoreBillDetail(id, name, img, price, quantity);
    if (bill) {
      return res.status(200).json({ message: 'success' }, bill);
    } else {
      return res.status(400).json('add more detail error: ', error);
    }
  } catch (error) {
    return res.status(200).json({ message: 'fail' }, {bill: null});
  }
});
module.exports = router;