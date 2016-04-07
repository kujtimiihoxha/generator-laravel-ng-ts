'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    // This makes `appname` a required argument.
    this.argument('state', { type: String, required: true });
    this.argument('url', { type: String, required: true });
    this.argument('name', { type: String, required: true });
    this.argument('path', { type: String, required: false });

    // And you can then access it later on this way; e.g. CamelCased
  },
  writing: function () {
    var camelCase = _.camelCase(this.name);
    var name = _.upperFirst(camelCase);
    var pathNames=[];
    var fullPathName ="";
    var roteName = _.kebabCase(this.name)
    if(this.path){
      this.path=_.trim(this.path, '/');
      this.path=_.trim(this.path, '\\');

      pathNames =  _.split(this.path,"/");
      if(pathNames.length === 0) {
        pathNames =  _.split(this.path,"\\");
      }
      if(pathNames.length === 0){
        fullPathName = _.upperFirst(this.path);
      }
      else {
        pathNames.forEach(function (pth) {
          fullPathName = fullPathName+_.upperFirst(_.camelCase(pth))+"."
        })
        _.trimEnd(fullPathName,'.');
      }
      this.fs.copyTpl(
        this.templatePath('_custom.route.ts.tmp'),
        this.destinationPath('client/app/routes/'+this.path+'/'+roteName+'/'+roteName+'.route.ts'),{
          fullPathName :fullPathName,
          name :name,
          rotePath: this.path+'/'+roteName,
          roteName: roteName,
          state :this.state,
          url :this.url,
        }
      );
      this.fs.copyTpl(
        this.templatePath('_custom.template.html.tmp'),
        this.destinationPath('client/app/routes/'+this.path+'/'+roteName+'/'+roteName+'.template.html'),{
          roteName: this.url,
        }
      );
      this.fs.copy(
        this.templatePath('_custom.scss.tmp'),
        this.destinationPath('client/app/routes/'+this.path+'/'+roteName+'/'+roteName+'.scss')
      );
    }
    else {
      this.fs.copyTpl(
        this.templatePath('_custom.route.ts.tmp'),
        this.destinationPath('client/app/routes/'+roteName+'/'+roteName+'.route.ts'),{
          fullPathName :fullPathName,
          name :name,
          rotePath: roteName,
          roteName: roteName,
          state :this.state,
          url :this.url,
        }
      );
      this.fs.copyTpl(
        this.templatePath('_custom.template.html.tmp'),
        this.destinationPath('client/app/routes/'+roteName+'/'+roteName+'.template.html'),{
          roteName: this.url,
        }
      );
      this.fs.copy(
        this.templatePath('_custom.scss.tmp'),
        this.destinationPath('client/app/routes/'+roteName+'/'+roteName+'.scss')
      );
    }
  }
});
