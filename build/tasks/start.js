module.exports = function (grunt) {

  // grunt start --name=chooseAppName --root=otherThanDefault

  grunt.registerTask('config.json', 'create config.json file', function(){
    var camelCase   = require('../helpers/camelCase.js');
    var root        = grunt.option("root") || 'app/public';
    var appName     = grunt.option("name") || 'app';
    var main        = grunt.option("main") || "./app.js";
    var router      = grunt.option("router") || 'ui.router';
    var normAppName = camelCase(appName);
    var jsFolder    = root + '/javascripts';
    var base        = jsFolder + '/' + appName;
    var config      = {
                        root: root,
                        base: base,
                        main: 
                        appName: normAppName,
                        jsFolder: jsFolder
                      };

    grunt.file.write('./config.json', JSON.stringify(config));
  });

  grunt.registerTask('publicFolders', 'create public folders', function() {
    var root = grunt.option('root') || 'app/public';
    
    grunt.file.mkdir(root + '/components');
    grunt.file.mkdir(root + '/stylesheets');
    grunt.file.mkdir(root + '/javascripts');
    grunt.file.mkdir(root + '/images');
    grunt.file.mkdir(root + '/views');
    grunt.file.mkdir(root + '/views/shared');
    grunt.file.mkdir(root + '/views/directives');
  });

  grunt.registerTask('appFolders', 'create angular folders', function() {
    var folders = [
                    "configs",
                    "constants",
                    "controllers",
                    "directives",
                    "factories",
                    "models",
                    "services",
                    "values"
                  ]

    folders.forEach(function (folder) {
      grunt.file.mkdir(base + '/' + folder);
      var gitKeep = base + '/' + folder + '/.gitkeep.js';
      grunt.file.write(gitKeep, "");

      // ! Deprecated
      // Used to use an index.js as a seperate angular.module -> app.controllers
      // var filePath = base + '/' + folder + '/index.js';
      // ! Requires ..helper/generator.js
      // grunt.file.write(filePath, generator({app: normAppName, type: folder, index: true}));
    });
  });

  grunt.registerTask('mainFile', 'create main file', function(){
    var config = grunt.file.readJSON('./config.json');
    var tpl    = require('../templates/app.js');
    var data   = { 
                    data: {
                      app: config.normAppName,
                      router: config.router
                    } 
                 }
    var appTpl = grunt.template.process(tpl, data);
    grunt.file.write(config.base + '/app.js', appTpl);
  });

  grunt.registerTask('routerFile', 'create router file', function(){
    var config    = grunt.file.readJSON('./config.json');
    var tpl       = require('../templates/router.js');
    var data      = { 
                      data: {
                        root: config.root,
                        parent: config.parent
                      }
                    }
    var routerTpl = grunt.template.process(tpl, data);
    grunt.file.write(config.base + 'configs/router.js', routerTpl);
  });

  grunt.registerTask('start', 'create app and angular folders', ['config.json', 'publicFolders', 'appFolders', 'mainFile', 'routerFile']);
}
