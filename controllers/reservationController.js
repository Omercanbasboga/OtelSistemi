import Reservation from '../models/reservationModel.js';

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.render('reservations', { reservations });
    } catch (err) {
        res.status(500).send({ message: 'Rezervasyonlar alınamadı' });
    }
};

const createReservation = async (req, res) => {
    try {
        const data = req.body
        const newReservation = new Reservation(data);
    
        const response = await newReservation.save();
        console.log('data saved');

        return res.status(200).json({ message: 'Rezervasyon başarıyla oluşturuldu!' });

      } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
      }
};

const updateReservation = async (req, res) => {
    try {
        const reservationId = req.params.id; 
        const updatedReservationData = req.body; 
    
        const response = await Reservation.findByIdAndUpdate(reservationId, updatedReservationData, {
            new: true, 
            runValidators: true, 
        })
    
        if (!response) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
    
        console.log('data updated');
        res.status(200).json(response);
      } catch (error) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
      }
};

const deleteReservation = async (req, res) => {
    try {
        const reservationId = req.params.id; 
          
        const response = await Reservation.findByIdAndDelete(reservationId);
        if (!response) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'Reservation Deleted Successfully'});
      } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
      }
};

export {
    getReservations,
    createReservation,
    updateReservation,
    deleteReservation,
    };