var Resource = require('./resourceModel.js');
var Project = require('../projects/projectModel.js');

module.exports = {
  // Get all the resources
  getResources: function (req, res) {
    Resource.find()
    .then(function (resources) {
      res.json(resources);
    });
  },

  // Get all resources for a specific project
  getResourcesByProjectId: function (req, res) {
    var projectId = req.params.projectId;
    Project.findOne({ _id: projectId })
    .then(function (project) {
      if (!project) {
        return res.end('project not found');
      }
      Resource.find({ project: project._id })
      .then(function (resources) {
        res.json(resources);
      });
    })
    .catch(function (err) {
      console.log(err);
      res.end(err);
    });
  },

  getResourcesByProjectName: function (req, res) {
    var projectName = req.params.projectName;
    Project.findOne({ name: projectName })
    .then(function (project) {
      if (!project) {
        return res.end('project not found');
      }
      Resource.find({ project: project._id })
      .then(function (resources) {
        res.json(resources);
      });
    })
    .catch(function (err) {
      console.log(err);
      res.end(err);
    });
  },

  addResource: function (req, res) {
    var projectName = req.body.projectName;
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    var isValidUrl = urlregex.test(req.body.url);
    if (!isValidUrl) {
      return res.end('Invalid url');
    }
    if (!projectName) {
      return res.end('ProjectName required');
    }
    console.log(req.body);
    Project.findOne({ name: projectName })
    .then(function (project) {
      if (!project) {
        return res.end('project not found');
      }
      Resource.create({
        project: project._id,
        url: req.body.url,
        description: req.body.description
      }).then(function (resource) {
        res.json(resource);
      })
      .catch(function (err) {
        console.log(err);
        res.end('Error adding resource.');
      });
    })
    .catch(function (err) {
      console.log(err);
      res.end(err);
    });
  },

  updateResource: function (req, res) {
    var resourceId = req.params.resourceId;
    if (!resourceId) {
      return res.end('ResourceId required');
    }
    Resource.findByIdAndUpdate(resourceId, req.body)
    .then(function (resource) {
      if (!resource) {
        return res.end('resource not found');
      }
      res.json(resource);
    })
    .catch(function (err) {
      console.log(err);
      res.end(err);
    });
  },

  deleteResource: function (req, res) {
    Resource.remove({
      _id: req.params.resourceId
    })
    .then(function () {
      res.end('Resource deleted.');
    })
    .catch(function (err) {
      res.end(err);
    });
  }
};
