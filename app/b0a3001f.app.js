"use strict";angular.module("pizzaApp",["ngCookies","ui.router","ui.bootstrap"]).constant("env",{host:"http://162.250.78.47",api:"/api",pizzas:"/pizzas",ingredients:"/ingredients"}).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){b.otherwise("/")}]),angular.module("pizzaApp").controller("DetailCtrl",["$scope","$stateParams","pizza","ingredient","$state","$cookies",function(a,b,c,d,e,f){function g(){var b=!0;return a.pizza.ingredients.length||(b=!1),b}var h=b.pizzaId||f.get("pizzaId");a.pizza={},a.pizza.ingredients=[],h&&c.get(h).then(function(b){a.pizza=b}),a.ingredients=[],a.ingredientsPromise=d.get().then(function(b){a.ingredients=b}),a.addIngredient=function(b){b&&a.pizza.ingredients.push(b)},a.save=function(){g()?a.pizza._id?c.update(a.pizza).then(function(a){f.put("pizzaId",""),e.go("main")}):c.create(a.pizza).then(function(a){f.put("pizzaId",""),e.go("main")}):alert("Please use at least one ingredient for this pizza")}}]),angular.module("pizzaApp").config(["$stateProvider",function(a){a.state("detail",{url:"/detail",params:{pizzaId:null},templateUrl:"/pizza-test/app/components/detail/detail.html",controller:"DetailCtrl"})}]),angular.module("pizzaApp").directive("pizzaIngredients",["ingredient","$q","$window",function(a,b,c){return{templateUrl:"/pizza-test/app/components/detail/pizzaIngredients/pizzaIngredients.html",restrict:"EA",link:function(a,b,d){function e(){var b,c,d,e=a.list.length,g={},h={};a.ingredientsPromise.then(function(){for(d=a.ingredients.length,f(),b=0;e>b;b++)for(h=a.list[b],c=0;d>c;c++)g=a.ingredients[c],h===g._id&&(g.no+=1)})}function f(){var b,c=a.ingredients.length;for(b=0;c>b;b++)a.ingredients[b].no=0}a.list=[],a.nameList=[],a.$watchCollection(function(){return a.pizza.ingredients},function(b,c,d){b&&(a.list=b,e())}),a.remove=function(b,d){var e=angular.copy(a.pizza.ingredients),f=c.confirm("Are you sure you want to remove this ingredient?");f&&(d?e.splice(e.indexOf(b),1):e=e.filter(function(a){return a!==b})),a.pizza.ingredients=e}}}}]),angular.module("pizzaApp").controller("MainCtrl",["$scope","pizza","$state","$window","$cookies",function(a,b,c,d,e){function f(){b.get().then(function(b){a.pizzas=b})}a.pizzas=[],f(),a.newPizza=function(){e.put("pizzaId",""),c.go("detail")},a.removePizza=function(a){var c=d.confirm("Are you sure you want to remove this pizza?");c&&b.remove(a).then(function(a){f()})},a.updateCookie=function(a){e.put("pizzaId",a)}}]),angular.module("pizzaApp").config(["$stateProvider",function(a){a.state("main",{url:"/",templateUrl:"/pizza-test/app/components/main/main.html",controller:"MainCtrl"})}]),angular.module("pizzaApp").service("ingredient",["$http","$q","env",function(a,b,c){function d(b){var c=b?"/"+b:"",d=a({method:"GET",url:g+c,headers:{"Content-Type":"application/json"}});return d.then(f,e)}function e(a){return angular.isObject(a.data)&&a.data.message?b.reject(a.data.message):b.reject("An unknown error occurred.")}function f(a){return a.data}var g=c.host+c.api+c.ingredients;return{get:d}}]),angular.module("pizzaApp").service("pizza",["$http","$q","env",function(a,b,c){function d(b){var c=b?"/"+b:"",d=a({method:"GET",url:j+c,headers:{"Content-Type":"application/json"}});return d.then(i,h)}function e(b){var c=a({method:"POST",url:j,headers:{"Content-Type":"application/json"},data:angular.toJson(b)});return c.then(i,h)}function f(b){var c=b._id,d=a({method:"PUT",url:j+"/"+c,headers:{"Content-Type":"application/json"},data:angular.toJson(b)});return d.then(i,h)}function g(b){var c=a({method:"DELETE",url:j+"/"+b,headers:{"Content-Type":"application/json"}});return c.then(i,h)}function h(a){return angular.isObject(a.data)&&a.data.message?b.reject(a.data.message):b.reject("An unknown error occurred.")}function i(a){return a.data}var j=c.host+c.api+c.pizzas;return{get:d,create:e,update:f,remove:g}}]),angular.module("pizzaApp").run(["$templateCache",function(a){a.put("/pizza-test/app/components/detail/detail.html",'<header class="header detail"><div class=container><a ui-sref=main class="home-link pull-left"><i class="fa fa-chevron-left"></i> Home</a></div></header><div class=container><div class=row><div class="col-lg-3 col-md-2 col-sm-1 col-xs-12"></div><div class="col-lg-6 col-md-8 col-sm-10 col-xs-12"><form name=pizzaForm><div class=form-group><label>Pizza Name</label><input class=form-control placeholder="" name=name ng-model=pizza.name required ng-required=true><p ng-show="pizzaForm.name.$invalid && !pizzaForm.name.$pristine" class=help-block>Name is required.</p></div><div class=form-group><div class=radio ng-repeat="item in (ingredients | orderBy : \'name\')"><label><input type=radio name=ingredient ng-value=item._id value={{item._id}} ng-model=$parent.selected> {{item.name}}</label></div></div><button type=button class="btn btn-default btn-lg hidden-xs" ng-click=addIngredient(selected) ng-disabled=!selected>Add Ingredient</button> <button type=button class="btn btn-default btn-lg btn-block visible-xs" ng-click=addIngredient(selected) ng-disabled=!selected>Add Ingredient</button></form></div><div class="col-lg-3 col-md-2 col-sm-1 col-xs-12"></div></div></div><pizza-ingredients></pizza-ingredients><div class=container><div class=row><div class="col-lg-3 col-md-2 col-sm-1 col-xs-12"></div><div class="col-lg-6 col-md-8 col-sm-10 col-xs-12"><button type=button class="hidden-xs btn btn-primary btn-lg" ng-click=save(pizza) ng-disabled=pizzaForm.$invalid>Save</button> <button type=button class="visible-xs btn btn-primary btn-lg btn-block" ng-click=save(pizza) ng-disabled=pizzaForm.$invalid>Save</button></div><div class="col-lg-3 col-md-2 col-sm-1 col-xs-12"></div></div></div>'),a.put("/pizza-test/app/components/detail/pizzaIngredients/pizzaIngredients.html",'<div class=container><div class=row><div class="col-lg-3 col-md-2 col-sm-1 col-xs-12"></div><div class="col-lg-6 col-md-8 col-sm-10 col-xs-12"><ul class="nav nav-tabs nav-stacked ingredient-list"><!--<li ng-repeat="item in nameList">{{item.no}} x {{item.name}}\n          <span class="pull-right ingredient-actions">\n            <i class="fa fa-minus" ng-click="remove(item._id, true)"></i>\n            <i class="fa fa-trash" ng-click="remove(item._id)"></i>\n          </span>\n        </li>--><li ng-repeat="item in ingredients" ng-show=item.no>{{item.no}} x {{item.name}} <span class="pull-right ingredient-actions"><i class="fa fa-minus" ng-click="remove(item._id, true)"></i> <i class="fa fa-trash" ng-click=remove(item._id)></i></span></li></ul></div><div class="col-lg-3 col-md-2 col-sm-1 col-xs-12"></div></div></div>'),a.put("/pizza-test/app/components/main/main.html",'<header class="home header" id=banner><div class=container><h1>Pizzas App</h1></div></header><div class=container><div class=row><div class=col-lg-12><div class=row><div class="col-lg-4 col-md-4 col-sm-1 col-xs-12"></div><ul class="pizza-list col-md-4 col-lg-4 col-sm-10 col-xs-12"><li ng-repeat="pizza in pizzas" ng-if=pizza.name><a ui-sref="detail({pizzaId: \'{{pizza._id}}\'})" ng-click=updateCookie(pizza._id)>{{pizza.name}}</a> <i class="pull-right fa fa-trash" ng-click=removePizza(pizza._id)></i></li></ul><div class="col-lg-4 col-md-4 col-sm-1 col-xs-12"></div></div></div></div></div><div class=container><div class=row><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><button type=button class="hidden-xs btn btn-primary btn-lg" ng-click=newPizza()>New Pizza</button> <button type=button class="visible-xs btn btn-primary btn-lg btn-block" ng-click=newPizza()>New Pizza</button></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div></div></div>')}]);