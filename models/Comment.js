const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
   content: String,
  commenttableId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  commentableType: {
    type: String,
    enum: ["Post", "Vedio"], // Specify the types of commentable entities
    required: true
  }
   
    
});

module.exports = mongoose.model('Comment', CommentSchema);