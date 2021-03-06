var projectController = require('./projectController.js');
var express = require('express');

var app = express.Router();

app.get('/', projectController.getProjects);
// app.get('/:userId', projectController.getProjectsByUserId);
app.get('/:userName', projectController.getProjectsByUserName);
app.post('/', projectController.addProject);
app.delete('/:project_id', projectController.deleteProject);

module.exports = app;
