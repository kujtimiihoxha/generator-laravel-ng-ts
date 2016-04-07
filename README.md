# generator-laravel-ng-ts [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Laravel Angular Typescript generator

## Installation

First, install [Yeoman](http://yeoman.io) and generator-laravel-ng-ts using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-laravel-ng-ts
```

Then generate your new project:

```bash
mkdir my-project
cd my-project
yo laravel-ng-ts
```

## Create Components
```
yo laravel-ng-ts:component [component-name]
```
- component-name : Can be ```camelCase``` or ```kebab-case```

Example:
```
yo laravel-ng-ts my-custom-component
```

will create the following folders/files
```
client/
    |- app/
    |   |- components/
    |   |   |- my-custom-component/                         --> component folder
    |   |   |   |- my-custom-component.template.html        --> component html template
    |   |   |   |- my-custom-component.component.ts         --> component configuration and controller 
    |   |   |   |- my-custom-component.scss                 --> component style
```

## Create Routes
```
yo laravel-ng-ts:route [state] [route-url] [route-name] [path](optional)
```
- state : the route state ex. ```public.home```
- route-url: the browser url  ex. ```/home```
- route-name: the name of the route ex. ```home```
- path: the path in which the route files will be stored ex. ```layout-public/``` this will 
tell the generator to save the files under ```client/app/routes/layout-public/[route-name]```, by default all routes 
will be saved under ```client/app/routes/[route-name]```

Example:

```
yo laravel-ng-ts:route  public.home /home home /layout-public/
```
will create the following folders/files

```
client/
    |- app/
    |   |- routes/
    |   |   |- layout-public/
    |   |   |   |- home/                        -->route folder
    |   |   |   |   |- home.route.ts            -->route configuration
    |   |   |   |   |- home.template.html       -->route html template
```
## TODO
- Add options to create other features
    - Config
    - Run
    - Service
    - Directive
    - Model
    - Resource
 


## License

MIT © [Kujtim Hoxha](kujtimhoxha.com)


[npm-image]: https://badge.fury.io/js/generator-laravel-ng-ts.svg
[npm-url]: https://npmjs.org/package/generator-laravel-ng-ts
[travis-image]: https://travis-ci.org/kujtimiihoxha/generator-laravel-ng-ts.svg?branch=master
[travis-url]: https://travis-ci.org/kujtimiihoxha/generator-laravel-ng-ts
[daviddm-image]: https://david-dm.org/kujtimiihoxha/generator-laravel-ng-ts.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/kujtimiihoxha/generator-laravel-ng-ts
