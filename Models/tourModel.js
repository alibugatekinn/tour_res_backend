const { userDb } = require('../dbConnections/userDb');
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    routes: {
      type: [String],
      required: true // Birden fazla rota noktası içerebilir ve zorunludur.
    },
    genres: {
      type: [String],
      required: true // Birden fazla etiket içerebilir ve zorunludur. Ör: ["2023", "summer", "abroad"]
    },
    program: [{
      day: { type: Number, required: true },
      description: { type: String, required: true }
    }], // Her gün için ayrı bir açıklama içerebilir ve her bir gün zorunludur.
    destinations: [{
      name: { type: String, required: true },
      description: { type: String, required: true },
      photos: { type: [String], required: true } // Birden fazla fotoğraf URL'si içerebilir ve zorunludur.
    }],
    generalPhotos: {
      type: [String],
      required: true // Genel fotoğraflar için URL'ler ve zorunludur.
    },
    generalInformation: {
      type: String,
      required: true // Genel bilgiler ve zorunludur.
    }
  });

  tourSchema.statics.addTour = async function(tourData) {
    // Gerekli alanların dolu olduğunu kontrol et
    if (!tourData.name || !tourData.routes || !tourData.genres || !tourData.program || 
        !tourData.destinations || !tourData.generalPhotos || !tourData.generalInformation) {
        throw new Error('Tüm alanlar doldurulmalıdır.');
    }

    // Yeni tur oluştur
    const tour = await this.create(tourData);
    return tour;
}


tourSchema.statics.getTours = async function() {
    const tours = await this.find({});
    return tours;
}

const Tour = userDb.model('Tour', tourSchema);

module.exports = Tour;

