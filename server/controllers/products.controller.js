const Product = require('../models/product.model');
const cloudinary = require('../utils/cloudinary');
const multer = require('multer');

// Multer Setup for Memory Storage (Handling Image Uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.createProduct = [
  upload.single('image'), // Middleware for handling image uploads
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' });
      }

      if (!req.body.data) {
        return res.status(400).json({ message: 'Product data is required' });
      }

      // Parse JSON data from req.body.data
      const productData = JSON.parse(req.body.data);

      const { name, category, price, discount, stock, manufacturer, expiryDate, countryOfOrigin, description, usage, sideEffects } = productData;

      // Upload image to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image', folder: 'products' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      // Save Product to MongoDB
      const newProduct = new Product({
        name,
        category,
        price,
        discount,
        stock,
        manufacturer,
        expiryDate,
        countryOfOrigin,
        description,
        usage,
        sideEffects,
        image: result.secure_url // ✅ Cloudinary Image URL
      });

      const savedProduct = await newProduct.save();
      return res.status(201).json(savedProduct);

    } catch (error) {
      console.error('Upload Error:', error);
      return res.status(500).json({ message: error.message });
    }
  }
];




exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
