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


const addAluno = (request, response) => {
  const { nome, cidade, idade } = request.body

  pool.query('INSERT INTO alunos (nome, cidade, idade) VALUES ($1, $2, $3)', [nome, cidade, idade], error => {
    if (error) {
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Aluno adicionado.' })
  })
}

const health = (request, response) => {
  response.status(200).json("Serviço funcionando!");
};

app.route("/alunos").get(getAlunos).post(addAluno)
app.route("/health").get(health);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server listening`);
});
