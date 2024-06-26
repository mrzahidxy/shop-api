const Product = require("../models/User");
const { verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

router.route("/")
  .post(verifyTokenAndAdmin, async (req, res) => {
    try {
      const savedProduct = await Product.create(req.body);
      res.status(200).json(savedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .get(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const {
      category: qCategory,
      color: qColor,
      size: qSize,
      sortBy,
      sortOrder,
    } = req.query;
    const sortDirection = sortOrder === "desc" ? -1 : 1;

    try {
      const query = {};
      if (qCategory) query.categories = { $in: [qCategory] };
      if (qColor) query.color = { $in: [qColor] };
      if (qSize) query.size = { $in: [qSize] };

      const sortOptions = sortBy ? { [sortBy]: sortDirection } : { createdAt: -1 };

      const [products, totalProducts] = await Promise.all([
        Product.find(query).sort(sortOptions).limit(limit).skip((page - 1) * limit).lean(),
        Product.countDocuments(query),
      ]);

      const totalPages = Math.ceil(totalProducts / limit);
      const hasPreviousPage = page > 1;
      const hasNextPage = page < totalPages;

      res.status(200).json({
        message: "Products fetched successfully",
        data: products,
        pageInfo: {
          totalProducts,
          totalPages,
          page,
          limit,
          hasPreviousPage,
          hasNextPage,
        },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });

router.route("/:id")
  .put(verifyTokenAndAdmin, async (req, res) => {
    try {
      const newProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(newProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .delete(verifyTokenAndAdmin, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .get(async (req, res) => {
    try {
      const foundProduct = await Product.findById(req.params.id);
      res.status(200).json(foundProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;
