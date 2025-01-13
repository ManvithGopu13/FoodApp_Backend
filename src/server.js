
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// // const twilio = require('twilio');

// const PORT = 5000; // Define the port for the server
// const MONGO_URI = 'mongodb+srv://Manvith:manvith1234@tooclone.dukdn.mongodb.net/TooClone?retryWrites=true&w=majority';

// // Initialize the Express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Define the schema and model for Food
// const FoodSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   imageUrl: { type: String, required: true },
// });

// const FoodModel = mongoose.model('Food', FoodSchema);

// // Add a new food item
// app.post('/addFood', async (req, res) => {
//   try {
//     const { name, description, price, imageUrl } = req.body;
//     if (!name || !description || !price || !imageUrl) {
//       return res.status(400).send({ error: 'All fields are required' });
//     }

//     const newFood = new FoodModel({ name, description, price, imageUrl });
//     await newFood.save();

//     console.log('Food added successfully');
//     res.status(201).send({ message: 'Food added successfully.' });
//   } catch (error) {
//     console.error('Error adding food:', error.message);
//     res.status(500).send({ error: error.message });
//   }
// });

// // Get all food items
// app.get('/getFoods', async (req, res) => {
//   try {
//     const foods = await FoodModel.find();
//     // console.log('Foods retrieved successfully');
//     res.status(200).send(foods);
//   } catch (error) {
//     console.error('Error retrieving foods:', error.message);
//     res.status(500).send({ error: error.message });
//   }
// });


// ///  Location Functions
// // Define the schema and model for Location
// const LocationSchema = new mongoose.Schema({
//   address: { type: String, required: true },
//   latitude: { type: Number, required: true },
//   longitude: { type: Number, required: true },
// });

// const LocationModel = mongoose.model('Location', LocationSchema);

// // Add a new location
// app.post('/addLocation', async (req, res) => {
//   try {
//     const { address, latitude, longitude } = req.body;
//     if (!address || latitude === undefined || longitude === undefined) {
//       return res.status(400).send({ error: 'All fields are required' });
//     }

//     const newLocation = new LocationModel({ address, latitude, longitude });
//     await newLocation.save();

//     console.log('Location added successfully');
//     res.status(201).send({ message: 'Location added successfully.' });
//   } catch (error) {
//     console.error('Error adding location:', error.message);
//     res.status(500).send({ error: error.message });
//   }
// });

// // Get all locations
// app.get('/getLocations', async (req, res) => {
//   try {
//     const locations = await LocationModel.find();
//     res.status(200).send(locations);
//   } catch (error) {
//     console.error('Error retrieving locations:', error.message);
//     res.status(500).send({ error: error.message });
//   }
// });

// // Health check endpoint
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });


// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI
const MONGO_URI = 'mongodb+srv://Manvith:manvith1234@tooclone.dukdn.mongodb.net/TooClone?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Food Schema and Model
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  imageUrl: {
    type: String,
    required: true,
    default:
      'https://yeyfood.com/wp-content/uploads/2024/08/WEB1indian_chicken_biryani._served_on_a_white_plate._s_77c8f1ca-f01e-4a4d-9f2c-61bce785c1d7_3-735x735.jpg',
  },
});

const Food = mongoose.model('ResFood', foodSchema);

// Location Schema and Model
const locationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const Location = mongoose.model('Location', locationSchema);

// Food Routes
app.get('/api/res_foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
});

app.post('/api/res_foods', async (req, res) => {
  try {
    const { name, description, price, quantity, imageUrl } = req.body;
    const newFood = new Food({ name, description, price, quantity, imageUrl });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    console.error('Error adding food:', error);
    res.status(500).json({ error: 'Failed to add food' });
  }
});

app.put('/api/res_foods/:id', async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFood);
  } catch (error) {
    console.error('Error updating food:', error);
    res.status(500).json({ error: 'Failed to update food' });
  }
});

app.delete('/api/res_foods/:id', async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting food:', error);
    res.status(500).json({ error: 'Failed to delete food' });
  }
});

// Location Routes
app.post('/addLocations', async (req, res) => {
  try {
    const { address, latitude, longitude } = req.body;
    const newLocation = new Location({ address, latitude, longitude });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    console.error('Error adding location:', error);
    res.status(500).json({ error: 'Failed to add location' });
  }
});

app.get('/getLocations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});


/// Order Functions

// Define the Order Schema
const OrderSchema = new mongoose.Schema({
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  items: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  transactionId: { type: String, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  otp: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  delivered: { type: Boolean, required: true },
});

// Create the Order model
const Order = mongoose.model('Order', OrderSchema);

// Endpoint to create an order
app.post('/orders', async (req, res) => {
  const { user, items, totalAmount, transactionId, paymentStatus, otp , delivered} = req.body;

  try {
    const newOrder = new Order({
      user,
      items,
      totalAmount,
      transactionId,
      paymentStatus: paymentStatus || 'Pending',
      otp,
      delivered,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Endpoint to fetch all orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Endpoint to fetch an order by ID
app.get('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error.message);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

app.put('/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating Order:', error);
    res.status(500).json({ error: 'Failed to update Order' });
  }
});

// Endpoint to delete an order
app.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error.message);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});


// Health Check
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
