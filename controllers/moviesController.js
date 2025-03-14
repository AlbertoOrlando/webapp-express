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

function store(req, res, next) {

    const { title, director, abstract } = req.body;

    // gestiamo il valore del nome file creato dal middleware
    const imageName = `${req.file.filename}`;

    // creiamo la query di insert
    const query = "INSERT INTO movies (title, director, image, abstract) VALUES (?, ?, ?, ?)";

    connection.query(query,
        [title, director, imageName, abstract],
        (err, result) => {
            if (err) {
                console.log(err)
                return next(new Error("Errore interno del server"));
            }

            res.status(201).json({
                status: "success",
                message: "Libro creato con successo!",
            });
        })

}

function storeReviews(req, res) {
    const { id } = req.params;

    const { text, name, vote } = req.body;

    const newReviewSql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)'

    connection.query(newReviewSql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" })
        res.status(201)
        return res.json({ message: "Review added", id: results.insertId })
    })

}

function deleteReviews(req, res) {
    const { id } = req.params;


    const deleteReviewSql = 'DELETE FROM reviews WHERE id = ?'

    connection.query(deleteReviewSql, [id], (err) => {
        if (err) {
            // Se c'è un errore nella query, restituiamo un errore 500
            return res.status(500).json({ error: "Failed to delete review" });
        }
        // Restituiamo stato 204 (No Content) per indicare successo
        res.sendStatus(204);
    });

}

function destroy(req, res) {
    const id = parseInt(req.params.id); // Otteniamo l'ID del post dalla richiesta

    // Query per eliminare il post specifico
    const deleteSql = `DELETE FROM movies WHERE id = ?`;

    // Eseguiamo la query per eliminare il post
    connection.query(deleteSql, [id], (err) => {
        if (err) {
            // Se c'è un errore nella query, restituiamo un errore 500
            return res.status(500).json({ error: "Failed to delete movie" });
        }
        // Restituiamo stato 204 (No Content) per indicare successo
        res.sendStatus(204);
    });
}

module.exports = { index, show, store, storeReviews, destroy, deleteReviews };



