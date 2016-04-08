'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    // This makes `appname` a required argument.
    this.argument('testName', { type: String, required: true });

    // And you can then access it later on this way; e.g. CamelCased
  },
  writing: function () {
    var dashed = _.kebabCase(this.testName)
    var camelCase = _.camelCase(this.testName)
    var upperFirst = _.upperFirst(camelCase);
    this.fs.copyTpl(
      this.templatePath('_custom.spec.ts.tmp'),
      this.destinationPath('tests/angular/'+dashed+'.spec.ts'),{
        testName:upperFirst,
      }
    );
  }
});
