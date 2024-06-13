const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const savedProduct = await Product.create(req.body);
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});


//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//FIND SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const FoundProduct = await Product.findById(req.params.id);
    res.status(200).json(FoundProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// FIND PRODUCTS
router.get("/", async (req, res) => {
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
    // Building the query object
    const query = {};
    // Add category condition if provided
    if (qCategory) {
      query.categories = { $in: [qCategory] };
    }

    // Add color condition if provided
    if (qColor) {
      query.color = { $in: [qColor] };
    }

    if (qSize) {
      query.color = { $in: [qSize] };
    }

    // Set sort options based on query parameters
    const sortOptions = sortBy
      ? { [sortBy]: sortDirection }
      : { createdAt: -1 };

    // Fetch products and count total products
    const [products, totalProducts] = await Promise.all([
      Product.find(query)
        .sort(sortOptions)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean(),
      Product.countDocuments(query),
    ]);

    // Calculate pagination details
    const totalPages = Math.ceil(totalProducts / limit);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;

    const pageInfo = {
      totalProducts,
      totalPages,
      page,
      limit,
      hasPreviousPage,
      hasNextPage,
    };

    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
      pageInfo,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
