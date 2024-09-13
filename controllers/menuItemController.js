import MenuItem from '../models/menuItemModel.js';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

const addMenuItem = async (req, res) => {
  try {
    const data = req.body
    const newMenu = new MenuItem(data);

    if (req.files && req.files.img) {
      const imgFile = req.files.img;
      try {
        // Cloudinary'ye dosya yükleme
        const result = await cloudinary.uploader.upload(imgFile.tempFilePath, {
          folder: 'menuItems',
        });

        // Resim URL'sini modele ekle
        newMenu.img = result.secure_url;
      } finally {
        // Geçici dosyayı sunucudan sil
        await fs.unlink(imgFile.tempFilePath, (err) => {
          if (err) console.log(err);
        });
      }
    }

    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const getMenuItems = async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (error) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const getMenuItemsWTaste = async (req, res) => {
  try {
    const tasteType = req.params.taste; // // Extract the taste type from the URL parameter
    if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy' ){
        const response = await MenuItem.find({taste: tasteType});
        console.log('response fetched');
        res.status(200).json(response);
    }else{
        res.status(404).json({error: 'Invalid Taste type'});
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the id of Menu Item from the URL parameter
    const updatedMenuData = req.body; // Updated data for the Menu Item

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
    })

    if (!response) {
        return res.status(404).json({ error: 'Menu Item not found' });
    }

    console.log('data updated');
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the Menu's ID from the URL parameter
        
    // Assuming you have a MenuItem model
    const response = await MenuItem.findByIdAndDelete(menuId);
    if (!response) {
        return res.status(404).json({ error: 'Menu Item not found' });
    }
    console.log('data delete');
    res.status(200).json({message: 'Menu Deleted Successfully'});
  } catch (error) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export {
  addMenuItem,
  getMenuItems,
  getMenuItemsWTaste,
  updateMenuItem,
  deleteMenuItem,
  };