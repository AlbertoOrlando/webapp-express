const express = require('express');
const router = express.Router();

const { index, show, storeReviews, destroy } = require('../controllers/moviesController');

// rotte

router.get("/", index);

router.get("/:id", show);

router.post("/:id/reviews", storeReviews)

router.delete("/:id", destroy)


module.exports = router;
