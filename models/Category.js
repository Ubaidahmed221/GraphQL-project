const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model for subcategories
        default: null // Allow null for top-level categories
    }
    
});

module.exports = mongoose.model('Category', CategorySchema);