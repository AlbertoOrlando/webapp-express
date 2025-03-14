const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multer');

const { index, show, storeReviews, store, destroy, deleteReviews } = require('../controllers/moviesController');

// rotte

router.get("/", index);

router.get("/:id", show);

router.post('/', upload.single('image'), store);

router.post("/:id/reviews", storeReviews)

router.delete("/:id", destroy)

router.delete("/:id/reviews/:id", deleteReviews)


module.exports = router;
