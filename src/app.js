const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { id, title, url, techs, likes } = request.query;

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);


  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;


  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  } 
  const {likes} = repositories[repositoryIndex];

  repositories[repositoryIndex] = { id, title, url, techs, likes, };

  return response.json(repositories[repositoryIndex]);



});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return res.status(400).json({ error: 'Repository not found' });
  } 
  repositories.splice(repositoryIndex, 1);
  return res.status(204).json();
});


app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  } 

  const repository = repositories[repositoryIndex]
  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;
