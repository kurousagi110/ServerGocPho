const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const billSchema = new Schema({
    id: {type: ObjectID},
    idUser: { type : String},
    bill: [{
        id: {type: ObjectID},
        name: { type : String},
        price: {type: Number},
        quantity: {type: Number},
    }],
    address: { type : String},
    payment: { type : Number},
    status: [{
        id: {type: Number},
        number: {type: Number},
        name: { type : String},
        date: { type : String},
    }],
    timeDesire: { type : String},
    totalPrice: { type : Number},
});

module.exports =mongoose.models.bills || mongoose.model('bill', billSchema);