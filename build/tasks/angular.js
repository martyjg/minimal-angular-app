module.exports = function(grunt) {

  // In Gruntfile, the structure of the tasks are:
  //
  // g: {
  //   taskName: directoryLocation,
  // }

  // Example Usage:
  // grunt g:controller --name=mainController

  var makeFile   = require('../helpers/generator.js')(grunt);
  var camelCase  = require('../helpers/camelCase.js');
  var capitalize = require('../helpers/capitalize.js');

  grunt.registerMultiTask('g', 'angular generators', function() {
    if (!grunt.option('name')) {
      var command = 'grunt ' + this.name + ':' + this.target;
      return grunt.warn('Please add a name like this "'+command+' --name=insertNameHere".');
    }

    var target        = this.target;
    var targetCaps    = capitalize(target);
    var targetFolder  = this.data;
    var targetName    = grunt.option('name');
    var camelCaseName = camelCase(targetName);
    var config        = grunt.file.readJSON('./config.json');
    var filePath      = config.base + "/" + targetFolder + "/" + targetName + targetCaps + ".js";

    var fileData = {
      app: config.appName,
      name: camelCaseName,
      type: target,
      parent: config.parent
    };

    // Use the makeFile helper to create the file
    grunt.file.write(filePath, makeFile(fileData));

    // Some generators need to make another file
    if (target === 'controller'){
      grunt.file.mkdir(config.root + '/views/' + targetName);
    } else if (target === 'directive') {
      grunt.file.write(config.root + '/views/' + targetFolder + '/' + targetName + '.html')
    }

  });
};