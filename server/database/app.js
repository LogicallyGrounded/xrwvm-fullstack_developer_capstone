const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const port = 3030;

app.use(express.urlencoded({ extended: false }));

const Reviews = require('./review');
const Dealerships = require('./dealership');

try {
    mongoose.connect("mongodb://mongo_db:27017/", { dbName: 'dealershipsDB' });
} catch (error) {
    console.log("Error connecting to DB", error);
}

try {
  let reviews_data = JSON.parse(fs.readFileSync('./data/reviews.json', 'utf8'));
  let dealerships_data = JSON.parse(fs.readFileSync('./data/dealerships.json', 'utf8'));
  Reviews.deleteMany({}).then(() => {
    Reviews.insertMany(reviews_data.reviews);
  });
  Dealerships.deleteMany({}).then(() => {
    Dealerships.insertMany(dealerships_data.dealerships);
  });
} catch (error) {
  console.log(error);
}

app.get('/', async (req, res) => {
    res.send("Welcome to the Mongoose API");
});

app.get('/fetchReviews', async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({dealership: parseInt(req.params.id)});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Required by Lab Part 3
app.get('/fetchDealers', async (req, res) => {
  try {
    const dealers = await Dealerships.find();
    res.json(dealers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealers' });
  }
});

// Required by Lab Part 3
app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const dealers = await Dealerships.find({state: req.params.state});
    res.json(dealers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealers' });
  }
});

// Required by Lab Part 3
app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const dealer = await Dealerships.find({id: parseInt(req.params.id)});
    res.json(dealer);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealer' });
  }
});

app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  let data = JSON.parse(req.body);
  const documents = await Reviews.find().sort( { id: -1 } );
  let new_id = documents.length > 0 ? documents[0].id + 1 : 1;
  const review = new Reviews({
    "id": new_id, "name": data.name, "dealership": data.dealership, "review": data.review,
    "purchase": data.purchase, "purchase_date": data.purchase_date, "car_make": data.car_make,
    "car_model": data.car_model, "car_year": data.car_year,
  });
  try {
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
    res.status(500).json({ error: 'Error inserting review' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
