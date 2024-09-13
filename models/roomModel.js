import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 0, 
    },
    maxPeople: {
      type: Number,
      required: true,
      min: 1, 
    },
    desc: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500, 
    },
    status: {
      type: String,
      enum: ['clean', 'dirty', 'awaiting cleaning'],
      default: 'clean', 
    },
    img: {
      type: String,
      required: true,
    },
  },

);

const Room = mongoose.model('Room', roomSchema);

export default Room;