const billModel = require('./Model');

//add new bill
const addBill = async (name,img,price,quantity,address,payment) => {
    try {
        const newBill = new billModel({
            detail: [{ name: name, image: img, price: price, quantity: quantity }],
            address: address,
            payment: payment,
            status: [{ number: 1, name: "Đang chờ xử lý", date: new Date() }]
        });
        const bill = await newBill.save();
        return bill;
    } catch (error) {
        throw new Error(error);
    }
};
//get all bill
const getAllBill = async () => {
    try {
        const bills = await billModel.find();
        return bills;
    } catch (error) {
        throw new Error(error);
    }
};
//get bill by id
const getBillById = async (id) => {
    try {
        const bill = await billModel.findById(id);
        return bill;
    } catch (error) {
        throw new Error(error);
    }
}
//delete bill
const deleteBill = async (id) => {
    try {
        const bill = await billModel.findByIdAndDelete(id);
        return bill;
    } catch (error) {
        throw new Error(error);
    }
};
//update bill status
const updateBillStatus = async (id, number,name) => {
    try {
        const bill = await billModel.findByIdAndUpdate(id, { $set: { status: [{ number: number, name: name, date: new Date() }] } });
        return bill;
    } catch (error) {
        throw new Error(error);
    }
};
//update bill detail
const updateBillDetail = async (id, name, img, price, quantity) => {
    try {
        const bill = await billModel.findByIdAndUpdate(id, { $push: { detail: { name: name, image: img, price: price, quantity: quantity } } });
        return bill;
    } catch (error) {
        throw new Error(error);
    }
};
//update bill address
const updateBillAddress = async (id, address) => {
    try {
        const bill = await billModel.findByIdAndUpdate(id, { $set: { address: address } });
        return bill;
    } catch (error) {
        throw new Error(error);
    }
};
module.exports = { addBill, getAllBill, deleteBill, getBillById, updateBillStatus, updateBillDetail, updateBillAddress};