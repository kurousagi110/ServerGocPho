const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const userSchema = new Schema({
    id: {type: ObjectID},
    email: { type : String, unique: true ,default: null},
    password: { type : String ,default: null},
    phonenumber: { type : String, unique: true ,default: null},
    country: { type : String ,default: null},
    username: { type : String, unique: true ,default: null},
    addresses: [{
        id: {type: Number},
        name: { type : String},
    }], default: [],
    fullname: { type : String ,default: null},
    birthday: { type : String ,default: null},
    favorites: [{
        id: {type: Number},
        name: { type : String},
        price: {type: Number},
        quantity: {type: Number},
        image: { type : String},
    }], default: [],
    carts:[{
        id: {type: Number},
        name: { type : String },
        price: {type: Number},
        quantity: {type: Number},
        image: { type : String },
    }], default: [],
    status : {type: Number, default: 0},
 });


module.exports =mongoose.models.users || mongoose.model('user', userSchema);