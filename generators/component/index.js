'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    // This makes `appname` a required argument.
    this.argument('componentName', { type: String, required: true });

    // And you can then access it later on this way; e.g. CamelCased
  },
  writing: function () {
    var dashed = _.kebabCase(this.componentName)
    var camelCase = _.camelCase(this.componentName)
    var upperFirst = _.upperFirst(camelCase);
    this.fs.copyTpl(
      this.templatePath('_custom.component.ts.tmp'),
      this.destinationPath('client/app/components/'+dashed+'/'+dashed+'.component.ts'),{
        componentName:upperFirst,
        dashedComponentName :dashed

      }
    );
    this.fs.copyTpl(
      this.templatePath('_custom.template.html.tmp'),
      this.destinationPath('client/app/components/'+dashed+'/'+dashed+'.template.html'),{
        dashedComponentName :dashed
      }
    );
    this.fs.copyTpl(
      this.templatePath('_custom.scss.tmp'),
      this.destinationPath('client/app/components/'+dashed+'/'+dashed+'.scss'),{
        dashedComponentName :dashed
      }
    );
   }
});
