const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve CSS and JS files

// Connect to MongoDB
mongoose.connect('mongodb+srv://yathesthchoudhary:hannu30052003@cluster0.hkr1k.mongodb.net/registrationDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Connection Error: ", err));

// Define User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },  // Ensure email is unique
    password: String,
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Handle registration
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
        return res.json({ success: false, message: 'All fields are required!' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: 'This email is already registered!' });
        }

        // Create a new user and save to the database
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.json({ success: true, message: 'You are registered successfully!' });
    } catch (error) {
        res.json({ success: false, message: 'Registration failed!' });
    }
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// hannu@30052003
// yathesthchoudhary
