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

// get all product admin
export const getAllProductsAdmin= asyncHandler (
    async (req, res) => {

        const data = await ProductModel.find({});

        res.status(200).json({
            success: true,
            message: "get all produts",
            data
        })
    }
)

// getall product 
export const getAllProduct = asyncHandler(
    async (req, res) => {
        try {
            const { price, category, ratings } = req.query;
            console.log("Backend query filters:", { price, category, ratings });
        let query = {};

        if (category) {
            query.category = category;
        }

        if (price) {
            const [min, max] = price.split(',');
            query.price = {$gte: Number(min), $lte: Number(max) };
        }

        if (ratings) {
            query.ratings = { $gte: Number(ratings) };
        }

        const data = await ProductModel.find(query);

        res.status(200).json({
            success: true,
            count: data.length,
            data,
        });

        } catch (error) {
           res.status(500).send({
            success: false,
            message: error.message
           }) 
        }
    } 
)

// update product
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

// get product details
export const getProductDetails = asyncHandler (
    async (req, res, next) => {
        const id = req.params.id;

        const product = await ProductModel.findById(id);
        if(!product) {
            return next(new Error("product not found"), 404);
        } 
        res.status(200).send({
            success: true,
            product: product,
        })
    }
)

// get all reviews
export const getAllReviews = asyncHandler(
    async(req, res, next) => {
        const reviews = await ProductModel.findById(req.params.id);

        if(!reviews) {
            return next(new Error("no priduct found"), 404);
        }

        res.status(200).send({
            success: true,
            reviews: reviews.reviews
        })
    }
)

// update review
export const createProductReview = asyncHandler(
    async (req, res, next) => {

        const { title, productId, ratings, comment, recommented } = req.body;
           
        const review = {
            userId: req.user._id,
            name: req.user.name,
            ratings: Number(ratings),
            title: title,
            comment: comment,
            recommented: recommented,
            // avatar: req.user.avatar.url,
        };

        const product = await ProductModel.findById(productId);

        const isReviewed = product.reviews.find((rev) => {
            return rev.userId.toString() === req.user._id.toString();
        });

        if(isReviewed) {
            // updating existing review
            product.reviews.forEach((rev) => {
                if (rev.userId.toString() === req.user._id.toString()) {
                    rev.ratings = ratings;
                    rev.comment = comment;
                    rev.recommended = recommented;
                    rev.title = title;
                    product.numOfReviews = product.reviews.length;
                }
            });
        } else {
            // add new review
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }

        // calculating average rating
        let totalRating = 0;
        product.reviews.forEach((rev) => {
            totalRating += rev.ratings;
        });
        product.ratings = totalRating / product.reviews.length;

        await product.save({ validateBeforeSave: false });

        res.status(200).send({
            success: true,
            product
        });
    }
)


// delete review
export const deleteReview = asyncHandler(
    async( req, res, next) => {

        const product = await ProductModel.findById(req.query.product_id);

        if(!product) {
            return next(new Error("product not found"), 404);
        }

        const reviews = product.reviews.filter(
            (rev) => { return rev._id.toString() !== req.query.id.toString()}
        );

        let avg = 0;
        reviews.forEach((rev) => {
            avg += rev.ratings;
        });

        let ratings = 0;
        if (reviews.length === 0) {
            ratings = 0;
        } else {
            ratings = avg / reviews.length;
        }

        const numOfReviews = reviews.length;

        await ProductModel.findByIdAndUpdate (
            req.query.product_id,
            {
                reviews,
                ratings,
                numOfReviews
            },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
              }
            );

            res.status(200).json({
                success: true
            })
    }
)



