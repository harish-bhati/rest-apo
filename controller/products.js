const Product = require('../models/product');

const getAllProducts = async (req, res) => {
  try {
    // Remove 'sort' from query params before filtering
    const { sort, ...filters } = req.query;
    const allProducts = await Product.find(filters);
    res.status(200).json({ allProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProductsTesting = async (req, res) => {
  try {
    const { sort, select, page = 1, limit = 3, ...filters } = req.query;

    let query = Product.find(filters);

    if (sort) {
      const sortBy = sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('createdAt');
    }

    if (select) {
      const selectBy = select.split(',').join(' ');
      query = query.select(selectBy);
    }

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    console.log('Page:', pageNum, 'Limit:', limitNum, 'Skip:', skip); // Debug

    query = query.skip(skip).limit(limitNum);

    const allProducts = await query;
    res.status(200).json({ allProducts, length: allProducts.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllProducts, getAllProductsTesting };