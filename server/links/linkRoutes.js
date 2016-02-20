var linkController = require('./linkController.js');
var express = require('express');

var app = express.Router();

app.get('/', linkController.getLinks);
app.get('/:projectId', linkController.getLinksByProject);
app.post('/', linkController.addLink);
app.put('/:linkId', linkController.updateLink);
app.delete('/:linkId', linkController.deleteLink);

module.exports = app;
