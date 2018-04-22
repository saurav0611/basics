System.register(['angular2/core', './users.service', 'angular2/http', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, users_service_1, http_1, router_1;
    var UsersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            UsersComponent = (function () {
                function UsersComponent(_usersservice) {
                    this._usersservice = _usersservice;
                }
                UsersComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._usersservice.getUsers()
                        .subscribe(function (users) {
                        _this.users = users;
                    });
                };
                UsersComponent.prototype.deleteUser = function (user) {
                    var _this = this;
                    if (confirm("Are you sure you want to delete " + user.name + "?")) {
                        var index = this.users.indexOf(user);
                        this.users.splice(index, 1);
                        this._usersservice.deleteUser(user.id)
                            .subscribe(null, function (err) {
                            alert("Could not delete the user.");
                            // Revert the view back to its original state
                            // by putting the user object at the index
                            // it used to be.
                            _this.users.splice(index, 0, user);
                        });
                    }
                };
                UsersComponent = __decorate([
                    core_1.Component({
                        template: "\n    <h1> Users </h1>\n\n    <p>\n        <a [routerLink]=\"['NewUser']\" class=\"btn btn-primary\">Add User</a>\n    </p>\n    \n    <table class=\"table table-bordered\">\n        <thead>\n            <tr>\n                <th>Name</th><th>Email</th><th>Edit</th><th>Delete</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr *ngFor=\"#user of users\">\n                <td>{{ user.name }}</td><td>{{ user.email }} </td>\n                <td>\n                    <a [routerLink]=\"['EditUser', {id : user.id}]\">\n                        <i class=\"fa fa-edit\"></i>\n                    </a>\n                </td>\n                <td>\n                    <i (click)=\"deleteUser(user)\" class=\"fa fa-remove\"></i>\n                </td>\n            </tr>\n        </tbody>\n    </table>        \n    \n    ",
                        providers: [users_service_1.UsersService, http_1.HTTP_PROVIDERS],
                        directives: [router_1.RouterLink]
                    }), 
                    __metadata('design:paramtypes', [users_service_1.UsersService])
                ], UsersComponent);
                return UsersComponent;
            }());
            exports_1("UsersComponent", UsersComponent);
        }
    }
});
//# sourceMappingURL=users.component.js.map