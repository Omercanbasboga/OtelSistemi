import Person from '../models/personModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateToken } from '../middlewares/authMiddleware.js';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

const addPerson = async (req, res) => {
  try {
    const data = req.body // Assuming the request body contains the person data
    const { email } = req.body;

    const existingPerson = await Person.findOne({ email });
    if (existingPerson) {
      return res.status(400).json({ error: 'Bu e-posta adresi zaten kayıtlı.' });
    }

    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    if (req.files && req.files.img) {
      const imgFile = req.files.img;
      try {
        // Cloudinary'ye dosya yükleme
        const result = await cloudinary.uploader.upload(imgFile.tempFilePath, {
          folder: 'persons',
        });

        // Resim URL'sini modele ekle
        newPerson.img = result.secure_url;
      } finally {
        // Geçici dosyayı sunucudan sil
        await fs.unlink(imgFile.tempFilePath, (err) => {
          if (err) console.log(err);
        });
      }
    }

    // Save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');

    const payload = {
        id: response.id,
        email: response.email
    }
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is : ", token);

    res.status(200).json({response: response, token: token});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};  

const loginPerson = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await Person.findOne({ email: email });

    // If user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ errorMessage: 'Invalid email or password' });
    }

    // Generate token
    const payload = {
      id: user.id,
      email: user.email
    };
    const token = generateToken(payload);

    // Return token in cookie
    res.cookie('authToken', token, { httpOnly: true, secure: true });
    return res.redirect('/admin/add');  
    
  } catch (err) {
    console.error(err);
    res.render('login', { errorMessage: 'Invalid username or password.' });
  }
};


const getDashboardPage = async (req, res) => {
  try{
    const userData = req.user;
    console.log("User Data: ", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({user});
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};  

const getPerson = async (req, res) => {
  try{
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};  

const getPersonWWorkType = async (req, res) => {
  try{
    const workType = req.params.workType; // // Extract the work type from the URL parameter
    if(workType == 'chef' || workType == 'housekeeper' || workType == 'receptionist' ){
        const response = await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
    }else{
        res.status(404).json({error: 'Invalid work type'});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const updatePerson = async (req, res) => {
  try {
    const personId = req.params.id; // URL'den ID'yi al
    const updatedPersonData = req.body; // Güncellenmiş veriler

    // Mevcut personel verilerini al
    const person = await Person.findById(personId);
    if (!person) {
      return res.status(404).json({ error: 'Personel bulunamadı' });
    }

    // Resim dosyasının olup olmadığını kontrol et
    if (req.files && req.files.image) {
      const imageFile = req.files.image.tempFilePath;
      
      if (!fs.existsSync(imageFile)) {
        return res.status(400).json({ error: 'Resim dosyası geçici klasörde bulunamadı' });
      }
    
      // Cloudinary'e yeni resmi yükle ve eski resmi sil
      try {
        // Eski resmi Cloudinary'den sil
        if (person.img && person.img.public_id) {
          await cloudinary.uploader.destroy(person.img.public_id);
        }

        // Yeni resmi Cloudinary'e yükle
        const result = await cloudinary.uploader.upload(imageFile, {
          folder: 'persons', // Klasör belirtebilirsiniz
        });

        // Yüklenen resmin bilgilerini kaydet
        updatedPersonData.img = {
          url: result.secure_url,
          public_id: result.public_id,
        };
        
        // Geçici dosyayı sil
        fs.unlinkSync(imageFile); 
      } catch (err) {
        console.error('Cloudinary yükleme hatası:', err);
        return res.status(500).json({ error: 'Resim yükleme başarısız' });
      }
    }
        
    // Diğer güncelleme verilerini set et
    const response = await Person.findByIdAndUpdate(personId, { $set: updatedPersonData }, {
      new: true, // Güncellenmiş dokümanı döndür
      runValidators: true, // Mongoose doğrulamalarını çalıştır
      context: 'query' // Doğrulamalar için query bağlamı kullan
    });

    if (!response) {
      return res.status(404).json({ error: 'Personel bulunamadı' });
    }

    console.log('Personel güncellendi:', response.updatedAt);
    res.status(200).json({ message: 'Personel başarıyla güncellendi', person: response });
  } catch (err) {
    console.error('Güncelleme hatası:', err);
    res.status(500).json({ error: err.message || 'Sunucu hatası' });
  }
};


const deletePerson = async (req, res) => {
  try{
    const personId = req.params.id; // Extract the person's ID from the URL parameter
    
    // Assuming you have a Person model
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
        return res.status(404).json({ error: 'Person not found' });
    }
    console.log('data delete');
    res.status(200).json({message: 'person Deleted Successfully'});
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export {
  addPerson,
  loginPerson,
  getDashboardPage,
  getPerson,
  getPersonWWorkType,
  updatePerson,
  deletePerson,
  };