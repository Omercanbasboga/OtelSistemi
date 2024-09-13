import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive'], 
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true,
    },

    ingredients:{
        type: [String],
        default: [],
        required: true,
    },
    num_sales: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        enum: ['appetizer', 'main course', 'dessert', 'beverage'],
        default: 'main course',
    },
    desc: {
        type: String,
        trim: true, 
        required: true,
    },
    img: {
        type: String,
        required: true,
      },
 },
 { 
    timestamps: true 
 }
);

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;