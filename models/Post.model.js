const { Schema, model } = require("mongoose");
const User = require('./User.model')

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      lowercase: true
    },
    author: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Post = model("Post", postSchema);

module.exports = Post;
