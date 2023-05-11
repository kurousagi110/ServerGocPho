const billService = require('./Service');

//add new bill
const addBill = async (name,img,price,quantity,address,payment) => {
    try {
        const bill = await billService.addBill(name,img,price,quantity,address,payment);
        return bill;
    } catch (error) {
        throw new Error(error);
    }
};
//get all bill
const getAllBill = async () => {
    try {
        const bills = await billService.getAllBill();
        return bills;
    } catch (error) {
        throw new Error(error);
    }
};
//get bill by id
const getBillById = async (id) => {
    try {
        const bill = await billService.getBillById(id);
        return bill;
    } catch (error) {
        throw new Error(error);
    }
}
//delete bill
const deleteBill = async (id) => { 
    try {
        const bill = await billService.deleteBill(id);
        return bill;
    } catch (error) {
        throw new Error(error);
    }
}
//update bill status
const updateBillStatus = async (id, number,name) => {
    try {
        const bill = await billService.updateBillStatus(id, number,name);
        return bill;
    } catch (error) {
        throw new Error(error);
    }
}
//update bill detail
const updateBillDetail = async (id, name, img, price, quantity) => {
    try {
        const bill = await billService.updateBillDetail(id, name, img, price, quantity);
        return bill;
    } catch (error) {
        throw new Error(error);
    }
}
//update bill address
const updateBillAddress = async (id, address) => {
    try {
        const bill = await billService.updateBillAddress(id, address);
        return bill;
    } catch (error) {
        throw new Error(error);
    }
};
//add more bill detail
const addMoreBillDetail = async (id, name, img, price, quantity) => {
    try {
        const bill = await billService.addMoreBillDetail(id, name, img, price, quantity);
        return bill;
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = { addBill, getAllBill, deleteBill, getBillById, updateBillStatus, updateBillDetail, updateBillAddress, addMoreBillDetail };