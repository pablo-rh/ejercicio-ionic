import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.mode';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  user :User;
  img =  "../../assets/icon/favicon.png";
  name = "User name"
  email = "email@email.com"

  constructor(private userService: UserService, private activatedRoute:ActivatedRoute,private router:Router) {
    this.activatedRoute.params.subscribe(parameters => {
      if(parameters.id) {
        this.userService.getSingleUser(parameters.id).subscribe(response => {
          this.user = response.data;
          console.log(this.user);
          this.img = this.user.avatar;
          this.name = this.user.first_name + ' ' + this.user.last_name;
          this.email = this.user.email; 
        }, err => {
          
        });
      }
    });
  }

  ngOnInit() {
  }

  returnList() {
    this.router.navigate(['home']);
  }
}
