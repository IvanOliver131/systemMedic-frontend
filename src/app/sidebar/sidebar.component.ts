import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user/user.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  el: any;
  el2: any;
  loading: boolean = false;
  userEmail: string = '';
  userLst: Array<User> = new Array<User>();
  typeUser;

  constructor(
    private router: Router,
    private userSvc: UserService
  ) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem("email");

    this.getUsers(this.userEmail);
  }

  getUsers(userEmail){
    this.userSvc.getUsers().subscribe((result) => {
      this.userLst = result;

      this.userLst.forEach((user) => {
        if(user.email === userEmail){
          this.typeUser = user.type;
        }
      });
    });
    
  }

  goToControleMedicamentos(){
    this.router.navigateByUrl('controle-de-medicamentos');
  }

  goToControlePacientes(){
    this.router.navigateByUrl('controle-de-pacientes');
  }

  goToControleDeRetirada(){
    this.router.navigateByUrl('controle-de-retirada');
  }

  goToRelatorioDeRetirada(){
    this.router.navigateByUrl('relatorio-de-retirada')    
  }

  goToRelatorioDeReposicao(){
    this.router.navigateByUrl('relatorio-de-resposicao');
  }

  goToRelatorioDeMedicamentosControlados(){
    this.router.navigateByUrl('relatorio-de-medicamento');    
  }

  goToControleDeUsuario(){
    this.router.navigateByUrl('registrar-usuario');    
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['sign-in']);
  }
}
