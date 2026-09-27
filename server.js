const express = require("express");
require("dotenv").config();

const connectDB = require("./config/connection");
const productRoutes = require("./routes/productRoutes");

const app = express();

const PORT = process.env.PORT || 3000;


// DATABASE
connectDB();


// MIDDLEWARE
app.use(express.json());


// ROUTES
app.get("/", (req, res) => {
    res.json({
        message: "Zenith Product API is running"
    });
});

app.use("/api/products", productRoutes);


// SERVER
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});