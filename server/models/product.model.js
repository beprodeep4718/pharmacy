const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },  // This will store the Cloudinary URL
    manufacturer: { type: String, required: true }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

productSchema.virtual('availability').get(function () {
    return !!this._id;
});

module.exports = mongoose.model('Product', productSchema);
