var express = require('express');
var router = express.Router();

//PRODUCT METHOD
// /get-products : lay danh sach san pham
router.get("/get-products", (req, res, next) => {});

// /get-categories : lay danh sach danh muc
router.get("/get-categories", (req, res, next) => {});

// /products/:id/details : hien thi chi tiet san pham theo id
router.get("/products/:id/details", (req, res, next) => {});

// /products?search=:query : tim kiem san pham theo query
router.get("/products", (req, res, next) => {});

// ------------

// PRODUCT/FAVORITE

// /get-products/favorite : lay danh sach yeu thich
router.get("/get-products/favorite", (req, res, next) => {});

// /products/favorite/:id/delete : xoa san pham ra khoi danh sach yeu thich bang id
router.get("/products/favorite/:id/delete", (req, res, next) => {});


//CART METHOD

// /cart/get-products : lay danh sach san pham trong gio hang
router.get("/cart/get-products", (req, res, next) => {});

// /cart/:id/add : Add 1 sản phẩm từ shop vào trong giỏ hàng
router.post("cart/:id/add", (req, res, next) => {});

// /cart/:id/delete : Xoa san pham ra khoi gio hang theo id
router.get("cart/:id/delete", (req, res, next) => {
  const { id } = req.params;
});

// /cart/checkout : Update lai DB products
router.post("/cart/checkout", (req, res, next) => {
  const [] = req.body;
});
// Không có link thay đổi số lượng của Object vì nó sẽ thay đổi trong Store
//Sau đó gọi link /cart/checkout để đẩy trong Store đi

// ==========================

// CARD

// /get-cards : lay danh sach card
router.get("/get-cards", (req, res, next) => {});

// /cards/new: them card
router.post("/cards/new", (req, res, next) => {
  //card number: 16 unique nums
  //expiration date: ngay het han
  //cardholder name: ten cua chu? card
  //security code: 3 nums = CCV

  const { cardNumber, expirationDate, cardHolderName, CCV } = req.body;
});

// /cards/:id/delete : xoa card theo id
router.get("/cards/:id/delete", (req, res, next) => {
  const { id } = req.params;
});

module.exports = router;