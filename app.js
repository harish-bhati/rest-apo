require('dotenv').config();
const express = require('express');
const app = express();
const PORT= process.env.PORT || 3000;
const productRouter = require('./routes/product');
const connectDB = require('./db/connect');

// middleware
app.use('/api/products',productRouter);

const startServer = async() => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('Error starting server:', error);
  }  
}
startServer();