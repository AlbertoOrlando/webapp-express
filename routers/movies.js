const express = require('express');
const router = express.Router();

const { index, show, storeReviews } = require('../controllers/moviesController');

// rotte

router.get("/", index);

router.get("/:id", show);

router.post("/:id/reviews", storeReviews)


module.exports = router;
