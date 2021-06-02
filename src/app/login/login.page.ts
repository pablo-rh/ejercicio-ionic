import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginRequest } from '../model/login.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin : FormGroup;
  

  constructor(private fb: FormBuilder,private loginService: LoginService,private router: Router,public toast: ToastController) {
    this.formLogin = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.minLength(3)]]
    })
  }

  ngOnInit() {
  }

  login() {
    const data = this.formLogin.value as LoginRequest;
    this.loginService.login(data).subscribe(res => {
      console.log(res);
      this.router.navigate(['home']);
    }, err => {
      this.presentToast(err.error.error);
    });
  }

  async presentToast(message: string) {
    const toastMsg = await this.toast.create({
      message,
      duration: 3000
    });
    toastMsg.present();
  }

}
