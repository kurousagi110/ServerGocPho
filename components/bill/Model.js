const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const billSchema = new Schema({
    id: {type: ObjectID},
    detail: [{
        id: {type: Number},
        name: { type : String},
        image: { type : String},
        price: {type: Number},
        quantity: {type: Number},
    }],
    address: { type : String},
    payment: { type : String},
    status: [{
        id: {type: Number},
        name: { type : String},
        date: { type : String},
    }],
});

module.exports =mongoose.models.bills || mongoose.model('bill', billSchema);