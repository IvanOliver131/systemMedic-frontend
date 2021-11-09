import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/authentication/auth.service';
import { UserService } from '../service/user/user.service';
import { Authentication } from '../shared/authentication';
import { User } from '../shared/user';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})

export class SingInComponent implements OnInit {

  user: User = new User();
  authentication: Authentication = new Authentication();
  el: any;
  showSpinner = false;

  constructor(
    private authSvc: AuthService,
    private userSvc: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  verifyInputs() {
    let msg = ``
    let success = true;
    if (!this.authentication.email) {
      msg += `O campo E-mail é requerido.\n\n`;
      success = false;
    }
    if (!this.authentication.password) {
      msg += `O campo Senha é requerido.\n\n`;
      success = false;
    }
    if (!success) {
      console.log(msg, `Ok`, {
        duration: 3000,
      });
      alert(msg);
    }
    return success;
  }

  authenticate() {
    this.showSpinner = true;
    if (this.verifyInputs()) {
      this.authSvc.login(this.authentication).subscribe(
        result => {
          this.showSpinner = false;
          this.router.navigateByUrl('controle-de-medicamentos');
        }
      ),
      (e) => {
        this.authenticate();
      }

      this.authentication = new Authentication();

    }
  }
}
