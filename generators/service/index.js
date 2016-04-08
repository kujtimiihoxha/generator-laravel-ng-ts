'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    // This makes `appname` a required argument.
    this.argument('serviceName', { type: String, required: true });

    // And you can then access it later on this way; e.g. CamelCased
  },
  writing: function () {
    var dashed = _.kebabCase(this.serviceName)
    var camelCase = _.camelCase(this.serviceName)
    var upperFirst = _.upperFirst(camelCase);
    this.fs.copyTpl(
      this.templatePath('_custom.service.ts.tmp'),
      this.destinationPath('client/app/services/'+dashed+'.service.ts'),{
        serviceName:upperFirst,
      }
    );
  }
});
