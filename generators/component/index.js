'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs-extra');
var junk = require('junk');
var shell = require('shelljs');
var passthru = require('passthru');

module.exports = yeoman.Base.extend({
  checkFolder: function () {
    var cb = this.async();
    var self = this;

    // check if the dir is empty (using 'junk') to skip OS files such as .DS_Store etc
    fs.readdir('.', function (err, files) {
      if (files.filter(junk.not).length > 0 && self.props.force === false) {

        // dir not empty and force install flag not used
        self.prompt([{
          type    : 'confirm',
          name    : 'forceInstall',
          message : 'The current directory ' +chalk.underline(process.cwd())+ ' is not empty. Continue?',
          default : false
        }], function(answers) {
          if (answers.forceInstall) {
            // force installation
            cb();
          }
          // break install
          return;
        });
      } else {
        // dir empty or force install flag used, install
        cb();
      }
    });
  },
  fetchProject: function () {
    var cb = this.async();

    this.log.write().ok('Downloading laravel-ng-ts ');
    //strip is needed to extract to current dir instead of dir with name of tarball
    this.tarball('https://github.com/kujtimiihoxha/laravel-ng-ts/archive/master.tar.gz', '.', {extract: true, strip: 1}, cb);
  },
  patchPackage: function () {
    this.log.write().ok('Patching package.json');
    var cb = this.async();
    var that =this;
    fs.readJSON('./package.json', function (err, data) {
      // overwrite the placeholder appname
      data.name = that.props.name;
      data.author = that.props.author;
      data.description = that.props.description;
      data.licence = that.props.licence;
      fs.removeSync('./package.json');
      fs.writeJSON('./package.json', data);

      cb();

    });
  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to  ' + chalk.red('laravel-ng-ts') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      //Defaults to the project's folder name if the input is skipped
      default: this.appname.split(' ').join('-')
    },
      {
        type: 'input',
        name: 'description',
        message: 'Your project description',
      }, {
        type: 'input',
        name: 'version',
        message: 'Version',
        default: '0.0.1'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author'
      },
      {
        type: 'input',
        name: 'licence',
        message: 'Licence',
        default: 'MIT'
      }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.force = false;
      // To access props later use this.props.someAnswer;

      done();
    }.bind(this));
  },
  composerInstall: function () {
    var cb = this.async();
    var that = this;
    this.spawnCommand('composer', ['install']).on('close',function () {
      that.copy('.env.example','.env');
      that.spawnCommand('php', ['artisan','key:generate'],cb);
      that.spawnCommand('php', ['artisan','jwt:generate'],cb);
      cb();
    });
  },
  writing: function () {
   },
  install: function () {
    this.installDependencies();
    this.bowerInstall();
  }
});
