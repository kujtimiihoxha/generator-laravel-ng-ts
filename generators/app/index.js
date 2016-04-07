'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();
  
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the impressive ' + chalk.red('generator-laravel-ng-ts') + ' generator!'
    ));
  
    var prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];
  
    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someAnswer;
  
      done();
    }.bind(this));
  },

  writing: function () {
    var cb = this.async();

    this.log.write().ok('Downloading laravel-ng-ts ');

    //strip is needed to extract to current dir instead of dir with name of tarball
    this.tarball('https://github.com//kujtimiihoxha/laravel-ng-ts/archive/master.tar.gz', '.', {extract: true, strip: 1}, cb);

  },

  install: function () {
    this.installDependencies();
  }
});
