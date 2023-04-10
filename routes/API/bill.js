var express = require('express');
var router = express.Router();

// ORDER

// /get-orders : lay danh sach san pham da mua thanh cong
router.get("/get-orders", (req, res, next) => {});

// /orders/:id/details : hien thi thong tin chi tiet san pham
router.get("orders/:id/details", (req, res, next) => {
  const { id } = req.params;
});

// /get-orders/delivering : lay danh sach san pham dang giao
router.get("/get-orders/delivering", (req, res, next) => {});

// /get-addresses : lay danh sach dia chi
router.get("/get-addresses", (req, res, next) => {});

// /addresses/:id/edit : lay thong tin dia chi
router.get("/addresses/:id/edit", (req, res, next) => {
  const { id } = req.params;
});

// /addresses/:id/edit : thay doi thong tin dia chi
router.post("/addresses/edit", (req, res, next) => {
  const { KhongBietBoGiVoHet } = req.body;
});

// /addresses/:id/edit : thay doi thong tin dia chi
router.post("/addresses/new", (req, res, next) => {
  const { KhongBietBoGiVoHet } = req.body;
});


module.exports = router;