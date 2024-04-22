const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  post_description: String,
  post_files: [String],
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  created: {
    type: Date,
  },
});

postSchema.pre('save', function (next) {
    // Set created_date to the current date and time before saving
    if (!this.created) {
      this.created = new Date();
    }
    next();
});

postSchema.virtual('replies', {
    ref: 'Reply',
    localField: '_id',
    foreignField: 'post_id',
});


const Post = mongoose.model('Post', postSchema);

const replySchema = new mongoose.Schema({
    reply_description: String,
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', // Reference to the User model
    },
    created_by: Object,
    created: {
      type: Date,
    },
  });
  
  replySchema.pre('save', function (next) {
      // Set created_date to the current date and time before saving
      if (!this.created) {
        this.created = new Date();
      }
      next();
  });

const Reply = mongoose.model('Reply', replySchema);


module.exports = {
    Post,
    Reply
}
