const express = require("express");
const cors = require("cors");
const { pool } = require("./config");
// require('dotenv').config()

const app = express();

app.use(cors());

const getAlunos = (request, response) => {
  pool.query("SELECT * FROM alunos", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addBook = (request, response) => {
  const { author, title } = request.body;

  pool.query(
    "INSERT INTO books (author, title) VALUES ($1, $2)",
    [author, title],
    (error) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ status: "success", message: "Book added." });
    }
  );
};

const health = (request, response) => {
  response.status(200).json("Serviço funcionando!");
};

app.route("/alunos").get(getAlunos).post(addBook)
app.route("/health").get(health);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server listening`);
});
