import Person from '../models/personModel.js';
import MenuItem from '../models/menuItemModel.js';
import Room from '../models/roomModel.js';
import Reservation from '../models/reservationModel.js';

const getLoginPage = (req, res) => {
    res.render('admin/login', {
      link: 'login',
    });
  };

  const getAddPage = async (req, res) => {
    try {
      const person = await Person.findOne({ _id: req.user.id });
      const menus = await MenuItem.find({});
      const rooms = await Room.find({});
      
      res.status(200).render('admin/add', {
        person,
        menus,
        rooms,
        link: 'add',
      });
    } catch (error) {
      res.status(500).json({
        succeded: false,
        error,
      });
    }
  };

  const getEditPage = async (req, res) => {
    try {
      const person = await Person.findOne({ _id: req.user.id });
      const persons = await Person.find({});
      const menus = await MenuItem.find({});
      const rooms = await Room.find({});
      
      res.status(200).render('admin/adminEdit', {
        person,
        persons,
        menus,
        rooms,
        link: 'adminedit',
      });
    } catch (error) {
      res.status(500).json({
        succeded: false,
        error,
      });
    }
  };

  const getReservationPage = async (req, res) => {
    try {
      const person = await Person.findOne({ _id: req.user.id });
      const reservations = await Reservation.find({});
      
      res.status(200).render('admin/reservation', {
        person,
        reservations,

        link: 'reservation',
      });
    } catch (error) {
      res.status(500).json({
        succeded: false,
        error,
      });
    }
  };


  export {
    getLoginPage,
    getAddPage,
    getEditPage,
    getReservationPage
  };