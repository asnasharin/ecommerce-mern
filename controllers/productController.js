import asyncHandler from "express-async-handler"
import ProductModel from "../models/productModel.js";
import cloudinary from "cloudinary"

// create product
export const createProductController = asyncHandler (
    async (req, res, next) => {
        let images = [];

        if (req.body.images) {
            if (typeof req.body.images === "string") {
                images.push(req.body.images);
            } else {
                images = req.body.images;
            }

            const imagesLinks = [];

            const chunksize = 3;
            const imageChunks = [];
            while (images.length > 0) {
                imageChunks.push(images.splice(0, chunksize));
            }

            for (let chunk of imageChunks) {
                const uploads = chunk.map((img) => 
                    cloudinary.v2.uploader.upload(img, {
                        folder: "Products",
                    })
                );

                const results = await Promise.all(uploads);

                for(let result of results) {
                    imagesLinks.push({
                        product_id: result.public_id,
                        url: result.secure_url,
                    });
                }
            }

            req.body.user = req.user.id;
            req.body.images = imagesLinks;
        }

        const data = await ProductModel.create(req.body);

        res.status(200).json({
            success: true,
            data: data
        });
    }
)

// get all product 
export const getAllProduct = asyncHandler (
    async (req, res) => {

        const data = await ProductModel.find({});

        res.status(200).json({
            success: true,
            message: "get all produts",
            data
        })
    }
)

// updata product
export const updateProduct = asyncHandler(
    async (req, res, next) => {
        // Find the product by ID
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return next(new Error("Product not found", 404)); // Changed error handling
        }

        let images = []

        // Handle image URLs
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        if (images.length > 0) { // Ensure images array is not empty
            // Delete old images from Cloudinary
            for (let i = 0; i < product.images.length; i++) {
                await cloudinary.v2.uploader.destroy(product.images[i].product_id);
            }
        }

        const imagesLinks = [];
        // Upload new images to Cloudinary
        for (let img of images) {
            const result = await cloudinary.v2.uploader.upload(img, {
                folder: "Products",
            });

            imagesLinks.push({
                product_id: result.public_id,
                url: result.secure_url,
            })
        }

        // Update the product with new images
        req.body.images = imagesLinks;

        // Update the product in the database
        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }); 

        res.status(200).json({ 
            success: true,
            product: updatedProduct,
        });
    }
);


// delete product
export const deleteProductController = asyncHandler(
    async (req, res, next) => {
        const product = await ProductModel.findById(req.params.id)

        if (!product) {
            return next(new Error("product not found"), 404);
        }

        // deleting image
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].product_id);
        }

        await ProductModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "deleted successfully!"
        })
    }
)