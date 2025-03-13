const express = require('express');
const router = express.Router();

const { index, show, storeReviews, destroy, deleteReviews } = require('../controllers/moviesController');

// rotte

router.get("/", index);

router.get("/:id", show);

router.post("/:id/reviews", storeReviews)

router.delete("/:id", destroy)

router.delete("/:id/reviews/:id", deleteReviews)


module.exports = router;
