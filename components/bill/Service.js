const billModel = require('./Model');
const userModel = require('../user/Model');


//add new bill
const addBill = async (idUser, bill, address, payment,timeDesire,totalPrice) => {
    try {
        let user = await userModel.findOne({ _id: idUser });
        console.log(user);
        if (user) {
            const newBill = new billModel({
                idUser: idUser,
                bill: bill,
                address: address,
                payment: payment,
                timeDesire: timeDesire,
                totalPrice: totalPrice,
                status: [{ number: 1, name: "Đang xử lý", date: new Date()}]
            });
            await newBill.save();
            console.log(user);
            return newBill;
        }
        return false;
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
        const bill = await billModel.findById(id);
        console.log(bill);
        console.log("abcccc",bill.status[0]);
        bill.status[0].number = number;
        bill.status[0].name = name;
        bill.status[0].date = new Date();
        await bill.save();
        return bill;
    } catch (error) {
        throw new Error(error);
    }
};
//update bill detail
const updateBillDetail = async (id, name, price, quantity) => {
    try {
        const bill = await billModel.findByIdAndUpdate(id, { $push: { bill: { name: name, price: price, quantity: quantity } } });
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
//add more bill detail
const addMoreBillDetail = async (id, name, img, price, quantity) => {
    try {
        let bill = await billModel.findById(id);
        console.log(bill);
        for (let i = 0; i < bill.detail.length; i++) {
            if (bill.detail[i].name === name) {
                bill.detail[i].quantity += quantity;
                bill = await billModel.findByIdAndUpdate(id, { $set: { detail: bill.detail } });
                return bill;
            }
        }
        bill.detail.push({ name: name, image: img, price: price, quantity: quantity });
        bill.save();
        return bill;
    } catch (error) {
        throw new Error(error);
    }
};
//get bill by user
const getBillByUser = async (user) => {
    try {
        const bill = await billModel.find({ idUser: user });
        return bill;
    } catch (error) {
        throw new Error(error);
    }
};
module.exports = { addBill, getAllBill, deleteBill, getBillById, updateBillStatus, updateBillDetail, updateBillAddress, addMoreBillDetail, getBillByUser};