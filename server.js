const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.get('/', (req, res) => {
    res.render('home');
});

// 5G Phones page
app.get('/phones', (req, res) => {
    fs.readFile('5g_phone.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Server Error');
        const products = JSON.parse(data);
        res.render('phones', { products });
    });
});

// Laptops page
app.get('/laptops', (req, res) => {
    fs.readFile('laptop.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Server Error');
        const products = JSON.parse(data);
        res.render('laptops', { products });
    });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

