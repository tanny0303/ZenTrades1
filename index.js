const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    // Fetch JSON data from the API
    const response = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json');
    const data = response.data;

    // Extract data from the 'products' key
    const productsData = data.products || {};

    // Create an array of products with additional ID property
    const productsArray = Object.entries(productsData).map(([id, product]) => ({
      ID: id,
      Popularity: parseInt(product.popularity),
      Price: parseFloat(product.price),
      Title: product.title,
      Subcategory: product.subcategory,
    }));

    // Sort the products array by descending popularity
    const sortedProducts = productsArray.sort((a, b) => b.Popularity - a.Popularity);

    res.json(sortedProducts);
  } catch (error) {
    console.error('Error fetching and processing data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
