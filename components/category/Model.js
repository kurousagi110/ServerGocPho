const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const categorySchema = new Schema({
    id: ObjectID,
    name: { type : String},
    images: [{ 
        id : {ObjectID},
        name: {type: String }
    }],
});

module.exports =mongoose.models.categories || mongoose.model('category', categorySchema);