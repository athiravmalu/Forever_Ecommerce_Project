const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectCloudinary = require('./Config/Cloudinary');
const mongoDB = require('./Config/mongodb');
const userRoutes = require('./Routers/userRoutes');
const productRouter = require('./Routers/productRoutes');
const cartRouter = require("./Routers/cartRoutes");
const orderRouter = require("./Routers/orderRoutes");


dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

connectCloudinary();
mongoDB();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

// ✅ API routes

app.use('/product', productRouter);
app.use('/user', userRoutes);
app.use("/cart", cartRouter);
app.use("/order", orderRouter); 

app.listen(PORT, () => {
  console.log(`✅ Server connected on port ${PORT}`);
});
