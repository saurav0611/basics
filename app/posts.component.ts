import {Component,OnInit} from 'angular2/core';
import {PostsService} from './posts.service';
import {UsersService} from './users.service';
import {SpinnerComponent} from './spinner.component';
import {PaginationComponent} from './pagination.component'

@Component({
    templateUrl:'app/posts.component.html',
    styles: [`
        .posts li { cursor: default; }
        .posts li:hover { background: #ecf0f1; }
        .list-group-item.active,
        .list-group-item.active:hover,
        .list-group-item.active:focus { 
            background-color: #ecf0f1;
            border-color: #ecf0f1;
            color: #2c3e50;
        }
        .thumbnail {
            border-radius: 100%;
        }
    `],
    providers:[PostsService, UsersService],
    directives: [SpinnerComponent,PaginationComponent]
})
export class PostsComponent implements OnInit {

    pagedPosts;
    
    postsLoading;
    commentsLoading;
    
    currentPost;
    
    posts = [];
    users = [];

    pageSize = 10;

    constructor (private _postservice: PostsService, 
                 private _usersservice: UsersService) {
    }

    ngOnInit() {
        this.loadUsers();
        this.loadPosts();
    }

    loadUsers() {
        this._usersservice.getUsers()
        .subscribe(res => { this.users = res })
    }

    loadPosts(filter?) {
        this.postsLoading = true;
        this._postservice.getPosts(filter)
        .subscribe(
            res => {    this.posts = res;
                        this.pagedPosts = this.getPostsInPage(1)},
            null,
            () => { this.postsLoading = false; }
        )
    }

    select(post) {
        this.currentPost = post;

        this.commentsLoading = true;
        this._postservice.getComments(post.id)
            .subscribe(
                    res => { this.currentPost.comments = res }, 
                    null, 
                    () => {this.commentsLoading = false;} ); 
    }

    reloadPosts(filter) {
        this.currentPost=null;       
        this.loadPosts(filter);
    }

    onPageChanged(page) {
        this.pagedPosts = this.getPostsInPage(page);
    }
    getPostsInPage(page) {
        var result = [];
        var startingIndex = (page - 1) * this.pageSize;
        var endIndex = Math.min(startingIndex + this.pageSize, this.posts.length);
        for (var i = startingIndex; i < endIndex; i++)
            result.push(this.posts[i]);

        return result;
    }
}