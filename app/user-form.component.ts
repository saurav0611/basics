import {Component,OnInit} from 'angular2/core'
import {ControlGroup, FormBuilder, Validators} from 'angular2/common'
import {BasicValidators} from './basicValidators';
import {CanDeactivate,Router,RouteParams} from 'angular2/router';
import {UsersService} from './users.service';
import {User} from './user'; 

@Component({
    templateUrl: 'app/user-form.component.html',
    providers : [UsersService]
})

export class UserFormComponent implements CanDeactivate, OnInit {

    hello: ControlGroup;
    title : String;
     
    //user = { address : {} };
    user = new User(); 

    constructor(fb: FormBuilder,
                private _router: Router,
                private _routeParams : RouteParams,
                private _userService: UsersService) {
                    this.hello = fb.group({
                        name : ['',Validators.required],
                        email : ['',BasicValidators.email],
                        phone : [],
                        address : fb.group({
                            street : [],
                            suite : [],
                            city : [],
                            zipcode : []
                        })
                    })
    }

    ngOnInit(){
        var id = this._routeParams.get("id");
        this.title = id ? "Edit User" : "New User";

        if (!id ) return ;

        this._userService.getUser(id)
            .subscribe(
                user => {
                    this.user = user;
                    console.log(this.user);
                },
                response => {
                    if (response.status = 404) {
                        this._router.navigate(['NotFound']);
                    }
                } 
            );
    }

    routerCanDeactivate(){
        if (this.hello.dirty) {
            return confirm('You have unsaved changes. Are you sure you want to navigate away?');
        }
    } 

    save() { 
        var result;

        if ( this.user.id ) {
            result = this._userService.updateUser(this.user.id,this.hello.value)
        }
        else {
            result = this._userService.addUser(this.hello.value)
        }

        result.subscribe(x => this._router.navigate(['Users']));
    }
}