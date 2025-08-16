const mongoose = require('mongoose');
// const Category = require('./Category');

const BookSchema = new mongoose.Schema({
    title: String,
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author' // Reference to the Author model
    },
    CategoryIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category' // Reference to the Category model
    }]
});

module.exports = mongoose.model('Book', BookSchema);