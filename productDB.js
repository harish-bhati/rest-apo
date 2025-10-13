require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/product');
const productJson = require('./product.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI); // Connect to the database                     
    console.log('Products inserted successfully');
    Product.deleteMany(); // Delete all existing products
    await Product.create(productJson); // Insert new products 
    // process.exit(0); // Exit the process
    } catch (error) {

    console.error(error);
    // process.exit(1); // Exit with failure
  }
};
start();