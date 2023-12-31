const TourModel = require('../Models/tourModel');



const addTour = async (req, res) => {
    try {
        const tour = await TourModel.create(req.body);
        res.status(200).json({ message: "Tur başarıyla eklendi", tour });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const getTours = async (req, res) => {
    try {
        const tours = await TourModel.find({});
        res.status(200).json({ tours });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    addTour,
    getTours
};
