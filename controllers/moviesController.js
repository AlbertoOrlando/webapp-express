const connection = require('../data/db.js');

function index(req, res) {

    const sql = 'SELECT * FROM movies';
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Il database non risponde" });
        }

        const movies = results.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        });
        res.json(movies);

    });
}

function show(req, res) {
    const id = req.params.id;
    const sql = 'SELECT * FROM movies WHERE id = ?';

    const reviewSql = "SELECT * FROM reviews WHERE movie_id = ?";

    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Il database non risponde" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Film non trovato" });
        }

        results[0].image = req.imagePath + results[0].image;

        connection.query(reviewSql, [id], (err, reviews) => {
            if (err) {
                return res.status(500).json({ error: "Il database non risponde" });
            }
            results[0].reviews = reviews
            res.json(results[0]);
        }
        )

    });
}

module.exports = { index, show };

