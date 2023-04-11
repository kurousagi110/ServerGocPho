const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectID},
    name: { type : String},
    price: {type: Number},
    quantity: {type: Number},
    images: [{ 
        id: {type: ObjectID},
        name: {type: String }
    }],
    detail: { type : String},
    category: { type : String},
    favorites: [{ 
        id: {type: Number},
        name: { type : String},
        price: {type: Number},
        quantity: {type: Number},
        image: { type : String},
     }],
    status: {type: Number},
});

module.exports =mongoose.models.products || mongoose.model('product', productSchema);