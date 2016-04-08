# generator-laravel-ng-ts [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Laravel 5.2  Angular 1.5 Typescript generator

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
##Generators
- ```laravel-ng-ts:component``` - create Angular 1.5 components
- ```laravel-ng-ts:config```    - create config functions
- ```laravel-ng-ts:constant```  - create constants
- ```laravel-ng-ts:model```     - create model and resource classes
- ```laravel-ng-ts:route```     - create route 
- ```laravel-ng-ts:run```       - create run function
- ```laravel-ng-ts:service```   - create service
- ```laravel-ng-ts:describe```  - create unit test
## Create Components
```
yo laravel-ng-ts:component [component-name]
```
- component-name : Can be ```camelCase``` or ```kebab-case```

Example:
```
yo laravel-ng-ts:component example
```

will create the following folders/files
```
client/
    |- app/
    |   |- components/
    |   |   |- example/                         --> component folder
    |   |   |   |- example.template.html        --> component html template
    |   |   |   |- example.component.ts         --> component configuration and controller 
    |   |   |   |- example.scss                 --> component style
```

**example.component.ts**
```typescript
module App.Components.Example {
    @Component({
            selector: "example",
            templateUrl: "./views/components/example/example.template.html"
        }
    )
    @Inject("$log")
    class ExampleComponent {
        constructor($log: ng.ILogService) {
            $log.info("Hello from Example component.");
        }
    }
}
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
**home.route.ts**  
```typescript
module App.Routes.LayoutPublic.Home {
    import AccessLevels = App.Core.Constants.AccessLevels;
    @RouteConfig("public.home", {
            url: "/",
            data: {
                access: AccessLevels.public
            },
            templateUrl: "./views/routes/layout-public/home/home.template.html"
        }
    )
    @Inject("$log")
    class Home {
        constructor($log: ng.ILogService) {
            $log.info("You have reached 'public.home'.");
        }
    }
}
```
## Create Model & Resource
The model and resource generator makes it easy to create models and the corresponding resource classes
this two classes make it very easy to communicate to the api of the backend app.
```
yo laravel-ng-ts:model [model-name]
```
- component-name : Can be ```camelCase``` or ```kebab-case```

Example:
```
yo laravel-ng-ts:model example
```
will create the following folders/files

```
client/
    |- app/
    |   |- models/
    |   |   |- example.model.ts            --> created model
    |   |- resources/
    |   |   |- example.resource.ts            --> created resource
```
**example.model.ts**
```typescript
///<reference path="../core/models/base.model.ts"/>
module App.Models {
    import IBaseModel = App.Core.Models.IBaseModel;
    import BaseModel = App.Core.Models.BaseModel;
    import IBaseResource = App.Core.Resources.IBaseResource;
    import IExampleResource = App.Resources.IExampleResource;
    export interface IExampleModel<T> extends IBaseModel<T>{
        id: any;
        //Put your model specific fields and functions here
    }

    @Service({
        serviceName:"App.Models.ExampleModel"
    })
    @Inject("App.Resources.ExampleResource")
    class ExampleModel  extends BaseModel<ExampleModel> implements IExampleModel<ExampleModel>{
        id:any;
        //Put your model specific fields and functions implementation here
        constructor(private resource: IExampleResource){
            super(resource);
        }
    }
}
```
**example.resource.ts**
```typescript
///<reference path="../core/resource/base.resource.ts"/>
module App.Resources {
    import IBaseResource = App.Core.Resources.IBaseResource;
    import BaseResource = App.Core.Resources.BaseResource;
    export interface IExampleResource extends IBaseResource{
        //resource specific stuff
        exampleResourceCall():any;
    }
    @Service({
        serviceName: "App.Resources.ExampleResource"
    })
    @Inject("App.Core.Services.ApiService")
    class ExampleResource extends BaseResource implements IExampleResource{
        constructor(apiService: restangular.IService){
            super(apiService,'examples')
        }
        //This is an example on how you can add extra resource calls besides the base resource calls
        //This method will send a get request to /api/examples/example with no extra parameters
        exampleResourceCall():any {
            return this.apiService.all(this.route).getList('example').get('');
        }
    }
}
```
## Create Services
```
yo laravel-ng-ts:service [service-name]
```
- service-name : Can be ```camelCase``` or ```kebab-case```

Example:
```
yo laravel-ng-ts:service example
```
will create the following folders/files
```
client/
    |- app/
    |   |- services/
    |   |   |- example.service.ts                   --> created service
```
**example.service.ts**
```typescript
module App.Services{
    export interface IExampleInterface{
        // Add your custom fields and functions here.
    }
    @Service({
        serviceName:"App.Service.ExampleService"
    })
    @Inject("$log")
    class ExampleService implements IExampleInterface {
        constructor($log: ng.ILogService){
            $log.info("Hello from Example service");
        }
    }
}
```
Similar to the service generator you can generate the other files.
## Creating tests 
To create tests use 
```
yo laravel-ng-ts:describe [test-name]
```
Example:
```
yo laravel-ng-ts:describe example
```
will create the following folders/files
```
tests/
    |- angular/
    |   |- example.spec.ts                   --> created test
```
**example.spec.ts**
```
module App.Tests {
    class ExampleTest {
        @Describe({
            name: "Test for  Example"
        })
        static tests(deps: any) {
            it("Should do something", () => {
                expect("Angular").toBe("Angular");
            });
        }
    }
```
## Project Repository
For more details on how to use the project see [kujtimiihoxha/laravel-ng-ts](https://github.com/kujtimiihoxha/laravel-ng-ts)
## License

MIT © [Kujtim Hoxha](kujtimhoxha.com)


[npm-image]: https://badge.fury.io/js/generator-laravel-ng-ts.svg
[npm-url]: https://npmjs.org/package/generator-laravel-ng-ts
[daviddm-image]: https://david-dm.org/kujtimiihoxha/generator-laravel-ng-ts.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/kujtimiihoxha/generator-laravel-ng-ts
