import Room from '../models/roomModel.js';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

const createRoom = async (req, res) => {
    try {
      const data = req.body
      const newRoom = new Room(data);

      if (req.files && req.files.img) {
        const imgFile = req.files.img;
        try {
          // Cloudinary'ye dosya yükleme
          const result = await cloudinary.uploader.upload(imgFile.tempFilePath, {
            folder: 'rooms',
          });
  
          // Resim URL'sini modele ekle
          newRoom.img = result.secure_url;
        } finally {
          // Geçici dosyayı sunucudan sil
          await fs.unlink(imgFile.tempFilePath, (err) => {
            if (err) console.log(err);
          });
        }
      }

      const response = await newRoom.save();
      console.log('data saved');
      res.status(200).json(response);
    } catch (error) {
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  };  

const updateRoom = async (req, res) => {
    try {
      const roomId = req.params.id; 
      const updatedRoomData = req.body; 
  
      const response = await Room.findByIdAndUpdate(roomId, updatedRoomData, {
          new: true, 
          runValidators: true, 
      })
  
      if (!response) {
          return res.status(404).json({ error: 'Room Item not found' });
      }
  
      console.log('data updated');
      res.status(200).json(response);
    } catch (error) {
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  };  
  
const deleteRoom = async (req, res) => {
    try {
      const roomId = req.params.id; 
        
      const response = await Room.findByIdAndDelete(roomId);
      if (!response) {
          return res.status(404).json({ error: 'Room Item not found' });
      }
      console.log('data delete');
      res.status(200).json({message: 'Room Deleted Successfully'});
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  };  

const getRooms = async (req, res) => {
    try {
      const data = await Room.find();
      console.log('data fetched');
      res.status(200).json(data);
    } catch (error) {
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  };  

export {
  createRoom,
  updateRoom,
  deleteRoom,
  getRooms,
    };