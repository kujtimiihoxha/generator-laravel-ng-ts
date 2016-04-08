'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    // This makes `appname` a required argument.
    this.argument('configName', { type: String, required: true });

    // And you can then access it later on this way; e.g. CamelCased
  },
  writing: function () {
    var dashed = _.kebabCase(this.configName)
    var camelCase = _.camelCase(this.configName)
    var upperFirst = _.upperFirst(camelCase);
    this.fs.copyTpl(
      this.templatePath('_custom.config.ts.tmp'),
      this.destinationPath('client/app/config/'+dashed+'.config.ts'),{
        configName:upperFirst,
      }
    );
  }
});
