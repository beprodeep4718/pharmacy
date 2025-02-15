const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, // e.g., "Painkillers"
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 }, // Percentage discount
    stock: { type: Number, required: true }, // Quantity in stock
    manufacturer: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    countryOfOrigin: { type: String, required: true },
    description: { type: String, required: true },
    usage: { type: String, required: true }, // How to use the medicine
    sideEffects: { type: String, required: true },
    image: { type: String, required: true },  // Cloudinary URL
    reviews: [reviewSchema], // Array of reviews
    averageRating: { type: Number, default: 0 }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual field to determine if a product is available
productSchema.virtual('availability').get(function () {
    return this.stock > 0;
});

module.exports = mongoose.model('Product', productSchema);
