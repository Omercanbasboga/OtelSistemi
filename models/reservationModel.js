import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  checkInDate: {
      type: Date,
      required: true
  },
  checkOutDate: {
      type: Date,
      required: true
  },
  adults: {
      type: Number,
      required: true
  },
  children: {
      type: Number,
      default: 0
  },
  price:{
    type: String,
    enum: ['500TL','750TL','1000TL','2000TL'],
    required: true
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;