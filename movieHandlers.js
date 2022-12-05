const database = require("./database");

const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("not found");
    });
};
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("select * from users where id = ?", [id])
    .then(([user]) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).send("user not found");
    });
};
const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  const movie = movies.find((movie) => movie.id === id);
  database
    .query(`select * from movies where id = ?`, [id])
    .then(([movie]) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send("Not Found");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  getUserById,
  getUsers,
};
