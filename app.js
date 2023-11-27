const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/contactform', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Create a Contact model
const Contact = mongoose.model('Contact', contactSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Save contact form data to MongoDB
  const newContact = new Contact({ name, email, message });
  await newContact.save();

  // Redirect to a "Thank You" page
  res.redirect('/thank-you');
});

app.get('/thank-you', (req, res) => {
  res.render('thank-you');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
