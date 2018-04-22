
import {Component, OnInit} from 'angular2/core';
import {UsersService} from './users.service' 
import {HTTP_PROVIDERS} from 'angular2/http'
import {RouterLink} from 'angular2/router'

@Component({
    template:`
    <h1> Users </h1>

    <p>
        <a [routerLink]="['NewUser']" class="btn btn-primary">Add User</a>
    </p>
    
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Name</th><th>Email</th><th>Edit</th><th>Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="#user of users">
                <td>{{ user.name }}</td><td>{{ user.email }} </td>
                <td>
                    <a [routerLink]="['EditUser', {id : user.id}]">
                        <i class="fa fa-edit"></i>
                    </a>
                </td>
                <td>
                    <i (click)="deleteUser(user)" class="fa fa-remove"></i>
                </td>
            </tr>
        </tbody>
    </table>        
    
    `,
    providers: [UsersService, HTTP_PROVIDERS],
    directives: [RouterLink]
})
export class UsersComponent implements OnInit {
    users: any[];
    constructor(private _usersservice: UsersService){
       }
    
    ngOnInit() {
         this._usersservice.getUsers()
            .subscribe(users =>{
                this.users = users;
            });   
    
    }

    deleteUser(user){
        if (confirm("Are you sure you want to delete " + user.name + "?")) {
            var index = this.users.indexOf(user)
            this.users.splice(index, 1);
            this._usersservice.deleteUser(user.id)
                .subscribe(null, 
        		err => {
        		    alert("Could not delete the user.");
                   // Revert the view back to its original state
                   // by putting the user object at the index
                   // it used to be.
        			this.users.splice(index, 0, user);
        			});
        }
    }
}