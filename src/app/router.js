const router = require('express').Router();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const FF_ProductsDB = 'FondaFantasma_Products';
const especialesCollection = 'especials';
const clasicosCollection = 'Clasicos';

// Load initial data
router.get('/', async (_, res) => {
  try {
    await client.connect();
    const products_db = client.db(FF_ProductsDB);
    const especiales = products_db.collection(especialesCollection);
    const clasicos = products_db.collection(clasicosCollection);
    const especialesData = await especiales.find({}).toArray();
    const clasicosData = await clasicos.find({}).toArray();
    res.render('index', {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      title: 'Menú | Fonda Fantasma',
      especial: especialesData[0],
      Clasicos: clasicosData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// Calculate delivery cost
router.post('/api/calculate-delivery', async (req, res) => {
  const { latitude, longitude } = req.body;

  const client_location = `${latitude},${longitude}`;
  const ff_location = process.env.FF_LOCATION;

  try {
    // Call Google Maps Distance Matrix API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${client_location}&destinations=${ff_location}&key=${GOOGLE_MAPS_API_KEY}`,
    );

    const data = await response.json();

    if (data.rows[0].elements[0].status === 'OK') {
      const distance = data.rows[0].elements[0].distance.value / 1000; // Distance in kilometers
      const duration = data.rows[0].elements[0].duration.value / 60; // Time in minutes
      console.log('distance:', distance, 'duration:', duration);
      // CALCULATE DELIVERY PRICE
      const distance_base_rate = 4.44; // units per km
      const time_base_rate = 1.5; // units per minute
      const delivery_cost =
        distance_base_rate * distance + time_base_rate * duration;

      res.json({ delivery_cost });
    } else {
      res.status(500).json({ error: 'Could not calculate distance.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching from Google Maps API.' });
  }
});

module.exports = router;
