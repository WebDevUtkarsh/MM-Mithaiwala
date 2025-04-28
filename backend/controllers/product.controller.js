import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
    const { name, description, category, basePrice, gstRate, variants, image } = req.body;

    const product = new Product({
        name,
        description,
        category,
        basePrice,
        gstRate,
        variants,
        image
    });

    const createProduct = await product.save();
    res.status(201).json({ createProduct });
}

export const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
}