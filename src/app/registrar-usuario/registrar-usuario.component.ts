import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  public user: User = new User();
  public search;
  public medicineSpecific;
  public allUserLst: Array<User> = new Array<User>();

  constructor(
    private userSvc: UserService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  verifyInputs() {
    let msg = ``
    let success = true;
    if (!this.user.username) {
      msg += ` O campo Username é requerido`;
      success = false;
    }
    if (!this.user.email) {
      msg += `O campo E-mail é requerido.`;
      success = false;
    }
    if (!this.user.password) {
      msg += ` O campo Senha é requerido`;
      success = false;
    }
    if (!success) {
      console.log(msg, `Ok`, {
        duration: 3000,
      });
    }
    return success;
  }

  addUser() {
    if (this.verifyInputs()) {
      this.userSvc.register(this.user).subscribe(
        () => {
          this.getUsers();
          console.log('Usuario cadastrado com sucesso!');
        }
      );
      this.user = new User();
    }
  }

  async funcaoCadaTecla(search){
    if(search === ''){
      this.getUsers();
    }
  }

  funcaoEnter(search){
    if(search !== ''){
      this.getUsersOne(search);
    }
    else{
      this.getUsers();
    }
  }

  async getUsersOne(search){
    this.allUserLst = [];
    this.userSvc.getSpecificUser(search).subscribe((result) =>{ 
      this.allUserLst = result;
    });
  }

  async getUsers(){
    this.userSvc.getUsers().subscribe((result) =>{
      this.allUserLst = result;   
    });
  }

  async deleteUser(user){
    this.userSvc.deleteUser(user).subscribe(() =>{
      this.ngOnInit();  
    });
    this.user = new User();
  }

  async updateUser(){
    if (this.verifyInputs()) {
      this.userSvc.updateUser(this.user).subscribe();
      this.user = new User();
    }
  }

  setUser(user){
    this.user = user;
  }
}
