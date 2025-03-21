const express = require('express');
const app = express();
const port = process.env.PORT;

const errorsHandler = require('./middlewares/errorsHandler');

const notFound = require('./middlewares/notFound');

const moviesRouter = require('./routers/movies');

const imagePath = require('./middlewares/imagePath');

const cors = require('cors')


app.use(express.static('public'));

app.use(express.json());

app.use(imagePath);

app.use(cors({ origin: process.env.FE_APP }))

app.get('/api', (req, res) => {
    res.send("Siamo nella home");
}
);

app.use('/api/movies', moviesRouter);

app.use(notFound);
app.use(errorsHandler);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});