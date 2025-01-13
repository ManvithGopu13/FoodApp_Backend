const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const MONGO_URI = 'mongodb+srv://Manvith:manvith1234@tooclone.dukdn.mongodb.net/TooClone?retryWrites=true&w=majority';

// MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Food Schema and Model
const newfoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String, required: true, default: 'https://yeyfood.com/wp-content/uploads/2024/08/WEB1indian_chicken_biryani._served_on_a_white_plate._s_77c8f1ca-f01e-4a4d-9f2c-61bce785c1d7_3-735x735.jpg' },
  });
const ResFood = mongoose.model('ResFood', newfoodSchema);

// Routes
app.get('/api/res_foods', async (req, res) => {
    try {
      const foods = await ResFood.find();
      console.log("Fetching foods called")
      res.json(foods);
    } catch (error) {
      console.error('Error fetching foods:', error);
      res.status(500).json({ error: 'Failed to fetch foods' });
    }
  });
  
  app.post('/api/res_foods', async (req, res) => {
    try {
      const { _id, ...foodData } = req.body; // Exclude _id if it's present
      const newFood = new ResFood(foodData);
      await newFood.save();
      res.status(201).json(newFood);
    } catch (error) {
      console.error('Error adding food:', error);
      res.status(500).json({ error: 'Failed to add food' });
    }
  });
  
  app.put('/api/res_foods/:id', async (req, res) => {
    try {
      const updatedFood = await ResFood.findByIdAndUpdate(req.params.id, req.body, { new: true });
      console.log("Updating foods called")
      res.json(updatedFood);
    } catch (error) {
      console.error('Error updating food:', error);
      res.status(500).json({ error: 'Failed to update food' });
    }
  });
  
  app.delete('/api/res_foods/:id', async (req, res) => {
    try {
      await ResFood.findByIdAndDelete(req.params.id);
      console.log("Deleting foods called")
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting food:', error);
      res.status(500).json({ error: 'Failed to delete food' });
    }
  });
  
// Health check endpoint
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
