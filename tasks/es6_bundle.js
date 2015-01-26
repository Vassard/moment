module.exports = function (grunt) {
    grunt.registerMultiTask('es6_bundle', 'Generate a single file from an es6 module entrypoint', function () {

        var options = this.options({
            srcDir: 'lib',
            templateDir: 'templates'
        });

        var path = require('path');
        var transpiler = require('es6-module-transpiler');
        var Container = transpiler.Container;
        var FileResolver = transpiler.FileResolver;
        var BundleFormatter = transpiler.formatters.bundle;

        // var baseDir = options.baseDir;
        // if (baseDir[baseDir.length - 1] != '/') {
        //     baseDir = baseDir + '/';
        // }

        var container = new Container({
          resolvers: [new FileResolver([options.srcDir, options.templateDir])],
          formatter: new BundleFormatter()
        });

        grunt.log.writeln("name", this.name);
        grunt.log.writeln('data', this.data);
        container.getModule(this.data.template);
        // grunt.file.mkdir(path.dirname(this.data.output));
        container.write(this.data.output);
    });
}
