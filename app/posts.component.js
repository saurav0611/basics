System.register(['angular2/core', './posts.service', './users.service', './spinner.component', './pagination.component'], function(exports_1, context_1) {
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
    var core_1, posts_service_1, users_service_1, spinner_component_1, pagination_component_1;
    var PostsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (posts_service_1_1) {
                posts_service_1 = posts_service_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            },
            function (spinner_component_1_1) {
                spinner_component_1 = spinner_component_1_1;
            },
            function (pagination_component_1_1) {
                pagination_component_1 = pagination_component_1_1;
            }],
        execute: function() {
            PostsComponent = (function () {
                function PostsComponent(_postservice, _usersservice) {
                    this._postservice = _postservice;
                    this._usersservice = _usersservice;
                    this.posts = [];
                    this.users = [];
                    this.pageSize = 10;
                }
                PostsComponent.prototype.ngOnInit = function () {
                    this.loadUsers();
                    this.loadPosts();
                };
                PostsComponent.prototype.loadUsers = function () {
                    var _this = this;
                    this._usersservice.getUsers()
                        .subscribe(function (res) { _this.users = res; });
                };
                PostsComponent.prototype.loadPosts = function (filter) {
                    var _this = this;
                    this.postsLoading = true;
                    this._postservice.getPosts(filter)
                        .subscribe(function (res) {
                        _this.posts = res;
                        _this.pagedPosts = _this.getPostsInPage(1);
                    }, null, function () { _this.postsLoading = false; });
                };
                PostsComponent.prototype.select = function (post) {
                    var _this = this;
                    this.currentPost = post;
                    this.commentsLoading = true;
                    this._postservice.getComments(post.id)
                        .subscribe(function (res) { _this.currentPost.comments = res; }, null, function () { _this.commentsLoading = false; });
                };
                PostsComponent.prototype.reloadPosts = function (filter) {
                    this.currentPost = null;
                    this.loadPosts(filter);
                };
                PostsComponent.prototype.onPageChanged = function (page) {
                    this.pagedPosts = this.getPostsInPage(page);
                };
                PostsComponent.prototype.getPostsInPage = function (page) {
                    var result = [];
                    var startingIndex = (page - 1) * this.pageSize;
                    var endIndex = Math.min(startingIndex + this.pageSize, this.posts.length);
                    for (var i = startingIndex; i < endIndex; i++)
                        result.push(this.posts[i]);
                    return result;
                };
                PostsComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/posts.component.html',
                        styles: ["\n        .posts li { cursor: default; }\n        .posts li:hover { background: #ecf0f1; }\n        .list-group-item.active,\n        .list-group-item.active:hover,\n        .list-group-item.active:focus { \n            background-color: #ecf0f1;\n            border-color: #ecf0f1;\n            color: #2c3e50;\n        }\n        .thumbnail {\n            border-radius: 100%;\n        }\n    "],
                        providers: [posts_service_1.PostsService, users_service_1.UsersService],
                        directives: [spinner_component_1.SpinnerComponent, pagination_component_1.PaginationComponent]
                    }), 
                    __metadata('design:paramtypes', [posts_service_1.PostsService, users_service_1.UsersService])
                ], PostsComponent);
                return PostsComponent;
            }());
            exports_1("PostsComponent", PostsComponent);
        }
    }
});
//# sourceMappingURL=posts.component.js.map