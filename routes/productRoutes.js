const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const router = express.Router();


// CREATE
// POST /api/products
router.post("/", async (req, res) => {
    try {
        const product = new Product(req.body);

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


// READ ALL
// GET /api/products
router.get("/", async (req, res) => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            sortBy,
            page = 1,
            limit = 10
        } = req.query;

        const query = {};

        // Category filter
        if (category) {
            query.category = category;
        }

        // Price filters
        if (minPrice || maxPrice) {
            query.price = {};

            if (minPrice) {
                query.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                query.price.$lte = Number(maxPrice);
            }
        }

        // Pagination
        const pageNumber = Math.max(Number(page), 1);
        const limitNumber = Math.max(Number(limit), 1);
        const skip = (pageNumber - 1) * limitNumber;

        // Sorting
        let sort = {};

        if (sortBy === "price_asc") {
            sort.price = 1;
        } else if (sortBy === "price_desc") {
            sort.price = -1;
        }

        const products = await Product.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limitNumber);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// READ ONE
// GET /api/products/:id
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: "Invalid product ID"
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// UPDATE
// PUT /api/products/:id
router.put("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: "Invalid product ID"
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        Object.assign(product, req.body);

        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


// DELETE
// DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: "Invalid product ID"
            });
        }

        const deletedProduct = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!deletedProduct) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


module.exports = router;